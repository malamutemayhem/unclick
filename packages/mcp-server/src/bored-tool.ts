// Bored API - activity suggestions.
// No API key required - completely free and open.
// Base URL: https://bored-api.appbrewery.com/api/

import { stampMeta } from "./connector-meta.js";

const BASE = "https://bored-api.appbrewery.com/api";
const TIMEOUT_MS = Number(process.env.BORED_TIMEOUT_MS) || 10000;

async function boredFetch<T>(path: string): Promise<T> {
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
      throw new Error(`Bored API request timed out after ${TIMEOUT_MS}ms.`);
    }
    throw new Error(`Bored API network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Bored API rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Bored API HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

const META = { source: "bored-api.appbrewery.com" };

export async function boredRandom(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await boredFetch("/activity");
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use bored_by_type to filter activities by type.", "Use bored_by_participants to filter by participant count."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function boredByType(args: Record<string, unknown>): Promise<unknown> {
  const type = String(args.type ?? "").toLowerCase();
  if (!type) return { error: "type is required (education, recreational, social, diy, charity, cooking, relaxation, music, busywork)." };
  try {
    const data = await boredFetch(`/activity?type=${encodeURIComponent(type)}`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use bored_random for any activity."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function boredByParticipants(args: Record<string, unknown>): Promise<unknown> {
  const participants = Number(args.participants ?? 0);
  if (!participants || participants < 1) return { error: "participants is required (positive integer)." };
  try {
    const data = await boredFetch(`/activity?participants=${participants}`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use bored_by_type to filter by activity type."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
