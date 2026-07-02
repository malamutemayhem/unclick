import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://dblp.org/search";
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

export async function dblpSearchPublications(args: Record<string, unknown>) {
  const q = String(args.query || "");
  if (!q) return { error: "query is required (title, author, or keyword)." };
  const max = Math.min(Number(args.max_results) || 10, 30);
  const data = await fetchJson(`${BASE}/publ/api?q=${encodeURIComponent(q)}&format=json&h=${max}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "dblp.org", fetched_at: new Date().toISOString(), next_steps: ["Returns computer science publications with title, authors, venue, year, and URL.", "Use dblp_search_authors to find specific researchers."] });
}

export async function dblpSearchAuthors(args: Record<string, unknown>) {
  const q = String(args.query || "");
  if (!q) return { error: "query is required (author name)." };
  const max = Math.min(Number(args.max_results) || 10, 30);
  const data = await fetchJson(`${BASE}/author/api?q=${encodeURIComponent(q)}&format=json&h=${max}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "dblp.org", fetched_at: new Date().toISOString(), next_steps: ["Returns computer science authors with publication count and DBLP URL.", "Use dblp_search_publications to find their papers."] });
}
