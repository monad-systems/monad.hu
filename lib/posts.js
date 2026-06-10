import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

import { LOCALES, normalizeLocale } from './i18n';

const postsDirectory = path.join(process.cwd(), 'posts');

const getLocaleDirectory = (locale) =>
  path.join(postsDirectory, normalizeLocale(locale));

const readMarkdownFileIfExists = (fullPath) => {
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  return fs.readFileSync(fullPath, 'utf8');
};

const getCanonicalPostIds = () => {
  const englishDirectory = getLocaleDirectory('en');
  if (!fs.existsSync(englishDirectory)) {
    return [];
  }

  return fs
    .readdirSync(englishDirectory)
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
};

export function getSortedPostsData(locale = 'en') {
  const requestedLocale = normalizeLocale(locale);
  const postIds = getCanonicalPostIds();

  const allPostsData = postIds.map((id) => {
    const localizedPath = path.join(
      getLocaleDirectory(requestedLocale),
      `${id}.md`,
    );
    const fallbackPath = path.join(getLocaleDirectory('en'), `${id}.md`);

    const localizedContents = readMarkdownFileIfExists(localizedPath);
    const englishContents = readMarkdownFileIfExists(fallbackPath);
    const fileContents = localizedContents || englishContents || '';
    const matterResult = matter(fileContents);

    return {
      id,
      isFallbackLocale: !localizedContents,
      ...matterResult.data,
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const postIds = getCanonicalPostIds();
  return LOCALES.flatMap((locale) =>
    postIds.map((id) => ({
      params: {
        locale,
        id,
      },
    })),
  );
}

export async function getPostData(locale, id) {
  const requestedLocale = normalizeLocale(locale);
  const localizedPath = path.join(
    getLocaleDirectory(requestedLocale),
    `${id}.md`,
  );
  const fallbackPath = path.join(getLocaleDirectory('en'), `${id}.md`);

  const localizedContents = readMarkdownFileIfExists(localizedPath);
  const englishContents = readMarkdownFileIfExists(fallbackPath);

  if (!localizedContents && !englishContents) {
    throw new Error(`Missing post content for id: ${id}`);
  }

  const fileContents = localizedContents || englishContents;

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    locale: requestedLocale,
    isFallbackLocale: !localizedContents,
    contentHtml,
    ...matterResult.data,
  };
}
