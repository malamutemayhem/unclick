// Useless Facts API - random interesting/useless facts.
// No API key required - completely free and open.
// Base URL: https://uselessfacts.jsph.pl/

import { stampMeta } from "./connector-meta.js";

const BASE = "https://uselessfacts.jsph.pl";
const TIMEOUT_MS = Number(process.env.USELESSFACTS_TIMEOUT_MS) || 10000;

async function ufFetch<T>(path: string): Promise<T> {
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
      throw new Error(`Useless Facts request timed out after ${TIMEOUT_MS}ms.`);
    }
    throw new Error(`Useless Facts network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Useless Facts rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Useless Facts HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

const META = { source: "uselessfacts.jsph.pl" };

export async function uselessFactRandom(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await ufFetch("/api/v2/facts/random?language=en");
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Call again for another random fact.", "Use useless_fact_today for the fact of the day."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function uselessFactToday(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await ufFetch("/api/v2/facts/today?language=en");
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use useless_fact_random for a random fact."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
