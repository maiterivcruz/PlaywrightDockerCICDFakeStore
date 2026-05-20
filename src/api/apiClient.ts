import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import { AuthRequest, AuthResponse, Cart, Product, User } from "../types/fakestore";

export class FakeStoreApiClient {
  constructor(
    private readonly request: APIRequestContext,
    private readonly apiUrl: string
  ) {}

  private async ensureOk(response: APIResponse, operation: string): Promise<void> {
    expect(response.ok(), `${operation} failed with status ${response.status()}`).toBeTruthy();
  }

  async getProducts(): Promise<Product[]> {
    const response = await this.request.get(`${this.apiUrl}/products`);
    await this.ensureOk(response, "GET /products");
    return response.json();
  }

  async getProductById(productId: number): Promise<Product> {
    const response = await this.request.get(`${this.apiUrl}/products/${productId}`);
    await this.ensureOk(response, `GET /products/${productId}`);
    return response.json();
  }

  async createProduct(payload: Product): Promise<Product> {
    const response = await this.request.post(`${this.apiUrl}/products`, {
      data: payload
    });
    await this.ensureOk(response, "POST /products");
    return response.json();
  }

  async updateProduct(productId: number, payload: Partial<Product>): Promise<Product> {
    const response = await this.request.put(`${this.apiUrl}/products/${productId}`, {
      data: payload
    });
    await this.ensureOk(response, `PUT /products/${productId}`);
    return response.json();
  }

  async getUsers(): Promise<User[]> {
    const response = await this.request.get(`${this.apiUrl}/users`);
    await this.ensureOk(response, "GET /users");
    return response.json();
  }

  async createUser(payload: User): Promise<User> {
    const response = await this.request.post(`${this.apiUrl}/users`, {
      data: payload
    });
    await this.ensureOk(response, "POST /users");
    return response.json();
  }

  async getCarts(): Promise<Cart[]> {
    const response = await this.request.get(`${this.apiUrl}/carts`);
    await this.ensureOk(response, "GET /carts");
    return response.json();
  }

  async createCart(payload: Cart): Promise<Cart> {
    const response = await this.request.post(`${this.apiUrl}/carts`, {
      data: payload
    });
    await this.ensureOk(response, "POST /carts");
    return response.json();
  }

  async updateCart(cartId: number, payload: Partial<Cart>): Promise<Cart> {
    const response = await this.request.put(`${this.apiUrl}/carts/${cartId}`, {
      data: payload
    });
    await this.ensureOk(response, `PUT /carts/${cartId}`);
    return response.json();
  }

  async login(payload: AuthRequest): Promise<AuthResponse> {
    const response = await this.request.post(`${this.apiUrl}/auth/login`, {
      data: payload
    });
    await this.ensureOk(response, "POST /auth/login");
    return response.json();
  }
}
