import fs from "node:fs";
import path from "node:path";
import { Browser, BrowserContext, Page, expect } from "@playwright/test";
import { env } from "../config/env";
import { LoginPage } from "../pages/LoginPage";

type AuthenticatedSession = {
  context: BrowserContext;
  page: Page;
};

export class AuthSessionFixture {
  private readonly storageStatePath = path.resolve(process.cwd(), "playwright/.auth/user.json");

  constructor(private readonly browser: Browser) {}

  private async hasValidStoredSession(): Promise<boolean> {
    if (!fs.existsSync(this.storageStatePath)) {
      return false;
    }

    const context = await this.browser.newContext({
      baseURL: env.baseUrl,
      storageState: this.storageStatePath
    });

    const page = await context.newPage();
    await page.goto("/inventory.html", { waitUntil: "domcontentloaded" });
    const isValid = /inventory/i.test(page.url());

    await context.close();
    return isValid;
  }

  private async ensureStoredSession(): Promise<void> {
    if (await this.hasValidStoredSession()) {
      return;
    }

    fs.mkdirSync(path.dirname(this.storageStatePath), { recursive: true });

    const context = await this.browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page);

    await loginPage.goto(env.baseUrl);
    await loginPage.login(env.testUsername, env.testPassword);
    await expect(page).toHaveURL(/inventory/i);

    await context.storageState({ path: this.storageStatePath });
    await context.close();
  }

  async createAuthenticatedSession(): Promise<AuthenticatedSession> {
    await this.ensureStoredSession();

    const context = await this.browser.newContext({
      baseURL: env.baseUrl,
      storageState: this.storageStatePath
    });

    const page = await context.newPage();
    await page.goto("/inventory.html", { waitUntil: "domcontentloaded" });

    return { context, page };
  }
}