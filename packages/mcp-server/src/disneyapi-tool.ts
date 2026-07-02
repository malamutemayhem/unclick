import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.disneyapi.dev";
const TIMEOUT_MS = 10_000;

async function fetchJson(url: string): Promise<Record<string, unknown>> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA }, signal: ac.signal });
    clearTimeout(timer);
    if (res.status === 429) return { error: "Rate limit exceeded. Try again in a minute." };
    if (!res.ok) return { error: `HTTP ${res.status}: ${await res.text()}` };
    return (await res.json()) as Record<string, unknown>;
  } catch (e: unknown) {
    clearTimeout(timer);
    if (e instanceof Error && e.name === "AbortError") return { error: "Request timed out." };
    return { error: String(e) };
  }
}

export async function disneyCharacterSearch(args: Record<string, unknown>) {
  const name = String(args.name ?? "").trim();
  if (!name) return { error: "name is required." };
  const data = await fetchJson(`${BASE}/character?name=${encodeURIComponent(name)}`);
  if (data.error) return data;
  return stampMeta(data, { source: "api.disneyapi.dev", fetched_at: new Date().toISOString(), next_steps: ["Use disney_all_characters to browse all characters."] });
}

export async function disneyAllCharacters(args: Record<string, unknown>) {
  const page = Number(args.page) || 1;
  const data = await fetchJson(`${BASE}/character?page=${page}`);
  if (data.error) return data;
  return stampMeta(data, { source: "api.disneyapi.dev", fetched_at: new Date().toISOString(), next_steps: ["Use disney_character_search to find a specific character."] });
}
