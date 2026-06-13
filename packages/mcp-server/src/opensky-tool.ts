import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://opensky-network.org/api";
const TIMEOUT_MS = 15_000;

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

export async function openskyStates(args: Record<string, unknown>) {
  const params: string[] = [];
  if (args.icao24) params.push(`icao24=${encodeURIComponent(String(args.icao24))}`);
  if (args.lamin != null && args.lamax != null && args.lomin != null && args.lomax != null) {
    params.push(`lamin=${Number(args.lamin)}&lomin=${Number(args.lomin)}&lamax=${Number(args.lamax)}&lomax=${Number(args.lomax)}`);
  }
  const qs = params.length ? `?${params.join("&")}` : "";
  const data = await fetchJson(`${BASE}/states/all${qs}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "opensky-network.org", fetched_at: new Date().toISOString(), next_steps: ["Returns live aircraft states: callsign, origin country, position, altitude, velocity.", "Filter by icao24 transponder address or bounding box (lamin/lomin/lamax/lomax)."] });
}

export async function openskyFlights(args: Record<string, unknown>) {
  const begin = Number(args.begin);
  const end = Number(args.end);
  if (isNaN(begin) || isNaN(end)) return { error: "begin and end are required (Unix timestamps)." };
  const icao24 = args.icao24 ? `&icao24=${encodeURIComponent(String(args.icao24))}` : "";
  const data = await fetchJson(`${BASE}/flights/all?begin=${begin}&end=${end}${icao24}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ flights: data }, { source: "opensky-network.org", fetched_at: new Date().toISOString(), next_steps: ["Returns flights in a time range with departure/arrival airports.", "Time range must be within 2 hours. Use Unix timestamps."] });
}
