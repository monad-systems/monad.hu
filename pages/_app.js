import '../styles/tailwind.css';
import '../styles/app.scss';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';
import Head from 'next/head';

function App({ Component, pageProps }) {
  return (
    <div style={{ '--font-open-sans': '"Open Sans"' }}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default App;
