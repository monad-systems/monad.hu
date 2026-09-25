import assert from 'node:assert/strict';
import { afterEach, describe, it } from 'node:test';
import { createAltcha, createMemoryReplayStore } from '@monad-systems/altcha';
import { solveChallenge } from 'altcha-lib';
import { deriveKey } from 'altcha-lib/algorithms/pbkdf2';
import { buildApp } from '../src/app.js';
import { createScalewayMailer } from '../src/mail.js';

const ORIGIN = 'https://monad.systems';

const config = {
  allowedOrigins: [ORIGIN],
  trustCfConnectingIp: true,
};

const setup = async ({ fail = false } = {}) => {
  const sent = [];
  const mailer = {
    async sendContactMessage(message) {
      if (fail) throw new Error('mail down');
      sent.push(message);
    },
  };
  const altcha = createAltcha({
    hmacSecret: 'test-secret-that-is-at-least-32-characters',
    store: createMemoryReplayStore(),
    // Tiny work factor: the tests exercise the protocol, not the cost.
    cost: 10,
    counter: { min: 1, max: 20 },
  });
  const app = await buildApp({ config, altcha, mailer, logger: false });
  return { app, sent };
};

const solvedPayload = async (app, ip = '203.0.113.1') => {
  const res = await app.inject({
    method: 'GET',
    url: '/altcha/challenge',
    headers: { 'cf-connecting-ip': ip },
  });
  assert.equal(res.statusCode, 200);
  const challenge = res.json();
  const solution = await solveChallenge({ challenge, deriveKey });
  return Buffer.from(JSON.stringify({ challenge, solution })).toString('base64');
};

const message = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  company: 'Analytical Engines',
  message: 'We need a platform review.',
  locale: 'en',
};

const post = (app, body, ip = '203.0.113.1') =>
  app.inject({
    method: 'POST',
    url: '/contact',
    headers: { origin: ORIGIN, 'cf-connecting-ip': ip },
    payload: body,
  });

let app;
afterEach(async () => {
  await app?.close();
});

describe('POST /contact', () => {
  it('forwards a message carrying a solved challenge, exactly once', async () => {
    const ctx = await setup();
    app = ctx.app;
    const altcha = await solvedPayload(app);

    const first = await post(app, { ...message, altcha });
    assert.equal(first.statusCode, 200);
    assert.deepEqual(first.json(), { ok: true });
    assert.equal(first.headers['access-control-allow-origin'], ORIGIN);
    assert.deepEqual(ctx.sent, [message]);

    const replay = await post(app, { ...message, altcha });
    assert.equal(replay.statusCode, 403);
    assert.equal(replay.json().code, 'ALTCHA_REPLAYED');
    assert.equal(ctx.sent.length, 1);
  });

  it('rejects a message without a bot check', async () => {
    ({ app } = await setup());
    const res = await post(app, { ...message, altcha: 'nope' });
    assert.equal(res.statusCode, 403);
  });

  it('rejects header injection in single-line fields before spending the challenge', async () => {
    ({ app } = await setup());
    const altcha = await solvedPayload(app);
    const bad = await post(app, { ...message, name: 'Eve\r\nBcc: x@example.com', altcha });
    assert.equal(bad.statusCode, 400);
    // Validation runs before the preHandler, so the payload is still unspent.
    const good = await post(app, { ...message, altcha });
    assert.equal(good.statusCode, 200);
  });

  it('answers 502 when mail delivery fails', async () => {
    ({ app } = await setup({ fail: true }));
    const res = await post(app, { ...message, altcha: await solvedPayload(app) });
    assert.equal(res.statusCode, 502);
  });

  it('rate-limits submissions per client address', async () => {
    ({ app } = await setup());
    const ip = '198.51.100.7';
    const codes = [];
    for (let i = 0; i < 6; i += 1) {
      codes.push((await post(app, { ...message, altcha: 'x' }, ip)).statusCode);
    }
    assert.deepEqual(codes, [403, 403, 403, 403, 403, 429]);
  });

  it('does not grant CORS to other origins', async () => {
    ({ app } = await setup());
    const res = await app.inject({
      method: 'OPTIONS',
      url: '/contact',
      headers: {
        origin: 'https://evil.example',
        'access-control-request-method': 'POST',
      },
    });
    assert.equal(res.headers['access-control-allow-origin'], undefined);
  });
});

