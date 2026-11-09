import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

// Start loading the widget once the form is this close to the viewport, so it
// is ready before a visitor scrolls to it.
const PRELOAD_MARGIN = '600px 0px';

let altchaModules = null;

// Custom element registration touches `window`, so it cannot run during
// static export. Memoized: every caller shares one download.
function loadAltcha() {
  altchaModules ??= Promise.all([
    import('altcha'),
    import('altcha/i18n/hu'),
    import('altcha/i18n/en'),
  ]);
  return altchaModules;
}

function deferred() {
  let resolve;
  const promise = new Promise((r) => {
    resolve = r;
  });
  return { promise, resolve };
}

/**
 * ALTCHA proof-of-work bot check. The browser solves a small puzzle issued by
 * our own contact endpoint; no third-party requests, cookies or tracking.
 *
 * The widget code is a sizeable share of the home page's JavaScript, so it loads
 * only when the form comes near the viewport or receives focus, not on page load.
 *
 * The widget adds a hidden `altcha` input to the enclosing form. `ensurePayload()`
 * returns that payload, loading the widget and solving the challenge first if
 * the visitor submitted before either finished.
 */
const AltchaWidget = forwardRef(function AltchaWidget(
  { challengeUrl, language },
  ref,
) {
  const anchorRef = useRef(null);
  const widgetRef = useRef(null);
  const mounted = useRef(deferred());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const anchor = anchorRef.current;
    const form = anchor?.closest('form');
    let observer;

    const start = () => {
      observer?.disconnect();
      form?.removeEventListener('focusin', start);
      loadAltcha().then(() => {
        if (!cancelled) setLoaded(true);
      });
    };

    if (!anchor || typeof IntersectionObserver === 'undefined') {
      start();
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) start();
        },
        { rootMargin: PRELOAD_MARGIN },
      );
      observer.observe(anchor);
      form?.addEventListener('focusin', start);
    }

    return () => {
      cancelled = true;
      observer?.disconnect();
      form?.removeEventListener('focusin', start);
    };
  }, []);

  useEffect(() => {
    if (loaded && widgetRef.current) mounted.current.resolve();
  }, [loaded]);

  useImperativeHandle(
    ref,
    () => ({
      async ensurePayload(form) {
        const existing = new FormData(form).get('altcha');
        if (existing) return String(existing);
        // A submit can come before the widget finished loading: on a slow
        // connection, or when the form was filled without focusing it.
        await loadAltcha();
        setLoaded(true);
        await mounted.current.promise;
        const result = await widgetRef.current?.verify?.();
        return result?.payload ?? '';
      },
      reset() {
        widgetRef.current?.reset?.();
      },
    }),
    [],
  );

  return (
    <div ref={anchorRef}>
      {loaded ? (
        <altcha-widget
          ref={widgetRef}
          challenge={challengeUrl}
          name="altcha"
          auto="onfocus"
          language={language}
        />
      ) : null}
    </div>
  );
});

export default AltchaWidget;
