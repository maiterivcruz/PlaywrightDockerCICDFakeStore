import { test } from "../fixtures/auth.fixture";
import { InventoryPage } from "../../src/pages/InventoryPage";

test.describe("Visual validation", () => {
  test("Validate principal menu", async ({ authenticatedPage: page }) => {

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.assertLoaded();
    await inventoryPage.assertVisualMenu();

  });
});
