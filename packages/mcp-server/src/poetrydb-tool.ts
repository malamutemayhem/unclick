import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://poetrydb.org";
const TIMEOUT_MS = 8_000;

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

export async function poetrySearchByAuthor(args: Record<string, unknown>) {
  const author = String(args.author || "");
  if (!author) return { error: "author is required (e.g. 'Shakespeare', 'Emily Dickinson')." };
  const data = await fetchJson(`${BASE}/author/${encodeURIComponent(author)}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ poems: data }, { source: "poetrydb.org", fetched_at: new Date().toISOString(), next_steps: ["Each poem includes title, author, lines, and line count.", "Search by title for a specific poem."] });
}

export async function poetrySearchByTitle(args: Record<string, unknown>) {
  const title = String(args.title || "");
  if (!title) return { error: "title is required (e.g. 'Sonnet', 'The Raven')." };
  const data = await fetchJson(`${BASE}/title/${encodeURIComponent(title)}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ poems: data }, { source: "poetrydb.org", fetched_at: new Date().toISOString(), next_steps: ["Results include full poem text with lines array.", "Combine with author search for more works by the same poet."] });
}

export async function poetryRandom(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/random`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ poems: data }, { source: "poetrydb.org", fetched_at: new Date().toISOString(), next_steps: ["Returns a random poem with title, author, and full text.", "Search by the author's name to find more of their work."] });
}
