# Site backend: contact endpoint and analytics

The site itself stays a static export on GitHub Pages. Two things need a
server, and both run here, on one small VM in Scaleway `fr-par`:

| Service | Public hostname (suggested) | What it does |
| --- | --- | --- |
| `contact` ([`services/contact`](../services/contact)) | `contact-prod.monad.systems` | Issues ALTCHA challenges, verifies the contact form's proof of work, forwards the message by email through Scaleway Transactional Email. |
| `umami` | `umami-prod.monad.systems` | Cookieless, self-hosted page analytics. |
| `postgres` | — | One database per consumer: `umami`, and `contact` for spent ALTCHA challenges. |
| `cloudflared` | — | Outbound tunnel to Cloudflare. No port is published on the VM. |

The hostnames follow infra ADR-0004 (`<app>-<env>.monad.systems`, tunnel
routes rather than A records). They are suggestions; the only places that
name them are the tunnel's routes and the site's build variables.

Nothing here sends visitor data outside the EU or to a third party. It
replaces Google reCAPTCHA (Google scripts and cookies on every page view) and
the Google Apps Script endpoint (form contents processed by Google).

## One-time set-up

### 1. Scaleway Transactional Email

1. In the project that will run this, add the sending domain `monad.systems` to
   Transactional Email in `fr-par`, publish the SPF, DKIM and DMARC records it
   gives you, and wait for it to verify.
2. Create an IAM application for sending only, with an API key. Its secret
   key becomes `scw_tem_secret_key`; the project id goes in `.env` as
   `SCW_PROJECT_ID`.

The visitor's address is set as `Reply-To`, never `From`: mail is only ever sent
from the verified domain.

### 2. The VM

A small instance (the smallest shared-vCPU type is enough) with Docker and
the compose plugin. Its security group drops all inbound traffic except SSH
from your own addresses: Cloudflare reaches the services through the tunnel,
not through a port.

Copy this directory to the VM, then log Docker in to GHCR with a token that
has `read:packages`, since the contact image is private.

### 3. Cloudflare tunnel

Create a tunnel and add two public hostnames to it:

- `contact-prod.monad.systems` → `http://contact:8080`
- `umami-prod.monad.systems` → `http://umami:3000`

Put a Cloudflare Access application on `umami-prod.monad.systems` for the
dashboard. Add a **Bypass** policy for the two paths browsers must reach
anonymously: `/script.js` and `/api/send`. Leave `contact-prod` without
Access; it is a public endpoint by design and protects itself (ALTCHA, CORS
allow-list, per-address rate limits).

### 4. Secrets

Secrets are files in `SECRETS_DIR` (default `/run/monad-systems/secrets`),
owned by root, mode `0400`, following infra ADR-0003. Until that ADR's
Secret Manager fetcher exists for this app, place them by hand. `/run` is
tmpfs, so they are gone after a reboot. Either restore them after each
reboot, or point `SECRETS_DIR` at a root-only directory on disk and accept
the weaker posture ADR-0003 describes.

| File | Content |
| --- | --- |
| `postgres_password` | `openssl rand -hex 32` |
| `umami_db_password` | `openssl rand -hex 32` |
| `contact_db_password` | `openssl rand -hex 32` |
| `contact_database_url` | `postgresql://contact:<contact_db_password>@postgres:5432/contact` |
| `altcha_hmac_secret` | `openssl rand -hex 32` (at least 32 characters) |
| `scw_tem_secret_key` | the sending application's secret key |
| `umami.env` | `DATABASE_URL=postgresql://umami:<umami_db_password>@postgres:5432/umami` and `APP_SECRET=<openssl rand -hex 32>` |
| `cloudflared.env` | `TUNNEL_TOKEN=<token from the tunnel's install command>` |

Umami and cloudflared read only environment variables, so they get env files
from the same tmpfs directory: ADR-0003's accepted fallback. The contact
service and Postgres take real file secrets (`*_FILE`).

The database passwords are applied by `initdb/10-databases.sh` the first time
Postgres starts on an empty volume, and only then.

### 5. Start

```bash
cp .env.example .env   # set CONTACT_IMAGE_TAG and SCW_PROJECT_ID
docker compose up -d
docker compose ps      # contact should report healthy
curl -s https://contact-prod.monad.systems/healthz
```

### 6. Umami

Sign in through Access. **Change the default `admin` / `umami` password
first.** Then add the website `monad.systems` and copy its website id.

### 7. The site

Set these as repository **variables** (not secrets; they end up in the
public HTML anyway) in GitHub → Settings → Secrets and variables → Actions →
Variables:

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_CONTACT_API_URL` | `https://contact-prod.monad.systems` |
| `NEXT_PUBLIC_UMAMI_SCRIPT_URL` | `https://umami-prod.monad.systems/script.js` |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | the id from step 6 |

Then delete the old `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` and
`NEXT_PUBLIC_APPS_SCRIPT_URL` secrets, and retire the reCAPTCHA key and the
Apps Script deployment.

## The contact image and its private dependency

`services/contact` depends on `@monad-systems/altcha`, published from
moduLedger to GitHub Packages. Two things have to be true before the
**Contact service** workflow can pass:

1. The package's settings grant this repository read access (package →
   *Manage Actions access*), so `GITHUB_TOKEN` can install it.
2. `services/contact/package-lock.json` is committed. It can only be
   generated once `@monad-systems/altcha@0.1.0` is published: run
   `NODE_AUTH_TOKEN=<token with read:packages> npm install` in
   `services/contact` and commit the lockfile.

Each push to `main` that touches `services/contact` publishes
`ghcr.io/monad-systems/monad-systems-contact:sha-<commit>`; deploy by setting
`CONTACT_IMAGE_TAG` and running `docker compose up -d`.

## Operations

- **Backups:** only Umami's data is worth keeping. `contact` holds nothing but
  spent-challenge ids, which expire after ten minutes. A nightly
  `docker compose exec -T postgres pg_dump -U postgres umami | gzip` to Object
  Storage is enough.
- **Rotating the ALTCHA secret:** replace the file and
  `docker compose up -d contact`. Challenges issued in the previous ten
  minutes stop verifying, so a visitor mid-form may have to submit twice.
- **Privacy notice:** say that the site counts page views with self-hosted
  Umami (no cookies, no cross-site tracking, IP addresses not stored) and that
  the contact form's content is emailed to us through Scaleway (EU).
