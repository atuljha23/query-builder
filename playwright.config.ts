import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests", // Directory where Playwright tests are located
  use: {
    headless: true, // Run tests in headless mode
    baseURL: "http://localhost:5173",
    viewport: { width: 1280, height: 720 },
  },
});
