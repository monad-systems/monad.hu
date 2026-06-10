import Link from 'next/link';
import { useRouter } from 'next/router';

import Layout from '../components/Layout';
import {
  getLocaleFromPath,
  normalizeLocale,
  useTranslation,
} from '../lib/i18n';

function ErrorPage({ statusCode }) {
  const router = useRouter();
  const { t } = useTranslation();
  const locale = normalizeLocale(getLocaleFromPath(router.asPath));

  const code = Number(statusCode) || 500;
  const is4xx = code >= 400 && code < 500;

  const title = is4xx
    ? t('errors.generic.requestFailed', 'Request could not be completed')
    : t('errors.generic.serverError', 'Something went wrong');
  const message = is4xx
    ? t(
        'errors.generic.requestMessage',
        'The requested page or resource is unavailable.',
      )
    : t(
        'errors.generic.serverMessage',
        'An unexpected server error occurred. Please try again in a moment.',
      );

  return (
    <Layout>
      <section className="section">
        <div className="site-container">
          <div className="section-header">
            <div className="section-eyebrow">{code}</div>
            <h1 className="section-title">{title}</h1>
            <p className="section-lead">{message}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={locale === 'en' ? '/' : `/${locale}/`}
              className="btn btn-hero"
            >
              {t('errors.generic.home', 'Go to homepage')}
            </Link>
            <Link
              href={locale === 'en' ? '/#work' : `/${locale}/#work`}
              className="btn btn-outline"
            >
              {t('errors.generic.work', 'View our work')}
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 404;
  return { statusCode };
};

export default ErrorPage;
