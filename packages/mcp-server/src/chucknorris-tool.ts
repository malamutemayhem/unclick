// Chuck Norris jokes API.
// No API key required - completely free and open.
// Base URL: https://api.chucknorris.io/

import { stampMeta } from "./connector-meta.js";

const CHUCK_BASE = "https://api.chucknorris.io";
const CHUCK_TIMEOUT_MS = Number(process.env.CHUCK_TIMEOUT_MS) || 10000;

async function chuckFetch<T>(path: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CHUCK_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${CHUCK_BASE}${path}`, {
      headers: { "User-Agent": "UnClickMCP/1.0 (https://unclick.io)" },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Chuck Norris API request timed out after ${CHUCK_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Chuck Norris API network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Chuck Norris API rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Chuck Norris API HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

interface ChuckJoke {
  categories: string[];
  id: string;
  url: string;
  value: string;
}

function normalizeJoke(j: ChuckJoke) {
  return {
    id: j.id,
    joke: j.value,
    categories: j.categories ?? [],
    url: j.url,
  };
}

export async function chuckRandom(args: Record<string, unknown>): Promise<unknown> {
  const category = String(args.category ?? "").trim();
  const path = category ? `/jokes/random?category=${encodeURIComponent(category)}` : "/jokes/random";
  try {
    const data = await chuckFetch<ChuckJoke>(path);
    return stampMeta(normalizeJoke(data), {
      source: "Chuck Norris API",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use chuck_categories to see available joke categories.", "Use chuck_search to find jokes by keyword."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function chuckSearch(args: Record<string, unknown>): Promise<unknown> {
  const query = String(args.query ?? "").trim();
  if (!query) return { error: "query is required." };
  if (query.length < 3) return { error: "query must be at least 3 characters." };
  try {
    const data = await chuckFetch<{ total: number; result: ChuckJoke[] }>(`/jokes/search?query=${encodeURIComponent(query)}`);
    return stampMeta({
      query,
      count: data.total,
      jokes: data.result.map(normalizeJoke),
    }, {
      source: "Chuck Norris API",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use chuck_random for a surprise joke."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function chuckCategories(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await chuckFetch<string[]>("/jokes/categories");
    return { count: data.length, categories: data };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
