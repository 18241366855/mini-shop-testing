const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 90000,
  use: {
    browserName: 'chromium',
    headless: true,
  },
  webServer: {
    command: 'node api-server.js',
    url: 'http://localhost:3000/api/products',
    reuseExistingServer: true,
    timeout: 30000,
  },
});
