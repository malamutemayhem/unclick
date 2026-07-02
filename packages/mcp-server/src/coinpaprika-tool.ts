import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.coinpaprika.com/v1";
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

export async function coinpaprikaGlobal(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/global`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "coinpaprika.com", fetched_at: new Date().toISOString(), next_steps: ["Use coinpaprika_coin to look up a specific coin.", "Use coinpaprika_top to see top coins."] });
}

export async function coinpaprikaCoin(args: Record<string, unknown>) {
  const id = String(args.id || "");
  if (!id) return { error: "id is required (e.g. btc-bitcoin, eth-ethereum)." };
  const data = await fetchJson(`${BASE}/coins/${encodeURIComponent(id)}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "coinpaprika.com", fetched_at: new Date().toISOString(), next_steps: ["Use coinpaprika_ticker for live price data.", "Use coinpaprika_global for market overview."] });
}

export async function coinpaprikaTicker(args: Record<string, unknown>) {
  const id = args.id ? String(args.id) : "";
  if (id) {
    const data = await fetchJson(`${BASE}/tickers/${encodeURIComponent(id)}`);
    if (data && typeof data === "object" && "error" in data) return data;
    return stampMeta({ data }, { source: "coinpaprika.com", fetched_at: new Date().toISOString(), next_steps: ["Use coinpaprika_coin for detailed coin info."] });
  }
  const data = await fetchJson(`${BASE}/tickers?limit=20`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ tickers: data }, { source: "coinpaprika.com", fetched_at: new Date().toISOString(), next_steps: ["Pass an id (e.g. btc-bitcoin) for a specific coin's ticker."] });
}