describe('GET /altcha/challenge', () => {
  it('is rate-limited more tightly than the global limit', async () => {
    ({ app } = await setup());
    const codes = [];
    for (let i = 0; i < 21; i += 1) {
      const res = await app.inject({
        method: 'GET',
        url: '/altcha/challenge',
        headers: { 'cf-connecting-ip': '192.0.2.9' },
      });
      codes.push(res.statusCode);
    }
    assert.equal(codes.filter((c) => c === 200).length, 20);
    assert.equal(codes.at(-1), 429);
  });
});

describe('createScalewayMailer', () => {
  it('sends through the regional TEM API with Reply-To set to the visitor', async () => {
    const calls = [];
    const mailer = createScalewayMailer({
      scalewaySecretKey: 'secret',
      scalewayProjectId: 'project',
      scalewayRegion: 'fr-par',
      from: 'contact@monad.systems',
      to: 'hello@monad.hu',
      fetch: async (url, init) => {
        calls.push({ url, init });
        return new Response('{}', { status: 200 });
      },
    });
    await mailer.sendContactMessage(message);
    assert.equal(
      calls[0].url,
      'https://api.scaleway.com/transactional-email/v1alpha1/regions/fr-par/emails',
    );
    assert.equal(calls[0].init.headers['x-auth-token'], 'secret');
    const body = JSON.parse(calls[0].init.body);
    assert.deepEqual(body.to, [{ email: 'hello@monad.hu' }]);
    assert.deepEqual(body.additional_headers, [{ key: 'Reply-To', value: 'ada@example.com' }]);
    assert.match(body.text, /We need a platform review\./);
  });

  it('throws on a non-2xx response', async () => {
    const mailer = createScalewayMailer({
      scalewaySecretKey: 's',
      scalewayProjectId: 'p',
      scalewayRegion: 'fr-par',
      from: 'a@b.co',
      to: 'c@d.co',
      fetch: async () => new Response('denied', { status: 403 }),
    });
    await assert.rejects(mailer.sendContactMessage(message), /403/);
  });
});

describe('loadConfig', () => {
  it('reads secrets from *_FILE in preference to the environment', async () => {
    const { mkdtempSync, writeFileSync } = await import('node:fs');
    const { tmpdir } = await import('node:os');
    const { join } = await import('node:path');
    const { loadConfig } = await import('../src/config.js');
    const dir = mkdtempSync(join(tmpdir(), 'contact-config-'));
    writeFileSync(join(dir, 'altcha'), 'from-file-secret-that-is-long-enough\n');
    const config = loadConfig({
      ALLOWED_ORIGINS: 'https://monad.systems, https://www.monad.systems',
      ALTCHA_HMAC_SECRET: 'from-env',
      ALTCHA_HMAC_SECRET_FILE: join(dir, 'altcha'),
      SCW_SECRET_KEY: 'k',
      SCW_PROJECT_ID: 'p',
      MAIL_FROM: 'contact@monad.systems',
      MAIL_TO: 'hello@monad.hu',
    });
    assert.equal(config.altchaHmacSecret, 'from-file-secret-that-is-long-enough');
    assert.deepEqual(config.allowedOrigins, ['https://monad.systems', 'https://www.monad.systems']);
    assert.equal(config.databaseUrl, undefined);
    assert.equal(config.mail.scalewayRegion, 'fr-par');
  });

  it('names the missing variable', async () => {
    const { loadConfig } = await import('../src/config.js');
    assert.throws(
      () =>
        loadConfig({
          ALLOWED_ORIGINS: 'https://monad.systems',
          MAIL_FROM: 'contact@monad.systems',
          MAIL_TO: 'hello@monad.hu',
        }),
      /ALTCHA_HMAC_SECRET \(or ALTCHA_HMAC_SECRET_FILE\) is required/,
    );
  });
});
