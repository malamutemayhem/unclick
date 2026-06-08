import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://taco-randomizer.herokuapp.com";
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

export async function randomTaco(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/random/?full-taco=true`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ taco: data }, { source: "taco-randomizer.herokuapp.com", fetched_at: new Date().toISOString(), next_steps: ["Generate another random taco for variety."] });
}
