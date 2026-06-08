// Deck of Cards API.
// No API key required - completely free and open.
// Base URL: https://deckofcardsapi.com/api/

import { stampMeta } from "./connector-meta.js";

const BASE = "https://deckofcardsapi.com/api";
const TIMEOUT_MS = Number(process.env.DECKOFCARDS_TIMEOUT_MS) || 10000;

async function deckFetch<T>(path: string): Promise<T> {
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
      throw new Error(`Deck of Cards request timed out after ${TIMEOUT_MS}ms.`);
    }
    throw new Error(`Deck of Cards network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Deck of Cards rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Deck of Cards HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

const META = { source: "deckofcardsapi.com" };

export async function deckNew(args: Record<string, unknown>): Promise<unknown> {
  const count = Number(args.deck_count ?? 1);
  try {
    const data = await deckFetch(`/deck/new/shuffle/?deck_count=${count}`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use deck_draw with the deck_id to draw cards.", "Use deck_shuffle with the deck_id to reshuffle."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function deckDraw(args: Record<string, unknown>): Promise<unknown> {
  const deckId = String(args.deck_id ?? "");
  const count = Number(args.count ?? 1);
  if (!deckId) return { error: "deck_id is required. Use deck_new to create one." };
  try {
    const data = await deckFetch(`/deck/${encodeURIComponent(deckId)}/draw/?count=${count}`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Draw more cards or use deck_shuffle to reshuffle."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function deckShuffle(args: Record<string, unknown>): Promise<unknown> {
  const deckId = String(args.deck_id ?? "");
  if (!deckId) return { error: "deck_id is required." };
  try {
    const data = await deckFetch(`/deck/${encodeURIComponent(deckId)}/shuffle/`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use deck_draw to draw cards from the reshuffled deck."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
