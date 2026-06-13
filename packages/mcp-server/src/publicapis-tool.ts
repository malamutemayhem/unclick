import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.publicapis.org";
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

export async function publicapisSearch(args: Record<string, unknown>) {
  const params: string[] = [];
  if (args.title) params.push(`title=${encodeURIComponent(String(args.title))}`);
  if (args.category) params.push(`category=${encodeURIComponent(String(args.category))}`);
  if (args.https != null) params.push(`https=${args.https}`);
  if (args.auth) params.push(`auth=${encodeURIComponent(String(args.auth))}`);
  const qs = params.length ? `?${params.join("&")}` : "";
  const data = await fetchJson(`${BASE}/entries${qs}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "api.publicapis.org", fetched_at: new Date().toISOString(), next_steps: ["Use publicapis_categories to see available categories.", "Filter by category, auth type, or HTTPS support."] });
}

export async function publicapisCategories(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/categories`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "api.publicapis.org", fetched_at: new Date().toISOString(), next_steps: ["Use publicapis_search with a category to find APIs."] });
}

export async function publicapisRandom(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/random`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "api.publicapis.org", fetched_at: new Date().toISOString(), next_steps: ["Use publicapis_search to find APIs by name or category."] });
}
