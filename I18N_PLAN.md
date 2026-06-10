# i18n Plan: Hungarian + English with browser-based default

Temporary planning document. Delete once implementation lands.

## Constraints (from current repo)

- Next.js 16, **pages router**, `output: 'export'` in [next.config.js](next.config.js) → static HTML export.
  - Next's built-in `i18n` config is **not supported** with `output: 'export'` (no server to negotiate `Accept-Language`, no runtime redirects).
  - Therefore locale routing must be expressed as **real URL paths** (e.g. `/en/...`, `/hu/...`) and the "auto-detect default" must happen **client-side** on the root route.
- Content lives in two shapes:
  1. Hardcoded JSX strings and data arrays in [pages/index.js](pages/index.js), [pages/platform-modernization-review.js](pages/platform-modernization-review.js), [pages/404.js](pages/404.js), [pages/_error.js](pages/_error.js), [components/Layout.jsx](components/Layout.jsx) (nav, footer, social labels, meta descriptions).
  2. Markdown articles under [posts/](posts/) loaded via [lib/posts.js](lib/posts.js) — currently only English, filenames are language-agnostic.
- [pages/_document.js](pages/_document.js) hard-codes `<Html lang="en">`.
- Site is deployed as static files (CNAME present → GitHub Pages / similar). No middleware, no edge redirects available.

## Target UX

- Canonical locales: `hu` (default for Hungarian browsers), `en` (default for everyone else).
- URL shape (chosen: **prefixed locales, no "default" magic** — predictable for SEO and static hosting):
  - `/en/` … English homepage
  - `/hu/` … Hungarian homepage
  - `/en/platform-modernization-review/`
  - `/hu/platform-modernization-review/`
  - `/en/posts/`, `/en/posts/<slug>/`
  - `/hu/posts/`, `/hu/posts/<slug>/`
- `/` (root) renders a tiny **client-side locale gate** that:
  1. Reads persisted choice from `localStorage` (`monad.locale`) if present.
  2. Else reads `navigator.languages` / `navigator.language`; if any entry starts with `hu` → `hu`, else `en`.
  3. Replaces `location` with `/${locale}/` (uses `router.replace` so back-button is clean).
  4. Renders a no-JS fallback `<noscript>` with two links and an English default, plus a `<link rel="alternate" hreflang="...">` set.
- Manual language switcher in the header (in [components/Layout.jsx](components/Layout.jsx)) that:
  - Swaps the locale segment in the current path (`/en/posts/foo` ↔ `/hu/posts/foo`).
  - Persists the explicit choice to `localStorage` so auto-detect doesn't override next visit.

## Architecture

### 1. Locale constants + dictionary

- New [lib/i18n.js](lib/i18n.js):
  - `export const LOCALES = ['en', 'hu']`
  - `export const DEFAULT_LOCALE = 'en'` (used only as the last-resort fallback; actual default for users comes from browser detection).
  - `detectBrowserLocale()` — pure, takes `navigator` (or an injected array) and returns a supported locale.
  - `getLocaleFromPath(pathname)` — returns `'en' | 'hu' | null`.
  - `swapLocaleInPath(pathname, nextLocale)`.
  - `useLocale()` hook — derives locale from `router.asPath`, exposes `t(key)` and `locale`.
- New [lib/dictionaries/en.js](lib/dictionaries/en.js) and [lib/dictionaries/hu.js](lib/dictionaries/hu.js): nested objects keyed by page/section (e.g. `home.problems[0].title`, `layout.nav.services`, `meta.home.title`, etc.). Keep keys namespaced per page to avoid a monolith.
  - The structured arrays currently inlined in [pages/index.js](pages/index.js) (`problems`, `engagements`, `differentiators`, `principles`, etc.) move into the dictionary as arrays of `{ title, description, tags }`.
  - Keep dictionaries as plain JS (not JSON) so we can share types/shapes trivially; no runtime dependency added.

### 2. Routing strategy (static-export friendly)

Two options considered:

