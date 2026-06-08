// Zippopotam.us - zip/postal code lookup.
// No API key required - completely free and open.
// Base URL: https://api.zippopotam.us/

import { stampMeta } from "./connector-meta.js";

const BASE = "https://api.zippopotam.us";
const TIMEOUT_MS = Number(process.env.ZIPPOPOTAMUS_TIMEOUT_MS) || 10000;

async function zpFetch<T>(path: string): Promise<T> {
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
      throw new Error(`Zippopotamus request timed out after ${TIMEOUT_MS}ms.`);
    }
    throw new Error(`Zippopotamus network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Zippopotamus rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Zippopotamus HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

const META = { source: "zippopotam.us" };

export async function zipLookup(args: Record<string, unknown>): Promise<unknown> {
  const country = String(args.country ?? "us").toLowerCase();
  const code = String(args.code ?? args.zip ?? "");
  if (!code) return { error: "code (zip/postal code) is required." };
  try {
    const data = await zpFetch(`/${encodeURIComponent(country)}/${encodeURIComponent(code)}`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Try different country codes: us, gb, au, ca, de, fr, etc.", "Use zip_by_city to look up codes by city name."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function zipByCity(args: Record<string, unknown>): Promise<unknown> {
  const country = String(args.country ?? "us").toLowerCase();
  const state = String(args.state ?? "");
  const city = String(args.city ?? "");
  if (!state || !city) return { error: "state and city are required (e.g. state='CA', city='San Francisco')." };
  try {
    const data = await zpFetch(`/${encodeURIComponent(country)}/${encodeURIComponent(state)}/${encodeURIComponent(city)}`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use zip_lookup to get details for a specific zip code."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
