import path from 'node:path'

export default {
  plugins: {
    'postcss-import': {
      path: [
        path.resolve(process.cwd(), 'styles'), // base project styles
        path.resolve(process.cwd(), '../../styles'), // monorepo shared root
      ],
    },
    '@tailwindcss/postcss': {},
  },
}
