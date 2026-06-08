import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://animechan.io/api/v1";
const TIMEOUT_MS = 10_000;

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

export async function animechanRandom(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/quotes/random`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "animechan.io", fetched_at: new Date().toISOString(), next_steps: ["Get another random anime quote.", "Use animechan_search to find quotes from a specific anime."] });
}

export async function animechanSearch(args: Record<string, unknown>) {
  const anime = String(args.anime || "");
  if (!anime) return { error: "anime is required (anime title to search for)." };
  const data = await fetchJson(`${BASE}/quotes?anime=${encodeURIComponent(anime)}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "animechan.io", fetched_at: new Date().toISOString(), next_steps: ["Use animechan_random for a random anime quote."] });
}
