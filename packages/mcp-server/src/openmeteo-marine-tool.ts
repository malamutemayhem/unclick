import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://marine-api.open-meteo.com/v1/marine";
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

export async function marineForecast(args: Record<string, unknown>) {
  const lat = Number(args.latitude);
  const lon = Number(args.longitude);
  if (!lat && lat !== 0) return { error: "latitude is required." };
  if (!lon && lon !== 0) return { error: "longitude is required." };
  const params = [
    `latitude=${lat}`,
    `longitude=${lon}`,
    `daily=wave_height_max,wave_period_max,wave_direction_dominant,wind_wave_height_max,swell_wave_height_max`,
    `timezone=auto`,
  ];
  if (args.forecast_days) params.push(`forecast_days=${Number(args.forecast_days)}`);
  const data = await fetchJson(`${BASE}?${params.join("&")}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ forecast: data }, { source: "marine-api.open-meteo.com", fetched_at: new Date().toISOString(), next_steps: ["Provide latitude/longitude for any ocean point.", "Forecast includes wave height, wave period, swell height, and wind wave data."] });
}
