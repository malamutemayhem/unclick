import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.magicthegathering.io/v1";
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

export async function mtgSearchCards(args: Record<string, unknown>) {
  const params: string[] = [];
  if (args.name) params.push(`name=${encodeURIComponent(String(args.name))}`);
  if (args.colors) params.push(`colors=${encodeURIComponent(String(args.colors))}`);
  if (args.type) params.push(`type=${encodeURIComponent(String(args.type))}`);
  if (args.set) params.push(`set=${encodeURIComponent(String(args.set))}`);
  if (args.rarity) params.push(`rarity=${encodeURIComponent(String(args.rarity))}`);
  params.push(`pageSize=${Number(args.limit) || 10}`);
  const data = await fetchJson(`${BASE}/cards?${params.join("&")}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "api.magicthegathering.io", fetched_at: new Date().toISOString(), next_steps: ["Filter by name, colors (W,U,B,R,G), type, set code, or rarity (common, uncommon, rare, mythic)."] });
}

export async function mtgGetCard(args: Record<string, unknown>) {
  const id = String(args.id || "");
  if (!id) return { error: "id (multiverse ID) is required." };
  const data = await fetchJson(`${BASE}/cards/${encodeURIComponent(id)}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "api.magicthegathering.io", fetched_at: new Date().toISOString(), next_steps: ["Use mtg_search_cards to find cards by name, color, or type."] });
}

export async function mtgSets(args: Record<string, unknown>) {
  const params: string[] = [];
  if (args.name) params.push(`name=${encodeURIComponent(String(args.name))}`);
  params.push(`pageSize=${Number(args.limit) || 10}`);
  const data = await fetchJson(`${BASE}/sets?${params.join("&")}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "api.magicthegathering.io", fetched_at: new Date().toISOString(), next_steps: ["Use the set code with mtg_search_cards to find cards in a specific set."] });
}
