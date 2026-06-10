import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import Layout from '../../../components/Layout';
import { normalizeLocale, useTranslation } from '../../../lib/i18n';
import { getAllPostIds, getPostData } from '../../../lib/posts';

let mermaidRenderCounter = 0;

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

const getMetaDescription = (postData) => {
  return (
    postData.metaDescription ||
    postData.lead ||
    'Technical article from MONAD SYSTEMS.'
  );
};

const normalizeMermaidSource = (source) => {
  if (!source) {
    return source;
  }

  // Prefer top-down flowcharts in posts for better readability on narrower screens.
  return source.replace(
    /^\s*(flowchart|graph)\s+(LR|RL)\b/im,
    (_, keyword) => `${keyword} TD`,
  );
};

const getDiagramCaption = (preBlock) => {
  const heading = preBlock.previousElementSibling;
  if (!heading || !/^H[1-6]$/.test(heading.tagName)) {
    return null;
  }

  const raw = (heading.textContent || '').trim();
  if (!raw) {
    return null;
  }

  const isVisualHeading = /^visual:\s*/i.test(raw);
  const text = raw.replace(/^visual:\s*/i, '').trim() || raw;

  return {
    heading,
    text,
    isVisualHeading,
  };
};

export default function PostPage({ postData }) {
  const router = useRouter();
  const { locale, t } = useTranslation();
  const contentRef = useRef(null);
  const postTags = Array.isArray(postData.tags)
    ? postData.tags
        .map((tag) => String(tag).trim())
        .filter((tag) => tag.length > 0)
    : [];

  useEffect(() => {
    if (!router.isReady || locale !== 'en') return;
    const nextPath = router.asPath.replace(/^\/en(?=\/|$)/, '') || '/';
    if (nextPath !== router.asPath) {
      router.replace(nextPath);
    }
  }, [locale, router]);

  useEffect(() => {
    let isCanceled = false;

    const renderMermaid = async () => {
      const root = contentRef.current;
      if (!root) return;

      const mermaidCodeBlocks = root.querySelectorAll(
        'pre > code.language-mermaid',
      );
      if (!mermaidCodeBlocks.length) return;

      const mermaidModule = await import('mermaid');
      if (isCanceled) return;

      const mermaid = mermaidModule.default;
      mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        themeVariables: {
          darkMode: true,
          background: '#111827',
          textColor: '#E8EEF8',
          primaryColor: '#40E0D0',
          primaryTextColor: '#0F172A',
          primaryBorderColor: '#2FB8AA',
          secondaryColor: '#1E293B',
          secondaryTextColor: '#E8EEF8',
          tertiaryColor: '#162132',
          lineColor: '#7AB8C7',
          clusterBkg: '#0E1827',
          clusterBorder: '#2A3E58',
          edgeLabelBackground: '#0E1827',
        },
        suppressErrorRendering: false,
      });

      const tasks = Array.from(mermaidCodeBlocks).map(async (codeBlock) => {
        const preBlock = codeBlock.parentElement;
        if (!preBlock || preBlock.dataset.mermaidReplaced === 'true') {
          return;
        }

        const source = normalizeMermaidSource(
          (codeBlock.textContent || '').trim(),
        );
        if (!source) {
          return;
        }

        const caption = getDiagramCaption(preBlock);

        const mermaidContainer = document.createElement('div');
        mermaidContainer.className = 'mermaid';

        try {
          mermaidRenderCounter += 1;
          const renderId = `mermaid-${postData.id}-${mermaidRenderCounter}`;
          const { svg } = await mermaid.render(renderId, source);
          if (isCanceled) {
            return;
          }

          mermaidContainer.innerHTML = svg;
          const figure = document.createElement('figure');
          figure.className = 'diagram-figure';
          figure.appendChild(mermaidContainer);

          if (caption?.text) {
            const figcaption = document.createElement('figcaption');
            figcaption.className = 'diagram-figure__caption';
            figcaption.textContent = caption.text;
            figure.appendChild(figcaption);
          }

          preBlock.dataset.mermaidReplaced = 'true';
          preBlock.replaceWith(figure);

          if (caption?.isVisualHeading && caption.heading.isConnected) {
            caption.heading.remove();
          }
        } catch {
          // Keep original code block visible when a diagram definition is invalid.
        }
      });

      await Promise.all(tasks);
    };

    renderMermaid().catch(() => {});

    return () => {
      isCanceled = true;
    };
  }, [postData.id]);

  const metaDescription = getMetaDescription(postData);

  return (
    <Layout>
      <Head>
        <title>{`${postData.title} | MONAD SYSTEMS`}</title>
        <meta name="description" content={metaDescription} />
        <meta
          property="og:title"
          content={`${postData.title} | MONAD SYSTEMS`}
        />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
      </Head>

      <article className="site-container blog-post">
        <div className="blog-post__meta">
          <Link
            href={locale === 'en' ? '/posts' : `/${locale}/posts`}
            className="blog-post__back-link"
          >
            {t('posts.detail.allPosts', 'All posts')}
          </Link>

          {postData.date ? (
            <time dateTime={postData.date}>
              {formatDate(postData.date, locale)}
            </time>
          ) : null}
        </div>

        {postData.isFallbackLocale ? (
          <p className="section-lead" role="status">
            {t(
              'posts.detail.fallbackNotice',
              'This article is not yet available in this language. Showing English version.',
            )}
          </p>
        ) : null}

        <h1 className="blog-post__title">{postData.title}</h1>

        {postData.lead ? (
          <p className="blog-post__lead">{postData.lead}</p>
        ) : null}

        {postTags.length ? (
          <ul
            className="blog-post__tags"
            aria-label={t('posts.detail.postTopics', 'Post topics')}
          >
            {postTags.map((tag) => (
              <li key={tag} className="blog-post__tag">
                {tag}
              </li>
            ))}
          </ul>
        ) : null}

        <div
          ref={contentRef}
          className="blog-post__content"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: getAllPostIds(),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const locale = normalizeLocale(params?.locale);
  const postData = await getPostData(locale, params.id);
  return {
    props: {
      postData,
    },
  };
}
