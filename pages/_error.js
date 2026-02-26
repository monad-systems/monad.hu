import Link from 'next/link';

import Layout from '../components/Layout';

function ErrorPage({ statusCode }) {
  const code = Number(statusCode) || 500;
  const is4xx = code >= 400 && code < 500;

  const title = is4xx
    ? 'Request could not be completed'
    : 'Something went wrong';
  const message = is4xx
    ? 'The requested page or resource is unavailable.'
    : 'An unexpected server error occurred. Please try again in a moment.';

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
            <Link href="/" className="btn btn-hero">
              Go to homepage
            </Link>
            <Link href="/#work" className="btn btn-outline">
              View our work
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
