// ExchangeRate-API (free tier) - Currency exchange rates.
// No API key required for the open endpoint.
// Base URL: https://open.er-api.com/v6/

import { stampMeta } from "./connector-meta.js";

const BASE = "https://open.er-api.com/v6";
const TIMEOUT_MS = Number(process.env.EXCHANGERATE2_TIMEOUT_MS) || 10000;

async function erFetch<T>(path: string): Promise<T> {
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
      throw new Error(`ExchangeRate-API request timed out after ${TIMEOUT_MS}ms.`);
    }
    throw new Error(`ExchangeRate-API network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`ExchangeRate-API rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`ExchangeRate-API HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

const META = { source: "open.er-api.com" };

export async function erLatestRates(args: Record<string, unknown>): Promise<unknown> {
  const base = String(args.base ?? "USD").toUpperCase();
  try {
    const data = await erFetch(`/latest/${encodeURIComponent(base)}`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Change base param for different base currency.", "Use frankfurter_convert for ECB-based conversion."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
