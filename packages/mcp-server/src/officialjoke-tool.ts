import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://official-joke-api.appspot.com";
const TIMEOUT_MS = 8_000;

async function fetchJson(url: string): Promise<unknown> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA }, signal: ac.signal });
    clearTimeout(timer);
    if (res.status === 429) return { error: "Rate limit exceeded. Try again in a minute." };
    if (!res.ok) return { error: `HTTP ${res.status}: ${await res.text()}` };
    return await res.json();
  } catch (e: unknown) {
    clearTimeout(timer);
    if (e instanceof Error && e.name === "AbortError") return { error: "Request timed out." };
    return { error: String(e) };
  }
}

export async function officialJokeRandom(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/random_joke`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "official-joke-api.appspot.com", fetched_at: new Date().toISOString(), next_steps: ["Returns a random joke with type, setup, and punchline.", "Types include general and programming jokes."] });
}

export async function officialJokeByType(args: Record<string, unknown>) {
  const type = String(args.type || "general");
  const data = await fetchJson(`${BASE}/jokes/${encodeURIComponent(type)}/random`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ jokes: data }, { source: "official-joke-api.appspot.com", fetched_at: new Date().toISOString(), next_steps: ["Available types: general, programming, knock-knock.", "Each joke has a setup and punchline."] });
}

export async function officialJokeTen(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/random_ten`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ jokes: data }, { source: "official-joke-api.appspot.com", fetched_at: new Date().toISOString(), next_steps: ["Returns 10 random jokes at once.", "Use joke_random for a single joke or joke_by_type for a specific category."] });
}
