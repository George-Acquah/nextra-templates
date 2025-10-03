import { FlatCompat } from '@eslint/eslintrc'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// This is necessary to resolve plugins from the correct location
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
})

export default [
  {
    ignores: ['node_modules/', '.next/', 'out/', 'dist/', 'public/'],
  },

  {
    rules: {
      'no-console': 'warn',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },

  ...compat.extends(
    'next',
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:prettier/recommended'
  ),

  {
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
]
