// Mapbox APIs integration for the UnClick MCP server.
// Uses Mapbox REST APIs via fetch - no external dependencies.
// Users must supply an access token from account.mapbox.com.

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";
const MB_BASE = "https://api.mapbox.com";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function requireToken(args: Record<string, unknown>): string | NotConnectedResult {
  return requireCredential("mapbox", args);
}

const MAPBOX_TIMEOUT_MS = Number(process.env.MAPBOX_TIMEOUT_MS) || 10000;

async function mbFetch<T>(path: string, params: Record<string, string>): Promise<T> {
  const url = new URL(`${MB_BASE}${path}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), MAPBOX_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url.toString(), { signal: controller.signal });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Mapbox request timed out after ${MAPBOX_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Mapbox network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Mapbox rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  const data = await res.json() as Record<string, unknown>;
  if (!res.ok) {
    const msg = (data.message as string) ?? `status ${res.status}`;
    throw new Error(`Mapbox error (${res.status}): ${msg}`);
  }
  return data as T;
}

// ─── Operations ───────────────────────────────────────────────────────────────

export async function mapboxGeocodeForward(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const query = String(args.query ?? "").trim();
  if (!query) throw new Error("query is required (address or place name to geocode).");

  const params: Record<string, string> = { access_token: token };
  if (args.country) params.country = String(args.country);
  if (args.language) params.language = String(args.language);
  if (args.limit) params.limit = String(Math.min(10, Math.max(1, Number(args.limit))));
  if (args.proximity) params.proximity = String(args.proximity);
  if (args.types) params.types = String(args.types);

  const data = await mbFetch<{ features: unknown[]; attribution: string }>(
    `/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`,
    params
  );
  return stampMeta({
    query,
    count: data.features.length,
    attribution: data.attribution,
    features: data.features,
  }, {
    source: "Mapbox",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use mapbox_geocode_reverse for coordinates to address, or mapbox_get_directions for routing."],
  });
}

export async function mapboxGeocodeReverse(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const lng = Number(args.longitude ?? args.lng ?? NaN);
  const lat = Number(args.latitude ?? args.lat ?? NaN);
  if (isNaN(lng) || isNaN(lat)) throw new Error("longitude and latitude are required.");

  const params: Record<string, string> = { access_token: token };
  if (args.language) params.language = String(args.language);
  if (args.types) params.types = String(args.types);

  const data = await mbFetch<{ features: unknown[] }>(
    `/geocoding/v5/mapbox.places/${lng},${lat}.json`,
    params
  );
  return { longitude: lng, latitude: lat, features: data.features };
}

export async function mapboxGetDirections(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const coordinates = String(args.coordinates ?? "").trim();
  if (!coordinates) throw new Error("coordinates is required (semicolon-separated lng,lat pairs e.g. -122.4194,37.7749;-118.2437,34.0522).");
  const profile = String(args.profile ?? "mapbox/driving");

  const params: Record<string, string> = { access_token: token, geometries: "geojson" };
  if (args.alternatives !== undefined) params.alternatives = String(args.alternatives);
  if (args.steps !== undefined) params.steps = String(args.steps);
  if (args.overview) params.overview = String(args.overview);
  if (args.language) params.language = String(args.language);

  return mbFetch(
    `/directions/v5/${profile}/${coordinates}`,
    params
  );
}

export async function mapboxGetStaticMap(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const lng = Number(args.longitude ?? args.lng ?? NaN);
  const lat = Number(args.latitude ?? args.lat ?? NaN);
  const zoom = Number(args.zoom ?? 12);
  if (isNaN(lng) || isNaN(lat)) throw new Error("longitude and latitude are required.");

  const width = Math.min(1280, Math.max(1, Number(args.width ?? 600)));
  const height = Math.min(1280, Math.max(1, Number(args.height ?? 400)));
  const style = String(args.style ?? "mapbox/streets-v11");
  const retina = args.retina ? "@2x" : "";

  const url = `${MB_BASE}/styles/v1/${style}/static/${lng},${lat},${zoom}/${width}x${height}${retina}?access_token=${token}`;
  return { url, longitude: lng, latitude: lat, zoom, width, height, style };
}

export async function mapboxListTilesets(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const username = String(args.username ?? "").trim();
  if (!username) throw new Error("username is required (your Mapbox username).");

  const params: Record<string, string> = { access_token: token };
  if (args.limit) params.limit = String(Math.min(500, Math.max(1, Number(args.limit))));
  if (args.type) params.type = String(args.type);

  const data = await mbFetch<unknown[]>(`/tilesets/v1/${encodeURIComponent(username)}`, params);
  return { count: Array.isArray(data) ? data.length : 0, tilesets: data };
}
