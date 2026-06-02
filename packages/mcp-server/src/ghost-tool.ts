// Ghost integration for the UnClick MCP server.
// Uses the Ghost Content API via fetch - no external dependencies.
// Auth: a Content API key (passed as the ?key= query param) plus your Ghost
// site URL. Create a key under Settings > Integrations in Ghost Admin.

import { notConnectedFor } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";

const GHOST_SOURCE = "Ghost Content API";

interface GhostCreds {
  baseUrl: string;
  key: string;
}

function requireCreds(args: Record<string, unknown>): GhostCreds | NotConnectedResult {
  const rawSite = String(args.site_url ?? process.env.GHOST_SITE_URL ?? "").trim();
  const key = String(args.content_key ?? process.env.GHOST_CONTENT_KEY ?? "").trim();
  if (!rawSite || !key) return notConnectedFor("ghost");
  const site = rawSite.replace(/\/+$/, "").replace(/^(?!https?:\/\/)/, "https://");
  return { baseUrl: `${site}/ghost/api/content`, key };
}

async function ghostFetch<T>(creds: GhostCreds, path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${creds.baseUrl}${path}`);
  url.searchParams.set("key", creds.key);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const GHOST_TIMEOUT_MS = Number(process.env.GHOST_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), GHOST_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url.toString(), { headers: { Accept: "application/json" }, signal: controller.signal });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") throw new Error(`Ghost request timed out after ${GHOST_TIMEOUT_MS}ms.`);
    throw new Error(`Ghost network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) throw new Error("Ghost rate limit reached (HTTP 429). Please wait and retry.");
  const data = await res.json().catch(() => ({})) as Record<string, unknown>;
  if (!res.ok) {
    const errs = data.errors as Array<{ message?: string }> | undefined;
    throw new Error(`Ghost error (${res.status}): ${errs?.[0]?.message ?? `status ${res.status}`}`);
  }
  return data as T;
}

function stamp(result: unknown, nextSteps: string[]): Record<string, unknown> {
  return stampMeta(result, { source: GHOST_SOURCE, fetched_at: new Date().toISOString(), next_steps: nextSteps });
}

export async function ghostListPosts(args: Record<string, unknown>): Promise<unknown> {
  const creds = requireCreds(args);
  if ("not_connected" in creds) return creds;
  const params: Record<string, string> = { limit: String(Math.min(100, Number(args.limit) || 15)) };
  if (args.filter) params.filter = String(args.filter);
  const data = await ghostFetch(creds, "/posts/", params);
  return stamp(data, ["Use ghost_list_tags to browse by topic, or ghost_list_pages for static pages."]);
}

export async function ghostListPages(args: Record<string, unknown>): Promise<unknown> {
  const creds = requireCreds(args);
  if ("not_connected" in creds) return creds;
  const data = await ghostFetch(creds, "/pages/", { limit: String(Math.min(100, Number(args.limit) || 15)) });
  return stamp(data, ["Use ghost_list_posts for blog posts."]);
}

export async function ghostListTags(args: Record<string, unknown>): Promise<unknown> {
  const creds = requireCreds(args);
  if ("not_connected" in creds) return creds;
  const data = await ghostFetch(creds, "/tags/", { limit: String(Math.min(100, Number(args.limit) || 50)) });
  return stamp(data, ["Use ghost_list_posts with filter=tag:<slug> to read posts in a tag."]);
}
