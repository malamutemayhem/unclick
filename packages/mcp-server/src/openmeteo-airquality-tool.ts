import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://air-quality-api.open-meteo.com/v1";
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

export async function airQualityCurrent(args: Record<string, unknown>) {
  const lat = Number(args.latitude);
  const lon = Number(args.longitude);
  if (isNaN(lat) || isNaN(lon)) return { error: "latitude and longitude are required." };
  const data = await fetchJson(`${BASE}/air-quality?latitude=${lat}&longitude=${lon}&current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,us_aqi,european_aqi`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "open-meteo.com (air quality)", fetched_at: new Date().toISOString(), next_steps: ["Returns current PM2.5, PM10, NO2, SO2, O3, CO, US AQI, and European AQI.", "US AQI: 0-50 Good, 51-100 Moderate, 101-150 Unhealthy for Sensitive Groups."] });
}

export async function airQualityForecast(args: Record<string, unknown>) {
  const lat = Number(args.latitude);
  const lon = Number(args.longitude);
  if (isNaN(lat) || isNaN(lon)) return { error: "latitude and longitude are required." };
  const days = Math.min(Number(args.days) || 3, 5);
  const data = await fetchJson(`${BASE}/air-quality?latitude=${lat}&longitude=${lon}&hourly=pm10,pm2_5,us_aqi,european_aqi&forecast_days=${days}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "open-meteo.com (air quality)", fetched_at: new Date().toISOString(), next_steps: ["Returns hourly PM2.5, PM10, and AQI forecasts.", "Use air_quality_current for a simpler snapshot."] });
}
