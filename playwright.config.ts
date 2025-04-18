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
        {
            name: 'Mobile Safari',
            use: { ...devices['iPhone 12'] },
        },
    ],
    reporter: 'html',
    testDir: './tests/e2e',
    timeout: 30000,
    use: {
        baseURL: 'http://localhost:3000',
        trace: 'on-first-retry',
    },
});
