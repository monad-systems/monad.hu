import { existsSync } from 'node:fs';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

// Keep in sync with SITE_URL and getCanonicalPath in lib/site.js.
const SITE_URL = 'https://monad.hu';
const SITE_NAME = 'MONAD SYSTEMS';

const outDir = path.join(process.cwd(), 'out');
const postsDir = path.join(process.cwd(), 'posts');

const STATIC_PAGES = ['/', '/platform-modernization-review', '/posts'];

const toUrl = (basePath, locale) => {
  const cleanBasePath = basePath === '/' ? '' : basePath;
  if (locale === 'hu') {
    return `${SITE_URL}/hu${cleanBasePath}`;
  }
  return `${SITE_URL}${cleanBasePath || '/'}`;
};

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const readPosts = async () => {
  const englishDir = path.join(postsDir, 'en');
  const fileNames = (await readdir(englishDir)).filter((name) =>
    name.endsWith('.md'),
  );

  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const { data } = matter(
        await readFile(path.join(englishDir, fileName), 'utf8'),
      );
      return {
        id,
        title: data.title,
        date: data.date,
        lead: data.lead || data.metaDescription || '',
        tags: Array.isArray(data.tags) ? data.tags : [],
        hasHungarian: existsSync(path.join(postsDir, 'hu', fileName)),
      };
    }),
  );

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
};

const sitemapEntry = ({ basePath, hasHungarian, lastmod }) => {
  const locales = hasHungarian ? ['en', 'hu'] : ['en'];
  const alternates = [
    ...locales.map(
      (locale) =>
        `    <xhtml:link rel="alternate" hreflang="${locale}" href="${toUrl(basePath, locale)}" />`,
    ),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${toUrl(basePath, 'en')}" />`,
  ].join('\n');
  const lastmodTag = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : '';

  return locales
    .map(
      (locale) => `  <url>
    <loc>${toUrl(basePath, locale)}</loc>${lastmodTag}
${alternates}
  </url>`,
    )
    .join('\n');
};

const buildSitemap = (posts) => {
  const entries = [
    ...STATIC_PAGES.map((basePath) =>
      sitemapEntry({ basePath, hasHungarian: true }),
    ),
    ...posts.map((post) =>
      sitemapEntry({
        basePath: `/posts/${post.id}`,
        hasHungarian: post.hasHungarian,
        lastmod: post.date,
      }),
    ),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;
};

const toRfc822 = (date) => new Date(`${date}T00:00:00Z`).toUTCString();

const buildFeed = (posts) => {
  const items = posts
    .map((post) => {
      const url = toUrl(`/posts/${post.id}`, 'en');
      const categories = post.tags
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join('\n');
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>${post.date ? `\n      <pubDate>${toRfc822(post.date)}</pubDate>` : ''}
      <description>${escapeXml(post.lead)}</description>${categories ? `\n${categories}` : ''}
    </item>`;
    })
    .join('\n');

  const lastBuildDate = posts[0]?.date
    ? `\n    <lastBuildDate>${toRfc822(posts[0].date)}</lastBuildDate>`
    : '';

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME} Posts</title>
    <link>${SITE_URL}/posts</link>
    <description>Engineering insights on architecture, API design-first delivery, and backend platform development.</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />${lastBuildDate}
${items}
  </channel>
</rss>
`;
};

const main = async () => {
  try {
    const posts = await readPosts();
    await writeFile(path.join(outDir, 'sitemap.xml'), buildSitemap(posts));
    await writeFile(path.join(outDir, 'feed.xml'), buildFeed(posts));
    console.log(
      `Generated sitemap.xml and feed.xml for ${posts.length} posts.`,
    );
  } catch (error) {
    console.error('Failed to generate sitemap and feed:', error);
    process.exitCode = 1;
  }
};

main();
