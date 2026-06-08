import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.postcodes.io";
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

export async function postcodeLookup(args: Record<string, unknown>) {
  const postcode = String(args.postcode || "");
  if (!postcode) return { error: "postcode is required (e.g. 'SW1A 1AA', 'EC2R 8AH')." };
  const data = await fetchJson(`${BASE}/postcodes/${encodeURIComponent(postcode)}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "postcodes.io", fetched_at: new Date().toISOString(), next_steps: ["Returns latitude, longitude, region, district, ward, and parliamentary constituency.", "UK postcodes only. Use postcode_random for a random UK postcode."] });
}

export async function postcodeRandom(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/random/postcodes`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "postcodes.io", fetched_at: new Date().toISOString(), next_steps: ["Returns a random UK postcode with full location details.", "Use postcode_lookup for a specific postcode."] });
}
