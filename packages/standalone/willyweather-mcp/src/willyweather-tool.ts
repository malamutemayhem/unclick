// WillyWeather AU integration.
// Australian weather, surf, tide, UV, and swell forecasts.
// Docs: https://www.willyweather.com.au/api/docs/v2.html
// Auth: WILLYWEATHER_KEY env var (passed as key query param in base URL).
// Base URL: https://api.willyweather.com.au/v2/{key}/

import { timeoutFetch, memoryDefault, stamp } from "./connector-kit.js";

const WILLY_BASE = "https://api.willyweather.com.au/v2";
const WILLY_SOURCE = "WillyWeather API v2";

function getApiKey(args: Record<string, unknown>): string {
  const key = String(args.api_key ?? process.env.WILLYWEATHER_KEY ?? "").trim();
  if (!key) throw new Error("api_key is required (or set WILLYWEATHER_KEY env var).");
  return key;
}

/** Resolve the location query from args, falling back to WILLYWEATHER_HOME_LOCATION. */
function resolveLocation(args: Record<string, unknown>, defaultsUsed: string[]): string {
  const explicit = String(args.location ?? args.suburb ?? args.postcode ?? "").trim();
  if (explicit) return explicit;
  return memoryDefault(args, "__never", "WILLYWEATHER_HOME_LOCATION", defaultsUsed);
}

async function willyGet(apiKey: string, path: string, params?: Record<string, string>): Promise<unknown> {
  const qs = params ? "?" + new URLSearchParams(params).toString() : "";
  const res = await timeoutFetch("WillyWeather", `${WILLY_BASE}/${apiKey}${path}${qs}`, {
    headers: { "User-Agent": "UnClickMCP/1.0 (https://unclick.io)" },
  });
  if (res.status === 401 || res.status === 403) throw new Error("Invalid WillyWeather API key.");
  if (res.status === 404) throw new Error("Location not found.");
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`WillyWeather HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<unknown>;
}

async function searchLocation(apiKey: string, query: string): Promise<{ id: number; name: string; state: string } | null> {
  const data = await willyGet(apiKey, "/search.json", { q: query, limit: "1" }) as Record<string, unknown>;
  const locations = data["locations"] as Array<Record<string, unknown>> | undefined;
  if (!locations?.length) return null;
  const loc = locations[0];
  return {
    id: Number(loc["id"]),
    name: String(loc["name"] ?? ""),
    state: String((loc["state"] as Record<string, unknown>)?.["abbreviation"] ?? ""),
  };
}

// ─── get_willyweather_forecast ────────────────────────────────────────────────

export async function getWillyweatherForecast(args: Record<string, unknown>): Promise<unknown> {
  try {
    const apiKey = getApiKey(args);
    const defaultsUsed: string[] = [];
    const query = resolveLocation(args, defaultsUsed);
    if (!query) return { error: "location is required (suburb name or postcode), or set WILLYWEATHER_HOME_LOCATION." };

    const loc = await searchLocation(apiKey, query);
    if (!loc) return { error: `Location "${query}" not found in WillyWeather.` };

    const days = Math.min(7, Math.max(1, Number(args.days ?? 3)));
    const data = await willyGet(apiKey, `/locations/${loc.id}/weather.json`, {
      forecasts: "weather,temperature,rainfall,wind,sunrisesunset",
      days: String(days),
    }) as Record<string, unknown>;

    const forecasts = data["forecasts"] as Record<string, unknown> | undefined;

    return stamp({
      location: `${loc.name}, ${loc.state}`,
      location_id: loc.id,
      days_requested: days,
      weather: forecasts?.["weather"],
      temperature: forecasts?.["temperature"],
      rainfall: forecasts?.["rainfall"],
      wind: forecasts?.["wind"],
      sunrise_sunset: forecasts?.["sunrisesunset"],
    }, { source: WILLY_SOURCE, defaultsUsed, nextSteps: ["Use get_willyweather_surf or get_willyweather_tide for the same location."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// ─── get_willyweather_surf ────────────────────────────────────────────────────

export async function getWillyweatherSurf(args: Record<string, unknown>): Promise<unknown> {
  try {
    const apiKey = getApiKey(args);
    const defaultsUsed: string[] = [];
    const query = resolveLocation(args, defaultsUsed);
    if (!query) return { error: "location is required (suburb name or postcode), or set WILLYWEATHER_HOME_LOCATION." };

    const loc = await searchLocation(apiKey, query);
    if (!loc) return { error: `Location "${query}" not found in WillyWeather.` };

    const days = Math.min(7, Math.max(1, Number(args.days ?? 3)));
    const data = await willyGet(apiKey, `/locations/${loc.id}/weather.json`, {
      forecasts: "swell,surfConditions",
      days: String(days),
    }) as Record<string, unknown>;

    const forecasts = data["forecasts"] as Record<string, unknown> | undefined;

    return stamp({
      location: `${loc.name}, ${loc.state}`,
      location_id: loc.id,
      days_requested: days,
      swell: forecasts?.["swell"],
      surf_conditions: forecasts?.["surfConditions"],
    }, { source: WILLY_SOURCE, defaultsUsed, nextSteps: ["Use get_willyweather_tide for tide times at the same spot."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// ─── get_willyweather_tide ────────────────────────────────────────────────────

export async function getWillyweatherTide(args: Record<string, unknown>): Promise<unknown> {
  try {
    const apiKey = getApiKey(args);
    const defaultsUsed: string[] = [];
    const query = resolveLocation(args, defaultsUsed);
    if (!query) return { error: "location is required (suburb name or postcode), or set WILLYWEATHER_HOME_LOCATION." };

    const loc = await searchLocation(apiKey, query);
    if (!loc) return { error: `Location "${query}" not found in WillyWeather.` };

    const days = Math.min(7, Math.max(1, Number(args.days ?? 2)));
    const data = await willyGet(apiKey, `/locations/${loc.id}/weather.json`, {
      forecasts: "tides",
      days: String(days),
    }) as Record<string, unknown>;

    const forecasts = data["forecasts"] as Record<string, unknown> | undefined;

    return stamp({
      location: `${loc.name}, ${loc.state}`,
      location_id: loc.id,
      days_requested: days,
      tides: forecasts?.["tides"],
    }, { source: WILLY_SOURCE, defaultsUsed, nextSteps: ["Use get_willyweather_forecast for the broader weather outlook."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
