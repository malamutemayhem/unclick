// Klaviyo integration for the UnClick MCP server.
// Uses the Klaviyo REST API via fetch - no external dependencies.
// Auth: a private API key sent as "Authorization: Klaviyo-API-Key <key>" with a
// pinned API revision. Create one at https://www.klaviyo.com/settings/account/api-keys.

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";

const KLAVIYO_BASE = "https://a.klaviyo.com/api";
const KLAVIYO_REVISION = "2024-10-15";
const KLAVIYO_SOURCE = "Klaviyo API";

function requireKey(args: Record<string, unknown>): string | NotConnectedResult {
  return requireCredential("klaviyo", args);
}

async function klFetch<T>(apiKey: string, path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${KLAVIYO_BASE}${path}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const KLAVIYO_TIMEOUT_MS = Number(process.env.KLAVIYO_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), KLAVIYO_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url.toString(), {
      headers: {
        Authorization: `Klaviyo-API-Key ${apiKey}`,
        revision: KLAVIYO_REVISION,
        Accept: "application/json",
      },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Klaviyo request timed out after ${KLAVIYO_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Klaviyo network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) throw new Error("Klaviyo rate limit reached (HTTP 429). Please wait and retry.");
  const data = await res.json().catch(() => ({})) as Record<string, unknown>;
  if (!res.ok) {
    const errors = data.errors as Array<{ detail?: string }> | undefined;
    const msg = errors?.map((e) => e.detail).join(", ") ?? `status ${res.status}`;
    throw new Error(`Klaviyo error (${res.status}): ${msg}`);
  }
  return data as T;
}

function stamp(result: unknown, nextSteps: string[]): Record<string, unknown> {
  return stampMeta(result, { source: KLAVIYO_SOURCE, fetched_at: new Date().toISOString(), next_steps: nextSteps });
}

// ─── Operations ───────────────────────────────────────────────────────────────

export async function klaviyoListLists(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = requireKey(args);
  if (typeof apiKey !== "string") return apiKey;
  const data = await klFetch(apiKey, "/lists");
  return stamp(data, ["Use klaviyo_list_profiles to see who is subscribed, or klaviyo_list_segments for dynamic groups."]);
}

export async function klaviyoListSegments(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = requireKey(args);
  if (typeof apiKey !== "string") return apiKey;
  const data = await klFetch(apiKey, "/segments");
  return stamp(data, ["Use klaviyo_list_metrics to find events you can segment on."]);
}

export async function klaviyoListMetrics(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = requireKey(args);
  if (typeof apiKey !== "string") return apiKey;
  const data = await klFetch(apiKey, "/metrics");
  return stamp(data, ["Use klaviyo_list_segments to build a group from one of these metrics."]);
}

export async function klaviyoListProfiles(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = requireKey(args);
  if (typeof apiKey !== "string") return apiKey;
  const params: Record<string, string> = { "page[size]": String(Math.min(100, Number(args.limit) || 20)) };
  if (args.filter) params.filter = String(args.filter);
  const data = await klFetch(apiKey, "/profiles", params);
  return stamp(data, ["Use klaviyo_list_lists to see which lists a profile belongs to."]);
}
