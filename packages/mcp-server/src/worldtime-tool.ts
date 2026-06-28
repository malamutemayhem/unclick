// World Time API - current time by timezone.
// No API key required - completely free and open.
// Base URL: https://worldtimeapi.org/api/

import { stampMeta } from "./connector-meta.js";

const BASE = "https://worldtimeapi.org/api";
const TIMEOUT_MS = Number(process.env.WORLDTIME_TIMEOUT_MS) || 10000;

async function wtFetch<T>(path: string): Promise<T> {
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
      throw new Error(`WorldTimeAPI request timed out after ${TIMEOUT_MS}ms.`);
    }
    throw new Error(`WorldTimeAPI network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`WorldTimeAPI rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`WorldTimeAPI HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

const META = { source: "worldtimeapi.org" };

export async function worldTimeByTimezone(args: Record<string, unknown>): Promise<unknown> {
  const tz = String(args.timezone ?? "");
  if (!tz) return { error: "timezone is required (e.g. 'America/New_York', 'Europe/London')." };
  try {
    const data = await wtFetch(`/timezone/${encodeURIComponent(tz)}`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use worldtime_list_timezones to see all available timezones.", "Use worldtime_by_ip to get time for your IP."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function worldTimeByIp(args: Record<string, unknown>): Promise<unknown> {
  const ip = args.ip ? String(args.ip) : "";
  try {
    const path = ip ? `/ip/${encodeURIComponent(ip)}` : "/ip";
    const data = await wtFetch(path);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use worldtime_by_timezone for a specific timezone."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function worldTimeListTimezones(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await wtFetch<string[]>("/timezone");
    return stampMeta({ count: data.length, timezones: data }, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use worldtime_by_timezone with a timezone name for current time."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
