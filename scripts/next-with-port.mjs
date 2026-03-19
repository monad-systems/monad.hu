import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const root = process.cwd();
const nextCommand = process.argv[2] ?? 'dev';
const passthroughArgs = process.argv.slice(3);

const parseEnvFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  const parsed = {};
  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const separatorIndex = line.indexOf('=');
    if (separatorIndex < 0) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    if (!key) {
      continue;
    }

    let value = line.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    } else {
      const inlineCommentIndex = value.indexOf(' #');
      if (inlineCommentIndex >= 0) {
        value = value.slice(0, inlineCommentIndex).trim();
      }
    }

    parsed[key] = value.replace(/\\n/g, '\n');
  }

  return parsed;
};

const envFromFiles = {
  ...parseEnvFile(path.join(root, '.env')),
  ...parseEnvFile(path.join(root, '.env.local')),
};

for (const [key, value] of Object.entries(envFromFiles)) {
  if (process.env[key] === undefined) {
    process.env[key] = value;
  }
}

const port = process.env.PORT || '3000';
const nextBin = path.join(root, 'node_modules', 'next', 'dist', 'bin', 'next');
const hasPortArg = passthroughArgs.some(
  (arg) => arg === '-p' || arg === '--port' || arg.startsWith('--port='),
);

const nextArgs = hasPortArg
  ? [nextCommand, ...passthroughArgs]
  : [nextCommand, '-p', port, ...passthroughArgs];

const child = spawn(process.execPath, [nextBin, ...nextArgs], {
  stdio: 'inherit',
  env: process.env,
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});

child.on('error', (error) => {
  console.error('Failed to start Next.js', error);
  process.exit(1);
});
