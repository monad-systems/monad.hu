import '../styles/tailwind.css';
import '../styles/app.scss';
import Head from 'next/head';
import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'optional',
  variable: '--font-open-sans',
});

function App({ Component, pageProps }) {
  return (
    <div className={openSans.variable}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default App;
