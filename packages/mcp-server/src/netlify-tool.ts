// Netlify integration for the UnClick MCP server.
// Uses the Netlify REST API v1 via fetch - no external dependencies.
// Auth: a Personal access token (Authorization: Bearer) from
// https://app.netlify.com/user/applications#personal-access-tokens.

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";
import { emitConnectorSignal } from "./signals/emit.js";

const NETLIFY_BASE = "https://api.netlify.com/api/v1";
const NETLIFY_SOURCE = "Netlify API v1";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function requireToken(args: Record<string, unknown>): string | NotConnectedResult {
  return requireCredential("netlify", args);
}

function collectDefaults(args: Record<string, unknown>): string[] {
  return Array.isArray(args.__unclick_memory_defaults)
    ? args.__unclick_memory_defaults.filter((v): v is string => typeof v === "string")
    : [];
}

async function netlifyFetch<T>(
  token: string,
  path: string,
  params?: Record<string, string>,
): Promise<T> {
  const url = new URL(`${NETLIFY_BASE}${path}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const NETLIFY_TIMEOUT_MS = Number(process.env.NETLIFY_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), NETLIFY_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Netlify request timed out after ${NETLIFY_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Netlify network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) throw new Error("Netlify rate limit reached (HTTP 429). Please wait and retry.");
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = (data as { message?: string })?.message ?? `status ${res.status}`;
    throw new Error(`Netlify error (${res.status}): ${msg}`);
  }
  return data as T;
}

function stamp(result: unknown, nextSteps: string[], defaultsUsed: string[] = []): Record<string, unknown> {
  return stampMeta(result, {
    source: NETLIFY_SOURCE,
    fetched_at: new Date().toISOString(),
    defaults_used: defaultsUsed,
    next_steps: nextSteps,
  });
}

// ─── Operations ───────────────────────────────────────────────────────────────

export async function netlifyListSites(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const params: Record<string, string> = { per_page: String(Math.min(100, Number(args.limit) || 25)) };
  if (args.name) params.name = String(args.name);
  const data = await netlifyFetch(token, "/sites", params);
  return stamp(data, ["Use netlify_list_deploys with a site_id to check deploy health, or save a site_id as a default."]);
}

export async function netlifyGetSite(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const siteId = String(args.site_id ?? "").trim();
  if (!siteId) return { error: "site_id is required (save one as a default so you can omit it)." };
  const data = await netlifyFetch(token, `/sites/${encodeURIComponent(siteId)}`);
  return stamp(data, ["Use netlify_list_deploys for this site's recent deploys."], collectDefaults(args));
}

export async function netlifyListDeploys(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const siteId = String(args.site_id ?? "").trim();
  if (!siteId) return { error: "site_id is required (save one as a default so you can omit it)." };
  const params: Record<string, string> = { per_page: String(Math.min(100, Number(args.limit) || 10)) };
  const data = await netlifyFetch<unknown[]>(token, `/sites/${encodeURIComponent(siteId)}/deploys`, params);

  // L4 proactive: a failed (error-state) latest deploy is user-actionable, so
  // signal the caller's own inbox when the most recent deploy errored.
  const deploys = Array.isArray(data) ? data : [];
  const latest = deploys[0] as { state?: string; error_message?: string } | undefined;
  if (latest?.state === "error") {
    void emitConnectorSignal({
      tool: "netlify_list_deploys",
      action: "deploy_failed",
      severity: "action_needed",
      summary: `Latest Netlify deploy for site ${siteId} failed: ${latest.error_message ?? "build error"}.`,
      deepLink: "/tools/netlify",
      payload: { site_id: siteId },
    });
  }

  return stamp(data, ["Use netlify_get_deploy for the failed build's logs, or netlify_get_site for site detail."], collectDefaults(args));
}

export async function netlifyGetDeploy(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const deployId = String(args.deploy_id ?? "").trim();
  if (!deployId) return { error: "deploy_id is required." };
  const data = await netlifyFetch(token, `/deploys/${encodeURIComponent(deployId)}`);
  return stamp(data, ["Use netlify_list_deploys to compare against earlier deploys."]);
}
