import Link from 'next/link';

import Layout from '../components/Layout';

export default function Custom404() {
  return (
    <Layout>
      <section className="section">
        <div className="site-container">
          <div className="section-header">
            <div className="section-eyebrow">404</div>
            <h1 className="section-title">Page not found</h1>
            <p className="section-lead">
              The page you are looking for does not exist or may have been
              moved.
            </p>
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
