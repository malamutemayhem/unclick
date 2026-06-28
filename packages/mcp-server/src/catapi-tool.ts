// The Cat API - random cat images and breed info.
// No API key required for basic endpoints - completely free and open.
// Base URL: https://api.thecatapi.com/v1/

import { stampMeta } from "./connector-meta.js";

const BASE = "https://api.thecatapi.com/v1";
const TIMEOUT_MS = Number(process.env.CATAPI_TIMEOUT_MS) || 10000;

async function catFetch<T>(path: string): Promise<T> {
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
      throw new Error(`Cat API request timed out after ${TIMEOUT_MS}ms.`);
    }
    throw new Error(`Cat API network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Cat API rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Cat API HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

const META = { source: "thecatapi.com" };

export async function catApiRandomImage(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await catFetch("/images/search?limit=1");
    return stampMeta({ images: data }, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use cat_api_breeds to browse all cat breeds.", "Call again for another random cat image."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function catApiBreeds(args: Record<string, unknown>): Promise<unknown> {
  const limit = Math.min(Number(args.limit ?? 20), 50);
  const page = Number(args.page ?? 0);
  try {
    const data = await catFetch(`/breeds?limit=${limit}&page=${page}`);
    return stampMeta({ breeds: data }, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use cat_api_random_image for a random cat photo.", "Increase page for more breeds."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
