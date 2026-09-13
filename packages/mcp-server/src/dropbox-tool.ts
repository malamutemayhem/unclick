// Dropbox integration for the UnClick MCP server.
// Uses the Dropbox API v2 via fetch - no external dependencies.
// Auth: an access token (Authorization: Bearer) from a Dropbox app
// (https://www.dropbox.com/developers/apps). Dropbox RPC endpoints are POST with
// a JSON body; no-argument endpoints take no body.

import { stampMeta } from "./connector-meta.js";
import {
  credentialResolvedFromUnClick,
  markCredentialLiveTested,
  resolveCredentials,
  resolveSystemConnectorCredentials,
} from "./vault-bridge.js";

const DROPBOX_BASE = "https://api.dropboxapi.com/2";
const DROPBOX_CONTENT_BASE = "https://content.dropboxapi.com/2";
const DROPBOX_SOURCE = "Dropbox API v2";
const WORKSPACE_SOURCE = "UnClick Dropbox workspace (restricted)";
const MAX_WORKSPACE_FILE_BYTES = 500_000;

// These are the only Dropbox paths the shared project connector can ever
// address. Keep the general-purpose Dropbox functions above on personal
// credentials; never widen this map or accept an arbitrary root from a tool
// argument.
const WORKSPACE_ROOTS = {
  context: "/UnClick/Context",
  system_information: "/UnClick/Credentials/System Information",
} as const;

type WorkspaceArea = keyof typeof WORKSPACE_ROOTS;
type WorkspacePath = { area: WorkspaceArea; relativePath: string; path: string };

type ResolvedToken = { token: string; shouldMarkProof: boolean };
type TokenResolutionError = Record<string, unknown> & { error: string };

function isResolvedToken(auth: ResolvedToken | TokenResolutionError): auth is ResolvedToken {
  return typeof (auth as { token?: unknown }).token === "string";
}

function isWorkspaceArea(value: string): value is WorkspaceArea {
  return value === "context" || value === "system_information";
}

async function requireToken(args: Record<string, unknown>): Promise<ResolvedToken | TokenResolutionError> {
  const resolved = await resolveCredentials("dropbox", args);
  if ("error" in resolved) return resolved as TokenResolutionError;
  const token = String(resolved.access_token ?? "").trim();
  return token
    ? { token, shouldMarkProof: credentialResolvedFromUnClick(resolved) }
    : { error: "Dropbox access_token could not be resolved." };
}

async function requireWorkspaceToken(): Promise<ResolvedToken | TokenResolutionError> {
  // Do not call resolveCredentials here. That resolver can use a caller's
  // personal Dropbox account, whereas this feature intentionally always uses
  // the owner-managed, server-only project connector.
  const credentials = await resolveSystemConnectorCredentials("dropbox");
  const token = credentials.access_token?.trim() ?? "";
  return token
    ? { token, shouldMarkProof: false }
    : {
      error: "The restricted UnClick Dropbox workspace is not available for this account.",
      setup: { note: "No Dropbox connection is required for Superusers. A God account must configure the master Dropbox workspace connector." },
    };
}

function resolveWorkspacePath(args: Record<string, unknown>, requireFile: boolean): WorkspacePath | TokenResolutionError {
  const area = typeof args.area === "string" ? args.area : "";
  if (!isWorkspaceArea(area)) {
    return { error: "area must be either 'context' or 'system_information'." };
  }
  const rawRelativePath = args.relative_path;
  if (rawRelativePath !== undefined && typeof rawRelativePath !== "string") {
    return { error: "relative_path must be a string." };
  }
  const relativePath = (rawRelativePath ?? "").trim();
  if (!relativePath) {
    return requireFile
      ? { error: "relative_path is required for a file operation." }
      : { area, relativePath: "", path: WORKSPACE_ROOTS[area] };
  }
  // Reject both POSIX and Windows traversal/separator forms. This also avoids
  // normalisation surprises between an agent on Windows and Dropbox's API.
  if (
    relativePath.startsWith("/") ||
    relativePath.includes("\\") ||
    relativePath.split("/").some((part) => !part || part === "." || part === "..")
  ) {
    return { error: "relative_path must stay below the selected workspace folder and cannot contain traversal segments." };
  }
  return { area, relativePath, path: `${WORKSPACE_ROOTS[area]}/${relativePath}` };
}

