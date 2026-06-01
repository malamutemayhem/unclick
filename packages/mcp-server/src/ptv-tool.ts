// Public Transport Victoria (PTV) Timetable API v3 integration.
// Source: Licensed from Public Transport Victoria under a Creative Commons Attribution 4.0 International Licence.
// HMAC-SHA1 signature required on every request.
// Env vars: PTV_USER_ID, PTV_API_KEY

import { createHmac } from "node:crypto";

import { emitConnectorSignal } from "./signals/emit.js";

const PTV_BASE = "https://timetableapi.ptv.vic.gov.au";
const PTV_ATTRIBUTION =
  "Source: Licensed from Public Transport Victoria under a Creative Commons Attribution 4.0 International Licence.";

// ─── Signature helper ─────────────────────────────────────────────────────────

function buildPtvUrl(path: string, params: Record<string, string>): string {
  const userId = process.env["PTV_USER_ID"] ?? "3003726";
  const apiKey = process.env["PTV_API_KEY"] ?? "4feb0abc-01a2-438f-a1ac-602e4bce0df1";

  // Add devid to query params before signing
  const allParams = new URLSearchParams({ ...params, devid: userId });
  const querystring = allParams.toString();

  // Sign: HMAC-SHA1(path + "?" + querystring, apiKey) as uppercase hex
  const signingString = `${path}?${querystring}`;
  const signature = createHmac("sha1", apiKey)
    .update(signingString)
    .digest("hex")
    .toUpperCase();

  return `${PTV_BASE}${path}?${querystring}&signature=${signature}`;
}

const PTV_TIMEOUT_MS = Number(process.env.PTV_TIMEOUT_MS) || 10000;

async function ptvFetch(path: string, params: Record<string, string> = {}): Promise<unknown> {
  const url = buildPtvUrl(path, params);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), PTV_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url, {
      headers: { "User-Agent": "UnClickMCP/1.0 (https://unclick.io)" },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`PTV API request timed out after ${PTV_TIMEOUT_MS}ms.`, { cause: err });
    }
    throw new Error(`PTV API network error: ${err instanceof Error ? err.message : String(err)}`, { cause: err });
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`PTV API rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`PTV API HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<unknown>;
}

function stringArg(args: Record<string, unknown>, key: string, envKey?: string): string {
  const value = args[key] ?? (envKey ? process.env[envKey] : undefined);
  return String(value ?? "").trim();
}

