import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://nominatim.openstreetmap.org";
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

export async function nominatimSearch(args: Record<string, unknown>) {
  const q = String(args.query || "");
  if (!q) return { error: "query is required (place name or address)." };
  const limit = Math.min(Number(args.limit) || 5, 20);
  const data = await fetchJson(`${BASE}/search?q=${encodeURIComponent(q)}&format=jsonv2&limit=${limit}&addressdetails=1`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ results: data }, { source: "nominatim.openstreetmap.org", fetched_at: new Date().toISOString(), next_steps: ["Returns lat/lon, display name, address breakdown, and bounding box.", "Use nominatim_reverse to go from coordinates to an address."] });
}

export async function nominatimReverse(args: Record<string, unknown>) {
  const lat = Number(args.latitude);
  const lon = Number(args.longitude);
  if (isNaN(lat) || isNaN(lon)) return { error: "latitude and longitude are required." };
  const data = await fetchJson(`${BASE}/reverse?lat=${lat}&lon=${lon}&format=jsonv2&addressdetails=1`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "nominatim.openstreetmap.org", fetched_at: new Date().toISOString(), next_steps: ["Returns address breakdown for the given coordinates.", "Use nominatim_search to find coordinates from a place name."] });
}
