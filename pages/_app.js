import '../styles/tailwind.css';
import '../styles/app.scss';
import '@fontsource-variable/inter/index.css';
import '@fontsource/jetbrains-mono/latin-400.css';
import '@fontsource/jetbrains-mono/latin-500.css';
import '@fontsource/jetbrains-mono/latin-ext-400.css';
import '@fontsource/jetbrains-mono/latin-ext-500.css';
import Head from 'next/head';
import Script from 'next/script';
import { useEffect } from 'react';

import {
  DEFAULT_LOCALE,
  I18nProvider,
  getLocaleFromPath,
  normalizeLocale,
} from '../lib/i18n';

// Cookieless, self-hosted analytics (Umami). Rendered only when both are set,
// so local and preview builds send nothing.
const UMAMI_SCRIPT_URL = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL;
const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

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
        </Head>
        {UMAMI_SCRIPT_URL && UMAMI_WEBSITE_ID ? (
          <Script
            src={UMAMI_SCRIPT_URL}
            data-website-id={UMAMI_WEBSITE_ID}
            data-domains="monad.systems"
            data-do-not-track="true"
            strategy="afterInteractive"
          />
        ) : null}
        <Component {...pageProps} />
      </>
    </I18nProvider>
  );
}

export default App;
