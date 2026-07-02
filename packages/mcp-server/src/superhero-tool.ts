// Superhero API - comic book character database.
// No API key required for search (uses the open endpoint).
// Base URL: https://akabab.github.io/superhero-api/api/

import { stampMeta } from "./connector-meta.js";

const BASE = "https://akabab.github.io/superhero-api/api";
const TIMEOUT_MS = Number(process.env.SUPERHERO_TIMEOUT_MS) || 10000;

async function heroFetch<T>(path: string): Promise<T> {
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
      throw new Error(`Superhero API request timed out after ${TIMEOUT_MS}ms.`);
    }
    throw new Error(`Superhero API network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Superhero API rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Superhero API HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

const META = { source: "superhero-api (akabab)" };

export async function heroGetById(args: Record<string, unknown>): Promise<unknown> {
  const id = Number(args.id ?? 0);
  if (!id) return { error: "id is required (positive integer)." };
  try {
    const data = await heroFetch(`/id/${id}.json`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use hero_all to browse the full list.", "Use hero_powerstats to see power comparisons."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function heroAll(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await heroFetch("/all.json");
    const list = Array.isArray(data) ? data.map((h: Record<string, unknown>) => ({ id: h.id, name: h.name, slug: h.slug })) : data;
    return stampMeta({ count: Array.isArray(list) ? list.length : 0, heroes: Array.isArray(list) ? list.slice(0, 50) : list }, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use hero_get_by_id for full details on a specific hero."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function heroPowerstats(args: Record<string, unknown>): Promise<unknown> {
  const id = Number(args.id ?? 0);
  if (!id) return { error: "id is required (positive integer)." };
  try {
    const data = await heroFetch(`/powerstats/${id}.json`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use hero_get_by_id for full character biography."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
