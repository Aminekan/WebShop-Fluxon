import { mockCategories, mockDemoUser, mockOrders, mockProducts } from "../data/mockData";
import type {
  AuthUser,
  CheckoutForm,
  LoginInput,
  Order,
  Product,
  RegisterInput
} from "../types";

const wait = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

let orderStore = [...mockOrders];

// In-memory user store for the mock API. Passwords are stored in plain text
// here because this is only a test/demo environment.
type MockUser = { name: string; email: string; password: string; token: string };
const userStore: MockUser[] = [
  { name: mockDemoUser.name, email: mockDemoUser.email, password: "demo", token: mockDemoUser.token }
];

export const mockApi = {
  async getProducts(): Promise<Product[]> {
    await wait();
    return mockProducts.map((product) => ({
      ...product,
      category: mockCategories.find((category) => category.id === product.categoryId)
    }));
  },

  async getProductById(productId: number): Promise<Product> {
    await wait();
    const product = mockProducts.find((item) => item.id === productId);
    if (!product) {
      throw new Error("Product not found");
    }

    return {
      ...product,
      category: mockCategories.find((category) => category.id === product.categoryId)
    };
  },

  async getCategories() {
    await wait();
    return mockCategories;
  },

  async login(input: LoginInput): Promise<AuthUser> {
    await wait();
    if (!input.email || !input.password) {
      throw new Error("Email and password are required");
    }

    const found = userStore.find((u) => u.email === input.email && u.password === input.password);
    if (!found) {
      throw new Error("Invalid email or password");
    }

    return {
      name: found.name,
      email: found.email,
      token: found.token
    };
  },

  async register(input: RegisterInput): Promise<AuthUser> {
    await wait();
    if (!input.name || !input.email || !input.password) {
      throw new Error("All fields are required");
    }

    // Prevent duplicate registrations for the same email in the mock store
    const exists = userStore.some((u) => u.email === input.email);
    if (exists) {
      throw new Error("A user with this email already exists");
    }

    const token = `mock-registered-token-${Date.now()}`;
    const newUser: MockUser = { name: input.name, email: input.email, password: input.password, token };
    userStore.push(newUser);

    return {
      name: newUser.name,
      email: newUser.email,
      token: newUser.token
    };
  },

  async getOrders(): Promise<Order[]> {
    await wait();
    return orderStore;
  },

  async createOrder(input: CheckoutForm, cart: { product: Product; quantity: number; unitPrice: number }[]): Promise<Order> {
    await wait();

    const total = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const order: Order = {
      id: `FX-2026-${1000 + orderStore.length + 1}`,
      createdAt: new Date().toISOString(),
      status: "Confirmed",
      total,
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice
      })),
      payment: {
        method: input.paymentMethod,
        amount: total,
        status: "Paid"
      },
      customerEmail: input.email,
      shippingAddress: `${input.address}, ${input.city}, ${input.postalCode}`
    };

    orderStore = [order, ...orderStore];
    return order;
  }
};
