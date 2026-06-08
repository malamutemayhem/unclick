import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://data.police.uk/api";
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

export async function ukPoliceForces(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/forces`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ forces: data }, { source: "data.police.uk", fetched_at: new Date().toISOString(), next_steps: ["Returns all UK police forces with id and name.", "Use the force id to look up specific force details."] });
}

export async function ukPoliceCrimes(args: Record<string, unknown>) {
  const lat = Number(args.latitude);
  const lon = Number(args.longitude);
  if (isNaN(lat) || isNaN(lon)) return { error: "latitude and longitude are required." };
  const date = args.date ? `&date=${encodeURIComponent(String(args.date))}` : "";
  const data = await fetchJson(`${BASE}/crimes-at-location?lat=${lat}&lng=${lon}${date}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ crimes: data }, { source: "data.police.uk", fetched_at: new Date().toISOString(), next_steps: ["Returns crimes at or near the given location with category, outcome, and month.", "Specify date as YYYY-MM for a specific month (default: latest available)."] });
}
