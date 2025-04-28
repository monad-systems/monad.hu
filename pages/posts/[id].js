import { Container } from 'react-bootstrap';
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';

export default function Post({ postData }) {
  return (
    <Layout>
      <article className="main-content my-2">
        <Container>
          <div className="my-4">
            <div className="py-md-5">
              <h1 className="display-5 fw-bold">{postData.title}</h1>
              <p className="fs-4">{postData.lead}</p>

              <time className="d-block text-end" dateTime={postData.date}>
                {new Intl.DateTimeFormat('en-GB', {
                  dateStyle: 'full',
                  timeZone: 'UTC',
                }).format(new Date(postData.date))}
              </time>
            </div>
          </div>
          <div
            className="p-4 p-md-5 bg-light rounded mb-2 blog-post__content"
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
