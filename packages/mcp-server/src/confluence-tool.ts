// Confluence (Atlassian Cloud) integration for the UnClick MCP server.
// Uses the Confluence Cloud REST API via fetch - no external dependencies.
// Auth: Basic auth with your Atlassian email + an API token
// (https://id.atlassian.com/manage-profile/security/api-tokens), plus the site
// (e.g. "mycompany" or "mycompany.atlassian.net"). Pairs with the Jira connector.

import { notConnectedFor } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";

const CONFLUENCE_SOURCE = "Confluence Cloud REST API";

interface ConfluenceCreds {
  baseUrl: string;
  authHeader: string;
}

function requireCreds(args: Record<string, unknown>): ConfluenceCreds | NotConnectedResult {
  const rawSite = String(args.site ?? process.env.CONFLUENCE_SITE ?? process.env.JIRA_SITE ?? "").trim();
  const email = String(args.email ?? process.env.CONFLUENCE_EMAIL ?? process.env.JIRA_EMAIL ?? "").trim();
  const token = String(args.api_token ?? process.env.CONFLUENCE_API_TOKEN ?? "").trim();
  if (!rawSite || !email || !token) return notConnectedFor("confluence");
  const host = rawSite.replace(/^https?:\/\//, "").replace(/\/.*$/, "").replace(/\.atlassian\.net$/, "");
  return {
    baseUrl: `https://${host}.atlassian.net/wiki/rest/api`,
    authHeader: `Basic ${Buffer.from(`${email}:${token}`).toString("base64")}`,
  };
}

async function cfFetch<T>(creds: ConfluenceCreds, path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${creds.baseUrl}${path}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const CONFLUENCE_TIMEOUT_MS = Number(process.env.CONFLUENCE_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CONFLUENCE_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url.toString(), { headers: { Authorization: creds.authHeader, Accept: "application/json" }, signal: controller.signal });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") throw new Error(`Confluence request timed out after ${CONFLUENCE_TIMEOUT_MS}ms.`);
    throw new Error(`Confluence network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) throw new Error("Confluence rate limit reached (HTTP 429). Please wait and retry.");
  const data = await res.json().catch(() => ({})) as Record<string, unknown>;
  if (!res.ok) throw new Error(`Confluence error (${res.status}): ${(data.message as string) ?? `status ${res.status}`}`);
  return data as T;
}

function stamp(result: unknown, nextSteps: string[]): Record<string, unknown> {
  return stampMeta(result, { source: CONFLUENCE_SOURCE, fetched_at: new Date().toISOString(), next_steps: nextSteps });
}

export async function confluenceSearch(args: Record<string, unknown>): Promise<unknown> {
  const creds = requireCreds(args);
  if ("not_connected" in creds) return creds;
  const query = String(args.query ?? "").trim();
  if (!query) return { error: "query is required (text to search across pages)." };
  const cql = `text ~ "${query.replace(/"/g, '\\"')}"`;
  const data = await cfFetch(creds, "/content/search", { cql, limit: String(Math.min(50, Number(args.limit) || 25)) });
  return stamp(data, ["Use confluence_get_page with a returned id to read the page body."]);
}

export async function confluenceGetPage(args: Record<string, unknown>): Promise<unknown> {
  const creds = requireCreds(args);
  if ("not_connected" in creds) return creds;
  const id = String(args.page_id ?? "").trim();
  if (!id) return { error: "page_id is required." };
  const data = await cfFetch(creds, `/content/${encodeURIComponent(id)}`, { expand: "body.storage,version,space" });
  return stamp(data, ["Use confluence_search to find related pages, or confluence_list_spaces for the space list."]);
}

export async function confluenceListSpaces(args: Record<string, unknown>): Promise<unknown> {
  const creds = requireCreds(args);
  if ("not_connected" in creds) return creds;
  const data = await cfFetch(creds, "/space", { limit: String(Math.min(100, Number(args.limit) || 50)) });
  return stamp(data, ["Use confluence_search to find pages within a space."]);
}
