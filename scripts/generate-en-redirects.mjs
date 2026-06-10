import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const outDir = path.join(process.cwd(), 'out');
const enDir = path.join(outDir, 'en');

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walk(fullPath);
      }
      return fullPath;
    }),
  );
  return files.flat();
};

const toPosix = (value) => value.split(path.sep).join('/');

const toTargetPath = (filePath) => {
  const rel = toPosix(path.relative(enDir, filePath));

  if (rel === 'index.html') {
    return '/';
  }

  if (rel.endsWith('/index.html')) {
    return `/${rel.slice(0, -'/index.html'.length)}/`;
  }

  if (rel.endsWith('.html')) {
    return `/${rel.slice(0, -'.html'.length)}`;
  }

  return '/';
};

const redirectHtml = (target) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Moved Permanently</title>
    <meta http-equiv="refresh" content="0; url=${target}" />
    <link rel="canonical" href="https://monad.hu${target}" />
    <script>
      window.location.replace('${target}');
    </script>
  </head>
  <body>
    <p>Moved permanently to <a href="${target}">${target}</a>.</p>
  </body>
</html>
`;

const main = async () => {
  try {
    const files = await walk(enDir);
    const htmlFiles = files.filter((file) => file.endsWith('.html'));

    await Promise.all(
      htmlFiles.map(async (filePath) => {
        const target = toTargetPath(filePath);
        const html = redirectHtml(target);
        await writeFile(filePath, html, 'utf8');
      }),
    );

    // Keep a top-level /en.html redirect if export generated one.
    const enHtmlPath = path.join(outDir, 'en.html');
    try {
      await readFile(enHtmlPath, 'utf8');
      await writeFile(enHtmlPath, redirectHtml('/'), 'utf8');
    } catch {
      // Optional file; ignore if not present.
    }

    console.log(`Generated ${htmlFiles.length} English redirect pages.`);
  } catch (error) {
    console.error('Failed to generate /en redirects:', error);
    process.exitCode = 1;
  }
};

main();
