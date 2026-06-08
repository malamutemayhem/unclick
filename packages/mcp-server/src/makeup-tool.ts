// Makeup API - search makeup products by brand, type, etc.
// No API key required - completely free and open.
// Base URL: https://makeup-api.herokuapp.com/api/v1/

import { stampMeta } from "./connector-meta.js";

const BASE = "https://makeup-api.herokuapp.com/api/v1";
const TIMEOUT_MS = Number(process.env.MAKEUP_TIMEOUT_MS) || 12000;

async function mkFetch<T>(path: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${BASE}${path}`, {
      headers: { "User-Agent": "UnClickMCP/1.0 (https://unclick.io)" },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Makeup API request timed out after ${TIMEOUT_MS}ms.`);
    }
    throw new Error(`Makeup API network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Makeup API rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Makeup API HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

const META = { source: "makeup-api.herokuapp.com" };

export async function makeupSearch(args: Record<string, unknown>): Promise<unknown> {
  const params: string[] = [];
  if (args.brand) params.push(`brand=${encodeURIComponent(String(args.brand))}`);
  if (args.product_type) params.push(`product_type=${encodeURIComponent(String(args.product_type))}`);
  if (args.product_category) params.push(`product_category=${encodeURIComponent(String(args.product_category))}`);
  if (args.product_tags) params.push(`product_tags=${encodeURIComponent(String(args.product_tags))}`);
  const qs = params.length ? `?${params.join("&")}` : "";
  try {
    const data = await mkFetch<unknown[]>(`/products.json${qs}`);
    const list = Array.isArray(data) ? data.slice(0, 15) : data;
    return stampMeta({ count: Array.isArray(data) ? data.length : 0, products: list }, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Filter by brand, product_type, product_category, or product_tags."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
