// Dropbox integration for the UnClick MCP server.
// Uses the Dropbox API v2 via fetch - no external dependencies.
// Auth: an access token (Authorization: Bearer) from a Dropbox app
// (https://www.dropbox.com/developers/apps). Dropbox RPC endpoints are POST with
// a JSON body; no-argument endpoints take no body.

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";

const DROPBOX_BASE = "https://api.dropboxapi.com/2";
const DROPBOX_SOURCE = "Dropbox API v2";

function requireToken(args: Record<string, unknown>): string | NotConnectedResult {
  return requireCredential("dropbox", args);
}

async function dbxPost<T>(token: string, path: string, body?: unknown): Promise<T> {
  const DROPBOX_TIMEOUT_MS = Number(process.env.DROPBOX_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), DROPBOX_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${DROPBOX_BASE}${path}`, {
      method: "POST",
      // Dropbox: send Content-Type only when there is a JSON body; null-arg
      // endpoints (e.g. get_current_account) must be sent with no body.
      headers: { Authorization: `Bearer ${token}`, ...(body !== undefined ? { "Content-Type": "application/json" } : {}) },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") throw new Error(`Dropbox request timed out after ${DROPBOX_TIMEOUT_MS}ms.`);
    throw new Error(`Dropbox network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) throw new Error("Dropbox rate limit reached (HTTP 429). Please wait and retry.");
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) throw new Error(`Dropbox error (${res.status}): ${(data as { error_summary?: string }).error_summary ?? text.slice(0, 200) ?? `status ${res.status}`}`);
  return data as T;
}

function stamp(result: unknown, nextSteps: string[]): Record<string, unknown> {
  return stampMeta(result, { source: DROPBOX_SOURCE, fetched_at: new Date().toISOString(), next_steps: nextSteps });
}

export async function dropboxListFolder(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  // Root is the empty string in Dropbox, not "/".
  const path = String(args.path ?? "").trim() === "/" ? "" : String(args.path ?? "").trim();
  const data = await dbxPost(token, "/files/list_folder", { path, limit: Math.min(2000, Number(args.limit) || 100) });
  return stamp(data, ["Use dropbox_search to find a file by name, or pass a returned folder path to list it."]);
}

export async function dropboxSearch(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const query = String(args.query ?? "").trim();
  if (!query) return { error: "query is required (a file or folder name to search for)." };
  const data = await dbxPost(token, "/files/search_v2", { query, options: { max_results: Math.min(1000, Number(args.limit) || 25) } });
  return stamp(data, ["Use dropbox_list_folder with a returned path to browse around a match."]);
}

export async function dropboxGetAccount(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const data = await dbxPost(token, "/users/get_current_account");
  return stamp(data, ["Use dropbox_list_folder to browse this account's files."]);
}
