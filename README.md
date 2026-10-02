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

The deploy workflow also runs `scripts/generate-sitemap-and-feed.mjs`, which writes `sitemap.xml` and the
English RSS feed (`feed.xml`) into `out/` from the pages and `posts/` front matter. The public origin
(`https://monad.hu`) lives in `lib/site.js`, which also builds canonical and `hreflang` links, Open Graph
URLs, and JSON-LD structured data; keep the script's copy of the origin in sync with it.

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

## Analytics

Page views are tracked with [Umami](https://umami.is/), which is cookie-free. The script is only
included when `NEXT_PUBLIC_UMAMI_WEBSITE_ID` is set at build time, and it only counts visits on
`monad.hu`, so local builds are never tracked. Set `NEXT_PUBLIC_UMAMI_SCRIPT_URL` as well when
using a self-hosted Umami instance; it defaults to Umami Cloud.

For GitHub Pages deployment, add both as repository secrets (the script URL is optional).

Custom events: `get-in-touch-click`, `review-cta-click` (homepage buttons to the review page), and
`contact-form-sent`.

## Contact form

The homepage contact form uses [ALTCHA](https://altcha.org), a proof-of-work
bot check, instead of Google reCAPTCHA: no third-party scripts, cookies or
requests. The widget solves a short puzzle in Web Workers while the visitor
fills in the form, and the form posts the result together with the message to
the contact endpoint, which issues and verifies the challenges.

The endpoint is not part of this repository. The site only needs its public
base URL at build time:

- `NEXT_PUBLIC_CONTACT_API_URL`: base URL of the contact endpoint, without a
  trailing slash. Unset, the form renders as unavailable and points visitors to
  hello@monad.hu.

For GitHub Pages deployment, add it as a repository secret.
