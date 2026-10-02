import Document, { Html, Head, Main, NextScript } from 'next/document';

import { getLocaleFromPath, normalizeLocale } from '../lib/i18n';

class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    // Crawlers read the exported HTML, so the lang attribute has to be right
    // before hydration rather than patched in by _app on the client.
    const locale = normalizeLocale(
      ctx.query?.locale || getLocaleFromPath(ctx.asPath),
    );
    return { ...initialProps, locale };
  }

  render() {
    return (
      <Html lang={this.props.locale}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