function numberArg(args: Record<string, unknown>, key: string, envKey: string, fallback: number): number {
  const value = args[key] ?? process.env[envKey];
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function addPtvMeta(result: unknown, tool: string, defaultsUsed: string[]): unknown {
  const meta = {
    source: "PTV Timetable API v3",
    attribution: PTV_ATTRIBUTION,
    fetched_at: new Date().toISOString(),
    defaults_used: defaultsUsed,
    next_steps:
      tool === "ptv_search"
        ? ["Use a returned stop_id with ptv_departures."]
        : tool === "ptv_disruptions"
          ? ["Use ptv_departures for live times on an affected stop."]
          : ["Use ptv_disruptions to check service disruptions for the same route type."],
  };

  if (result && typeof result === "object" && !Array.isArray(result)) {
    return { ...(result as Record<string, unknown>), unclick_meta: meta };
  }
  return { data: result, unclick_meta: meta };
}

// Route type codes
// 0 = Train (metro), 1 = Tram, 2 = Bus, 3 = Vline (regional train), 4 = Night Bus

// ─── ptv_search ───────────────────────────────────────────────────────────────
// GET /v3/search/{query}

export async function ptvSearch(args: Record<string, unknown>): Promise<unknown> {
  // Schema advertises `search_term`; accept `query` as an alias for back-compat.
  const query = String(args.search_term ?? args.query ?? "").trim();
  if (!query) return { error: "search_term is required." };

  const result = await ptvFetch(`/v3/search/${encodeURIComponent(query)}`);
  return addPtvMeta(result, "ptv_search", []);
}

// ─── ptv_departures ───────────────────────────────────────────────────────────
// GET /v3/departures/route_type/{route_type}/stop/{stop_id}

export async function ptvDepartures(args: Record<string, unknown>): Promise<unknown> {
  const stopId = stringArg(args, "stop_id", "PTV_HOME_STOP_ID");
  if (!stopId) return { error: "stop_id is required." };

  const defaultsUsed = Array.isArray(args.__unclick_memory_defaults)
    ? args.__unclick_memory_defaults.filter((value): value is string => typeof value === "string")
    : [];
  if (args.stop_id === undefined && process.env.PTV_HOME_STOP_ID) defaultsUsed.push("PTV_HOME_STOP_ID");

  const routeType = numberArg(args, "route_type", "PTV_HOME_ROUTE_TYPE", 0);
  if (args.route_type === undefined && process.env.PTV_HOME_ROUTE_TYPE) defaultsUsed.push("PTV_HOME_ROUTE_TYPE");
  const params: Record<string, string> = {};

  const maxResults = numberArg(args, "max_results", "PTV_DEFAULT_MAX_RESULTS", 5);
  if (maxResults > 0) params["max_results"] = String(Math.min(20, maxResults));

  const routeId = stringArg(args, "route_id", "PTV_HOME_ROUTE_ID");
  if (routeId) {
    params["route_id"] = routeId;
    if (args.route_id === undefined && process.env.PTV_HOME_ROUTE_ID) defaultsUsed.push("PTV_HOME_ROUTE_ID");
  }

  const directionId = stringArg(args, "direction_id", "PTV_HOME_DIRECTION_ID");
  if (directionId) {
    params["direction_id"] = directionId;
    if (args.direction_id === undefined && process.env.PTV_HOME_DIRECTION_ID) defaultsUsed.push("PTV_HOME_DIRECTION_ID");
  }

  if (args.look_backwards === true) params["look_backwards"] = "true";
  if (args.include_cancelled === true) params["include_cancelled"] = "true";

  const result = await ptvFetch(`/v3/departures/route_type/${routeType}/stop/${stopId}`, params);
  return addPtvMeta(result, "ptv_departures", defaultsUsed);
}

// ─── ptv_disruptions ──────────────────────────────────────────────────────────
// GET /v3/disruptions

// Counts disruption entries across every PTV mode bucket in a /v3/disruptions
// response ({ disruptions: { metro_train: [...], metro_tram: [...], ... } }).
export function countDisruptions(result: unknown): number {
  const buckets = (result as { disruptions?: Record<string, unknown> } | null)?.disruptions;
  if (!buckets || typeof buckets !== "object") return 0;
  let total = 0;
  for (const value of Object.values(buckets)) {
    if (Array.isArray(value)) total += value.length;
  }
  return total;
}

export async function ptvDisruptions(args: Record<string, unknown>): Promise<unknown> {
  const params: Record<string, string> = {};

  if (args.route_type !== undefined) {
    params["route_types"] = String(args.route_type);
  }
  if (args.disruption_status) {
    params["disruption_status"] = String(args.disruption_status);
  }

  const result = await ptvFetch("/v3/disruptions", params);

  // L4 proactive: when the network is actually disrupted, drop a signal into the
  // caller's own inbox so the next check_signals surfaces it instead of the agent
  // having to think to ask. Fire-and-forget and scoped to the caller's key.
  const disrupted = countDisruptions(result);
  if (disrupted > 0) {
    void emitConnectorSignal({
      tool: "ptv_disruptions",
      action: "disruptions_active",
      severity: "action_needed",
      summary: `${disrupted} active PTV disruption${disrupted === 1 ? "" : "s"} on the network.`,
      deepLink: "/tools/ptv",
      payload: { active_count: disrupted, route_type: args.route_type ?? null },
    });
  }

  return addPtvMeta(result, "ptv_disruptions", []);
}

// ─── ptv_stops_on_route ───────────────────────────────────────────────────────
// GET /v3/stops/route/{route_id}/route_type/{route_type}

export async function ptvStopsOnRoute(args: Record<string, unknown>): Promise<unknown> {
  const routeId = String(args.route_id ?? "").trim();
  if (!routeId) return { error: "route_id is required." };

  const routeType = Number(args.route_type ?? 0);
  const params: Record<string, string> = {};

  if (args.direction_id) params["direction_id"] = String(args.direction_id);

  return ptvFetch(`/v3/stops/route/${routeId}/route_type/${routeType}`, params);
}

// ─── ptv_route_directions ────────────────────────────────────────────────────
// GET /v3/directions/route/{route_id}

export async function ptvRouteDirections(args: Record<string, unknown>): Promise<unknown> {
  const routeId = String(args.route_id ?? "").trim();
  if (!routeId) return { error: "route_id is required." };

  return ptvFetch(`/v3/directions/route/${routeId}`);
}
