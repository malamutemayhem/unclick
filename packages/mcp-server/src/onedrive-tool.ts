import { stampMeta } from "./connector-meta.js";
import { credentialResolvedFromUnClick, markCredentialLiveTested, resolveCredentials } from "./vault-bridge.js";

const GRAPH_BASE = "https://graph.microsoft.com/v1.0";
const ONEDRIVE_SOURCE = "Microsoft Graph OneDrive API";
const TEXT_PREVIEW_LIMIT = 64_000;

type ResolvedToken = { token: string; shouldMarkProof: boolean };
type TokenResolutionError = Record<string, unknown> & { error: string };

function isResolvedToken(auth: ResolvedToken | TokenResolutionError): auth is ResolvedToken {
  return typeof (auth as { token?: unknown }).token === "string";
}

async function requireToken(args: Record<string, unknown>): Promise<ResolvedToken | TokenResolutionError> {
  const resolved = await resolveCredentials("onedrive", args);
  if ("error" in resolved) return resolved as TokenResolutionError;
  const token = String(resolved.access_token ?? "").trim();
  return token
    ? { token, shouldMarkProof: credentialResolvedFromUnClick(resolved) }
    : { error: "OneDrive access_token could not be resolved." };
}

function isTextLike(metadata: Record<string, unknown>): boolean {
  const file = metadata.file as { mimeType?: string } | undefined;
  const mimeType = String(file?.mimeType ?? "");
  const name = String(metadata.name ?? "").toLowerCase();
  return mimeType.startsWith("text/")
    || mimeType === "application/json"
    || mimeType === "application/xml"
    || /\.(txt|md|csv|json|xml|log)$/i.test(name);
}

async function graphFetch(
  token: string,
  path: string,
  query?: Record<string, string | number | undefined>,
): Promise<{ text: string; headers: Headers }> {
  const url = new URL(`${GRAPH_BASE}${path}`);
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined && value !== "") url.searchParams.set(key, String(value));
  }

  const ONEDRIVE_TIMEOUT_MS = Number(process.env.ONEDRIVE_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ONEDRIVE_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") throw new Error(`OneDrive request timed out after ${ONEDRIVE_TIMEOUT_MS}ms.`);
    throw new Error(`OneDrive network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }

  const text = await res.text();
  if (res.status === 401) throw new Error("OneDrive token is invalid or expired.");
  if (res.status === 403) throw new Error("OneDrive access is forbidden. Check the connected account permissions.");
  if (res.status === 429) throw new Error("OneDrive rate limit reached (HTTP 429). Please wait and retry.");
  if (!res.ok) {
    let message = text.slice(0, 200);
    try {
      const data = JSON.parse(text) as { error?: { message?: string } };
      message = data.error?.message ?? message;
    } catch {
      // Plaintext error body.
    }
    throw new Error(`OneDrive error (${res.status}): ${message || res.statusText}`);
  }
  return { text, headers: res.headers };
}

async function downloadText(downloadUrl: string): Promise<string> {
  const ONEDRIVE_TIMEOUT_MS = Number(process.env.ONEDRIVE_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ONEDRIVE_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(downloadUrl, { signal: controller.signal });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") throw new Error(`OneDrive download timed out after ${ONEDRIVE_TIMEOUT_MS}ms.`);
    throw new Error(`OneDrive download error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (!res.ok) throw new Error(`OneDrive download failed (${res.status}).`);
  return res.text();
}

function parseJson<T>(text: string): T {
  return JSON.parse(text) as T;
}

function stamp(result: unknown, nextSteps: string[]): Record<string, unknown> {
  return stampMeta(result, { source: ONEDRIVE_SOURCE, fetched_at: new Date().toISOString(), next_steps: nextSteps });
}

export async function onedriveList(args: Record<string, unknown>): Promise<unknown> {
  const auth = await requireToken(args);
  if (!isResolvedToken(auth)) return auth;
  const folderId = String(args.folder_id ?? "").trim();
  const path = folderId
    ? `/me/drive/items/${encodeURIComponent(folderId)}/children`
    : "/me/drive/root/children";
  const { text } = await graphFetch(auth.token, path, {
    "$top": Math.min(200, Number(args.limit) || 50),
    "$select": "id,name,folder,file,size,webUrl,lastModifiedDateTime,@microsoft.graph.downloadUrl",
  });
  if (auth.shouldMarkProof) await markCredentialLiveTested("onedrive");
  return stamp(parseJson(text), ["Use onedrive_read with a returned file id to inspect metadata or a text preview."]);
}

export async function onedriveSearch(args: Record<string, unknown>): Promise<unknown> {
  const auth = await requireToken(args);
  if (!isResolvedToken(auth)) return auth;
  const query = String(args.query ?? "").trim();
  if (!query) return { error: "query is required." };
  const safeQuery = query.replace(/'/g, "''");
  const { text } = await graphFetch(auth.token, `/me/drive/root/search(q='${safeQuery}')`, {
    "$top": Math.min(100, Number(args.limit) || 25),
    "$select": "id,name,folder,file,size,webUrl,lastModifiedDateTime,@microsoft.graph.downloadUrl",
  });
  if (auth.shouldMarkProof) await markCredentialLiveTested("onedrive");
  return stamp(parseJson(text), ["Use onedrive_read with a returned file id to inspect a file."]);
}

export async function onedriveRead(args: Record<string, unknown>): Promise<unknown> {
  const auth = await requireToken(args);
  if (!isResolvedToken(auth)) return auth;
  const itemId = String(args.item_id ?? args.file_id ?? args.id ?? "").trim();
  if (!itemId) return { error: "item_id is required." };

  const { text } = await graphFetch(auth.token, `/me/drive/items/${encodeURIComponent(itemId)}`, {
    "$select": "id,name,folder,file,size,webUrl,lastModifiedDateTime,@microsoft.graph.downloadUrl",
  });
  const metadata = parseJson<Record<string, unknown>>(text);
  const downloadUrl = String(metadata["@microsoft.graph.downloadUrl"] ?? "");

  if (downloadUrl && isTextLike(metadata)) {
    const content = await downloadText(downloadUrl);
    if (auth.shouldMarkProof) await markCredentialLiveTested("onedrive");
    return stamp({
      file: metadata,
      text: content.slice(0, TEXT_PREVIEW_LIMIT),
      truncated: content.length > TEXT_PREVIEW_LIMIT,
    }, ["Use onedrive_search to find related files or narrow the query."]);
  }

  if (auth.shouldMarkProof) await markCredentialLiveTested("onedrive");
  return stamp({
    file: metadata,
    text: null,
    note: "This file is not text-readable through the safe preview path.",
  }, ["Open the webUrl for visual files, or use onedrive_search to find a text document."]);
}
