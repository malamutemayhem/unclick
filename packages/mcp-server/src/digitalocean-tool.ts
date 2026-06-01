// DigitalOcean integration for the UnClick MCP server.
// Uses the DigitalOcean API v2 via fetch - no external dependencies.
// Auth: a personal access token (Authorization: Bearer) from
// https://cloud.digitalocean.com/account/api/tokens.

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";
import { emitConnectorSignal } from "./signals/emit.js";

const DO_BASE = "https://api.digitalocean.com/v2";
const DO_SOURCE = "DigitalOcean API v2";

function requireToken(args: Record<string, unknown>): string | NotConnectedResult {
  return requireCredential("digitalocean", args);
}

async function doFetch<T>(token: string, path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${DO_BASE}${path}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const DO_TIMEOUT_MS = Number(process.env.DIGITALOCEAN_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), DO_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`DigitalOcean request timed out after ${DO_TIMEOUT_MS}ms.`);
    }
    throw new Error(`DigitalOcean network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) throw new Error("DigitalOcean rate limit reached (HTTP 429). Please wait and retry.");
  const data = await res.json().catch(() => ({})) as Record<string, unknown>;
  if (!res.ok) {
    const msg = (data.message as string) ?? (data.id as string) ?? `status ${res.status}`;
    throw new Error(`DigitalOcean error (${res.status}): ${msg}`);
  }
  return data as T;
}

function stamp(result: unknown, nextSteps: string[]): Record<string, unknown> {
  return stampMeta(result, { source: DO_SOURCE, fetched_at: new Date().toISOString(), next_steps: nextSteps });
}

// ─── Operations ───────────────────────────────────────────────────────────────

export async function doListDroplets(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const params: Record<string, string> = { per_page: String(Math.min(200, Number(args.limit) || 25)) };
  if (args.tag_name) params.tag_name = String(args.tag_name);
  const data = await doFetch<{ droplets?: Array<{ status?: string; name?: string }> }>(token, "/droplets", params);

  // L4 proactive: a droplet in the "off" state may be an unexpected outage, so
  // signal the caller's own inbox when any are powered off.
  const offCount = (data.droplets ?? []).filter((d) => d?.status === "off").length;
  if (offCount > 0) {
    void emitConnectorSignal({
      tool: "do_list_droplets",
      action: "droplets_off",
      severity: "action_needed",
      summary: `${offCount} DigitalOcean droplet${offCount === 1 ? "" : "s"} are powered off.`,
      deepLink: "/tools/digitalocean",
      payload: { off_count: offCount },
    });
  }

  return stamp(data, ["Use do_list_databases for managed databases, or do_list_apps for App Platform apps."]);
}

export async function doListApps(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const params: Record<string, string> = { per_page: String(Math.min(200, Number(args.limit) || 25)) };
  const data = await doFetch(token, "/apps", params);
  return stamp(data, ["Use do_list_droplets for raw VMs, or do_account for account limits."]);
}

export async function doListDatabases(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const data = await doFetch(token, "/databases");
  return stamp(data, ["Use do_list_apps to see which apps consume these databases."]);
}

export async function doAccount(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const data = await doFetch(token, "/account");
  return stamp(data, ["Use do_list_droplets to see usage against these limits."]);
}
