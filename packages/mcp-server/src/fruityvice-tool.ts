import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://www.fruityvice.com/api/fruit";
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

export async function fruityviceAll(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/all`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ fruits: data }, { source: "fruityvice.com", fetched_at: new Date().toISOString(), next_steps: ["Each fruit includes nutrition facts (calories, fat, sugar, carbs, protein).", "Search for a specific fruit by name for detailed info."] });
}

export async function fruityviceByName(args: Record<string, unknown>) {
  const name = String(args.name || "");
  if (!name) return { error: "name is required (e.g. 'banana', 'apple')." };
  const data = await fetchJson(`${BASE}/${encodeURIComponent(name)}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ fruit: data }, { source: "fruityvice.com", fetched_at: new Date().toISOString(), next_steps: ["Includes nutritional info per 100g: calories, fat, sugar, carbohydrates, protein.", "Use the family or genus fields to find related fruits."] });
}
