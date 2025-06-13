import Head from 'next/head';
import { Container } from 'react-bootstrap';
import Layout from '../../components/Layout';
import { getAllPostIds, getPostData } from '../../lib/posts';

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>
          {postData.title} • MONAD SYSTEMS Lean-Agile software development &
          consulting
        </title>
      </Head>
      <article>
        <div className="py-4 hero bg-dark text-white">
          <Container className="py-md-5">
            <h1 className="display-3 fw-bold text-center mb-4">
              {postData.title}
            </h1>
            <h2 className="fw-normal mb-4 text-center">{postData.lead}</h2>

            <time className="d-block text-end" dateTime={postData.date}>
              {new Intl.DateTimeFormat('en-GB', {
                dateStyle: 'full',
                timeZone: 'UTC',
              }).format(new Date(postData.date))}
            </time>
          </Container>
        </div>
        <Container className="py-4">
          <div
            className="my-4 blog-post__content"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          />
        </Container>
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
