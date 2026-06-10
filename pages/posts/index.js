import Head from 'next/head';
import Link from 'next/link';

import Layout from '../../components/Layout';
import { getSortedPostsData } from '../../lib/posts';

const formatDate = (value) => {
  if (!value) return '';
  return new Date(`${value}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
};

export default function PostsPage({ allPostsData }) {
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
          <p className="section-eyebrow">Insights</p>
          <h1 className="section-title">Posts</h1>
          <p className="section-lead">
            Technical deep dives on contract-first architecture, engineering
            workflows, and custom software engineering.
          </p>
        </header>

        <div className="posts-list">
          {allPostsData.map((post) => (
            <article key={post.id} className="card posts-list__item">
              {post.date ? (
                <time className="posts-list__date" dateTime={post.date}>
                  {formatDate(post.date)}
                </time>
              ) : null}

              <h2 className="posts-list__title">
                <Link href={`/posts/${post.id}`}>{post.title}</Link>
              </h2>

              {post.lead ? (
                <p className="posts-list__lead">{post.lead}</p>
              ) : null}

              <Link className="posts-list__link" href={`/posts/${post.id}`}>
                Read post
              </Link>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export function getStaticProps() {
  const allPostsData = getSortedPostsData('en');

  return {
    props: {
      allPostsData,
    },
  };
}
