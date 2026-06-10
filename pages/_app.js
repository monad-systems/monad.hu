import '../styles/tailwind.css';
import '../styles/app.scss';
import '@fontsource/open-sans/latin-400.css';
import '@fontsource/open-sans/latin-600.css';
import '@fontsource/open-sans/latin-700.css';
import '@fontsource/open-sans/latin-ext-400.css';
import '@fontsource/open-sans/latin-ext-600.css';
import '@fontsource/open-sans/latin-ext-700.css';
import Head from 'next/head';
import { useEffect } from 'react';

import {
  DEFAULT_LOCALE,
  I18nProvider,
  getLocaleFromPath,
  normalizeLocale,
} from '../lib/i18n';

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
      <div style={{ '--font-open-sans': '"Open Sans"' }}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </div>
    </I18nProvider>
  );
}

export default App;
