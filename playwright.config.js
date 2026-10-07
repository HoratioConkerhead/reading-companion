import { defineConfig, devices } from '@playwright/test';

// Browser tests against the production build (npm run test:e2e)
export default defineConfig({
  testDir: './e2e',
  timeout: 120000,
  fullyParallel: true,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://localhost:4173/reading-companion/',
    // Use a preinstalled Chromium when one is provided (e.g. a sandbox without downloads)
    launchOptions: process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'phone', use: { ...devices['Pixel 7'] } }
  ],
  webServer: {
    command: 'npm run build && npm run preview -- --port 4173 --strictPort',
    url: 'http://localhost:4173/reading-companion/',
    reuseExistingServer: !process.env.CI,
    timeout: 120000
  }
});
