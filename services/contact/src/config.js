import { readFileSync } from 'node:fs';

/**
 * `NAME_FILE` wins over `NAME`, so secrets can arrive as files (compose
 * secrets on tmpfs, infra ADR-0003) rather than in the process environment.
 */
const read = (env, name) => {
  const file = env[`${name}_FILE`]?.trim();
  const value = file ? readFileSync(file, 'utf8') : env[name];
  return value?.trim() || undefined;
};

const required = (env, name) => {
  const value = read(env, name);
  if (!value) throw new Error(`${name} (or ${name}_FILE) is required`);
  return value;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Reads and validates the environment once, at startup. */
export const loadConfig = (env = process.env) => {
  const allowedOrigins = required(env, 'ALLOWED_ORIGINS')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  const mailFrom = required(env, 'MAIL_FROM');
  const mailTo = required(env, 'MAIL_TO');
  for (const [name, value] of [
    ['MAIL_FROM', mailFrom],
    ['MAIL_TO', mailTo],
  ]) {
    if (!EMAIL.test(value)) throw new Error(`${name} must be an email address`);
  }

  return {
    port: Number(env.PORT ?? 8080),
    host: env.HOST ?? '0.0.0.0',
    allowedOrigins,
    altchaHmacSecret: required(env, 'ALTCHA_HMAC_SECRET'),
    databaseUrl: read(env, 'DATABASE_URL'),
    // Only true when the service is reachable solely through a Cloudflare
    // tunnel; otherwise a client could forge the header and dodge rate limits.
    trustCfConnectingIp: env.TRUST_CF_CONNECTING_IP === 'true',
    mail: {
      scalewaySecretKey: required(env, 'SCW_SECRET_KEY'),
      scalewayProjectId: required(env, 'SCW_PROJECT_ID'),
      scalewayRegion: env.SCW_REGION ?? 'fr-par',
      from: mailFrom,
      to: mailTo,
    },
  };
};
