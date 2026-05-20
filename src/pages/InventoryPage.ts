import { expect, Locator, Page } from "@playwright/test";

export class InventoryPage {
  readonly inventoryContainer: Locator;
  readonly inventoryItems: Locator;
  readonly headerTitle: Locator;

  constructor(private readonly page: Page) {
    this.inventoryContainer = page.locator(".inventory_list");
    this.inventoryItems = page.locator(".inventory_item");
    this.headerTitle = page.locator("span.title");
  }

  async assertLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.headerTitle).toHaveText("Products");
    await expect(this.inventoryContainer).toBeVisible();
  }

  async assertVisualLayout(): Promise<void> {
    await expect(this.inventoryItems).toHaveCount(6);

    const firstItem = this.inventoryItems.first();
    await expect(firstItem.locator(".inventory_item_name")).toBeVisible();
    await expect(firstItem.locator(".inventory_item_price")).toBeVisible();
    await expect(firstItem.locator("button")).toBeVisible();
  }

  async getInventoryItemNames(): Promise<string[]> {
    return this.page.locator(".inventory_item_name").allInnerTexts();
  }
}
