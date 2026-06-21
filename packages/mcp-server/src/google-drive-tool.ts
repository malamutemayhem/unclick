import { stampMeta } from "./connector-meta.js";
import { resolveCredentials } from "./vault-bridge.js";

const DRIVE_BASE = "https://www.googleapis.com/drive/v3";
const DRIVE_SOURCE = "Google Drive API v3";
const TEXT_PREVIEW_LIMIT = 64_000;

async function requireToken(args: Record<string, unknown>): Promise<string | Record<string, unknown>> {
  const resolved = await resolveCredentials("google-drive", args);
  if ("error" in resolved) return resolved;
  const token = String(resolved.access_token ?? "").trim();
  return token || { error: "Google Drive access_token could not be resolved." };
}

function escapeDriveQuery(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

async function driveFetch(
  token: string,
  path: string,
  query?: Record<string, string | number | undefined>,
): Promise<{ status: number; text: string; contentType: string }> {
  const url = new URL(`${DRIVE_BASE}${path}`);
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined && value !== "") url.searchParams.set(key, String(value));
  }

  const DRIVE_TIMEOUT_MS = Number(process.env.GOOGLE_DRIVE_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), DRIVE_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json, text/plain;q=0.9, */*;q=0.1" },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") throw new Error(`Google Drive request timed out after ${DRIVE_TIMEOUT_MS}ms.`);
    throw new Error(`Google Drive network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }

  const text = await res.text();
  if (res.status === 401) throw new Error("Google Drive token is invalid or expired.");
  if (res.status === 403) {
    throw new Error(
      "Google Drive access is forbidden. Reconnect Google Drive and grant file read access; also confirm the Drive API is enabled for the OAuth app."
    );
  }
  if (res.status === 429) throw new Error("Google Drive rate limit reached (HTTP 429). Please wait and retry.");
  if (!res.ok) {
    let message = text.slice(0, 200);
    try {
      const data = JSON.parse(text) as { error?: { message?: string } };
      message = data.error?.message ?? message;
    } catch {
      // Plaintext error body.
    }
    throw new Error(`Google Drive error (${res.status}): ${message || res.statusText}`);
  }
  return { status: res.status, text, contentType: res.headers.get("content-type") ?? "" };
}

function parseJson<T>(text: string): T {
  return JSON.parse(text) as T;
}

function stamp(result: unknown, nextSteps: string[]): Record<string, unknown> {
  return stampMeta(result, { source: DRIVE_SOURCE, fetched_at: new Date().toISOString(), next_steps: nextSteps });
}

export async function driveSearch(args: Record<string, unknown>): Promise<unknown> {
  const token = await requireToken(args);
  if (typeof token !== "string") return token;
  const rawQ = String(args.q ?? "").trim();
  const query = String(args.query ?? "").trim();
  const q = rawQ || (query ? `name contains '${escapeDriveQuery(query)}' and trashed = false` : "trashed = false");
  const { text } = await driveFetch(token, "/files", {
    q,
    pageSize: Math.min(100, Number(args.limit) || 20),
    pageToken: String(args.page_token ?? "").trim() || undefined,
    fields: "nextPageToken,files(id,name,mimeType,webViewLink,modifiedTime,size,owners(displayName,emailAddress))",
  });
  return stamp(parseJson(text), ["Use drive_read with a returned file id to inspect metadata or a text preview."]);
}

export async function driveRead(args: Record<string, unknown>): Promise<unknown> {
  const token = await requireToken(args);
  if (typeof token !== "string") return token;
  const fileId = String(args.file_id ?? args.id ?? "").trim();
  if (!fileId) return { error: "file_id is required." };

  const metadataResponse = await driveFetch(token, `/files/${encodeURIComponent(fileId)}`, {
    fields: "id,name,mimeType,webViewLink,modifiedTime,size,owners(displayName,emailAddress)",
  });
  const metadata = parseJson<Record<string, unknown>>(metadataResponse.text);
  const mimeType = String(metadata.mimeType ?? "");

  if (mimeType === "application/vnd.google-apps.document") {
    const exported = await driveFetch(token, `/files/${encodeURIComponent(fileId)}/export`, {
      mimeType: "text/plain",
    });
    return stamp({
      file: metadata,
      text: exported.text.slice(0, TEXT_PREVIEW_LIMIT),
      truncated: exported.text.length > TEXT_PREVIEW_LIMIT,
    }, ["Use drive_search to find related files or narrow the query."]);
  }

  if (mimeType.startsWith("text/") || mimeType === "application/json" || mimeType === "application/xml") {
    const content = await driveFetch(token, `/files/${encodeURIComponent(fileId)}`, { alt: "media" });
    return stamp({
      file: metadata,
      text: content.text.slice(0, TEXT_PREVIEW_LIMIT),
      truncated: content.text.length > TEXT_PREVIEW_LIMIT,
    }, ["Use drive_search to find related files or narrow the query."]);
  }

  return stamp({
    file: metadata,
    text: null,
    note: "This file is not text-readable through the safe preview path.",
  }, ["Open the webViewLink for visual files, or use drive_search to find a text document."]);
}
