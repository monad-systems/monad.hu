import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Layout from '../../../components/Layout';
import { LOCALES, normalizeLocale, useTranslation } from '../../../lib/i18n';
import { getSortedPostsData } from '../../../lib/posts';

const formatDate = (value, locale) => {
  if (!value) return '';
  return new Date(`${value}T00:00:00Z`).toLocaleDateString(
    locale === 'hu' ? 'hu-HU' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    },
  );
};

export default function PostsPage({ allPostsData }) {
  const router = useRouter();
  const { locale, t } = useTranslation();

  useEffect(() => {
    if (!router.isReady || locale !== 'en') return;
    const nextPath = router.asPath.replace(/^\/en(?=\/|$)/, '') || '/';
    if (nextPath !== router.asPath) {
      router.replace(nextPath);
    }
  }, [locale, router]);

  return (
    <Layout>
      <Head>
        <title>Posts | MONAD SYSTEMS</title>
        <meta
          name="description"
          content="Engineering insights on architecture, API design-first delivery, and backend platform development."
        />
      </Head>

      <section className="site-container posts-page">
        <header className="posts-page__header">
          <p className="section-eyebrow">
            {t('posts.listing.eyebrow', 'Insights')}
          </p>
          <h1 className="section-title">{t('posts.listing.title', 'Posts')}</h1>
          <p className="section-lead">
            {t(
              'posts.listing.lead',
              'Technical deep dives on contract-first architecture, engineering workflows, and custom software engineering.',
            )}
          </p>
        </header>

        <div className="posts-list">
          {allPostsData.map((post) => (
            <article key={post.id} className="card posts-list__item">
              {post.date ? (
                <time className="posts-list__date" dateTime={post.date}>
                  {formatDate(post.date, locale)}
                </time>
              ) : null}

              <h2 className="posts-list__title">
                <Link
                  href={
                    locale === 'en'
                      ? `/posts/${post.id}`
                      : `/${locale}/posts/${post.id}`
                  }
                >
                  {post.title}
                </Link>
              </h2>

              {post.lead ? (
                <p className="posts-list__lead">{post.lead}</p>
              ) : null}

              <Link
                className="posts-list__link"
                href={
                  locale === 'en'
                    ? `/posts/${post.id}`
                    : `/${locale}/posts/${post.id}`
                }
              >
                {t('posts.listing.readPost', 'Read post')}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export function getStaticPaths() {
  return {
    paths: LOCALES.map((locale) => ({ params: { locale } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const locale = normalizeLocale(params?.locale);
  const allPostsData = getSortedPostsData(locale);

  return {
    props: {
      locale,
      allPostsData,
    },
  };
}