function isWorkspacePath(value: WorkspacePath | TokenResolutionError): value is WorkspacePath {
  return "path" in value && typeof value.path === "string";
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

function stampWorkspace(result: unknown, nextSteps: string[]): Record<string, unknown> {
  return stampMeta(result, { source: WORKSPACE_SOURCE, fetched_at: new Date().toISOString(), next_steps: nextSteps });
}

function dropboxError(status: number, text: string): Error {
  if (status === 429) return new Error("Dropbox rate limit reached (HTTP 429). Please wait and retry.");
  try {
    const data = JSON.parse(text) as { error_summary?: string };
    return new Error(`Dropbox error (${status}): ${data.error_summary ?? text.slice(0, 200) ?? `status ${status}`}`);
  } catch {
    return new Error(`Dropbox error (${status}): ${text.slice(0, 200) || `status ${status}`}`);
  }
}

async function dbxContentRequest(path: string, token: string, apiArg: Record<string, unknown>, content?: string): Promise<Response> {
  const timeoutMs = Number(process.env.DROPBOX_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(`${DROPBOX_CONTENT_BASE}${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Dropbox-API-Arg": JSON.stringify(apiArg),
        ...(content === undefined ? {} : { "Content-Type": "application/octet-stream" }),
      },
      body: content,
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") throw new Error(`Dropbox request timed out after ${timeoutMs}ms.`);
    throw new Error(`Dropbox network error: ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    clearTimeout(timer);
  }
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

/** List only one of the two owner-approved UnClick Dropbox workspace roots. */
export async function unclickWorkspaceList(args: Record<string, unknown>): Promise<unknown> {
  const workspace = resolveWorkspacePath(args, false);
  if (!isWorkspacePath(workspace)) return workspace;
  const auth = await requireWorkspaceToken();
  if (!isResolvedToken(auth)) return auth;
  const data = await dbxPost(auth.token, "/files/list_folder", {
    path: workspace.path,
    limit: Math.min(200, Math.max(1, Number(args.limit) || 100)),
  });
  return stampWorkspace({ area: workspace.area, relative_path: workspace.relativePath, ...data as Record<string, unknown> }, [
    "Use unclick_workspace_read for a text file, or unclick_workspace_write to create a scoped workspace file.",
  ]);
}

/** Read a UTF-8 text file only from the restricted UnClick Dropbox workspace. */
export async function unclickWorkspaceRead(args: Record<string, unknown>): Promise<unknown> {
  // Read the published argument in the handler as well as in the shared path
  // validator. This keeps the MCP schema/handler contract auditable and avoids
  // an indirect helper obscuring the required file parameter.
  const area = args.area;
  const relativePath = args.relative_path;
  const workspace = resolveWorkspacePath({ ...args, area, relative_path: relativePath }, true);
  if (!isWorkspacePath(workspace)) return workspace;
  const auth = await requireWorkspaceToken();
  if (!isResolvedToken(auth)) return auth;
  const response = await dbxContentRequest("/files/download", auth.token, { path: workspace.path });
  if (!response.ok) throw dropboxError(response.status, await response.text());
  const declaredLength = Number(response.headers.get("content-length") ?? "0");
  if (Number.isFinite(declaredLength) && declaredLength > MAX_WORKSPACE_FILE_BYTES) {
    return { error: `Workspace file is larger than the ${MAX_WORKSPACE_FILE_BYTES}-byte read limit.` };
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.byteLength > MAX_WORKSPACE_FILE_BYTES) {
    return { error: `Workspace file is larger than the ${MAX_WORKSPACE_FILE_BYTES}-byte read limit.` };
  }
  let metadata: Record<string, unknown> = {};
  const metadataHeader = response.headers.get("dropbox-api-result");
  if (metadataHeader) {
    try { metadata = JSON.parse(metadataHeader) as Record<string, unknown>; } catch { /* metadata is optional */ }
  }
  return stampWorkspace({
    area: workspace.area,
    relative_path: workspace.relativePath,
    metadata,
    content: bytes.toString("utf8"),
  }, ["Use unclick_workspace_write with overwrite=true only when deliberately replacing this file."]);
}

/** Create or explicitly overwrite a UTF-8 text file in the restricted workspace. */
export async function unclickWorkspaceWrite(args: Record<string, unknown>): Promise<unknown> {
  // See the matching read handler: preserve a direct access to every required
  // schema field before passing the values through the shared scope validator.
  const area = args.area;
  const relativePath = args.relative_path;
  const content = args.content;
  const workspace = resolveWorkspacePath({ ...args, area, relative_path: relativePath }, true);
  if (!isWorkspacePath(workspace)) return workspace;
  if (typeof content !== "string") return { error: "content must be a UTF-8 string." };
  if (Buffer.byteLength(content, "utf8") > MAX_WORKSPACE_FILE_BYTES) {
    return { error: `content is larger than the ${MAX_WORKSPACE_FILE_BYTES}-byte write limit.` };
  }
  const auth = await requireWorkspaceToken();
  if (!isResolvedToken(auth)) return auth;
  const overwrite = args.overwrite === true;
  const response = await dbxContentRequest("/files/upload", auth.token, {
    path: workspace.path,
    mode: overwrite ? "overwrite" : "add",
    autorename: false,
    mute: false,
    strict_conflict: !overwrite,
  }, content);
  const raw = await response.text();
  if (!response.ok) throw dropboxError(response.status, raw);
  let metadata: Record<string, unknown> = {};
  if (raw) {
    try { metadata = JSON.parse(raw) as Record<string, unknown>; } catch { /* Dropbox success metadata is optional */ }
  }
  return stampWorkspace({
    area: workspace.area,
    relative_path: workspace.relativePath,
    overwrite,
    metadata,
  }, ["No delete operation is exposed for the shared workspace."]);
}
