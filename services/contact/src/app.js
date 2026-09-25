import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import { altchaPlugin, requireAltcha } from '@monad-systems/altcha/fastify';
import Fastify from 'fastify';

// No CR/LF anywhere in single-line fields: they end up in mail headers
// (Subject, Reply-To).
const SINGLE_LINE = '^[^\\r\\n]*$';

const contactBody = {
  type: 'object',
  additionalProperties: false,
  required: ['name', 'email', 'message', 'altcha'],
  properties: {
    name: { type: 'string', minLength: 2, maxLength: 120, pattern: SINGLE_LINE },
    email: {
      type: 'string',
      maxLength: 254,
      pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
    },
    company: { type: 'string', maxLength: 160, pattern: SINGLE_LINE },
    message: { type: 'string', minLength: 10, maxLength: 5000 },
    locale: { type: 'string', enum: ['en', 'hu'] },
    altcha: { type: 'string', minLength: 1, maxLength: 8192 },
  },
};

/**
 * @param {{
 *   config: ReturnType<typeof import('./config.js').loadConfig>,
 *   altcha: import('@monad-systems/altcha').Altcha,
 *   mailer: { sendContactMessage(message: object): Promise<void> },
 *   logger?: boolean | object,
 * }} deps
 */
export const buildApp = async ({ config, altcha, mailer, logger = true }) => {
  const app = Fastify({ logger, bodyLimit: 32 * 1024 });

  await app.register(cors, {
    origin: config.allowedOrigins,
    methods: ['GET', 'POST'],
    maxAge: 600,
  });

  await app.register(rateLimit, {
    global: true,
    max: 60,
    timeWindow: '1 minute',
    keyGenerator: (request) =>
      (config.trustCfConnectingIp && request.headers['cf-connecting-ip']) ||
      request.ip,
  });

  app.get('/healthz', { config: { rateLimit: false } }, async () => ({ ok: true }));

  // Each challenge costs a PBKDF2 derivation to issue, so its route gets a
  // tighter limit than the global one.
  await app.register(altchaPlugin, {
    altcha,
    routeOptions: { config: { rateLimit: { max: 20, timeWindow: '1 minute' } } },
  });

  app.post(
    '/contact',
    {
      config: { rateLimit: { max: 5, timeWindow: '10 minutes' } },
      schema: { body: contactBody },
      preHandler: requireAltcha(altcha),
    },
    async (request, reply) => {
      const { name, email, company = '', message, locale = 'en' } = request.body;
      try {
        await mailer.sendContactMessage({ name, email, company, message, locale });
      } catch (err) {
        request.log.error({ err }, 'contact mail delivery failed');
        return reply.code(502).send({ ok: false });
      }
      return { ok: true };
    },
  );

  return app;
};
