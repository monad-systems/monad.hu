# Contact endpoint

Receives the site's contact form and emails it to us. Two routes:

- `GET /altcha/challenge` issues a signed [ALTCHA](https://altcha.org)
  proof-of-work challenge (20 per minute per address).
- `POST /contact` takes `{ name, email, company?, message, locale?, altcha }`,
  verifies and spends the `altcha` payload, then sends the message through
  Scaleway Transactional Email (5 per ten minutes per address). Answers `200`,
  `400` (validation), `403` (bot check, problem+json), `429`, or `502` (mail
  delivery failed).

The bot check, replay protection and challenge route come from
[`@monad-systems/altcha`](https://github.com/monad-systems/moduledger/tree/main/packages/altcha).
Spent challenges are recorded in Postgres when `DATABASE_URL` is set; without
it they are kept in memory, which is correct only for a single instance.

## Configuration

Every secret can be given as `NAME_FILE` (a path) instead of `NAME`.

| Variable | Required | Meaning |
| --- | --- | --- |
| `ALLOWED_ORIGINS` | yes | Comma-separated CORS allow-list, e.g. `https://monad.systems` |
| `ALTCHA_HMAC_SECRET` | yes | At least 32 characters |
| `SCW_SECRET_KEY`, `SCW_PROJECT_ID` | yes | Scaleway Transactional Email credentials |
| `MAIL_FROM`, `MAIL_TO` | yes | Verified sender on our domain; recipient |
| `SCW_REGION` | no | Default `fr-par` |
| `DATABASE_URL` | no | Postgres for spent challenges |
| `TRUST_CF_CONNECTING_IP` | no | `true` only when reachable solely through a Cloudflare tunnel |
| `PORT`, `HOST` | no | Default `8080`, `0.0.0.0` |

## Development

```bash
NODE_AUTH_TOKEN=<GitHub token with read:packages> npm install
npm test
```

Deployment is described in [`deploy/README.md`](../../deploy/README.md).
