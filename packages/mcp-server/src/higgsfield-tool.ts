// Higgsfield integration for the UnClick MCP server.
// Preferred path: a customer's Higgsfield MCP account sign-in stored by UnClick.
// Fallback path: an explicit/stored Higgsfield Cloud API key.

import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";

const HF_API_BASE = "https://api.higgsfield.ai/v1";
const HF_MCP_URL = "https://mcp.higgsfield.ai/mcp";
const HF_MCP_TOKEN_URL = "https://mcp.higgsfield.ai/oauth2/token";
const MCP_PROTOCOL_VERSION = "2025-03-26";

interface HiggsfieldMcpCredentials {
  access_token: string;
  refresh_token?: string;
  expires_at?: string;
  client_id?: string;
  token_type?: string;
  scope?: string;
  credential_kind?: string;
  mcp_url?: string;
}

type HiggsfieldConnection =
  | { mode: "mcp"; credentials: HiggsfieldMcpCredentials }
  | { mode: "api"; apiKey: string }
  | NotConnectedResult;

class HiggsfieldMcpAuthError extends Error {}

function higgsfieldNotConnected(): NotConnectedResult {
  return {
    error:
      "Higgsfield is not connected. Connect Higgsfield from Apps to use your Higgsfield account, plan, and credits, or pass api_key for the Cloud API fallback.",
    not_connected: true,
    connector: "higgsfield",
    how_to_connect: [
      "Open Apps > Higgsfield > Connect.",
      "Sign in with Higgsfield in the popup.",
      "When Higgsfield shows Connected, UnClick can use that Higgsfield account on any PC signed into UnClick.",
      "Optional fallback: pass api_key or set HIGGSFIELD_API_KEY if you specifically want the Higgsfield Cloud API path instead.",
    ],
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function stringField(source: Record<string, unknown>, key: string): string {
  const value = source[key];
  return typeof value === "string" ? value.trim() : "";
}

function apiBase(): string {
  return (process.env.UNCLICK_API_URL ?? "https://unclick.world").replace(/\/$/, "");
}

function responseHeader(res: Response, name: string): string {
  return res.headers.get(name) ?? "";
}

function mcpTimeoutMs(): number {
  return Number(process.env.HIGGSFIELD_MCP_TIMEOUT_MS) || Number(process.env.HIGGSFIELD_TIMEOUT_MS) || 60000;
}

function apiTimeoutMs(): number {
  return Number(process.env.HIGGSFIELD_TIMEOUT_MS) || 60000;
}

async function fetchStoredHiggsfieldCredentials(): Promise<Record<string, string> | null> {
  const apiKey = process.env.UNCLICK_API_KEY?.trim();
  if (!apiKey) return null;

  try {
    const res = await fetch(`${apiBase()}/api/credentials?platform=higgsfield`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    if (!res.ok) return null;
    const data = await res.json() as unknown;
    if (!isRecord(data)) return null;
    const credentials: Record<string, string> = {};
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === "string") credentials[key] = value;
    }
    return credentials;
  } catch {
    return null;
  }
}

async function persistStoredHiggsfieldCredentials(credentials: Record<string, string>): Promise<void> {
  const apiKey = process.env.UNCLICK_API_KEY?.trim();
  if (!apiKey) return;

  try {
    await fetch(`${apiBase()}/api/credentials`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        platform: "higgsfield",
        credentials,
        api_key: apiKey,
      }),
    });
  } catch {
    // The refreshed token is still usable for this request; persistence can retry later.
  }
}

function isHiggsfieldMcpCredential(credentials: Record<string, string> | null): credentials is Record<string, string> {
  if (!credentials) return false;
  if (!credentials.access_token) return false;
  if (credentials.api_key && !credentials.credential_kind) return false;
  return credentials.credential_kind === "higgsfield_mcp_oauth" || Boolean(credentials.refresh_token || credentials.mcp_url);
}

function toMcpCredentials(credentials: Record<string, string>): HiggsfieldMcpCredentials {
  return {
    access_token: credentials.access_token,
    refresh_token: credentials.refresh_token,
    expires_at: credentials.expires_at,
    client_id: credentials.client_id,
    token_type: credentials.token_type || "Bearer",
    scope: credentials.scope,
    credential_kind: credentials.credential_kind || "higgsfield_mcp_oauth",
    mcp_url: credentials.mcp_url || HF_MCP_URL,
  };
}

