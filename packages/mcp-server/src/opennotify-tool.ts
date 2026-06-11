// Open Notify API - ISS location and astronauts in space.
// No API key required - completely free and open.
// Base URL: http://api.open-notify.org/

import { stampMeta } from "./connector-meta.js";

const BASE = "http://api.open-notify.org";
const TIMEOUT_MS = Number(process.env.OPENNOTIFY_TIMEOUT_MS) || 10000;

async function issFetch<T>(path: string): Promise<T> {
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
      throw new Error(`Open Notify request timed out after ${TIMEOUT_MS}ms.`);
    }
    throw new Error(`Open Notify network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Open Notify rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Open Notify HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

const META = { source: "open-notify.org" };

export async function issLocation(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await issFetch("/iss-now.json");
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use iss_astronauts to see who is currently in space."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function issAstronauts(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await issFetch("/astros.json");
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use iss_location to see where the ISS is right now."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
