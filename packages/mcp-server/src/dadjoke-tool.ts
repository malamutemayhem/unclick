// icanhazdadjoke - random dad jokes.
// No API key required - completely free and open.
// Base URL: https://icanhazdadjoke.com/

import { stampMeta } from "./connector-meta.js";

const BASE = "https://icanhazdadjoke.com";
const TIMEOUT_MS = Number(process.env.DADJOKE_TIMEOUT_MS) || 10000;

async function djFetch<T>(path: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${BASE}${path}`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "UnClickMCP/1.0 (https://unclick.io)",
      },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Dad Joke API request timed out after ${TIMEOUT_MS}ms.`);
    }
    throw new Error(`Dad Joke API network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Dad Joke API rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Dad Joke API HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

const META = { source: "icanhazdadjoke.com" };

export async function dadJokeRandom(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await djFetch("/");
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Call again for another joke.", "Use dadjoke_search to find jokes by keyword."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function dadJokeSearch(args: Record<string, unknown>): Promise<unknown> {
  const term = String(args.term ?? args.query ?? "");
  if (!term) return { error: "term is required (search keyword)." };
  const page = Number(args.page ?? 1);
  const limit = Math.min(Number(args.limit ?? 20), 30);
  try {
    const data = await djFetch<{ results: unknown[]; total_jokes: number }>(`/search?term=${encodeURIComponent(term)}&page=${page}&limit=${limit}`);
    return stampMeta({ total: data.total_jokes, jokes: data.results }, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use dadjoke_random for a random joke.", "Increase page for more results."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function dadJokeById(args: Record<string, unknown>): Promise<unknown> {
  const id = String(args.id ?? "");
  if (!id) return { error: "id is required." };
  try {
    const data = await djFetch(`/j/${encodeURIComponent(id)}`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use dadjoke_random for another joke."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
