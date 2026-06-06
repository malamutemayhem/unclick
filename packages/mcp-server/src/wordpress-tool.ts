// WordPress integration for the UnClick MCP server.
// Uses the WordPress REST API v2 via fetch - no external dependencies.
// Auth: Basic auth with your username + an Application Password
// (Users > Profile > Application Passwords), plus your site URL.

import { notConnectedFor } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";

const WORDPRESS_SOURCE = "WordPress REST API v2";

interface WpCreds {
  baseUrl: string;
  authHeader: string;
}

function requireCreds(args: Record<string, unknown>): WpCreds | NotConnectedResult {
  const rawSite = String(args.site_url ?? process.env.WORDPRESS_SITE_URL ?? "").trim();
  const username = String(args.username ?? process.env.WORDPRESS_USERNAME ?? "").trim();
  const appPassword = String(args.app_password ?? process.env.WORDPRESS_APP_PASSWORD ?? "").trim();
  if (!rawSite || !username || !appPassword) return notConnectedFor("wordpress");
  const site = rawSite.replace(/\/+$/, "").replace(/^(?!https?:\/\/)/, "https://");
  return {
    baseUrl: `${site}/wp-json/wp/v2`,
    authHeader: `Basic ${Buffer.from(`${username}:${appPassword}`).toString("base64")}`,
  };
}

async function wpFetch<T>(creds: WpCreds, path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${creds.baseUrl}${path}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const WORDPRESS_TIMEOUT_MS = Number(process.env.WORDPRESS_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), WORDPRESS_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url.toString(), { headers: { Authorization: creds.authHeader, Accept: "application/json" }, signal: controller.signal });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") throw new Error(`WordPress request timed out after ${WORDPRESS_TIMEOUT_MS}ms.`);
    throw new Error(`WordPress network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) throw new Error("WordPress rate limit reached (HTTP 429). Please wait and retry.");
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = (data as { message?: string })?.message ?? `status ${res.status}`;
    throw new Error(`WordPress error (${res.status}): ${msg}`);
  }
  return data as T;
}

function stamp(result: unknown, nextSteps: string[]): Record<string, unknown> {
  return stampMeta(result, { source: WORDPRESS_SOURCE, fetched_at: new Date().toISOString(), next_steps: nextSteps });
}

export async function wordpressListPosts(args: Record<string, unknown>): Promise<unknown> {
  const creds = requireCreds(args);
  if ("not_connected" in creds) return creds;
  const params: Record<string, string> = { per_page: String(Math.min(100, Number(args.limit) || 10)) };
  if (args.search) params.search = String(args.search);
  if (args.status) params.status = String(args.status);
  const data = await wpFetch(creds, "/posts", params);
  return stamp({ posts: data }, ["Use wordpress_get_post with a returned id for the full content."]);
}

export async function wordpressGetPost(args: Record<string, unknown>): Promise<unknown> {
  const creds = requireCreds(args);
  if ("not_connected" in creds) return creds;
  const id = String(args.post_id ?? "").trim();
  if (!id) return { error: "post_id is required." };
  const data = await wpFetch(creds, `/posts/${encodeURIComponent(id)}`);
  return stamp(data, ["Use wordpress_list_pages for static pages, or wordpress_list_posts to browse more."]);
}

export async function wordpressListPages(args: Record<string, unknown>): Promise<unknown> {
  const creds = requireCreds(args);
  if ("not_connected" in creds) return creds;
  const params: Record<string, string> = { per_page: String(Math.min(100, Number(args.limit) || 10)) };
  if (args.search) params.search = String(args.search);
  const data = await wpFetch(creds, "/pages", params);
  return stamp({ pages: data }, ["Use wordpress_list_posts for blog posts."]);
}
