// Writes a WebP next to every post cover in public/images/posts/. The JPEGs
// stay as the Open Graph images and the <picture> fallback; the WebP is about
// a fifth of the size and is what browsers actually download.
//
// Run after adding or replacing a cover: `node scripts/generate-cover-webp.mjs`.
// sharp ships with Next; install it with `npm i --no-save sharp` if missing.
import { readdir } from 'node:fs/promises';
import path from 'node:path';

import sharp from 'sharp';

const coverDir = path.join(process.cwd(), 'public', 'images', 'posts');

const covers = (await readdir(coverDir)).filter((name) =>
  /\.(jpe?g|png)$/i.test(name),
);

for (const name of covers) {
  const source = path.join(coverDir, name);
  const target = source.replace(/\.(jpe?g|png)$/i, '.webp');
  const { size } = await sharp(source).webp({ quality: 78 }).toFile(target);
  console.log(`wrote ${path.relative(process.cwd(), target)} (${Math.round(size / 1024)} KB)`);
}
