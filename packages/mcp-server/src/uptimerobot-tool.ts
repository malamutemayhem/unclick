// UptimeRobot integration for the UnClick MCP server.
// Uses the UptimeRobot API v2 via fetch - no external dependencies.
// Auth: an API key posted as a form field (api_key). Get one at
// https://uptimerobot.com/dashboard#mySettings (Main or Read-Only API key).

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";
import { emitConnectorSignal } from "./signals/emit.js";

const UPTIMEROBOT_BASE = "https://api.uptimerobot.com/v2";
const UPTIMEROBOT_SOURCE = "UptimeRobot API v2";

function requireKey(args: Record<string, unknown>): string | NotConnectedResult {
  return requireCredential("uptimerobot", args);
}

async function urPost<T>(key: string, path: string, extra?: Record<string, string>): Promise<T> {
  const body = new URLSearchParams({ api_key: key, format: "json", ...(extra ?? {}) });
  const UPTIMEROBOT_TIMEOUT_MS = Number(process.env.UPTIMEROBOT_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), UPTIMEROBOT_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${UPTIMEROBOT_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
      body: body.toString(),
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") throw new Error(`UptimeRobot request timed out after ${UPTIMEROBOT_TIMEOUT_MS}ms.`);
    throw new Error(`UptimeRobot network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) throw new Error("UptimeRobot rate limit reached (HTTP 429). Please wait and retry.");
  const data = await res.json().catch(() => ({})) as Record<string, unknown>;
  if (!res.ok || data.stat === "fail") {
    const e = data.error as { message?: string } | undefined;
    throw new Error(`UptimeRobot error (${res.status}): ${e?.message ?? `status ${res.status}`}`);
  }
  return data as T;
}

function stamp(result: unknown, nextSteps: string[]): Record<string, unknown> {
  return stampMeta(result, { source: UPTIMEROBOT_SOURCE, fetched_at: new Date().toISOString(), next_steps: nextSteps });
}

export async function uptimerobotGetMonitors(args: Record<string, unknown>): Promise<unknown> {
  const key = requireKey(args);
  if (typeof key !== "string") return key;
  const extra: Record<string, string> = {};
  if (args.search) extra.search = String(args.search);
  const data = await urPost<{ monitors?: Array<{ status?: number; friendly_name?: string }> }>(key, "/getMonitors", extra);

  // L4 proactive: status 9 = DOWN. Signal the caller's own inbox when any monitor
  // is down, so the next check_signals surfaces it.
  const down = (data.monitors ?? []).filter((m) => m?.status === 9);
  if (down.length > 0) {
    void emitConnectorSignal({
      tool: "uptimerobot_get_monitors",
      action: "monitors_down",
      severity: "critical",
      summary: `${down.length} UptimeRobot monitor${down.length === 1 ? "" : "s"} are DOWN${down[0]?.friendly_name ? ` (e.g. ${down[0].friendly_name})` : ""}.`,
      deepLink: "/tools/uptimerobot",
      payload: { down_count: down.length },
    });
  }

  return stamp(data, ["Use uptimerobot_get_account for plan limits, or investigate any monitor in the DOWN (status 9) state."]);
}

export async function uptimerobotGetAccount(args: Record<string, unknown>): Promise<unknown> {
  const key = requireKey(args);
  if (typeof key !== "string") return key;
  const data = await urPost(key, "/getAccountDetails");
  return stamp(data, ["Use uptimerobot_get_monitors to see the state of each monitor."]);
}
