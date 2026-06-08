import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://dummyjson.com";
const TIMEOUT_MS = 8_000;

async function fetchJson(url: string): Promise<Record<string, unknown>> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA },
      signal: ac.signal,
    });
    clearTimeout(timer);
    if (res.status === 429) return { error: "Rate limit exceeded. Try again in a minute." };
    if (!res.ok) return { error: `HTTP ${res.status}: ${await res.text()}` };
    return (await res.json()) as Record<string, unknown>;
  } catch (e: unknown) {
    clearTimeout(timer);
    if (e instanceof Error && e.name === "AbortError") return { error: "Request timed out." };
    return { error: String(e) };
  }
}

export async function dummyjsonProducts(args: Record<string, unknown>) {
  const limit = Math.min(Number(args.limit) || 10, 30);
  const skip = Number(args.skip) || 0;
  const data = await fetchJson(`${BASE}/products?limit=${limit}&skip=${skip}`);
  if (data.error) return data;
  return stampMeta(data, { source: "dummyjson.com", fetched_at: new Date().toISOString(), next_steps: ["Use dummyjson_search_products to search by keyword."] });
}

export async function dummyjsonSearchProducts(args: Record<string, unknown>) {
  const q = String(args.query ?? "").trim();
  if (!q) return { error: "query is required." };
  const data = await fetchJson(`${BASE}/products/search?q=${encodeURIComponent(q)}`);
  if (data.error) return data;
  return stampMeta(data, { source: "dummyjson.com", fetched_at: new Date().toISOString(), next_steps: ["Use dummyjson_products to browse all products."] });
}

export async function dummyjsonQuotes(args: Record<string, unknown>) {
  const limit = Math.min(Number(args.limit) || 10, 30);
  const data = await fetchJson(`${BASE}/quotes?limit=${limit}`);
  if (data.error) return data;
  return stampMeta(data, { source: "dummyjson.com", fetched_at: new Date().toISOString(), next_steps: ["Use dummyjson_random_quote for a single random quote."] });
}

export async function dummyjsonRandomQuote(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/quotes/random`);
  if (data.error) return data;
  return stampMeta(data, { source: "dummyjson.com", fetched_at: new Date().toISOString(), next_steps: ["Use dummyjson_quotes to browse more quotes."] });
}
