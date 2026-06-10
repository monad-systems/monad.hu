import Link from 'next/link';
import { useRouter } from 'next/router';

import Layout from '../components/Layout';
import {
  getLocaleFromPath,
  normalizeLocale,
  useTranslation,
} from '../lib/i18n';

export default function Custom404() {
  const router = useRouter();
  const { t } = useTranslation();
  const locale = normalizeLocale(getLocaleFromPath(router.asPath));

  return (
    <Layout>
      <section className="section">
        <div className="site-container">
          <div className="section-header">
            <div className="section-eyebrow">404</div>
            <h1 className="section-title">
              {t('errors.notFound.title', 'Page not found')}
            </h1>
            <p className="section-lead">
              {t(
                'errors.notFound.message',
                'The page you are looking for does not exist or may have been moved.',
              )}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={locale === 'en' ? '/' : `/${locale}/`}
              className="btn btn-hero"
            >
              {t('errors.notFound.home', 'Go to homepage')}
            </Link>
            <Link
              href={locale === 'en' ? '/#work' : `/${locale}/#work`}
              className="btn btn-outline"
            >
              {t('errors.notFound.work', 'View our work')}
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
