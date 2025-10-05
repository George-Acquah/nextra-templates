import { FlatCompat } from '@eslint/eslintrc';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {
    extends: ['eslint:recommended'],
  },
});

const config = [
  {
    ignores: [
      'node_modules/',
      '**/**/node_modules/',
      '**/**/.next/',
      '**lates/**/dist/',
      '.next/',
      '**/**/public/',
      '**/**/*.d.ts',
      '**/**/mdx-components.tsx',
    ],
  },

  // Apply legacy configs (Next.js and core rules)
  ...compat.extends('next', 'next/core-web-vitals', 'prettier'),

  // **1. Global/Source Code Rules (Stricter)**
  {
    rules: {
      'no-console': 'error', // Set the default to 'error'
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Set default to 'error'
      // ... other global rules
    },
  },

  // **2. Overrides (Laxer)**
  {
    files: ['scripts/*.ts', 'configs/*.js', 'postcss.config.mjs'],
    rules: {
      'no-console': 'off', // Override 'no-console' to 'off' for these files
    },
  },

  // 2. Custom rules (Applies to all files not excluded above)
  {
    rules: {
      // code Quality Enforcement
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Make unused vars an error

      semi: ['error', 'always'], // Enforce semicolons
      quotes: ['error', 'single'], // Enforce single quotes
      'comma-dangle': ['error', 'always-multiline'], // Enforce trailing commas where valid in ES5 (objects, arrays, etc.)
      // Next.js App Router Fix: Disable the Pages Router link check
      // This is the fix for the warning about missing 'pages' directory
      '@next/next/no-html-link-for-pages': 'off',

      // Standard React/JSX Fixes
      'react/react-in-jsx-scope': 'off',
    },
  },
];

export default config;
