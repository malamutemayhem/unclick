import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.urbandictionary.com/v0";
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

export async function urbanDefine(args: Record<string, unknown>) {
  const term = String(args.term || "");
  if (!term) return { error: "term is required." };
  const data = await fetchJson(`${BASE}/define?term=${encodeURIComponent(term)}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "urbandictionary.com", fetched_at: new Date().toISOString(), next_steps: ["Use urban_random for random definitions."] });
}

export async function urbanRandom(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/random`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "urbandictionary.com", fetched_at: new Date().toISOString(), next_steps: ["Use urban_define to look up a specific term."] });
}
