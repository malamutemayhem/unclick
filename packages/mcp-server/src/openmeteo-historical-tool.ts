import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://archive-api.open-meteo.com/v1";
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

export async function historicalWeather(args: Record<string, unknown>) {
  const lat = Number(args.latitude);
  const lon = Number(args.longitude);
  if (isNaN(lat) || isNaN(lon)) return { error: "latitude and longitude are required." };
  const startDate = String(args.start_date || "");
  const endDate = String(args.end_date || "");
  if (!startDate || !endDate) return { error: "start_date and end_date are required (YYYY-MM-DD format)." };
  const data = await fetchJson(`${BASE}/archive?latitude=${lat}&longitude=${lon}&start_date=${encodeURIComponent(startDate)}&end_date=${encodeURIComponent(endDate)}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "open-meteo.com (archive)", fetched_at: new Date().toISOString(), next_steps: ["Returns daily max/min temperature, precipitation, and wind speed.", "Data available from 1940 to 5 days ago."] });
}
