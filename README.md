monad.systems website

## Runtime & Tooling Baseline

- Next.js 16 (Pages Router, static export)
- React 19
- ESLint 9 with flat config (`eslint.config.mjs`)
- Node.js current LTS recommended (Node 20+)

## Development

```bash
npm install
npm run dev
```

Set `PORT` in `.env.local` to change the local dev/start port, for example:

```bash
PORT=3010
```

## Quality checks

```bash
npm run lint
npm run build
npm audit --omit=dev
```

`next.config.js` is set to `output: 'export'`, so `npm run build` also produces static output in `out/`.

## Posts authoring

Posts are markdown files in `posts/`.

```yaml
---
title: 'Your post title'
date: '2026-03-19'
lead: 'Short summary'
metaDescription: 'SEO description'
---
```

Notes:

- Mermaid blocks are rendered as figures, and headings like `Visual: ...` become `figcaption` text with the `Visual:` prefix removed.

## Contact form

The homepage contact form submits to a Google Apps Script endpoint and uses reCAPTCHA v3.

The Apps Script must be deployed as a **Web app** with access set to **Anyone** (anonymous). If it's restricted (e.g., "Only myself"), Google will return a 403 "Access required" page.

Because this site is statically hosted, the browser can't reliably read the response from Apps Script unless the endpoint provides CORS headers or you add an external proxy.

Set these env vars in `.env.local` (see `.env.local.example`):

- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- `NEXT_PUBLIC_APPS_SCRIPT_URL`

Then run the app normally.

For GitHub Pages deployment, also set the same values as repository secrets:

- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- `NEXT_PUBLIC_APPS_SCRIPT_URL`

The workflow injects these during `npm run build`, so the static output contains the correct public values.
