import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "http://universities.hipolabs.com";
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

export async function universitiesSearch(args: Record<string, unknown>) {
  const params: string[] = [];
  if (args.name) params.push(`name=${encodeURIComponent(String(args.name))}`);
  if (args.country) params.push(`country=${encodeURIComponent(String(args.country))}`);
  if (!params.length) return { error: "Provide at least a name or country to search." };
  const data = await fetchJson(`${BASE}/search?${params.join("&")}`);
  if (data && typeof data === "object" && "error" in data) return data;
  const items = Array.isArray(data) ? data.slice(0, Number(args.limit) || 25) : data;
  return stampMeta({ universities: items }, { source: "universities.hipolabs.com", fetched_at: new Date().toISOString(), next_steps: ["Search by name, country, or both.", "Results include name, country, web pages, and domains."] });
}
