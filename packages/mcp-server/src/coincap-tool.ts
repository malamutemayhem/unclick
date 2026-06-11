import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.coincap.io/v2";
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

export async function coincapAssets(args: Record<string, unknown>) {
  const limit = Math.min(Number(args.limit) || 10, 50);
  const search = args.search ? `&search=${encodeURIComponent(String(args.search))}` : "";
  const data = await fetchJson(`${BASE}/assets?limit=${limit}${search}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "coincap.io", fetched_at: new Date().toISOString(), next_steps: ["Returns top crypto assets ranked by market cap with price, volume, and change.", "Use coincap_asset_detail with an asset id for more info."] });
}

export async function coincapAssetDetail(args: Record<string, unknown>) {
  const id = String(args.id || "");
  if (!id) return { error: "id is required (e.g. bitcoin, ethereum)." };
  const data = await fetchJson(`${BASE}/assets/${encodeURIComponent(id)}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "coincap.io", fetched_at: new Date().toISOString(), next_steps: ["Returns detailed asset info: price, supply, market cap, volume, and 24h change.", "Use coincap_assets to discover asset ids."] });
}

export async function coincapRates(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/rates`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "coincap.io", fetched_at: new Date().toISOString(), next_steps: ["Returns exchange rates for crypto and fiat currencies.", "Use coincap_assets for detailed crypto market data."] });
}
