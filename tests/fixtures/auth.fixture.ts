import { Page, test as base } from "@playwright/test";
import { AuthSessionFixture } from "../../src/fixtures/AuthSessionFixture";

type Fixtures = {
  authenticatedPage: Page;
};

export const test = base.extend<Fixtures>({
  authenticatedPage: async ({ browser }, use) => {
    const authFixture = new AuthSessionFixture(browser);
    const { context, page } = await authFixture.createAuthenticatedSession();

    await use(page);
    await context.close();
  }
});

export { expect } from "@playwright/test";