function mcpTokenExpired(credentials: HiggsfieldMcpCredentials): boolean {
  if (!credentials.expires_at) return false;
  const expiresAt = Date.parse(credentials.expires_at);
  if (!Number.isFinite(expiresAt)) return false;
  return expiresAt <= Date.now() + 60_000;
}

async function refreshMcpCredentials(credentials: HiggsfieldMcpCredentials): Promise<HiggsfieldMcpCredentials> {
  if (!credentials.refresh_token || !credentials.client_id) return credentials;

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: credentials.refresh_token,
    client_id: credentials.client_id,
  });

  const res = await fetch(HF_MCP_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: body.toString(),
  });
  if (!res.ok) throw new HiggsfieldMcpAuthError("Higgsfield login expired. Reconnect Higgsfield from UnClick Apps.");

  const tokenResponse = await res.json() as Record<string, unknown>;
  const accessToken = stringField(tokenResponse, "access_token");
  if (!accessToken) throw new HiggsfieldMcpAuthError("Higgsfield did not return a refreshed access token.");

  const expiresIn = Number(tokenResponse.expires_in ?? 0);
  const refreshed: HiggsfieldMcpCredentials = {
    ...credentials,
    access_token: accessToken,
    refresh_token: stringField(tokenResponse, "refresh_token") || credentials.refresh_token,
    token_type: stringField(tokenResponse, "token_type") || credentials.token_type || "Bearer",
    scope: stringField(tokenResponse, "scope") || credentials.scope,
    expires_at: Number.isFinite(expiresIn) && expiresIn > 0
      ? new Date(Date.now() + expiresIn * 1000).toISOString()
      : credentials.expires_at,
    credential_kind: "higgsfield_mcp_oauth",
    mcp_url: credentials.mcp_url || HF_MCP_URL,
  };

  await persistStoredHiggsfieldCredentials({
    access_token: refreshed.access_token,
    ...(refreshed.refresh_token ? { refresh_token: refreshed.refresh_token } : {}),
    ...(refreshed.expires_at ? { expires_at: refreshed.expires_at } : {}),
    ...(refreshed.client_id ? { client_id: refreshed.client_id } : {}),
    ...(refreshed.scope ? { scope: refreshed.scope } : {}),
    token_type: refreshed.token_type || "Bearer",
    credential_kind: "higgsfield_mcp_oauth",
    mcp_url: refreshed.mcp_url || HF_MCP_URL,
  });

  return refreshed;
}

async function ensureFreshMcpCredentials(credentials: HiggsfieldMcpCredentials): Promise<HiggsfieldMcpCredentials> {
  if (!mcpTokenExpired(credentials)) return credentials;
  return refreshMcpCredentials(credentials);
}

async function resolveHiggsfieldConnection(args: Record<string, unknown>): Promise<HiggsfieldConnection> {
  const explicitApiKey = String(args.api_key ?? "").trim();
  if (explicitApiKey) return { mode: "api", apiKey: explicitApiKey };

  const stored = await fetchStoredHiggsfieldCredentials();
  if (isHiggsfieldMcpCredential(stored)) {
    return { mode: "mcp", credentials: await ensureFreshMcpCredentials(toMcpCredentials(stored)) };
  }

  const storedApiKey = stored?.api_key?.trim();
  if (storedApiKey) return { mode: "api", apiKey: storedApiKey };

  const envApiKey = process.env.HIGGSFIELD_API_KEY?.trim();
  if (envApiKey) return { mode: "api", apiKey: envApiKey };

  return higgsfieldNotConnected();
}

