import { defineConfig, devices } from "@playwright/test";
import { env } from "./src/config/env";

export default defineConfig({
  testDir: "./tests",
  timeout: 45_000,
  expect: {
    timeout: 10_000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ["html", { outputFolder: "playwright-report", open: "never" }],
    ["list"]
  ],
  use: {
    baseURL: env.baseUrl,
    headless: env.headless,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    }
  ]
});
