import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://foodish-api.com/api";
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

export async function foodishRandom(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "foodish-api.com", fetched_at: new Date().toISOString(), next_steps: ["Returns a random food image URL.", "Use the image for design mockups or food-related content."] });
}

export async function foodishByCategory(args: Record<string, unknown>) {
  const category = String(args.category || "");
  if (!category) return { error: "category is required (e.g. 'pizza', 'burger', 'biryani', 'pasta', 'rice')." };
  const data = await fetchJson(`${BASE}/images/${encodeURIComponent(category)}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "foodish-api.com", fetched_at: new Date().toISOString(), next_steps: ["Categories include pizza, burger, biryani, dosa, idly, pasta, rice, and more.", "Returns a random food image URL for the given category."] });
}
