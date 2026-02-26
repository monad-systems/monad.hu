monad.systems website

## Development

```bash
npm install
npm run dev
```

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
