// Webflow integration for the UnClick MCP server.
// Uses the Webflow Data API v2 via fetch - no external dependencies.
// Auth: an API token (Authorization: Bearer) from a Site's Apps & Integrations
// settings or https://webflow.com/dashboard (workspace API access).

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";

const WEBFLOW_BASE = "https://api.webflow.com/v2";
const WEBFLOW_SOURCE = "Webflow Data API v2";

function requireToken(args: Record<string, unknown>): string | NotConnectedResult {
  return requireCredential("webflow", args);
}

function collectDefaults(args: Record<string, unknown>): string[] {
  return Array.isArray(args.__unclick_memory_defaults)
    ? args.__unclick_memory_defaults.filter((v): v is string => typeof v === "string")
    : [];
}

async function wfFetch<T>(token: string, path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${WEBFLOW_BASE}${path}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const WEBFLOW_TIMEOUT_MS = Number(process.env.WEBFLOW_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), WEBFLOW_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Webflow request timed out after ${WEBFLOW_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Webflow network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) throw new Error("Webflow rate limit reached (HTTP 429). Please wait and retry.");
  const data = await res.json().catch(() => ({})) as Record<string, unknown>;
  if (!res.ok) {
    const msg = (data.message as string) ?? (data.err as string) ?? `status ${res.status}`;
    throw new Error(`Webflow error (${res.status}): ${msg}`);
  }
  return data as T;
}

function stamp(result: unknown, nextSteps: string[], defaultsUsed: string[] = []): Record<string, unknown> {
  return stampMeta(result, {
    source: WEBFLOW_SOURCE,
    fetched_at: new Date().toISOString(),
    defaults_used: defaultsUsed,
    next_steps: nextSteps,
  });
}

// ─── Operations ───────────────────────────────────────────────────────────────

export async function webflowListSites(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const data = await wfFetch(token, "/sites");
  return stamp(data, ["Use webflow_list_collections with a site id, or save a site_id as a default."]);
}

export async function webflowGetSite(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const siteId = String(args.site_id ?? "").trim();
  if (!siteId) return { error: "site_id is required (save one as a default so you can omit it)." };
  const data = await wfFetch(token, `/sites/${encodeURIComponent(siteId)}`);
  return stamp(data, ["Use webflow_list_collections to see this site's CMS collections."], collectDefaults(args));
}

export async function webflowListCollections(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const siteId = String(args.site_id ?? "").trim();
  if (!siteId) return { error: "site_id is required (save one as a default so you can omit it)." };
  const data = await wfFetch(token, `/sites/${encodeURIComponent(siteId)}/collections`);
  return stamp(data, ["Use webflow_list_items with a returned collection id to read its records."], collectDefaults(args));
}

export async function webflowListItems(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const collectionId = String(args.collection_id ?? "").trim();
  if (!collectionId) return { error: "collection_id is required (from webflow_list_collections)." };
  const params: Record<string, string> = { limit: String(Math.min(100, Number(args.limit) || 25)) };
  if (args.offset) params.offset = String(args.offset);
  const data = await wfFetch(token, `/collections/${encodeURIComponent(collectionId)}/items`, params);
  return stamp(data, ["Use webflow_list_collections to map field ids to their display names."]);
}
