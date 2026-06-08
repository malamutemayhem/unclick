import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.pokemontcg.io/v2";
const TIMEOUT_MS = 12_000;

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

export async function pokemonTcgSearchCards(args: Record<string, unknown>) {
  const params: string[] = [];
  const qParts: string[] = [];
  if (args.name) qParts.push(`name:"${String(args.name)}"`);
  if (args.type) qParts.push(`types:"${String(args.type)}"`);
  if (args.set) qParts.push(`set.name:"${String(args.set)}"`);
  if (args.rarity) qParts.push(`rarity:"${String(args.rarity)}"`);
  if (qParts.length) params.push(`q=${encodeURIComponent(qParts.join(" "))}`);
  params.push(`pageSize=${Number(args.limit) || 10}`);
  const data = await fetchJson(`${BASE}/cards?${params.join("&")}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "api.pokemontcg.io", fetched_at: new Date().toISOString(), next_steps: ["Search by name, type (Fire, Water, etc.), set name, or rarity.", "Use pokemon_tcg_sets to browse available sets."] });
}

export async function pokemonTcgSets(args: Record<string, unknown>) {
  const params: string[] = [];
  if (args.name) params.push(`q=${encodeURIComponent(`name:"${String(args.name)}"`)}`);
  params.push(`pageSize=${Number(args.limit) || 10}`);
  const data = await fetchJson(`${BASE}/sets?${params.join("&")}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "api.pokemontcg.io", fetched_at: new Date().toISOString(), next_steps: ["Use the set name with pokemon_tcg_search_cards to find cards in that set."] });
}
