import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://www.itis.gov/ITISWebService/jsonservice";
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

export async function itisSearchByName(args: Record<string, unknown>) {
  const name = String(args.name || "");
  if (!name) return { error: "name is required (common or scientific name)." };
  const data = await fetchJson(`${BASE}/searchByCommonName?srchKey=${encodeURIComponent(name)}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "itis.gov (USDA)", fetched_at: new Date().toISOString(), next_steps: ["Returns matching species with TSN (Taxonomic Serial Number) and scientific name.", "Use itis_get_full_record with the TSN for complete taxonomy."] });
}

export async function itisGetFullRecord(args: Record<string, unknown>) {
  const tsn = String(args.tsn || "");
  if (!tsn) return { error: "tsn is required (Taxonomic Serial Number)." };
  const data = await fetchJson(`${BASE}/getFullRecordFromTSN?tsn=${encodeURIComponent(tsn)}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "itis.gov (USDA)", fetched_at: new Date().toISOString(), next_steps: ["Returns full taxonomy: kingdom, phylum, class, order, family, genus, species.", "Use itis_search_by_name to find TSNs by common name."] });
}
