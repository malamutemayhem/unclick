import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://stapi.co/api/v1/rest";
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

export async function stapiSearchCharacter(args: Record<string, unknown>) {
  const name = String(args.name || "");
  if (!name) return { error: "name is required." };
  const data = await fetchJson(`${BASE}/character/search?name=${encodeURIComponent(name)}&pageSize=10&pageNumber=0`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "stapi.co", fetched_at: new Date().toISOString(), next_steps: ["Use stapi_search_species to browse Star Trek species.", "Use stapi_search_starship to look up ships."] });
}

export async function stapiSearchSpecies(args: Record<string, unknown>) {
  const name = String(args.name || "");
  if (!name) return { error: "name is required." };
  const data = await fetchJson(`${BASE}/species/search?name=${encodeURIComponent(name)}&pageSize=10&pageNumber=0`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "stapi.co", fetched_at: new Date().toISOString(), next_steps: ["Use stapi_search_character to find characters of this species."] });
}

export async function stapiSearchStarship(args: Record<string, unknown>) {
  const name = String(args.name || "");
  if (!name) return { error: "name is required." };
  const data = await fetchJson(`${BASE}/spacecraft/search?name=${encodeURIComponent(name)}&pageSize=10&pageNumber=0`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "stapi.co", fetched_at: new Date().toISOString(), next_steps: ["Use stapi_search_character to find crew members."] });
}
