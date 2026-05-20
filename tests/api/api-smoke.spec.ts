import { expect, test } from "@playwright/test";
import { FakeStoreApiClient } from "../../src/api/apiClient";
import { env } from "../../src/config/env";

test.describe("FakeStore API smoke coverage", () => {
  test("validates products, users, carts and auth endpoints", async ({ request }) => {
    const api = new FakeStoreApiClient(request, env.apiUrl);

    const products = await api.getProducts();
    expect(products.length).toBeGreaterThan(0);

    const users = await api.getUsers();
    expect(users.length).toBeGreaterThan(0);

    const carts = await api.getCarts();
    expect(carts.length).toBeGreaterThan(0);

    const auth = await api.login({
      username: "mor_2314",
      password: "83r5^_"
    });
    expect(auth.token).toBeTruthy();
  });
});
