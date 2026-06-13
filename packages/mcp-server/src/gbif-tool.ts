import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.gbif.org/v1";
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

export async function gbifSearchSpecies(args: Record<string, unknown>) {
  const q = String(args.query || "");
  if (!q) return { error: "query is required (species name)." };
  const limit = Math.min(Number(args.limit) || 10, 50);
  const data = await fetchJson(`${BASE}/species/search?q=${encodeURIComponent(q)}&limit=${limit}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "gbif.org", fetched_at: new Date().toISOString(), next_steps: ["Returns species matching the query with scientific and common names.", "Use the species key with gbif_species_detail for full taxonomy."] });
}

export async function gbifSpeciesDetail(args: Record<string, unknown>) {
  const key = String(args.species_key || "");
  if (!key) return { error: "species_key is required (numeric GBIF taxon key)." };
  const data = await fetchJson(`${BASE}/species/${encodeURIComponent(key)}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "gbif.org", fetched_at: new Date().toISOString(), next_steps: ["Returns full taxonomy: kingdom, phylum, class, order, family, genus, species.", "Use gbif_occurrences to find recorded observations."] });
}

export async function gbifOccurrences(args: Record<string, unknown>) {
  const params: string[] = [];
  if (args.species_key) params.push(`taxonKey=${encodeURIComponent(String(args.species_key))}`);
  if (args.country) params.push(`country=${encodeURIComponent(String(args.country))}`);
  const limit = Math.min(Number(args.limit) || 10, 50);
  params.push(`limit=${limit}`);
  const data = await fetchJson(`${BASE}/occurrence/search?${params.join("&")}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "gbif.org", fetched_at: new Date().toISOString(), next_steps: ["Returns biodiversity occurrence records with location and date.", "Filter by species_key and/or country code (ISO 2-letter)."] });
}
