// Datadog API integration for the UnClick MCP server.
// Uses the Datadog REST API via fetch - no external dependencies.
// Users must supply DD-API-KEY and DD-APPLICATION-KEY from app.datadoghq.com.

import { notConnectedFor } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";
import { emitConnectorSignal } from "./signals/emit.js";

const DD_BASE = "https://api.datadoghq.com/api/v1";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function requireKeys(args: Record<string, unknown>): { apiKey: string; appKey: string } | NotConnectedResult {
  const apiKey = String(args.api_key ?? process.env.DD_API_KEY ?? "").trim();
  const appKey = String(args.app_key ?? process.env.DD_APP_KEY ?? "").trim();
  if (!apiKey || !appKey) return notConnectedFor("datadog");
  return { apiKey, appKey };
}

async function ddGet<T>(apiKey: string, appKey: string, path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${DD_BASE}${path}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const DATADOG_TIMEOUT_MS = Number(process.env.DATADOG_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), DATADOG_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url.toString(), {
      headers: { "DD-API-KEY": apiKey, "DD-APPLICATION-KEY": appKey },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Datadog request timed out after ${DATADOG_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Datadog network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) throw new Error("Datadog rate limit reached (HTTP 429). Please wait and retry.");
  const data = await res.json() as Record<string, unknown>;
  if (!res.ok) {
    const msg = (data.errors as string[])?.join(", ") ?? (data.error as string) ?? `status ${res.status}`;
    throw new Error(`Datadog error (${res.status}): ${msg}`);
  }
  return data as T;
}

async function ddPost<T>(apiKey: string, appKey: string, path: string, body: unknown): Promise<T> {
  const DATADOG_TIMEOUT_MS = Number(process.env.DATADOG_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), DATADOG_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${DD_BASE}${path}`, {
      method: "POST",
      headers: {
        "DD-API-KEY": apiKey,
        "DD-APPLICATION-KEY": appKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Datadog request timed out after ${DATADOG_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Datadog network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) throw new Error("Datadog rate limit reached (HTTP 429). Please wait and retry.");
  const data = await res.json() as Record<string, unknown>;
  if (!res.ok) {
    const msg = (data.errors as string[])?.join(", ") ?? (data.error as string) ?? `status ${res.status}`;
    throw new Error(`Datadog error (${res.status}): ${msg}`);
  }
  return data as T;
}

// ─── Operations ───────────────────────────────────────────────────────────────

export async function datadogListMonitors(args: Record<string, unknown>): Promise<unknown> {
  const _keys = requireKeys(args);
  if ("not_connected" in _keys) return _keys;
  const { apiKey, appKey } = _keys;
  const params: Record<string, string> = {};
  if (args.name) params.name = String(args.name);
  if (args.tags) params.monitor_tags = String(args.tags);
  if (args.page) params.page = String(args.page);
  if (args.page_size) params.page_size = String(Math.min(1000, Number(args.page_size)));
  const data = await ddGet<unknown[]>(apiKey, appKey, "/monitor", params);

  // L4 proactive: monitors sitting in the Alert state are user-actionable, so
  // signal the caller's own inbox when any are firing.
  const alerting = (Array.isArray(data) ? data : []).filter(
    (m) => (m as { overall_state?: string } | null)?.overall_state === "Alert",
  ).length;
  if (alerting > 0) {
    void emitConnectorSignal({
      tool: "datadog_list_monitors",
      action: "monitors_alerting",
      severity: "action_needed",
      summary: `${alerting} Datadog monitor${alerting === 1 ? "" : "s"} in the Alert state.`,
      deepLink: "/tools/datadog",
      payload: { alerting_count: alerting },
    });
  }

  return stampMeta({ count: Array.isArray(data) ? data.length : 0, monitors: data }, {
    source: "Datadog",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use datadog_get_monitor for a monitor, or datadog_query_metrics for metric data."],
  });
}

export async function datadogGetMonitor(args: Record<string, unknown>): Promise<unknown> {
  const _keys = requireKeys(args);
  if ("not_connected" in _keys) return _keys;
  const { apiKey, appKey } = _keys;
  const id = String(args.monitor_id ?? "").trim();
  if (!id) throw new Error("monitor_id is required.");
  return ddGet(apiKey, appKey, `/monitor/${encodeURIComponent(id)}`);
}

export async function datadogCreateMonitor(args: Record<string, unknown>): Promise<unknown> {
  const _keys = requireKeys(args);
  if ("not_connected" in _keys) return _keys;
  const { apiKey, appKey } = _keys;
  const type = String(args.type ?? "metric alert");
  const query = String(args.query ?? "").trim();
  const name  = String(args.name ?? "").trim();
  if (!query) throw new Error("query is required (monitor query expression).");
  if (!name)  throw new Error("name is required.");

  const body: Record<string, unknown> = { type, query, name };
  if (args.message)  body.message  = String(args.message);
  if (args.tags)     body.tags     = Array.isArray(args.tags) ? args.tags : [String(args.tags)];
  if (args.priority) body.priority = Number(args.priority);
  if (args.options)  body.options  = args.options;

  return ddPost(apiKey, appKey, "/monitor", body);
}

export async function datadogListDashboards(args: Record<string, unknown>): Promise<unknown> {
  const _keys = requireKeys(args);
  if ("not_connected" in _keys) return _keys;
  const { apiKey, appKey } = _keys;
  const params: Record<string, string> = {};
  if (args.filter_shared !== undefined) params.filter_shared = String(args.filter_shared);
  const data = await ddGet<{ dashboards: unknown[] }>(apiKey, appKey, "/dashboard", params);
  return { count: data.dashboards?.length ?? 0, dashboards: data.dashboards ?? [] };
}

export async function datadogQueryMetrics(args: Record<string, unknown>): Promise<unknown> {
  const _keys = requireKeys(args);
  if ("not_connected" in _keys) return _keys;
  const { apiKey, appKey } = _keys;
  const query = String(args.query ?? "").trim();
  if (!query) throw new Error("query is required (Datadog metric query e.g. avg:system.cpu.user{*}).");

  const now  = Math.floor(Date.now() / 1000);
  const from = Number(args.from ?? (now - 3600));
  const to   = Number(args.to ?? now);

  return ddGet(apiKey, appKey, "/query", { query, from: String(from), to: String(to) });
}

export async function datadogListEvents(args: Record<string, unknown>): Promise<unknown> {
  const _keys = requireKeys(args);
  if ("not_connected" in _keys) return _keys;
  const { apiKey, appKey } = _keys;
  const now   = Math.floor(Date.now() / 1000);
  const start = Number(args.start ?? (now - 3600));
  const end   = Number(args.end ?? now);

  const params: Record<string, string> = { start: String(start), end: String(end) };
  if (args.priority) params.priority = String(args.priority);
  if (args.sources)  params.sources  = String(args.sources);
  if (args.tags)     params.tags     = String(args.tags);

  const data = await ddGet<{ events: unknown[] }>(apiKey, appKey, "/events", params);
  return { count: data.events?.length ?? 0, events: data.events ?? [] };
}
