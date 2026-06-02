// Cal.com scheduling integration for the UnClick MCP server.
// Uses the Cal.com REST API v1 via fetch - no external dependencies.
// Auth: an API key passed as the apiKey query parameter. Create one at
// https://app.cal.com/settings/developer/api-keys.

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";

const CALCOM_BASE = "https://api.cal.com/v1";
const CALCOM_SOURCE = "Cal.com API v1";

function requireKey(args: Record<string, unknown>): string | NotConnectedResult {
  return requireCredential("calcom", args);
}

async function calFetch<T>(apiKey: string, path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${CALCOM_BASE}${path}`);
  url.searchParams.set("apiKey", apiKey);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const CALCOM_TIMEOUT_MS = Number(process.env.CALCOM_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CALCOM_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Cal.com request timed out after ${CALCOM_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Cal.com network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) throw new Error("Cal.com rate limit reached (HTTP 429). Please wait and retry.");
  const data = await res.json().catch(() => ({})) as Record<string, unknown>;
  if (!res.ok) {
    const msg = (data.message as string) ?? (data.error as string) ?? `status ${res.status}`;
    throw new Error(`Cal.com error (${res.status}): ${msg}`);
  }
  return data as T;
}

function stamp(result: unknown, nextSteps: string[]): Record<string, unknown> {
  return stampMeta(result, { source: CALCOM_SOURCE, fetched_at: new Date().toISOString(), next_steps: nextSteps });
}

// ─── Operations ───────────────────────────────────────────────────────────────

export async function calcomMe(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = requireKey(args);
  if (typeof apiKey !== "string") return apiKey;
  const data = await calFetch(apiKey, "/me");
  return stamp(data, ["Use calcom_list_event_types to see your bookable meeting types."]);
}

export async function calcomListEventTypes(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = requireKey(args);
  if (typeof apiKey !== "string") return apiKey;
  const data = await calFetch(apiKey, "/event-types");
  return stamp(data, ["Use calcom_list_bookings to see who has booked these event types."]);
}

export async function calcomListBookings(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = requireKey(args);
  if (typeof apiKey !== "string") return apiKey;
  const params: Record<string, string> = {};
  if (args.status) params.status = String(args.status);
  const data = await calFetch(apiKey, "/bookings", params);
  return stamp(data, ["Use calcom_list_event_types to see the meeting types these bookings belong to."]);
}
