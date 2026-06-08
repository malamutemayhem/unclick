// Zen Quotes API - inspirational and motivational quotes.
// No API key required - completely free and open.
// Base URL: https://zenquotes.io/api/

import { stampMeta } from "./connector-meta.js";

const BASE = "https://zenquotes.io/api";
const TIMEOUT_MS = Number(process.env.ZENQUOTES_TIMEOUT_MS) || 10000;

async function zenFetch<T>(path: string): Promise<T> {
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
      throw new Error(`Zen Quotes request timed out after ${TIMEOUT_MS}ms.`);
    }
    throw new Error(`Zen Quotes network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Zen Quotes rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Zen Quotes HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

const META = { source: "zenquotes.io" };

export async function zenQuoteRandom(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await zenFetch("/random");
    return stampMeta({ quotes: data }, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use zen_quote_today for the quote of the day.", "Call again for another random quote."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function zenQuoteToday(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await zenFetch("/today");
    return stampMeta({ quotes: data }, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use zen_quote_random for a random inspirational quote."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function zenQuotes(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await zenFetch("/quotes");
    const list = Array.isArray(data) ? data.slice(0, 20) : data;
    return stampMeta({ count: Array.isArray(data) ? data.length : 0, quotes: list }, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use zen_quote_random for a single random quote."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
