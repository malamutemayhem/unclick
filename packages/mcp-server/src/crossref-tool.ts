import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0 (mailto:unclick@example.com)";
const BASE = "https://api.crossref.org";
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

export async function crossrefSearchWorks(args: Record<string, unknown>) {
  const q = String(args.query || "");
  if (!q) return { error: "query is required (title, author, or keyword)." };
  const rows = Math.min(Number(args.rows) || 5, 20);
  const data = await fetchJson(`${BASE}/works?query=${encodeURIComponent(q)}&rows=${rows}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "crossref.org", fetched_at: new Date().toISOString(), next_steps: ["Returns academic papers with title, authors, DOI, publisher, and citation count.", "Use crossref_get_work with a DOI for full metadata."] });
}

export async function crossrefGetWork(args: Record<string, unknown>) {
  const doi = String(args.doi || "");
  if (!doi) return { error: "doi is required (e.g. 10.1038/nature12373)." };
  const data = await fetchJson(`${BASE}/works/${encodeURIComponent(doi)}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "crossref.org", fetched_at: new Date().toISOString(), next_steps: ["Returns full paper metadata: title, abstract, authors, references, publisher.", "Use crossref_search_works to discover papers by keyword."] });
}
