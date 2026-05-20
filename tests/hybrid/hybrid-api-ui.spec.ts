import { expect, test } from "@playwright/test";
import { FakeStoreApiClient } from "../../src/api/apiClient";
import { env } from "../../src/config/env";
import { InventoryPage } from "../../src/pages/InventoryPage";
import { LoginPage } from "../../src/pages/LoginPage";
import { Cart, Product } from "../../src/types/fakestore";

test.describe("Hybrid E2E: API seeding + UI validation", () => {
  test("creates backend cart, updates product, then validates storefront layout", async ({ page, request }) => {
    const api = new FakeStoreApiClient(request, env.apiUrl);

    const productUpdatePayload: Partial<Product> = {
      title: "Playwright QA Product",
      price: 199.99,
      description: "Product updated by automated hybrid E2E test",
      category: "electronics",
      image: "https://i.pravatar.cc"
    };

    const updatedProduct = await api.updateProduct(1, productUpdatePayload);
    expect(updatedProduct.id).toBeDefined();

    const cartPayload: Cart = {
      userId: 1,
      date: new Date().toISOString(),
      products: [
        { productId: 1, quantity: 2 },
        { productId: 2, quantity: 1 }
      ]
    };

    const createdCart = await api.createCart(cartPayload);
    expect(createdCart.id).toBeDefined();
    expect(createdCart.userId).toBe(cartPayload.userId);
    expect(createdCart.products.length).toBeGreaterThan(0);

    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto(env.baseUrl);
    await loginPage.login(env.testUsername, env.testPassword);

    await inventoryPage.assertLoaded();
    await inventoryPage.assertVisualLayout();

    const uiProductNames = await inventoryPage.getInventoryItemNames();
    expect(uiProductNames.length).toBeGreaterThan(0);

    await expect(page.locator(".shopping_cart_badge")).toHaveCount(0);
  });
});
