// PostHog product-analytics integration for the UnClick MCP server.
// Uses the PostHog REST API via fetch - no external dependencies.
// Auth: a Personal API key (Authorization: Bearer) from
// https://app.posthog.com/settings/user-api-keys, plus a project_id. The default
// host is US Cloud; pass host (or set POSTHOG_HOST) for EU Cloud or self-hosted.

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";

const POSTHOG_SOURCE = "PostHog API";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function resolveHost(args: Record<string, unknown>): string {
  const raw = String(args.host ?? process.env.POSTHOG_HOST ?? "https://us.posthog.com").trim();
  return raw.replace(/\/+$/, "").replace(/^(?!https?:\/\/)/, "https://");
}

function resolveProjectId(args: Record<string, unknown>): string {
  return String(args.project_id ?? process.env.POSTHOG_PROJECT_ID ?? "").trim();
}

function collectDefaults(args: Record<string, unknown>): string[] {
  return Array.isArray(args.__unclick_memory_defaults)
    ? args.__unclick_memory_defaults.filter((v): v is string => typeof v === "string")
    : [];
}

async function phFetch<T>(
  host: string,
  apiKey: string,
  method: string,
  path: string,
  opts?: { params?: Record<string, string>; body?: unknown },
): Promise<T> {
  const url = new URL(`${host}${path}`);
  if (opts?.params) Object.entries(opts.params).forEach(([k, v]) => url.searchParams.set(k, v));
  const POSTHOG_TIMEOUT_MS = Number(process.env.POSTHOG_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), POSTHOG_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url.toString(), {
      method,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        ...(opts?.body ? { "Content-Type": "application/json" } : {}),
      },
      body: opts?.body ? JSON.stringify(opts.body) : undefined,
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`PostHog request timed out after ${POSTHOG_TIMEOUT_MS}ms.`);
    }
    throw new Error(`PostHog network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) throw new Error("PostHog rate limit reached (HTTP 429). Please wait and retry.");
  const data = await res.json().catch(() => ({})) as Record<string, unknown>;
  if (!res.ok) {
    const msg = (data.detail as string) ?? (data.error as string) ?? `status ${res.status}`;
    throw new Error(`PostHog error (${res.status}): ${msg}`);
  }
  return data as T;
}

// Resolve the API key (credential) and project_id (a regular required arg that a
// saved memory default can fill). Returns a not-connected card or {error} string
// to return, or the resolved trio.
function resolveContext(
  args: Record<string, unknown>,
): { host: string; apiKey: string; projectId: string } | NotConnectedResult | { error: string } {
  const apiKey = requireCredential("posthog", args);
  if (typeof apiKey !== "string") return apiKey;
  const projectId = resolveProjectId(args);
  if (!projectId) return { error: "project_id is required (save one as a default so you can omit it)." };
  return { host: resolveHost(args), apiKey, projectId };
}

function stamp(result: unknown, nextSteps: string[], defaultsUsed: string[]): Record<string, unknown> {
  return stampMeta(result, {
    source: POSTHOG_SOURCE,
    fetched_at: new Date().toISOString(),
    defaults_used: defaultsUsed,
    next_steps: nextSteps,
  });
}

// ─── Operations ───────────────────────────────────────────────────────────────

export async function posthogListFeatureFlags(args: Record<string, unknown>): Promise<unknown> {
  const ctx = resolveContext(args);
  if ("not_connected" in ctx || "error" in ctx) return ctx;
  const data = await phFetch(ctx.host, ctx.apiKey, "GET", `/api/projects/${encodeURIComponent(ctx.projectId)}/feature_flags/`);
  return stamp(data, ["Use posthog_query to measure a flag's impact, or posthog_list_insights for saved charts."], collectDefaults(args));
}

export async function posthogListInsights(args: Record<string, unknown>): Promise<unknown> {
  const ctx = resolveContext(args);
  if ("not_connected" in ctx || "error" in ctx) return ctx;
  const params: Record<string, string> = { limit: String(Math.min(100, Number(args.limit) || 25)) };
  if (args.search) params.search = String(args.search);
  const data = await phFetch(ctx.host, ctx.apiKey, "GET", `/api/projects/${encodeURIComponent(ctx.projectId)}/insights/`, { params });
  return stamp(data, ["Use posthog_query to run an ad-hoc HogQL query for numbers not in a saved insight."], collectDefaults(args));
}

export async function posthogListPersons(args: Record<string, unknown>): Promise<unknown> {
  const ctx = resolveContext(args);
  if ("not_connected" in ctx || "error" in ctx) return ctx;
  const params: Record<string, string> = { limit: String(Math.min(100, Number(args.limit) || 25)) };
  if (args.search) params.search = String(args.search);
  const data = await phFetch(ctx.host, ctx.apiKey, "GET", `/api/projects/${encodeURIComponent(ctx.projectId)}/persons/`, { params });
  return stamp(data, ["Use posthog_query to analyse what these users did."], collectDefaults(args));
}

export async function posthogQuery(args: Record<string, unknown>): Promise<unknown> {
  const ctx = resolveContext(args);
  if ("not_connected" in ctx || "error" in ctx) return ctx;
  const query = String(args.query ?? "").trim();
  if (!query) return { error: "query is required (a HogQL/SQL string, e.g. 'select count() from events')." };
  const body = { query: { kind: "HogQLQuery", query } };
  const data = await phFetch(ctx.host, ctx.apiKey, "POST", `/api/projects/${encodeURIComponent(ctx.projectId)}/query/`, { body });
  return stamp(data, ["Use posthog_list_insights to save this as a chart, or refine the HogQL and run again."], collectDefaults(args));
}
