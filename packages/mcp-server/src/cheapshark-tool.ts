import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://www.cheapshark.com/api/1.0";
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

export async function cheapsharkDeals(args: Record<string, unknown>) {
  const params: string[] = [];
  if (args.title) params.push(`title=${encodeURIComponent(String(args.title))}`);
  if (args.upper_price) params.push(`upperPrice=${args.upper_price}`);
  if (args.lower_price) params.push(`lowerPrice=${args.lower_price}`);
  if (args.store_id) params.push(`storeID=${args.store_id}`);
  if (args.sort_by) params.push(`sortBy=${encodeURIComponent(String(args.sort_by))}`);
  params.push(`pageSize=${Number(args.limit) || 10}`);
  const qs = params.join("&");
  const data = await fetchJson(`${BASE}/deals?${qs}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ deals: data }, { source: "cheapshark.com", fetched_at: new Date().toISOString(), next_steps: ["Use cheapshark_stores to see available store names/ids."] });
}

export async function cheapsharkStores(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/stores`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ stores: data }, { source: "cheapshark.com", fetched_at: new Date().toISOString(), next_steps: ["Use cheapshark_deals with a store_id to filter deals."] });
}
