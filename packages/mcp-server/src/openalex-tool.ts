import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0 (mailto:unclick@example.com)";
const BASE = "https://api.openalex.org";
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

export async function openalexSearchWorks(args: Record<string, unknown>) {
  const q = String(args.query || "");
  if (!q) return { error: "query is required (search term)." };
  const perPage = Math.min(Number(args.per_page) || 5, 25);
  const data = await fetchJson(`${BASE}/works?search=${encodeURIComponent(q)}&per_page=${perPage}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "openalex.org", fetched_at: new Date().toISOString(), next_steps: ["Returns scholarly works with title, DOI, citation count, and open access info.", "Use openalex_get_work with an OpenAlex ID for full details."] });
}

export async function openalexGetWork(args: Record<string, unknown>) {
  const id = String(args.id || "");
  if (!id) return { error: "id is required (OpenAlex ID like W2741809807, or a DOI URL)." };
  const data = await fetchJson(`${BASE}/works/${encodeURIComponent(id)}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "openalex.org", fetched_at: new Date().toISOString(), next_steps: ["Returns full work metadata: title, abstract, authors, concepts, and references.", "Use openalex_search_works to discover works by keyword."] });
}

export async function openalexSearchAuthors(args: Record<string, unknown>) {
  const q = String(args.query || "");
  if (!q) return { error: "query is required (author name)." };
  const perPage = Math.min(Number(args.per_page) || 5, 25);
  const data = await fetchJson(`${BASE}/authors?search=${encodeURIComponent(q)}&per_page=${perPage}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "openalex.org", fetched_at: new Date().toISOString(), next_steps: ["Returns authors with name, institution, citation count, and works count.", "Use the author OpenAlex ID to filter works by author."] });
}
