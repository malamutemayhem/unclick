import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://export.arxiv.org/api/query";
const TIMEOUT_MS = 10_000;

async function fetchText(url: string): Promise<string | { error: string }> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA }, signal: ac.signal });
    clearTimeout(timer);
    if (res.status === 429) return { error: "Rate limit exceeded. Try again in a minute." };
    if (!res.ok) return { error: `HTTP ${res.status}: ${await res.text()}` };
    return await res.text();
  } catch (e: unknown) {
    clearTimeout(timer);
    if (e instanceof Error && e.name === "AbortError") return { error: "Request timed out." };
    return { error: String(e) };
  }
}

function parseEntries(xml: string): Record<string, unknown>[] {
  const entries: Record<string, unknown>[] = [];
  const entryBlocks = xml.split("<entry>").slice(1);
  for (const block of entryBlocks) {
    const get = (tag: string) => {
      const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
      return m ? m[1].trim() : "";
    };
    const authors: string[] = [];
    const authorMatches = block.matchAll(/<author>\s*<name>([^<]+)<\/name>/g);
    for (const am of authorMatches) authors.push(am[1].trim());
    entries.push({
      id: get("id"),
      title: get("title").replace(/\s+/g, " "),
      summary: get("summary").replace(/\s+/g, " ").slice(0, 500),
      authors,
      published: get("published"),
      updated: get("updated"),
    });
  }
  return entries;
}

export async function arxivSearch(args: Record<string, unknown>) {
  const query = String(args.query || "");
  if (!query) return { error: "query is required (search term or arXiv query syntax)." };
  const maxResults = Math.min(Number(args.max_results) || 5, 20);
  const raw = await fetchText(`${BASE}?search_query=all:${encodeURIComponent(query)}&start=0&max_results=${maxResults}`);
  if (typeof raw === "object") return raw;
  const entries = parseEntries(raw);
  return stampMeta({ papers: entries }, { source: "arxiv.org", fetched_at: new Date().toISOString(), next_steps: ["Returns paper id, title, authors, summary, and dates.", "Paper ids link directly to arxiv.org (e.g. https://arxiv.org/abs/XXXX.XXXXX)."] });
}
