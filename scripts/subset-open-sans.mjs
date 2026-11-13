// Open Sans is the site's one webfont (MONAD Design System, Nov 2026). This
// writes the four weights the site uses to styles/fonts/, subset to what an
// English and Hungarian page needs: Latin-1, ő ű Ő Ű, and common punctuation,
// arrows and symbols. About 20 KB a weight, so no latin-ext file is ever
// fetched for a single „ő”. styles/fonts.css declares them.
//
// Source: the static Open Sans 3.003 TTFs in @expo-google-fonts/open-sans, the
// same files the MONAD print kit embeds, so screen and PDF share one face.
// Re-run after upgrading that package. Needs fonttools with brotli:
// `pip install fonttools brotli`.
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const UNICODES = [
  'U+0000-00FF', // Latin-1
  'U+0131', // dotless i
  'U+0150-0153', // Ő ő Œ œ
  'U+0170-0171', // Ű ű
  'U+02BB-02BC,U+02C6,U+02DA,U+02DC', // modifier letters, accents
  'U+2000-206F', // general punctuation: dashes, quotes „ ” ‘ ’, ellipsis
  'U+20AC,U+2122,U+2190-2193,U+2212,U+2215,U+FEFF,U+FFFD',
].join(',');

const weights = [
  ['400Regular', 'OpenSans-Regular.woff2'],
  ['500Medium', 'OpenSans-Medium.woff2'],
  ['600SemiBold', 'OpenSans-SemiBold.woff2'],
  ['700Bold', 'OpenSans-Bold.woff2'],
];

const root = process.cwd();

for (const [weight, target] of weights) {
  const source = path.join(
    root,
    'node_modules',
    '@expo-google-fonts',
    'open-sans',
    weight,
    `OpenSans_${weight}.ttf`,
  );
  const output = path.join(root, 'styles', 'fonts', target);
  execFileSync(
    'pyftsubset',
    [
      source,
      `--unicodes=${UNICODES}`,
      '--layout-features=*',
      '--flavor=woff2',
      `--output-file=${output}`,
    ],
    { stdio: 'inherit' },
  );
  console.log(`wrote ${path.relative(root, output)}`);
}
