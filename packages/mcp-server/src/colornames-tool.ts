import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.color.pizza/v1";
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

export async function colorNameLookup(args: Record<string, unknown>) {
  const hex = String(args.hex || "").replace(/^#/, "");
  if (!hex) return { error: "hex color code is required (e.g. 'ff5733' or '#ff5733')." };
  const data = await fetchJson(`${BASE}/?values=${encodeURIComponent(hex)}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ color: data }, { source: "api.color.pizza", fetched_at: new Date().toISOString(), next_steps: ["Pass a hex code (without #) to get the closest named color.", "Try color_name_random for a random named color."] });
}

export async function colorNameRandom(_args: Record<string, unknown>) {
  const randomHex = Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
  const data = await fetchJson(`${BASE}/?values=${randomHex}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ color: data }, { source: "api.color.pizza", fetched_at: new Date().toISOString(), next_steps: ["Use color_name_lookup with a specific hex code.", "The result includes the closest named color, its hex, and distance from input."] });
}
