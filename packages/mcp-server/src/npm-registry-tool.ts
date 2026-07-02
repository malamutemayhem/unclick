import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
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

export async function npmSearch(args: Record<string, unknown>) {
  const q = String(args.query || "");
  if (!q) return { error: "query is required (package name or keyword)." };
  const size = Math.min(Number(args.size) || 10, 50);
  const data = await fetchJson(`https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(q)}&size=${size}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "npmjs.org", fetched_at: new Date().toISOString(), next_steps: ["Returns npm packages with name, description, version, and download score.", "Use npm_get_package for full metadata on a specific package."] });
}

export async function npmGetPackage(args: Record<string, unknown>) {
  const name = String(args.name || "");
  if (!name) return { error: "name is required (package name)." };
  const data = await fetchJson(`https://registry.npmjs.org/${encodeURIComponent(name)}/latest`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "npmjs.org", fetched_at: new Date().toISOString(), next_steps: ["Returns package metadata: version, dependencies, repository, and maintainers.", "Use npm_search to discover packages by keyword."] });
}