- **A. Folder-duplication (`pages/en/…`, `pages/hu/…`)** — zero Next config changes, fully static, but duplicates route files.
- **B. Dynamic `[locale]` segment (`pages/[locale]/index.js`, `pages/[locale]/posts/[id].js`)** with `getStaticPaths` enumerating `LOCALES`.

**Recommendation: Option B.** Single source of truth per page; `getStaticPaths` emits both locale variants at build time, works with `output: 'export'`.

Resulting file tree after migration:

```
pages/
  index.js                          # root locale gate (client redirect + <noscript> links)
  404.js                            # locale-agnostic; renders English by default with a HU link
  _app.js                           # wraps pages in <I18nProvider>
  _document.js                      # lang attr set per locale via _app injecting to <html> (see §4)
  [locale]/
    index.js                        # was pages/index.js
    platform-modernization-review.js
    posts/
      index.js
      [id].js
```

`getStaticPaths` in every `[locale]/...` page returns `{ params: { locale: 'en' } }` and `{ params: { locale: 'hu' } }` (plus post ids where applicable).

### 3. Blog posts

- Rename existing article: [posts/contract-first-json-schema.md](posts/contract-first-json-schema.md) → `posts/en/contract-first-json-schema.md`.
- Add Hungarian translation: `posts/hu/contract-first-json-schema.md` (same frontmatter keys, translated values). If a translation is missing, fall back to English **with a visible banner** ("This article is not yet available in Hungarian — showing English version.") rather than 404ing.
- Update [lib/posts.js](lib/posts.js):
  - `getSortedPostsData(locale)`, `getAllPostIds()` returns `{ params: { locale, id } }` pairs for every `(locale, slug)` pair, using the English slug as canonical and falling back when a locale-specific file is absent.
  - `getPostData(locale, id)` reads `posts/<locale>/<id>.md`, falling back to `posts/en/<id>.md`.
  - Date formatting in [pages/posts/[id].js](pages/posts/[id].js) currently uses `en-US`; switch to `locale === 'hu' ? 'hu-HU' : 'en-US'`.

### 4. `<html lang>` and `<head>`

- [pages/_document.js](pages/_document.js) cannot read the route at SSG-time per-page, but it can stay as `lang="en"` and be overridden at runtime: in `_app.js`, on mount + on `routeChange`, set `document.documentElement.lang` to the active locale. Static HTML output will still have `lang="en"` initially — acceptable because the locale prefix in the URL makes intent explicit and the attribute is corrected before paint on client hydration.
- Per page, emit:
  - `<title>` and `<meta name="description">` from the dictionary.
  - `<link rel="alternate" hreflang="en" href=".../en/...">`, `hreflang="hu"`, and `hreflang="x-default"` pointing at the English variant.
  - `<meta property="og:locale" content="en_US|hu_HU">`.

### 5. Layout / navigation

- [components/Layout.jsx](components/Layout.jsx):
  - Replace hard-coded strings (`Services`, `Case studies`, nav labels, CTA copy, footer, social `aria-label`s) with `t(...)` lookups.
  - Add a language switcher (two small buttons `EN | HU`, active one highlighted) that:
    - Computes the target URL via `swapLocaleInPath(router.asPath, nextLocale)`.
    - Writes `localStorage.setItem('monad.locale', nextLocale)`.
    - Navigates via `router.push`.
  - `resolveHref('#anchor')` already keys off `router.pathname === '/'` — needs to instead treat `/[locale]` (home) as "home" for anchor-link purposes.

### 6. Root locale gate (`pages/index.js`)

New minimal page:

- Server-rendered HTML contains:
  - `<noscript>` with two plain `<a>` links to `/en/` and `/hu/`, plus a short bilingual blurb.
  - `<link rel="alternate" hreflang="en" ...>` / `hreflang="hu"` / `hreflang="x-default"`.
- Client `useEffect` runs `detectBrowserLocale()` and calls `router.replace('/' + locale + '/')`. Uses `replace` to avoid a dead entry in history.
- No flash of content: render a centered minimal splash (logo + spinner) — same dark background as the rest of the site.

### 7. Error / 404

