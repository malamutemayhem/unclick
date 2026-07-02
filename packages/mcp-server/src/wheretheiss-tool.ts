import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.wheretheiss.at/v1";
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

export async function issPosition(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/satellites/25544`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "wheretheiss.at", fetched_at: new Date().toISOString(), next_steps: ["Returns ISS latitude, longitude, altitude, velocity, and visibility.", "The ISS orbits every ~90 minutes, so position changes rapidly."] });
}

export async function issPassTimes(args: Record<string, unknown>) {
  const lat = Number(args.latitude);
  const lon = Number(args.longitude);
  if (isNaN(lat) || isNaN(lon)) return { error: "latitude and longitude are required (e.g. 40.71, -74.01)." };
  const data = await fetchJson(`${BASE}/satellites/25544/positions?timestamps=${Math.floor(Date.now() / 1000)}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ position: data, observer: { latitude: lat, longitude: lon } }, { source: "wheretheiss.at", fetched_at: new Date().toISOString(), next_steps: ["Shows ISS current position relative to the observer coordinates.", "Use iss_position for current ISS location without observer context."] });
}
