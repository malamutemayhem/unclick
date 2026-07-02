import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://timeapi.io/api";
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

export async function timeApiCurrentByZone(args: Record<string, unknown>) {
  const tz = String(args.timezone || "UTC");
  const data = await fetchJson(`${BASE}/time/current/zone?timeZone=${encodeURIComponent(tz)}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "timeapi.io", fetched_at: new Date().toISOString(), next_steps: ["Returns current date, time, day of week, and UTC offset.", "Use IANA timezone names like America/New_York, Europe/London, Asia/Tokyo."] });
}

export async function timeApiTimezones(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/timezone/availabletimezones`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ timezones: data }, { source: "timeapi.io", fetched_at: new Date().toISOString(), next_steps: ["Returns all available IANA timezone names.", "Use with time_api_current_by_zone for the current time in any zone."] });
}