async function hfGet<T>(apiKey: string, path: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), apiTimeoutMs());
  let res: Response;
  try {
    res = await fetch(`${HF_API_BASE}${path}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Higgsfield request timed out after ${apiTimeoutMs()}ms.`);
    }
    throw new Error(`Higgsfield network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) throw new Error("Higgsfield rate limit reached (HTTP 429). Please wait and retry.");

  const data = await res.json() as Record<string, unknown>;
  if (!res.ok) {
    const msg = (data.message as string) ?? (data.error as string) ?? `status ${res.status}`;
    throw new Error(`Higgsfield error (${res.status}): ${msg}`);
  }
  return data as T;
}

async function hfPost<T>(apiKey: string, path: string, body: unknown): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), apiTimeoutMs());
  let res: Response;
  try {
    res = await fetch(`${HF_API_BASE}${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Higgsfield request timed out after ${apiTimeoutMs()}ms.`);
    }
    throw new Error(`Higgsfield network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) throw new Error("Higgsfield rate limit reached (HTTP 429). Please wait and retry.");

  const data = await res.json() as Record<string, unknown>;
  if (!res.ok) {
    const msg = (data.message as string) ?? (data.error as string) ?? `status ${res.status}`;
    throw new Error(`Higgsfield error (${res.status}): ${msg}`);
  }
  return data as T;
}

function parseSseJson(text: string): unknown[] {
  const events: unknown[] = [];
  let dataLines: string[] = [];
  const flush = () => {
    if (dataLines.length === 0) return;
    const data = dataLines.join("\n").trim();
    dataLines = [];
    if (!data || data === "[DONE]") return;
    try { events.push(JSON.parse(data)); } catch { /* ignore non-json SSE frames */ }
  };

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trimEnd();
    if (!line) {
      flush();
    } else if (line.startsWith("data:")) {
      dataLines.push(line.slice(5).trimStart());
    }
  }
  flush();
  return events;
}

async function readMcpPayload(res: Response, id: number | null): Promise<unknown> {
  if (res.status === 202 || res.status === 204) return null;

  const text = await res.text();
  const contentType = responseHeader(res, "content-type");
  const candidates = contentType.includes("text/event-stream")
    ? parseSseJson(text)
    : [JSON.parse(text || "null") as unknown];

  for (const candidate of candidates) {
    if (!isRecord(candidate)) continue;
    if (candidate.error) {
      const err = isRecord(candidate.error) ? candidate.error : {};
      throw new Error(String(err.message ?? "Higgsfield MCP request failed."));
    }
    if (id === null || candidate.id === id) return candidate.result ?? candidate;
  }

  return candidates[0] ?? null;
}

