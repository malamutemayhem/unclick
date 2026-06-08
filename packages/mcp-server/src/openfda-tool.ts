import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.fda.gov";
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

export async function openfdaDrugSearch(args: Record<string, unknown>) {
  const query = String(args.query || "");
  if (!query) return { error: "query is required (drug name or ingredient)." };
  const limit = Number(args.limit) || 5;
  const data = await fetchJson(`${BASE}/drug/label.json?search=openfda.brand_name:"${encodeURIComponent(query)}"&limit=${limit}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "api.fda.gov", fetched_at: new Date().toISOString(), next_steps: ["Use openfda_recall_search to check for recalls.", "Search different drug names or ingredients."] });
}

export async function openfdaRecallSearch(args: Record<string, unknown>) {
  const query = String(args.query || "");
  if (!query) return { error: "query is required (product or reason)." };
  const limit = Number(args.limit) || 5;
  const data = await fetchJson(`${BASE}/food/enforcement.json?search=reason_for_recall:"${encodeURIComponent(query)}"&limit=${limit}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "api.fda.gov", fetched_at: new Date().toISOString(), next_steps: ["Use openfda_drug_search to look up drug info.", "Try different search terms."] });
}

export async function openfdaAdverseEvents(args: Record<string, unknown>) {
  const drug = String(args.drug || "");
  if (!drug) return { error: "drug is required (drug name)." };
  const limit = Number(args.limit) || 5;
  const data = await fetchJson(`${BASE}/drug/event.json?search=patient.drug.medicinalproduct:"${encodeURIComponent(drug)}"&limit=${limit}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "api.fda.gov", fetched_at: new Date().toISOString(), next_steps: ["Use openfda_drug_search for drug label info.", "Use openfda_recall_search for recall data."] });
}
