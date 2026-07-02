import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.carbonintensity.org.uk";
const TIMEOUT_MS = 10_000;

async function fetchJson(url: string): Promise<unknown> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" }, signal: ac.signal });
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

export async function carbonIntensityCurrent(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/intensity`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "carbonintensity.org.uk", fetched_at: new Date().toISOString(), next_steps: ["Use carbon_intensity_forecast for upcoming intensity predictions.", "Use carbon_intensity_generation for current generation mix."] });
}

export async function carbonIntensityForecast(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/intensity/date/fw24h`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "carbonintensity.org.uk", fetched_at: new Date().toISOString(), next_steps: ["Use carbon_intensity_current for the current reading.", "Use carbon_intensity_generation for the fuel mix."] });
}

export async function carbonIntensityGeneration(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/generation`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta({ data }, { source: "carbonintensity.org.uk", fetched_at: new Date().toISOString(), next_steps: ["Use carbon_intensity_current for the current intensity reading."] });
}
