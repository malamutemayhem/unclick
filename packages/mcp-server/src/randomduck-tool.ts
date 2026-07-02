import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://random-d.uk/api/v2";
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

export async function randomDuckImage(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/random`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "random-d.uk", fetched_at: new Date().toISOString(), next_steps: ["Returns a random duck image URL and message.", "Call again for a different duck."] });
}

export async function randomDuckList(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/list`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "random-d.uk", fetched_at: new Date().toISOString(), next_steps: ["Returns the full list of available duck image filenames.", "Use random_duck_image for a random selection."] });
}
