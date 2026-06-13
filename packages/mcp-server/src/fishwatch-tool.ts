import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://www.fishwatch.gov/api/species";
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

export async function fishwatchSpecies(_args: Record<string, unknown>) {
  const data = await fetchJson(BASE);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ species: data }, { source: "fishwatch.gov (NOAA)", fetched_at: new Date().toISOString(), next_steps: ["Returns all species with scientific name, habitat, population status, and availability.", "Includes biology, nutrition facts, and fishing methods."] });
}

export async function fishwatchSpeciesDetail(args: Record<string, unknown>) {
  const name = String(args.name || "");
  if (!name) return { error: "name is required (e.g. 'atlantic-salmon', 'pacific-bluefin-tuna')." };
  const data = await fetchJson(`${BASE}/${encodeURIComponent(name)}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ species: data }, { source: "fishwatch.gov (NOAA)", fetched_at: new Date().toISOString(), next_steps: ["Use hyphenated species names (e.g. atlantic-salmon, pacific-cod).", "Includes population status, scientific classification, and taste description."] });
}
