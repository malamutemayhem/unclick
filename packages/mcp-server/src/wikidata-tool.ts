import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://www.wikidata.org/w/api.php";
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

export async function wikidataSearch(args: Record<string, unknown>) {
  const q = String(args.query || "");
  if (!q) return { error: "query is required." };
  const limit = Math.min(Number(args.limit) || 5, 20);
  const lang = String(args.language || "en");
  const data = await fetchJson(`${BASE}?action=wbsearchentities&search=${encodeURIComponent(q)}&language=${encodeURIComponent(lang)}&limit=${limit}&format=json`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "wikidata.org", fetched_at: new Date().toISOString(), next_steps: ["Returns Wikidata entities with id, label, description, and concept URI.", "Use wikidata_get_entity with a Q-id (e.g. Q42) for full structured data."] });
}

export async function wikidataGetEntity(args: Record<string, unknown>) {
  const id = String(args.id || "");
  if (!id) return { error: "id is required (Wikidata Q-id, e.g. Q42)." };
  const lang = String(args.language || "en");
  const data = await fetchJson(`${BASE}?action=wbgetentities&ids=${encodeURIComponent(id)}&languages=${encodeURIComponent(lang)}&format=json`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "wikidata.org", fetched_at: new Date().toISOString(), next_steps: ["Returns full structured entity data: labels, descriptions, aliases, and claims/statements.", "Claims contain relationships to other entities (e.g. P31 = instance of)."] });
}
