import { readFile } from 'node:fs/promises';
import path from 'node:path';

// Tells IndexNow-enabled search engines (Bing and the engines behind ChatGPT
// search and Copilot) which URLs changed. The key is public by design: the
// protocol verifies it by fetching public/<key>.txt from the site itself.
// Keep HOST in sync with SITE_URL in lib/site.js.
const HOST = 'monad.hu';
const ENDPOINT = 'https://api.indexnow.org/indexnow';

const key = process.env.INDEXNOW_KEY;
const dryRun = process.argv.includes('--dry-run');
const outDir = path.join(process.cwd(), 'out');

const main = async () => {
  if (!/^[0-9a-f]{32}$/.test(key ?? '')) {
    throw new Error('INDEXNOW_KEY must be set to the 32-character hex key.');
  }

  // The key file ships from public/, so it must be in the build being pinged.
  const keyFile = (
    await readFile(path.join(outDir, `${key}.txt`), 'utf8')
  ).trim();
  if (keyFile !== key) {
    throw new Error(`out/${key}.txt does not contain the key.`);
  }

  const sitemap = await readFile(path.join(outDir, 'sitemap.xml'), 'utf8');
  const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => match[1],
  );
  const payload = {
    host: HOST,
    key,
    keyLocation: `https://${HOST}/${key}.txt`,
    urlList,
  };

  if (dryRun) {
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(30_000),
  });
  console.log(
    `IndexNow responded HTTP ${response.status} for ${urlList.length} URLs.`,
  );
  if (!response.ok) {
    // 202 means the key is still being validated and counts as ok; anything
    // else is surfaced, but the workflow step does not block the deploy.
    console.error(await response.text());
    process.exitCode = 1;
  }
};

main().catch((error) => {
  console.error('IndexNow ping failed:', error);
  process.exitCode = 1;
});
