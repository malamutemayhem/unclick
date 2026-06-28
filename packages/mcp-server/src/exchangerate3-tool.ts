import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";
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

export async function currencyApiRates(args: Record<string, unknown>) {
  const base = String(args.base || "usd").toLowerCase();
  const data = await fetchJson(`${BASE}/currencies/${encodeURIComponent(base)}.json`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ rates: data }, { source: "fawazahmed0/currency-api (jsDelivr CDN)", fetched_at: new Date().toISOString(), next_steps: ["Change base currency code (e.g. usd, eur, gbp, aud, jpy).", "Use currency_api_list to see all supported currency codes."] });
}

export async function currencyApiList(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/currencies.json`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ currencies: data }, { source: "fawazahmed0/currency-api (jsDelivr CDN)", fetched_at: new Date().toISOString(), next_steps: ["Use currency_api_rates with a base currency to get exchange rates."] });
}
