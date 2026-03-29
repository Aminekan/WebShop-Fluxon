import { config } from "../config";
import { mockApi } from "./mockApi";
import type {
  AuthUser,
  Category,
  CheckoutForm,
  LoginInput,
  Order,
  Product,
  RegisterInput
} from "../types";

async function request<T>(path: string, init?: RequestInit & { skipAuth?: boolean }): Promise<T> {
  const stored = window.localStorage.getItem("fluxon.auth");
  const token = stored ? JSON.parse(stored)?.token : null;

  // Remove our custom option before passing to fetch
  const { skipAuth, ...fetchInit } = (init ?? {}) as RequestInit & { skipAuth?: boolean };

  const response = await fetch(`${config.apiBaseUrl}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...((token && !skipAuth) ? { Authorization: `Bearer ${token}` } : {}),
      ...(fetchInit.headers ?? {})
    },
    ...fetchInit
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

async function withFallback<T>(primary: () => Promise<T>, fallback: () => Promise<T>): Promise<T> {
  if (config.useMockApi) {
    return fallback();
  }

  try {
    return await primary();
  } catch {
    return fallback();
  }
}

// Normalize raw backend product payloads into the frontend `Product` shape.
function normalizeProduct(raw: any): Product {
  const id = Number(raw.id);
  const name = String(raw.name ?? "Unnamed product");
  const description = String(raw.description ?? "");
  const price = typeof raw.price === "number" ? raw.price : Number(raw.price ?? 0);
  const oldPrice = raw.oldPrice != null ? Number(raw.oldPrice) : undefined;
  const stock = raw.stock != null ? Number(raw.stock) : 0;
  const categoryId = raw.categoryId != null ? Number(raw.categoryId) : (raw.category?.id != null ? Number(raw.category.id) : 0);

  // Category object may come in different shapes from the backend; pick name+id if present
  const category: Category | undefined = raw.category
    ? { id: Number(raw.category.id ?? categoryId), name: String(raw.category.name ?? "Category") }
    : undefined;

  // Provide a sensible image fallback if backend doesn't provide one
  const image = raw.image ?? raw.imageUrl ?? "";

  // If backend provides `featured` explicitly (true/false), respect it.
  // Otherwise infer featured from other hints: bestSeller, badge, or high rating.
  const inferredFeatured = raw.featured ?? (
    Boolean(raw.bestSeller) || Boolean(raw.badge) || (raw.rating != null && Number(raw.rating) >= 4.7)
  );

  return {
    id,
    name,
    description,
    price,
    oldPrice,
    stock,
    categoryId,
    category,
    image,
    badge: raw.badge,
    rating: raw.rating != null ? Number(raw.rating) : undefined,
    reviewCount: raw.reviewCount != null ? Number(raw.reviewCount) : undefined,
    featured: Boolean(inferredFeatured),
    bestSeller: Boolean(raw.bestSeller),
    newArrival: Boolean(raw.newArrival)
  };
}

export const api = {
  getProducts(): Promise<Product[]> {
    // Prefer backend products when available. If backend returns an empty
    // array, fall back to mock products so developers still see data.
    if (config.useMockApi) {
      return mockApi.getProducts();
    }

    return (async () => {
      try {
        const raws = await request<any[]>('/api/product', { skipAuth: true });
        const backendProducts = raws.map(normalizeProduct);
        if (backendProducts.length > 0) {
          return backendProducts;
        }
        return mockApi.getProducts();
      } catch {
        return mockApi.getProducts();
      }
    })();
  },

  getProductById(productId: number): Promise<Product> {
    return withFallback(
  async () => normalizeProduct(await request<any>(`/api/product/${productId}`, { skipAuth: true })),
      () => mockApi.getProductById(productId)
    );
  },

  getCategories(): Promise<Category[]> {
    return withFallback(
      () => request<Category[]>("/api/category", { skipAuth: true }),
      () => mockApi.getCategories()
    );
  },

  // ── LOGIN ──────────────────────────────────────────
  login(input: LoginInput): Promise<AuthUser> {
    return withFallback(
      async () => {
        // Deine API gibt nur { token } zurück
  const data = await request<{ token: string }>("/api/auth/login", {
          method: "POST",
          body: JSON.stringify(input)
        });
        // AuthUser selbst zusammenbauen
        return {
          name: input.email,
          email: input.email,
          token: data.token
        };
      },
      () => mockApi.login(input)
    );
  },

  // ── REGISTER ───────────────────────────────────────
  register(input: RegisterInput): Promise<AuthUser> {
    return withFallback(
      async () => {
        // Deine API gibt nur { token } zurück
  const data = await request<{ token: string }>("/api/auth/register", {
          method: "POST",
          body: JSON.stringify(input)
        });
        // AuthUser selbst zusammenbauen
        return {
          name: input.name,
          email: input.email,
          token: data.token
        };
      },
      () => mockApi.register(input)
    );
  },

  getOrders(): Promise<Order[]> {
    return withFallback(
      () => request<Order[]>("/api/order/my"),
      () => mockApi.getOrders()
    );
  },

  createOrder(input: CheckoutForm, cart: { product: Product; quantity: number; unitPrice: number }[]): Promise<Order> {
    return withFallback(
      () =>
        request<Order>("/api/order", {
          method: "POST",
          body: JSON.stringify({
            items: cart.map((item) => ({
              productId: item.product.id,
              quantity: item.quantity,
            })),
            paymentMethod: input.paymentMethod
          })
        }),
      () => mockApi.createOrder(input, cart)
    );
  }
};

