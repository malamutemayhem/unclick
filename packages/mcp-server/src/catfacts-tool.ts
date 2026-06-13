// Cat Facts API - random cat facts and cat breed data.
// No API key required - completely free and open.
// Base URL: https://catfact.ninja/

import { stampMeta } from "./connector-meta.js";

const CATFACTS_BASE = "https://catfact.ninja";
const CATFACTS_TIMEOUT_MS = Number(process.env.CATFACTS_TIMEOUT_MS) || 10000;

async function catFetch<T>(path: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CATFACTS_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${CATFACTS_BASE}${path}`, {
      headers: { "User-Agent": "UnClickMCP/1.0 (https://unclick.io)" },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Cat Facts API request timed out after ${CATFACTS_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Cat Facts API network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Cat Facts API rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Cat Facts API HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

export async function catFact(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await catFetch<{ fact: string; length: number }>("/fact");
    return stampMeta({
      fact: data.fact,
      length: data.length,
    }, {
      source: "Cat Facts API",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use cat_facts for multiple facts.", "Use cat_breeds to browse cat breeds."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function catFacts(args: Record<string, unknown>): Promise<unknown> {
  const limit = Math.min(50, Math.max(1, Number(args.limit ?? 5)));
  const page = Math.max(1, Number(args.page ?? 1));
  try {
    const data = await catFetch<{ data: Array<{ fact: string; length: number }>; current_page: number; last_page: number }>(`/facts?limit=${limit}&page=${page}`);
    return stampMeta({
      count: data.data.length,
      page: data.current_page,
      pages: data.last_page,
      facts: data.data.map((f) => ({ fact: f.fact, length: f.length })),
    }, {
      source: "Cat Facts API",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use cat_breeds to browse cat breeds."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function catBreeds(args: Record<string, unknown>): Promise<unknown> {
  const limit = Math.min(50, Math.max(1, Number(args.limit ?? 10)));
  const page = Math.max(1, Number(args.page ?? 1));
  try {
    const data = await catFetch<{ data: Array<{ breed: string; country: string; origin: string; coat: string; pattern: string }>; current_page: number; last_page: number }>(`/breeds?limit=${limit}&page=${page}`);
    return stampMeta({
      count: data.data.length,
      page: data.current_page,
      pages: data.last_page,
      breeds: data.data.map((b) => ({
        breed: b.breed,
        country: b.country,
        origin: b.origin,
        coat: b.coat,
        pattern: b.pattern,
      })),
    }, {
      source: "Cat Facts API",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use cat_fact for a random cat fact."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
