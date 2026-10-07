import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  { ignores: ['dist/**', 'build/**', 'node_modules/**'] },
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser }
    },
    settings: { react: { version: 'detect' } },
    plugins: { react, 'react-hooks': reactHooks },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',
      // React is imported in .jsx files for clarity; the automatic JSX runtime doesn't need it
      'no-unused-vars': ['warn', { args: 'none', caughtErrors: 'none', ignoreRestSiblings: true, varsIgnorePattern: '^(React|_)$' }]
    }
  },
  {
    files: ['src/**/*.test.{js,jsx}', 'src/setupTests.js'],
    languageOptions: { globals: { ...globals.browser, ...globals.vitest } }
  },
  {
    files: ['scripts/**/*.{js,mjs}', '*.config.{js,cjs}'],
    languageOptions: { globals: { ...globals.node } },
    rules: { ...js.configs.recommended.rules }
  }
];
