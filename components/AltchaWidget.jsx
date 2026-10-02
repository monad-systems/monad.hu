import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

/**
 * ALTCHA proof-of-work bot check. The browser solves a small puzzle issued by
 * our own contact endpoint; no third-party requests, cookies or tracking.
 *
 * The widget adds a hidden `altcha` input to the enclosing form. `ensurePayload()`
 * returns that payload, solving the challenge first if the visitor submitted
 * before it finished.
 */
const AltchaWidget = forwardRef(function AltchaWidget(
  { challengeUrl, language },
  ref,
) {
  const widgetRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    // Custom element registration touches `window`, so it cannot run during
    // static export.
    Promise.all([
      import('altcha'),
      import('altcha/i18n/hu'),
      import('altcha/i18n/en'),
    ]).then(() => {
      if (!cancelled) setLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      async ensurePayload(form) {
        const existing = new FormData(form).get('altcha');
        if (existing) return String(existing);
        const result = await widgetRef.current?.verify?.();
        return result?.payload ?? '';
      },
      reset() {
        widgetRef.current?.reset?.();
      },
    }),
    [],
  );

  if (!loaded) return null;

  return (
    <altcha-widget
      ref={widgetRef}
      challenge={challengeUrl}
      name="altcha"
      auto="onfocus"
      language={language}
    />
  );
});

export default AltchaWidget;