async function mcpRequest(args: {
  credentials: HiggsfieldMcpCredentials;
  method: string;
  params?: Record<string, unknown>;
  sessionId?: string;
  notification?: boolean;
}): Promise<{ result: unknown; sessionId?: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), mcpTimeoutMs());
  const id = args.notification ? null : Date.now();

  let res: Response;
  try {
    res = await fetch(args.credentials.mcp_url || HF_MCP_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${args.credentials.access_token}`,
        Accept: "application/json, text/event-stream",
        "Content-Type": "application/json",
        "MCP-Protocol-Version": MCP_PROTOCOL_VERSION,
        ...(args.sessionId ? { "Mcp-Session-Id": args.sessionId } : {}),
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        ...(id === null ? {} : { id }),
        method: args.method,
        ...(args.params ? { params: args.params } : {}),
      }),
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Higgsfield MCP request timed out after ${mcpTimeoutMs()}ms.`);
    }
    throw new Error(`Higgsfield MCP network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }

  if (res.status === 401 || res.status === 403) {
    throw new HiggsfieldMcpAuthError("Higgsfield login expired. Reconnect Higgsfield from UnClick Apps.");
  }
  if (res.status === 429) throw new Error("Higgsfield MCP rate limit reached (HTTP 429). Please wait and retry.");
  if (!res.ok && res.status !== 202) {
    const text = await res.text().catch(() => "");
    throw new Error(`Higgsfield MCP error (${res.status}): ${text || "request failed"}`);
  }

  return {
    result: await readMcpPayload(res, id),
    sessionId: responseHeader(res, "mcp-session-id") || args.sessionId,
  };
}

async function createMcpSession(credentials: HiggsfieldMcpCredentials): Promise<{ credentials: HiggsfieldMcpCredentials; sessionId?: string }> {
  const initialized = await mcpRequest({
    credentials,
    method: "initialize",
    params: {
      protocolVersion: MCP_PROTOCOL_VERSION,
      capabilities: {},
      clientInfo: { name: "UnClick Higgsfield Bridge", version: "1.0.0" },
    },
  });
  const sessionId = initialized.sessionId;

  await mcpRequest({
    credentials,
    method: "notifications/initialized",
    params: {},
    sessionId,
    notification: true,
  }).catch(() => undefined);

  return { credentials, sessionId };
}

function toolsFromListResult(result: unknown): string[] {
  if (!isRecord(result)) return [];
  const tools = Array.isArray(result.tools) ? result.tools : [];
  return tools
    .map((tool) => isRecord(tool) ? String(tool.name ?? "").trim() : "")
    .filter(Boolean);
}

async function chooseNativeTool(
  session: { credentials: HiggsfieldMcpCredentials; sessionId?: string },
  preferredNames: string[],
): Promise<string> {
  const listed = await mcpRequest({
    credentials: session.credentials,
    method: "tools/list",
    params: {},
    sessionId: session.sessionId,
  });
  const names = toolsFromListResult(listed.result);
  for (const name of preferredNames) {
    if (names.includes(name)) return name;
  }
  throw new Error(`Higgsfield MCP is connected, but it did not expose ${preferredNames.join(" or ")}.`);
}

async function callNativeHiggsfieldTool(
  credentials: HiggsfieldMcpCredentials,
  preferredNames: string[],
  toolArgs: Record<string, unknown>,
): Promise<unknown> {
  let fresh = await ensureFreshMcpCredentials(credentials);
  try {
    const session = await createMcpSession(fresh);
    const toolName = await chooseNativeTool(session, preferredNames);
    const called = await mcpRequest({
      credentials: session.credentials,
      method: "tools/call",
      params: { name: toolName, arguments: toolArgs },
      sessionId: session.sessionId,
    });
    return stampMeta({
      provider: "higgsfield_mcp",
      tool: toolName,
      arguments: toolArgs,
      result: called.result,
    }, {
      source: "Higgsfield MCP",
      fetched_at: new Date().toISOString(),
      next_steps: ["This used the signed-in customer's Higgsfield account, plan, and credits."],
    });
  } catch (err) {
    if (!(err instanceof HiggsfieldMcpAuthError) || !fresh.refresh_token || !fresh.client_id) throw err;
    fresh = await refreshMcpCredentials(fresh);
    const session = await createMcpSession(fresh);
    const toolName = await chooseNativeTool(session, preferredNames);
    const called = await mcpRequest({
      credentials: session.credentials,
      method: "tools/call",
      params: { name: toolName, arguments: toolArgs },
      sessionId: session.sessionId,
    });
    return stampMeta({
      provider: "higgsfield_mcp",
      tool: toolName,
      arguments: toolArgs,
      result: called.result,
    }, {
      source: "Higgsfield MCP",
      fetched_at: new Date().toISOString(),
      next_steps: ["This used the signed-in customer's Higgsfield account, plan, and credits."],
    });
  }
}

function gcd(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y) [x, y] = [y, x % y];
  return x || 1;
}

function inferAspectRatio(width: unknown, height: unknown): string {
  const w = Number(width);
  const h = Number(height);
  if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) return "";
  const divisor = gcd(w, h);
  return `${Math.round(w / divisor)}:${Math.round(h / divisor)}`;
}

function inferResolution(args: Record<string, unknown>): string {
  const explicit = String(args.resolution ?? "").trim();
  if (explicit) return explicit;
  const maxDimension = Math.max(Number(args.width ?? 0), Number(args.height ?? 0));
  if (maxDimension >= 3000) return "4k";
  if (maxDimension >= 1800) return "2k";
  if (maxDimension > 0) return "1k";
  return "";
}

function imageMcpArgs(args: Record<string, unknown>): Record<string, unknown> {
  const body: Record<string, unknown> = { prompt: String(args.prompt ?? "").trim() };
  const model = String(args.model ?? "").trim();
  const style = String(args.style ?? "").trim();
  if (model) body.model = model;
  if (style) body.style = style;
  const resolution = inferResolution(args);
  if (resolution) body.resolution = resolution;
  const aspectRatio = String(args.aspect_ratio ?? "").trim() || inferAspectRatio(args.width, args.height);
  if (aspectRatio) body.aspect_ratio = aspectRatio;
  if (args.negative_prompt) body.negative_prompt = String(args.negative_prompt);
  if (args.seed !== undefined) body.seed = Number(args.seed);
  return body;
}

function videoMcpArgs(args: Record<string, unknown>): Record<string, unknown> {
  const body: Record<string, unknown> = { prompt: String(args.prompt ?? "").trim() };
  if (args.model) body.model = String(args.model);
  if (args.style) body.style = String(args.style);
  if (args.duration) body.duration = Number(args.duration);
  if (args.aspect_ratio) body.aspect_ratio = String(args.aspect_ratio);
  if (args.negative_prompt) body.negative_prompt = String(args.negative_prompt);
  if (args.seed !== undefined) body.seed = Number(args.seed);
  return body;
}

export async function higgsfield_generate_video(args: Record<string, unknown>): Promise<unknown> {
  const prompt = String(args.prompt ?? "").trim();
  if (!prompt) throw new Error("prompt is required.");

  const connection = await resolveHiggsfieldConnection(args);
  if ("error" in connection) return connection;
  if (connection.mode === "mcp") {
    return callNativeHiggsfieldTool(connection.credentials, ["generate_video", "video_generate"], videoMcpArgs(args));
  }

  const body = videoMcpArgs(args);
  const result = await hfPost<Record<string, unknown>>(connection.apiKey, "/video/generate", body);

  return {
    generation_id: result.id ?? result.generation_id ?? null,
    status: result.status ?? "submitted",
    prompt,
    note: "Use higgsfield_get_status with the generation_id to poll for completion.",
    raw: result,
  };
}

export async function higgsfield_generate_image(args: Record<string, unknown>): Promise<unknown> {
  const prompt = String(args.prompt ?? "").trim();
  if (!prompt) throw new Error("prompt is required.");

  const connection = await resolveHiggsfieldConnection(args);
  if ("error" in connection) return connection;
  if (connection.mode === "mcp") {
    return callNativeHiggsfieldTool(connection.credentials, ["generate_image", "image_generate"], imageMcpArgs(args));
  }

  const body = imageMcpArgs(args);
  const result = await hfPost<Record<string, unknown>>(connection.apiKey, "/image/generate", body);

  return {
    generation_id: result.id ?? result.generation_id ?? null,
    status: result.status ?? "submitted",
    image_url: result.image_url ?? result.url ?? null,
    prompt,
    raw: result,
  };
}

export async function higgsfield_get_styles(args: Record<string, unknown>): Promise<unknown> {
  const connection = await resolveHiggsfieldConnection(args);
  if ("error" in connection) return connection;
  if (connection.mode === "mcp") {
    return callNativeHiggsfieldTool(connection.credentials, ["models_explore", "get_styles"], {
      action: String(args.action ?? "search"),
      type: String(args.type ?? "image"),
      ...(args.query ? { query: String(args.query) } : {}),
    });
  }

  const data = await hfGet<{ styles?: unknown[]; data?: unknown[] }>(connection.apiKey, "/styles");
  const styles = data.styles ?? data.data ?? [];
  return {
    count: Array.isArray(styles) ? styles.length : 0,
    styles,
  };
}

export async function higgsfield_get_status(args: Record<string, unknown>): Promise<unknown> {
  const generationId = String(args.generation_id ?? "").trim();
  if (!generationId) throw new Error("generation_id is required.");

  const connection = await resolveHiggsfieldConnection(args);
  if ("error" in connection) return connection;
  if (connection.mode === "mcp") {
    return callNativeHiggsfieldTool(connection.credentials, ["get_status", "generation_status", "jobs_get_status"], {
      generation_id: generationId,
    });
  }

  const result = await hfGet<Record<string, unknown>>(connection.apiKey, `/generation/${encodeURIComponent(generationId)}`);

  return stampMeta({
    generation_id: generationId,
    status: result.status ?? null,
    video_url: result.video_url ?? result.url ?? null,
    image_url: result.image_url ?? null,
    created_at: result.created_at ?? null,
    completed_at: result.completed_at ?? null,
    error: result.error ?? null,
    raw: result,
  }, {
    source: "Higgsfield",
    fetched_at: new Date().toISOString(),
    next_steps: ["If status is not completed, poll higgsfield_get_status again; once done, use the media url."],
  });
}
