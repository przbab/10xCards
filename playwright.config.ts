import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    expect: {
        timeout: 5000,
    },
    projects: [
        {
            name: 'Desktop Chrome',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    reporter: 'html',
    testDir: './tests/e2e',
    timeout: 30000,
    use: {
        baseURL: 'http://localhost:4321',
        trace: 'on-first-retry',
    },
});
