import '../styles/tailwind.css';
import '../styles/app.scss';
import '@fontsource-variable/inter/index.css';
// The per-subset files (latin-400.css, …) carry no unicode-range, so the
// browser fetched latin-ext first for every mono glyph and latin only after.
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import '../styles/fonts-hu.css';
import Head from 'next/head';
import Script from 'next/script';
import { useEffect } from 'react';

import {
  DEFAULT_LOCALE,
  I18nProvider,
  getLocaleFromPath,
  normalizeLocale,
} from '../lib/i18n';

// Umami analytics loads only when a website ID is configured, so local and
// preview builds stay untracked. Self-hosted instances set their own script URL.
const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
const UMAMI_SCRIPT_URL =
  process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL ||
  'https://cloud.umami.is/script.js';

function App({ Component, pageProps, router }) {
  const localeFromRoute = normalizeLocale(
    router?.query?.locale ||
      getLocaleFromPath(router?.asPath) ||
      DEFAULT_LOCALE,
  );

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = localeFromRoute;
  }, [localeFromRoute]);

  return (
    <I18nProvider locale={localeFromRoute}>
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {UMAMI_WEBSITE_ID ? (
            <link rel="preconnect" href={new URL(UMAMI_SCRIPT_URL).origin} />
          ) : null}
        </Head>
        {UMAMI_WEBSITE_ID ? (
          <Script
            src={UMAMI_SCRIPT_URL}
            data-website-id={UMAMI_WEBSITE_ID}
            data-domains="monad.hu"
            data-performance="true"
            strategy="afterInteractive"
          />
        ) : null}
        <Component {...pageProps} />
      </>
    </I18nProvider>
  );
}

export default App;
