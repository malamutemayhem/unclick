// Sunrise Sunset API - sunrise and sunset times by coordinates.
// No API key required - completely free and open.
// Base URL: https://api.sunrise-sunset.org/

import { stampMeta } from "./connector-meta.js";

const BASE = "https://api.sunrise-sunset.org";
const TIMEOUT_MS = Number(process.env.SUNRISESUNSET_TIMEOUT_MS) || 10000;

async function ssFetch<T>(path: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${BASE}${path}`, {
      headers: { "User-Agent": "UnClickMCP/1.0 (https://unclick.io)" },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Sunrise-Sunset request timed out after ${TIMEOUT_MS}ms.`);
    }
    throw new Error(`Sunrise-Sunset network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Sunrise-Sunset rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Sunrise-Sunset HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

const META = { source: "sunrise-sunset.org" };

export async function sunriseSunsetTimes(args: Record<string, unknown>): Promise<unknown> {
  const lat = Number(args.lat ?? args.latitude ?? 0);
  const lng = Number(args.lng ?? args.lon ?? args.longitude ?? 0);
  if (!lat && !lng) return { error: "lat and lng are required (GPS coordinates)." };
  const date = args.date ? String(args.date) : "today";
  try {
    const data = await ssFetch(`/json?lat=${lat}&lng=${lng}&date=${encodeURIComponent(date)}&formatted=0`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Change date param for a different day's sunrise/sunset.", "Times are in UTC; convert to local timezone as needed."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
