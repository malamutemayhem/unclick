// Contentful integration for the UnClick MCP server.
// Uses the Contentful Content Delivery API (CDA) via fetch - no external deps.
// Auth: a CDA access token (Authorization: Bearer) plus a space_id. The
// environment defaults to "master". Get a token at
// https://app.contentful.com/ under Settings > API keys.

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";

const CONTENTFUL_BASE = "https://cdn.contentful.com";
const CONTENTFUL_SOURCE = "Contentful Content Delivery API";

function collectDefaults(args: Record<string, unknown>): string[] {
  return Array.isArray(args.__unclick_memory_defaults)
    ? args.__unclick_memory_defaults.filter((v): v is string => typeof v === "string")
    : [];
}

function resolveContext(
  args: Record<string, unknown>,
): { token: string; space: string; env: string } | NotConnectedResult | { error: string } {
  const token = requireCredential("contentful", args);
  if (typeof token !== "string") return token;
  const space = String(args.space_id ?? process.env.CONTENTFUL_SPACE_ID ?? "").trim();
  if (!space) return { error: "space_id is required (save one as a default so you can omit it)." };
  const env = String(args.environment ?? process.env.CONTENTFUL_ENVIRONMENT ?? "master").trim();
  return { token, space, env };
}

async function cfFetch<T>(
  token: string,
  space: string,
  env: string,
  resource: string,
  params?: Record<string, string>,
): Promise<T> {
  const url = new URL(`${CONTENTFUL_BASE}/spaces/${encodeURIComponent(space)}/environments/${encodeURIComponent(env)}${resource}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const CONTENTFUL_TIMEOUT_MS = Number(process.env.CONTENTFUL_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CONTENTFUL_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Contentful request timed out after ${CONTENTFUL_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Contentful network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) throw new Error("Contentful rate limit reached (HTTP 429). Please wait and retry.");
  const data = await res.json().catch(() => ({})) as Record<string, unknown>;
  if (!res.ok) {
    const msg = (data.message as string) ?? `status ${res.status}`;
    throw new Error(`Contentful error (${res.status}): ${msg}`);
  }
  return data as T;
}

function stamp(result: unknown, nextSteps: string[], defaultsUsed: string[]): Record<string, unknown> {
  return stampMeta(result, {
    source: CONTENTFUL_SOURCE,
    fetched_at: new Date().toISOString(),
    defaults_used: defaultsUsed,
    next_steps: nextSteps,
  });
}

// ─── Operations ───────────────────────────────────────────────────────────────

export async function contentfulListEntries(args: Record<string, unknown>): Promise<unknown> {
  const ctx = resolveContext(args);
  if ("not_connected" in ctx || "error" in ctx) return ctx;
  const params: Record<string, string> = { limit: String(Math.min(100, Number(args.limit) || 25)) };
  if (args.content_type) params.content_type = String(args.content_type);
  if (args.query) params.query = String(args.query);
  const data = await cfFetch(ctx.token, ctx.space, ctx.env, "/entries", params);
  return stamp(data, ["Use contentful_get_entry with a returned id, or filter by content_type."], collectDefaults(args));
}

export async function contentfulGetEntry(args: Record<string, unknown>): Promise<unknown> {
  const ctx = resolveContext(args);
  if ("not_connected" in ctx || "error" in ctx) return ctx;
  const id = String(args.entry_id ?? "").trim();
  if (!id) return { error: "entry_id is required." };
  const data = await cfFetch(ctx.token, ctx.space, ctx.env, `/entries/${encodeURIComponent(id)}`);
  return stamp(data, ["Use contentful_list_assets to resolve any linked media in this entry."], collectDefaults(args));
}

export async function contentfulListContentTypes(args: Record<string, unknown>): Promise<unknown> {
  const ctx = resolveContext(args);
  if ("not_connected" in ctx || "error" in ctx) return ctx;
  const data = await cfFetch(ctx.token, ctx.space, ctx.env, "/content_types", { limit: "100" });
  return stamp(data, ["Use a content type id as content_type in contentful_list_entries."], collectDefaults(args));
}

export async function contentfulListAssets(args: Record<string, unknown>): Promise<unknown> {
  const ctx = resolveContext(args);
  if ("not_connected" in ctx || "error" in ctx) return ctx;
  const data = await cfFetch(ctx.token, ctx.space, ctx.env, "/assets", { limit: String(Math.min(100, Number(args.limit) || 25)) });
  return stamp(data, ["Use contentful_list_entries to find which entries reference these assets."], collectDefaults(args));
}
