import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const TIMEOUT_MS = 10_000;

async function fetchJson(url: string): Promise<Record<string, unknown>> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA }, signal: ac.signal });
    clearTimeout(timer);
    if (res.status === 429) return { error: "Rate limit exceeded. Try again in a minute." };
    if (!res.ok) return { error: `HTTP ${res.status}: ${await res.text()}` };
    return (await res.json()) as Record<string, unknown>;
  } catch (e: unknown) {
    clearTimeout(timer);
    if (e instanceof Error && e.name === "AbortError") return { error: "Request timed out." };
    return { error: String(e) };
  }
}

export async function gutenbergSearch(args: Record<string, unknown>) {
  const query = String(args.query ?? "").trim();
  if (!query) return { error: "query is required (book title or author)." };
  const data = await fetchJson(`https://gutendex.com/books/?search=${encodeURIComponent(query)}`);
  if (data.error) return data;
  return stampMeta(data, { source: "gutendex.com (Project Gutenberg)", fetched_at: new Date().toISOString(), next_steps: ["Results include download links for free ebook formats."] });
}

export async function gutenbergBook(args: Record<string, unknown>) {
  const id = Number(args.id);
  if (!id) return { error: "id is required (numeric book ID)." };
  const data = await fetchJson(`https://gutendex.com/books/${id}/`);
  if (data.error) return data;
  return stampMeta(data, { source: "gutendex.com (Project Gutenberg)", fetched_at: new Date().toISOString(), next_steps: ["Use gutenberg_search to find more books."] });
}
