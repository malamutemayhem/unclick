// Dropbox integration for the UnClick MCP server.
// Uses the Dropbox API v2 via fetch - no external dependencies.
// Auth: an access token (Authorization: Bearer) from a Dropbox app
// (https://www.dropbox.com/developers/apps). Dropbox RPC endpoints are POST with
// a JSON body; no-argument endpoints take no body.

import { stampMeta } from "./connector-meta.js";
import { credentialResolvedFromUnClick, markCredentialLiveTested, resolveCredentials } from "./vault-bridge.js";

const DROPBOX_BASE = "https://api.dropboxapi.com/2";
const DROPBOX_SOURCE = "Dropbox API v2";

type ResolvedToken = { token: string; shouldMarkProof: boolean };
type TokenResolutionError = Record<string, unknown> & { error: string };

function isResolvedToken(auth: ResolvedToken | TokenResolutionError): auth is ResolvedToken {
  return typeof (auth as { token?: unknown }).token === "string";
}

async function requireToken(args: Record<string, unknown>): Promise<ResolvedToken | TokenResolutionError> {
  const resolved = await resolveCredentials("dropbox", args);
  if ("error" in resolved) return resolved as TokenResolutionError;
  const token = String(resolved.access_token ?? "").trim();
  return token
    ? { token, shouldMarkProof: credentialResolvedFromUnClick(resolved) }
    : { error: "Dropbox access_token could not be resolved." };
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
  const auth = await requireToken(args);
  if (!isResolvedToken(auth)) return auth;
  // Root is the empty string in Dropbox, not "/".
  const path = String(args.path ?? "").trim() === "/" ? "" : String(args.path ?? "").trim();
  const data = await dbxPost(auth.token, "/files/list_folder", { path, limit: Math.min(2000, Number(args.limit) || 100) });
  if (auth.shouldMarkProof) await markCredentialLiveTested("dropbox");
  return stamp(data, ["Use dropbox_search to find a file by name, or pass a returned folder path to list it."]);
}

export async function dropboxSearch(args: Record<string, unknown>): Promise<unknown> {
  const auth = await requireToken(args);
  if (!isResolvedToken(auth)) return auth;
  const query = String(args.query ?? "").trim();
  if (!query) return { error: "query is required (a file or folder name to search for)." };
  const data = await dbxPost(auth.token, "/files/search_v2", { query, options: { max_results: Math.min(1000, Number(args.limit) || 25) } });
  if (auth.shouldMarkProof) await markCredentialLiveTested("dropbox");
  return stamp(data, ["Use dropbox_list_folder with a returned path to browse around a match."]);
}

export async function dropboxGetAccount(args: Record<string, unknown>): Promise<unknown> {
  const auth = await requireToken(args);
  if (!isResolvedToken(auth)) return auth;
  const data = await dbxPost(auth.token, "/users/get_current_account");
  if (auth.shouldMarkProof) await markCredentialLiveTested("dropbox");
  return stamp(data, ["Use dropbox_list_folder to browse this account's files."]);
}
