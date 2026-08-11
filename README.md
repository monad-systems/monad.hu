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

Because the site is statically exported, server-level 301 redirects are not available on GitHub Pages.
The deploy workflow rewrites all exported `/en/*.html` pages into canonical redirect pages that immediately
forward to clean English URLs (for example, `/en/posts/slug` -> `/posts/slug`).

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
- English is canonical. `posts/hu/<slug>.md` is optional; a missing translation falls back to the English text with a notice.

### Editing posts for AI writing tells

Every post gets a pass with the `avoid-ai-writing` skill in `.claude/skills/` (MIT, by Conor Bronsdon) before publishing.

```bash
node .claude/skills/avoid-ai-writing/scan.js posts/en/your-post.md
```

The scanner is the mechanical half and only catches vocabulary and formatting.
The tells that actually make long-form posts read as machine-written are structural,
and `SKILL.md` is the checklist for those:

- negation pivots ("It is not X. It is Y.") — one per post, not eighteen
- bold-label paragraph leads (`**Term.** Sentence.`) — use a colon in lists, or lead the sentence with the term
- em dashes in prose — the `- **Term** — description` list form is fine and does not count
- inflated adjectives (`real`, `genuine`, `actual`) on abstract nouns
- inventing specifics during a rewrite — never add a number, name, or claim the draft did not have

The Hungarian translation needs the structural pass too. The word tables and the
function-word entropy signal are English-tuned and will misfire on Hungarian.

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
