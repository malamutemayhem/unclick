import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.opendota.com/api";
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

export async function opendotaHeroes(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/heroes`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ heroes: data }, { source: "opendota.com", fetched_at: new Date().toISOString(), next_steps: ["Returns all Dota 2 heroes with id, name, localized_name, roles, and attack type.", "Use the hero id to look up hero stats or rankings."] });
}

export async function opendotaHeroStats(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/heroStats`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ hero_stats: data }, { source: "opendota.com", fetched_at: new Date().toISOString(), next_steps: ["Includes pick/win rates per bracket, base stats, and hero images.", "Compare heroes by role, attack type, or win rate."] });
}

export async function opendotaProMatches(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/proMatches`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ matches: data }, { source: "opendota.com", fetched_at: new Date().toISOString(), next_steps: ["Returns recent professional Dota 2 matches.", "Each match includes teams, scores, duration, and league info."] });
}
