import { configDefaults, defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    test: {
        coverage: {
            reporter: ['text', 'json', 'html'],
        },
        environment: 'jsdom',
        exclude: [...configDefaults.exclude, 'tests/e2e/*'],
        globals: true,
        setupFiles: './src/setupTests.ts',
    },
});
