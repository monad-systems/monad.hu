import Head from 'next/head';
import Layout from '../../components/Layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Link from 'next/link';

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <Link href="/">Back to Home</Link>
      <article div className="mt-2 mb-4 blog-post">
        <div className="py-md-5">
          <h1 className="display-5 fw-bold">{postData.title}</h1>
          <p className="fs-4">{postData.lead}</p>
        </div>
        <div
          className="blog-post__content"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
