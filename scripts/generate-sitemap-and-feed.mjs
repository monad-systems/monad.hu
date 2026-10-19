import { existsSync } from 'node:fs';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

// Keep in sync with SITE_URL and getCanonicalPath in lib/site.js.
const SITE_URL = 'https://monad.hu';
const SITE_NAME = 'MONAD SYSTEMS';

const outDir = path.join(process.cwd(), 'out');
const postsDir = path.join(process.cwd(), 'posts');

const STATIC_PAGES = [
  '/',
  '/platform-modernization-review',
  '/posts',
  '/privacy',
];
// Pages generated only under /hu, with no English version.
const HUNGARIAN_ONLY_PAGES = ['/helyi-automatizalas'];

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
      const huPath = path.join(postsDir, 'hu', fileName);
      const hasHungarian = existsSync(huPath);
      const huData = hasHungarian
        ? matter(await readFile(huPath, 'utf8')).data
        : null;
      return {
        id,
        title: data.title,
        date: data.date,
        lead: data.lead || data.metaDescription || '',
        // The post page's meta description: metaDescription, then lead.
        metaDescription: data.metaDescription || data.lead || '',
        tags: Array.isArray(data.tags) ? data.tags : [],
        hasHungarian,
        hu: huData && {
          title: huData.title,
          metaDescription: huData.metaDescription || huData.lead || '',
        },
      };
    }),
  );

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
};

const sitemapEntry = ({ basePath, locales, lastmod }) => {
  // A Hungarian-only page has no English counterpart to point x-default at.
  const alternates = locales.includes('en')
    ? [
        ...locales.map(
          (locale) =>
            `\n    <xhtml:link rel="alternate" hreflang="${locale}" href="${toUrl(basePath, locale)}" />`,
        ),
        `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${toUrl(basePath, 'en')}" />`,
      ].join('')
    : '';
  const lastmodTag = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : '';

  return locales
    .map(
      (locale) => `  <url>
    <loc>${toUrl(basePath, locale)}</loc>${lastmodTag}${alternates}
  </url>`,
    )
    .join('\n');
};

const buildSitemap = (posts) => {
  const entries = [
    ...STATIC_PAGES.map((basePath) =>
      sitemapEntry({ basePath, locales: ['en', 'hu'] }),
    ),
    ...HUNGARIAN_ONLY_PAGES.map((basePath) =>
      sitemapEntry({ basePath, locales: ['hu'] }),
    ),
    ...posts.map((post) =>
      sitemapEntry({
        basePath: `/posts/${post.id}`,
        locales: post.hasHungarian ? ['en', 'hu'] : ['en'],
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

const decodeHtml = (value) =>
  value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16)),
    )
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

// Page titles and descriptions are read back from the exported HTML, so
// llms.txt repeats exactly what each page already publishes.
const readPageMeta = async (basePath, locale) => {
  const cleanBasePath = basePath === '/' ? '' : basePath;
  const filePath = path.join(
    outDir,
    locale === 'hu'
      ? `hu${cleanBasePath}.html`
      : `${cleanBasePath || '/index'}.html`,
  );
  const html = await readFile(filePath, 'utf8');
  const title = html.match(/<title[^>]*>([^<]*)<\/title>/)?.[1];
  const description = html.match(
    /<meta name="description" content="([^"]*)"/,
  )?.[1];
  if (!title || !description) {
    throw new Error(`Missing <title> or meta description in ${filePath}`);
  }
  return { title: decodeHtml(title), description: decodeHtml(description) };
};

const llmsLink = ({ title, url, description }) =>
  `- [${title}](${url}): ${description}`;

const buildLlmsTxt = async (posts) => {
  const englishPages = await Promise.all(
    STATIC_PAGES.map(async (basePath) => ({
      ...(await readPageMeta(basePath, 'en')),
      url: toUrl(basePath, 'en'),
    })),
  );
  const hungarianPages = await Promise.all(
    [...STATIC_PAGES, ...HUNGARIAN_ONLY_PAGES].map(async (basePath) => ({
      ...(await readPageMeta(basePath, 'hu')),
      url: toUrl(basePath, 'hu'),
    })),
  );
  const englishPosts = posts.map((post) => ({
    title: post.title,
    description: post.metaDescription,
    url: toUrl(`/posts/${post.id}`, 'en'),
  }));
  const hungarianPosts = posts
    .filter((post) => post.hasHungarian)
    .map((post) => ({
      title: post.hu.title,
      description: post.hu.metaDescription,
      url: toUrl(`/posts/${post.id}`, 'hu'),
    }));

  // The summary is the English homepage's meta description.
  return `# ${SITE_NAME}

> ${englishPages[0].description}

## Pages

${englishPages.map(llmsLink).join('\n')}

## Posts

${englishPosts.map(llmsLink).join('\n')}

## Magyarul

${[...hungarianPages, ...hungarianPosts].map(llmsLink).join('\n')}
`;
};

const main = async () => {
  try {
    const posts = await readPosts();
    await writeFile(path.join(outDir, 'sitemap.xml'), buildSitemap(posts));
    await writeFile(path.join(outDir, 'feed.xml'), buildFeed(posts));
    await writeFile(path.join(outDir, 'llms.txt'), await buildLlmsTxt(posts));
    console.log(
      `Generated sitemap.xml, feed.xml and llms.txt for ${posts.length} posts.`,
    );
  } catch (error) {
    console.error('Failed to generate sitemap and feed:', error);
    process.exitCode = 1;
  }
};

main();
