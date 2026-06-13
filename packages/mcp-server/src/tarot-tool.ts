// Tarot Card API - tarot card data and readings.
// No API key required - completely free and open.
// Base URL: https://tarotapi.dev/api/v1/

import { stampMeta } from "./connector-meta.js";

const BASE = "https://tarotapi.dev/api/v1";
const TIMEOUT_MS = Number(process.env.TAROT_TIMEOUT_MS) || 10000;

async function tarotFetch<T>(path: string): Promise<T> {
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
      throw new Error(`Tarot API request timed out after ${TIMEOUT_MS}ms.`);
    }
    throw new Error(`Tarot API network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Tarot API rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Tarot API HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

const META = { source: "tarotapi.dev" };

export async function tarotAllCards(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await tarotFetch("/cards");
    const cards = Array.isArray((data as Record<string, unknown>).cards) ? (data as Record<string, unknown>).cards : data;
    const list = Array.isArray(cards) ? cards.slice(0, 30).map((c: Record<string, unknown>) => ({ name: c.name, value: c.value, suit: c.suit })) : cards;
    return stampMeta({ count: Array.isArray(cards) ? (cards as unknown[]).length : 0, sample: list }, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use tarot_draw to draw random cards.", "Use tarot_search to find a specific card."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function tarotDraw(args: Record<string, unknown>): Promise<unknown> {
  const count = Number(args.count ?? 3);
  try {
    const data = await tarotFetch(`/cards/random?n=${count}`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Draw more cards or use tarot_search for a specific card."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function tarotSearch(args: Record<string, unknown>): Promise<unknown> {
  const query = String(args.query ?? "");
  if (!query) return { error: "query is required (card name, e.g. 'The Fool', 'Death', 'Ace of Cups')." };
  try {
    const data = await tarotFetch(`/cards/search?q=${encodeURIComponent(query)}`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use tarot_draw for a random reading."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
