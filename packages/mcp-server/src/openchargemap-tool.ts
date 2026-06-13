import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.openchargemap.io/v3/poi";
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

export async function openchargemapSearch(args: Record<string, unknown>) {
  const lat = Number(args.latitude);
  const lon = Number(args.longitude);
  if (isNaN(lat) || isNaN(lon)) return { error: "latitude and longitude are required." };
  const distance = Number(args.distance) || 10;
  const maxResults = Math.min(Number(args.max_results) || 10, 50);
  const data = await fetchJson(`${BASE}?output=json&latitude=${lat}&longitude=${lon}&distance=${distance}&distanceunit=km&maxresults=${maxResults}&compact=true`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ stations: data }, { source: "openchargemap.io", fetched_at: new Date().toISOString(), next_steps: ["Returns EV charging stations near the given location with address, operator, and connector types.", "Adjust distance (km) and max_results to widen or narrow the search."] });
}
