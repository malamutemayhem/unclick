import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://fakestoreapi.com";
const TIMEOUT_MS = 10_000;

async function fetchJson(url: string): Promise<unknown> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA }, signal: ac.signal });
    clearTimeout(timer);
    if (res.status === 429) return { error: "Rate limit exceeded. Try again in a minute." };
    if (!res.ok) return { error: `HTTP ${res.status}: ${await res.text()}` };
    return await res.json();
  } catch (e: unknown) {
    clearTimeout(timer);
    if (e instanceof Error && e.name === "AbortError") return { error: "Request timed out." };
    return { error: String(e) };
  }
}

export async function fakestoreProducts(args: Record<string, unknown>) {
  const limit = Number(args.limit) || 10;
  const data = await fetchJson(`${BASE}/products?limit=${limit}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ products: data }, { source: "fakestoreapi.com", fetched_at: new Date().toISOString(), next_steps: ["Use fakestore_product to get a specific product by ID.", "Use fakestore_categories to list all categories."] });
}

export async function fakestoreProduct(args: Record<string, unknown>) {
  const id = Number(args.id);
  if (!id) return { error: "id is required." };
  const data = await fetchJson(`${BASE}/products/${id}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ product: data }, { source: "fakestoreapi.com", fetched_at: new Date().toISOString(), next_steps: ["Use fakestore_products to browse all products.", "Products have title, price, description, category, image, and rating."] });
}

export async function fakestoreCategories(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/products/categories`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ categories: data }, { source: "fakestoreapi.com", fetched_at: new Date().toISOString(), next_steps: ["Use fakestore_products to list products (filter by category in your workflow)."] });
}
