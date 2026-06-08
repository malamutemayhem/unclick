import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.datamuse.com";
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

export async function datamuseWords(args: Record<string, unknown>) {
  const params: string[] = [];
  if (args.means_like) params.push(`ml=${encodeURIComponent(String(args.means_like))}`);
  if (args.sounds_like) params.push(`sl=${encodeURIComponent(String(args.sounds_like))}`);
  if (args.spelled_like) params.push(`sp=${encodeURIComponent(String(args.spelled_like))}`);
  if (args.rhymes_with) params.push(`rel_rhy=${encodeURIComponent(String(args.rhymes_with))}`);
  if (args.adjectives_for) params.push(`rel_jjb=${encodeURIComponent(String(args.adjectives_for))}`);
  if (args.nouns_for) params.push(`rel_jja=${encodeURIComponent(String(args.nouns_for))}`);
  if (!params.length) return { error: "At least one search parameter is required." };
  params.push(`max=${Number(args.limit) || 20}`);
  const data = await fetchJson(`${BASE}/words?${params.join("&")}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ words: data }, { source: "api.datamuse.com", fetched_at: new Date().toISOString(), next_steps: ["Try different relationship types: means_like, sounds_like, rhymes_with, adjectives_for."] });
}

export async function datamuseSuggestions(args: Record<string, unknown>) {
  const prefix = String(args.prefix || "");
  if (!prefix) return { error: "prefix is required." };
  const data = await fetchJson(`${BASE}/sug?s=${encodeURIComponent(prefix)}&max=${Number(args.limit) || 10}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ suggestions: data }, { source: "api.datamuse.com", fetched_at: new Date().toISOString(), next_steps: ["Use datamuse_words for deeper word relationship queries."] });
}
