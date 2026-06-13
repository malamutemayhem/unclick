import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.coinlore.net/api";
const TIMEOUT_MS = 8_000;

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

export async function coinloreGlobal(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/global/`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ global: data }, { source: "coinlore.net", fetched_at: new Date().toISOString(), next_steps: ["Returns total market cap, BTC dominance, active currencies, and 24h volume.", "Use coinlore_tickers for individual coin prices."] });
}

export async function coinloreTickers(args: Record<string, unknown>) {
  const start = Number(args.start) || 0;
  const limit = Math.min(Number(args.limit) || 20, 100);
  const data = await fetchJson(`${BASE}/tickers/?start=${start}&limit=${limit}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "coinlore.net", fetched_at: new Date().toISOString(), next_steps: ["Returns coin id, name, symbol, price, market cap, and 24h change.", "Use start parameter to paginate through results."] });
}

export async function coinloreCoin(args: Record<string, unknown>) {
  const id = String(args.id || "");
  if (!id) return { error: "id is required (numeric coin ID, e.g. 90 for Bitcoin)." };
  const data = await fetchJson(`${BASE}/ticker/?id=${encodeURIComponent(id)}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ coin: data }, { source: "coinlore.net", fetched_at: new Date().toISOString(), next_steps: ["Includes price, market cap, supply, volume, and percentage changes.", "Use coinlore_tickers to browse more coins."] });
}
