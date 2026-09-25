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

## Contact form and analytics

The homepage contact form posts to our own contact endpoint
([`services/contact`](services/contact)), which checks an
[ALTCHA](https://altcha.org) proof of work and forwards the message by email
through Scaleway Transactional Email (EU). There is no Google reCAPTCHA and no
Google Apps Script: no third-party scripts, cookies or requests. The widget
solves a short puzzle in Web Workers while the visitor fills in the form. Page
views are counted with self-hosted, cookieless [Umami](https://umami.is).

Both backends run outside GitHub Pages; how they are deployed, and every
one-time set-up step, is in [`deploy/README.md`](deploy/README.md).

The site reads three public build-time variables (see `.env.local.example`):

- `NEXT_PUBLIC_CONTACT_API_URL`: base URL of the contact endpoint. Unset, the
  form renders as unavailable.
- `NEXT_PUBLIC_UMAMI_SCRIPT_URL` and `NEXT_PUBLIC_UMAMI_WEBSITE_ID`: the
  tracker loads only when both are set, so local and preview builds send
  nothing.

For GitHub Pages, set them as repository **variables** (Settings → Secrets and
variables → Actions → Variables); the deploy workflow passes them to
`npm run build`.

To work on the form locally, run the contact service (see its tests for a
minimal in-process set-up) and set `NEXT_PUBLIC_CONTACT_API_URL` to it in
`.env.local`. Its CORS allow-list must include your dev origin.
