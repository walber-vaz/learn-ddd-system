import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts'],
      exclude: [
        'src/index.ts',
        'src/**/*.spec.ts',
        'src/**/index.ts',
        'src/@types/**/*.ts',
        'src/**/mocks/*.ts',
        'src/**/fakes/*.ts',
        'src/**/stubs/*.ts',
        'src/**/doubles/*.ts',
        'src/**/tests/*.ts',
      ],
    },
  },
});