- [pages/404.js](pages/404.js) and [pages/_error.js](pages/_error.js): bilingual static page (shows both languages stacked, or detects locale from `window.location.pathname` prefix on mount). Simpler to ship both languages in the same page and avoid dynamic 404 routing under static export.

## Task breakdown

Order matters — each step leaves the site in a deployable state.

1. **Scaffold i18n primitives.**
   - Add [lib/i18n.js](lib/i18n.js) with locale constants, `detectBrowserLocale`, `getLocaleFromPath`, `swapLocaleInPath`, `useLocale`, and a React `I18nProvider` + `useTranslation` hook.
   - Add [lib/dictionaries/en.js](lib/dictionaries/en.js) seeded with the current English copy extracted verbatim from existing pages/components.
   - Add [lib/dictionaries/hu.js](lib/dictionaries/hu.js) as a **placeholder identical to `en.js`** (so shape stays in sync) with `// TODO: translate` on every entry. Translation is a follow-up content task.
2. **Wrap `_app.js`** with `<I18nProvider>` that reads locale from the URL (`[locale]` param) and updates `document.documentElement.lang` on route change.
3. **Introduce `[locale]` routing.**
   - Create `pages/[locale]/index.js` by moving the body of [pages/index.js](pages/index.js) and swapping all literal strings/data arrays for dictionary lookups. Add `getStaticPaths` + `getStaticProps` that forward `locale`.
   - Same for `pages/[locale]/platform-modernization-review.js`.
   - Same for `pages/[locale]/posts/index.js` and `pages/[locale]/posts/[id].js`, adjusting `getStaticPaths` to enumerate `locales × postIds`.
4. **Replace [pages/index.js](pages/index.js)** with the root locale gate (redirect + `<noscript>` fallback + `hreflang` tags).
5. **Refactor [components/Layout.jsx](components/Layout.jsx)** to use translations, add the language switcher, and fix `resolveHref` to treat `/[locale]` as home.
6. **Content migration for markdown.**
   - Move [posts/contract-first-json-schema.md](posts/contract-first-json-schema.md) under `posts/en/`.
   - Create `posts/hu/contract-first-json-schema.md` (can start as a machine/human translation — flag as draft if needed).
   - Update [lib/posts.js](lib/posts.js) to accept `locale` and fall back to `en` when a translation is missing; surface a "missing translation" flag to the renderer for the banner.
7. **Localize meta / head tags** per page (titles, descriptions, Open Graph, `hreflang` alternates).
8. **Localize error pages** ([pages/404.js](pages/404.js), [pages/_error.js](pages/_error.js)) — bilingual or locale-prefix aware on mount.
9. **Translate `hu.js` dictionary** and `posts/hu/*.md` properly (content task; split from the structural refactor so PRs stay reviewable).
10. **QA pass**
    - Verify `next build` produces `/en/**` and `/hu/**` under `out/`.
    - Verify `/` contains the no-JS fallback and that with JS, Hungarian browser → `/hu/`, others → `/en/`.
    - Verify switcher preserves path (`/en/posts/x` → `/hu/posts/x`), persists preference, and that returning to `/` honors it.
    - Verify `<html lang>` flips on client hydration per locale.
    - Run `npm run lint` and `npm run build` clean.
11. **Remove this file** once the work lands.

## Open questions to confirm before coding

1. **Default for unknown browsers:** English confirmed? (monad.hu domain suggests HU bias, but global audience + content currently in English → stick with English.)
2. **Slug policy for posts:** keep English slugs for both locales (simpler, SEO-OK with `hreflang`) or localize slugs (`/hu/posts/miert-nyer-a-spec-first/`)? Recommendation: **keep English slugs** for now; localize later if needed.
3. **Do we want to ship the structural refactor before the Hungarian translations are ready?** Recommended yes — merge `hu.js` as a copy of `en.js` behind a feature flag or simply as "English text labeled as HU" so the routing work can land independently of translation work.
4. **SEO canonical:** add `<link rel="canonical">` per-locale page + `hreflang` alternates? Recommended yes (cheap, high value).
