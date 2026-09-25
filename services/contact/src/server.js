import {
  createAltcha,
  createMemoryReplayStore,
  createPostgresReplayStore,
} from '@monad-systems/altcha';
import pg from 'pg';
import { buildApp } from './app.js';
import { loadConfig } from './config.js';
import { createScalewayMailer } from './mail.js';

const config = loadConfig();

let pool;
let store;
if (config.databaseUrl) {
  pool = new pg.Pool({ connectionString: config.databaseUrl, max: 4 });
  const postgresStore = createPostgresReplayStore({ db: pool });
  await postgresStore.ensureSchema();
  store = postgresStore;
} else {
  // Correct only while exactly one instance runs.
  store = createMemoryReplayStore();
}

const app = await buildApp({
  config,
  altcha: createAltcha({ hmacSecret: config.altchaHmacSecret, store }),
  mailer: createScalewayMailer(config.mail),
});

const shutdown = async () => {
  await app.close();
  await pool?.end();
  process.exit(0);
};
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

await app.listen({ port: config.port, host: config.host });
