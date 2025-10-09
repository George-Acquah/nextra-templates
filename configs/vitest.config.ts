import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '.next/',
        '**/*.config.{js,ts,mjs}',
        '**/types.ts',
        '**/*.d.ts',
        'scripts/',
      ],
    },
  },
  resolve: {
    alias: {
      '@nextra-templates/utils': path.resolve(
        __dirname,
        './packages/utils/src',
      ),
      '@nextra-templates/constants': path.resolve(
        __dirname,
        './packages/constants/src',
      ),
      '@nextra-templates/ui': path.resolve(__dirname, './packages/ui/src'),
    },
  },
});
