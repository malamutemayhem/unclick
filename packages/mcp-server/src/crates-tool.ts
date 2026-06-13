import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://crates.io/api/v1";
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

export async function cratesSearch(args: Record<string, unknown>) {
  const q = String(args.query || "");
  if (!q) return { error: "query is required (crate name or keyword)." };
  const perPage = Math.min(Number(args.per_page) || 10, 50);
  const data = await fetchJson(`${BASE}/crates?q=${encodeURIComponent(q)}&per_page=${perPage}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "crates.io", fetched_at: new Date().toISOString(), next_steps: ["Returns Rust crates with name, description, downloads, and latest version.", "Use crates_get for detailed info on a specific crate."] });
}

export async function cratesGet(args: Record<string, unknown>) {
  const name = String(args.name || "");
  if (!name) return { error: "name is required (crate name)." };
  const data = await fetchJson(`${BASE}/crates/${encodeURIComponent(name)}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "crates.io", fetched_at: new Date().toISOString(), next_steps: ["Returns crate details: versions, dependencies, downloads, and repository link.", "Use crates_search to discover crates by keyword."] });
}
