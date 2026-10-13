import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import eslintConfigPrettier from 'eslint-config-prettier';
import * as espree from 'espree';

const config = [
  ...nextCoreWebVitals,
  { ignores: ['.claude/worktrees/**'] },
  {
    // Next's Babel parser lacks the ScopeManager API required by ESLint 10.
    files: ['**/*.{js,jsx,mjs}'],
    languageOptions: {
      parser: espree,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  eslintConfigPrettier,
];

export default config;
