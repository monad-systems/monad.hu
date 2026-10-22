// Hungarian needs only four letters outside the Latin-1 range (ő ű Ő Ű), but
// the fontsource latin-ext files that carry them weigh ~100 KB, and a single
// "Gödöllő" in the footer made every page download them. This writes tiny
// fonts holding just those letters to styles/fonts/; styles/fonts-hu.css
// declares them after the fontsource faces, so the browser checks them first
// for these code points.
//
// Re-run after upgrading @fontsource-variable/inter or @fontsource/jetbrains-mono.
// Needs fonttools with brotli: `pip install fonttools brotli`.
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const UNICODES = 'U+0150-0151,U+0170-0171';

const fonts = [
  ['@fontsource-variable/inter/files/inter-latin-ext-wght-normal.woff2', 'inter-hu-wght-normal.woff2'],
  ['@fontsource/jetbrains-mono/files/jetbrains-mono-latin-ext-400-normal.woff2', 'jetbrains-mono-hu-400-normal.woff2'],
  ['@fontsource/jetbrains-mono/files/jetbrains-mono-latin-ext-500-normal.woff2', 'jetbrains-mono-hu-500-normal.woff2'],
];

const root = process.cwd();

for (const [source, target] of fonts) {
  const output = path.join(root, 'styles', 'fonts', target);
  execFileSync(
    'pyftsubset',
    [
      path.join(root, 'node_modules', source),
      `--unicodes=${UNICODES}`,
      '--layout-features=*',
      '--flavor=woff2',
      `--output-file=${output}`,
    ],
    { stdio: 'inherit' },
  );
  console.log(`wrote ${path.relative(root, output)}`);
}
