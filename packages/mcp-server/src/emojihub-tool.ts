import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://emojihub.yurace.pro/api";
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

export async function emojihubRandom(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/random`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "emojihub.yurace.pro", fetched_at: new Date().toISOString(), next_steps: ["Use emojihub_by_category to browse by category."] });
}

export async function emojihubByCategory(args: Record<string, unknown>) {
  const category = String(args.category ?? "").trim().toLowerCase().replace(/ /g, "-");
  if (!category) return { error: "category is required (e.g. smileys-and-people, animals-and-nature)." };
  const data = await fetchJson(`${BASE}/all/category/${encodeURIComponent(category)}`);
  if (data && typeof data === "object" && "error" in data) return data;
  const emojis = Array.isArray(data) ? data.slice(0, 20) : [];
  return stampMeta({ emojis, total: Array.isArray(data) ? data.length : 0 }, { source: "emojihub.yurace.pro", fetched_at: new Date().toISOString(), next_steps: ["Try categories: smileys-and-people, animals-and-nature, food-and-drink, travel-and-places, activities, objects."] });
}
