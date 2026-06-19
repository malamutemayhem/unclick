/**
 * UnClick MCP Endpoint - Vercel serverless function
 *
 * Serves the UnClick MCP server over Streamable HTTP (JSON-RPC + SSE).
 * Agents connect here to discover and call all UnClick tools.
 *
 * Usage:
 *   POST https://unclick.world/api/mcp
 *   Content-Type: application/json
 *   Auth (any of):
 *     - Authorization: Bearer <unclick_api_key>         (agents, preferred)
 *     - Authorization: Bearer <mcp_oauth_access_token>  (remote MCP OAuth)
 *     - ?key=<unclick_api_key> query param              (for clients whose
 *       "Add custom connector" dialog accepts a URL only, e.g. Claude.ai
 *       and ChatGPT's Connectors UI)
 *     - Cookie with a Supabase Auth session (for calls initiated
 *       from an authenticated browser session on unclick.world).
 *       The session user_id is resolved to an api_keys row via
 *       api_keys.user_id FK; that row's key_hash becomes the tenancy
 *       context, so memory routing is identical to the api_key path.
 *     - Public MCP pairing id carried by /api/mcp/p/:pair, ?pair=,
 *       mcp-session-id, or cookie after the user opens the generated sign-in
 *       link and completes pairing.
 *   Body: MCP JSON-RPC message (initialize, tools/list, tools/call, etc.)
 *
 * The endpoint is stateless - each request spins up a fresh MCP server
 * instance, which is safe for serverless and works with all MCP clients.
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import * as crypto from "crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import {
  ADVERTISED_TOOLS_SAFE,
  createServer,
} from "../packages/mcp-server/src/server.js";
import { normalizeAcceptHeader } from "./lib/mcp-protocol.js";
import {
  buildPublicMcpPairCookie,
  createPublicMcpPairId,
  isValidPublicMcpPairId,
  PUBLIC_MCP_PAIR_COOKIE,
  publicMcpPairDeviceId,
} from "./lib/public-mcp-pairing.js";
import {
  mcpOAuthWwwAuthenticate,
  verifyMcpOAuthToken,
} from "./lib/mcp-oauth.js";
import {
  effectiveMemoryTier,
  isMemoryQuotaExemptEmail,
} from "../packages/mcp-server/src/memory/quota-policy.js";

function sha256hex(input: string): string {
  return crypto.createHash("sha256").update(input).digest("hex");
}

// Protected remote MCP clients need the OAuth challenge during the initial
// handshake, not only after a user tries to invoke a tool. `tools/list` stays
// public as a compatibility discovery path for clients that do not yet support
// MCP OAuth, but `initialize` and `tools/call` require an authenticated context.
const AUTH_REQUIRED_METHODS = new Set<string>(["initialize", "tools/call"]);

type JsonRpcId = string | number | null;

export const PUBLIC_PAIRING_TOOL = {
  name: "unclick_start_pairing",
  title: "Connect UnClick",
  description:
    "Use when this UnClick MCP connection is not paired yet. It gives the user a safe sign-in link that completes the public URL pairing.",
  inputSchema: {
    type: "object" as const,
    additionalProperties: false,
    properties: {
      email: {
        type: "string",
        description:
          "Optional email address to pre-fill on the UnClick sign-in page.",
      },
    },
  },
};

export function publicToolsForUnpairedClient() {
  return [PUBLIC_PAIRING_TOOL];
}

function singleRpc(body: unknown): Record<string, unknown> | null {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  return body as Record<string, unknown>;
}

function singleRpcMethod(body: unknown): string | null {
  const rpc = singleRpc(body);
  return typeof rpc?.method === "string" ? rpc.method : null;
}

function singleToolName(body: unknown): string | null {
  const rpc = singleRpc(body);
  const params = rpc?.params;
  if (!params || typeof params !== "object") return null;
  const name = (params as Record<string, unknown>).name;
  return typeof name === "string" ? name : null;
}

function singleToolArgs(body: unknown): Record<string, unknown> {
  const rpc = singleRpc(body);
  const params = rpc?.params;
  if (!params || typeof params !== "object") return {};
  const args = (params as Record<string, unknown>).arguments;
  return args && typeof args === "object" && !Array.isArray(args)
    ? (args as Record<string, unknown>)
    : {};
}

function readCookie(
  cookieHeader: string | undefined,
  name: string,
): string | null {
  if (!cookieHeader) return null;
  const parts = cookieHeader.split(/;\s*/);
  for (const part of parts) {
    const eq = part.indexOf("=");
    if (eq === -1) continue;
    if (part.slice(0, eq).trim() !== name) continue;
    const raw = part.slice(eq + 1);
    try {
      return decodeURIComponent(raw);
    } catch {
      return raw;
    }
  }
  return null;
}

function publicPairIdFromPath(req: VercelRequest): string | null {
  if (!req.url) return null;
  try {
    const url = new URL(req.url, "https://unclick.world");
    const match = /^\/api\/mcp\/p\/([^/?#]+)$/.exec(url.pathname);
    if (!match) return null;
    const decoded = decodeURIComponent(match[1] ?? "");
    return isValidPublicMcpPairId(decoded) ? decoded.trim() : null;
  } catch {
    return null;
  }
}

export function publicPairIdFromRequest(req: VercelRequest): string | null {
  // Explicit URL sources are highest priority (user chose this URL).
  const pairRaw = req.query.pair;
  const fromQuery =
    typeof pairRaw === "string"
      ? pairRaw
      : Array.isArray(pairRaw)
        ? pairRaw[0]
        : undefined;
  if (isValidPublicMcpPairId(fromQuery)) return fromQuery.trim();

  const fromPath = publicPairIdFromPath(req);
  if (fromPath) return fromPath;

  // mcp-session-id is the MCP-spec mechanism the client echoes back after
  // the server sets it. Check it before the cookie so a stale cookie from
  // a previous (possibly different) pairing attempt cannot override the
  // client's current session identity.
  const header = req.headers["mcp-session-id"];
  const fromHeader = Array.isArray(header) ? header[0] : header;
  if (isValidPublicMcpPairId(fromHeader)) return fromHeader.trim();

  const fromCookie = readCookie(req.headers.cookie, PUBLIC_MCP_PAIR_COOKIE);
  if (isValidPublicMcpPairId(fromCookie)) return fromCookie.trim();

  return null;
}

function attachPublicPairHeaders(res: VercelResponse, pairId: string): void {
  res.setHeader("Set-Cookie", buildPublicMcpPairCookie(pairId));
  res.setHeader("mcp-session-id", pairId);
}

function attachMcpOAuthChallenge(res: VercelResponse, error?: string): void {
  res.setHeader("WWW-Authenticate", mcpOAuthWwwAuthenticate(error));
}

function ensurePublicPairId(req: VercelRequest, res: VercelResponse): string {
  const existing = publicPairIdFromRequest(req);
  const pairId = existing ?? createPublicMcpPairId();
  attachPublicPairHeaders(res, pairId);
  return pairId;
}

export function pairingLoginUrl(email?: string, pairId?: string): string {
  const url = new URL("https://unclick.world/login");
  const next = new URL("/pair/connected", "https://unclick.world");
  if (isValidPublicMcpPairId(pairId)) {
    next.searchParams.set("pair", pairId.trim());
  }
  url.searchParams.set("next", `${next.pathname}${next.search}`);
  if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    url.searchParams.set("email", email.trim().toLowerCase());
  }
  return url.toString();
}

export function pairedMcpUrl(pairId?: string): string {
  if (!isValidPublicMcpPairId(pairId)) return "https://unclick.world/api/mcp";
  return `https://unclick.world/api/mcp/p/${encodeURIComponent(pairId.trim())}`;
}

export function pairingToolResult(
  args: Record<string, unknown>,
  pairId?: string,
) {
  const email = typeof args.email === "string" ? args.email.trim() : "";
  const loginUrl = pairingLoginUrl(email, pairId);
  const lines = [
    "UnClick is installed, but this AI app is not paired to an UnClick account yet.",
    "",
    "Next step:",
    `Open ${loginUrl}`,
    "",
    "Sign in with email, Google, or Microsoft. When the page says UnClick is ready, try the tool again.",
    "",
    "Preferred server URL for every AI app:",
    "https://unclick.world/api/mcp",
  ];
  if (isValidPublicMcpPairId(pairId)) {
    lines.push(
      "",
      "If tools still fail after sign-in, this AI app may not keep session state between requests.",
      `Reconfigure this MCP server with the paired URL instead: ${pairedMcpUrl(pairId)}`,
      "The paired URL embeds the connection identity in the path so no cookies or headers are needed.",
    );
  }
  lines.push(
    "",
    "The ready page has private fallback options only for older apps that cannot keep web sign-in.",
  );
  return {
    content: [
      {
        type: "text",
        text: lines.join("\n"),
      },
    ],
  };
}

// Peek the JSON-RPC body so we can (1) echo the request id back in error
// responses (JSON-RPC 2.0 § 5.1 requires id equality) and (2) decide whether
// the request is attempting protected tool execution. Batches are handled
// conservatively: any protected or malformed entry forces auth.
export function peekRpc(body: unknown): {
  id: JsonRpcId;
  authRequired: boolean;
} {
  const entries = Array.isArray(body) ? body : [body];
  let id: JsonRpcId = null;
  let firstHasId = false;
  let authRequired = entries.length === 0;
  for (const entry of entries) {
    if (!entry || typeof entry !== "object") {
      authRequired = true;
      continue;
    }
    const obj = entry as Record<string, unknown>;
    const method = typeof obj.method === "string" ? obj.method : undefined;
    if (!method || AUTH_REQUIRED_METHODS.has(method)) authRequired = true;
    if (!firstHasId && "id" in obj) {
      const raw = obj.id;
      if (typeof raw === "string" || typeof raw === "number" || raw === null) {
        id = raw;
      }
      firstHasId = true;
    }
  }
  return { id, authRequired };
}

export interface ApiKeyContext {
  api_key_hash: string;
  tier: string;
  user_id: string | null;
  account_email: string | null;
  memory_quota_exempt: boolean;
}

function getSupabaseEnv(): { url: string; key: string } | null {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return { url, key };
}

/**
 * Look up an inbound api_key in the api_keys table. Returns the tenancy
 * context if the key is active, or null otherwise. The Supabase service-role
 * client is created on demand so the validator no-ops gracefully when env is
 * unconfigured (local tests, preview deploys without secrets).
 */
async function validateApiKey(apiKey: string): Promise<ApiKeyContext | null> {
  const env = getSupabaseEnv();
  if (!env) return null;

  const supabase = createClient(env.url, env.key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const apiKeyHash = sha256hex(apiKey);
  const { data, error } = await supabase
    .from("api_keys")
    .select("user_id, tier, is_active")
    .eq("key_hash", apiKeyHash)
    .maybeSingle();

  if (error || !data || data.is_active === false) return null;

  let accountEmail: string | null = null;
  if (data.user_id) {
    try {
      const { data: userData } = await supabase.auth.admin.getUserById(
        data.user_id,
      );
      accountEmail = userData.user?.email ?? null;
    } catch {
      accountEmail = null;
    }
  }
  const memoryQuotaExempt = isMemoryQuotaExemptEmail(accountEmail);

  // Fire-and-forget last_used_at + usage_count bump
  supabase
    .from("api_keys")
    .update({ last_used_at: new Date().toISOString() })
    .eq("key_hash", apiKeyHash)
    .then(() => {});

  return {
    api_key_hash: apiKeyHash,
    tier: effectiveMemoryTier(data.tier ?? "free", accountEmail),
    user_id: data.user_id ?? null,
    account_email: accountEmail,
    memory_quota_exempt: memoryQuotaExempt,
  };
}

async function apiKeyContextForUser(
  supabase: SupabaseClient,
  userId: string,
  email: string | null,
): Promise<ApiKeyContext | null> {
  const { data: keyRow, error: keyErr } = await supabase
    .from("api_keys")
    .select("key_hash, tier, is_active, last_used_at")
    .eq("user_id", userId)
    .eq("is_active", true)
    .order("last_used_at", { ascending: false, nullsFirst: false })
    .limit(1)
    .maybeSingle();
  if (keyErr || !keyRow) return null;

  supabase
    .from("api_keys")
    .update({ last_used_at: new Date().toISOString() })
    .eq("key_hash", keyRow.key_hash)
    .then(() => {});

  return {
    api_key_hash: keyRow.key_hash,
    tier: effectiveMemoryTier(keyRow.tier ?? "free", email),
    user_id: userId,
    account_email: email,
    memory_quota_exempt: isMemoryQuotaExemptEmail(email),
  };
}

/**
 * Read the Supabase auth session cookie off the request, verify it
 * with supabase.auth.getUser(), then resolve to an api_keys tenancy
 * context via the user_id FK added in Phase 2. Returns null if:
 *   - the cookie isn't present
 *   - the session is invalid/expired
 *   - the authenticated user has no api_keys row (edge case: user
 *     signed up via Supabase Auth without ever being issued a key)
 *
 * Returning null lets the handler fall through to the api_key path.
 * We never mix the two - session-cookie auth produces a distinct
 * ApiKeyContext where api_key_hash is still the tenancy key, but
 * derived from the user's api_keys row rather than an inbound
 * Authorization: Bearer header.
 */
async function validateSessionCookie(
  req: VercelRequest,
): Promise<ApiKeyContext | null> {
  const env = getSupabaseEnv();
  if (!env) return null;

  // Supabase stores the session in a cookie named sb-<project-ref>-auth-token
  // (or in the legacy "supabase-auth-token" slot). The value is a
  // url-encoded JSON array whose first entry is the access token. We
  // don't try to parse every shape here - we let supabase.auth.getUser
  // do the verification work, and just sniff the raw access token.
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return null;

  const accessToken = extractSupabaseAccessToken(cookieHeader);
  if (!accessToken) return null;

  const supabase = createClient(env.url, env.key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: userData, error: userErr } =
    await supabase.auth.getUser(accessToken);
  if (userErr || !userData?.user) return null;
  const userId = userData.user.id;

  // Find an active api_keys row linked to this user. Phase 2 backfills
  // user_id where the old-shape api_keys.email matches an auth.users
  // row; the claim flow fills in the rest over time. Take the most
  // recently used key if the user has more than one.
  return apiKeyContextForUser(supabase, userId, userData.user.email ?? null);
}

async function validatePublicMcpPair(
  pairId: string,
): Promise<ApiKeyContext | null> {
  if (!isValidPublicMcpPairId(pairId)) return null;
  const env = getSupabaseEnv();
  if (!env) return null;

  const supabase = createClient(env.url, env.key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const deviceId = publicMcpPairDeviceId(pairId);
  const { data: devices, error: deviceErr } = await supabase
    .from("auth_devices")
    .select("user_id")
    .eq("device_id", deviceId)
    .is("revoked_at", null)
    .limit(2);
  if (deviceErr || !devices || devices.length !== 1) return null;

  const userId = (devices[0] as { user_id?: unknown }).user_id;
  if (typeof userId !== "string" || !userId) return null;

  const { data: userData } = await supabase.auth.admin.getUserById(userId);
  const email = userData?.user?.email ?? null;
  const ctx = await apiKeyContextForUser(supabase, userId, email);
  if (!ctx) return null;

  supabase
    .from("auth_devices")
    .update({ last_seen_at: new Date().toISOString() })
    .eq("device_id", deviceId)
    .eq("user_id", userId)
    .then(() => {});

  return ctx;
}

async function validateMcpOAuthAccessToken(
  token: string,
): Promise<ApiKeyContext | null> {
  let payload;
  try {
    payload = verifyMcpOAuthToken(token, "access", process.env);
  } catch {
    return null;
  }

  const env = getSupabaseEnv();
  if (!env) return null;

  const supabase = createClient(env.url, env.key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: userData } = await supabase.auth.admin.getUserById(payload.sub);
  const email = userData?.user?.email ?? null;
  return apiKeyContextForUser(supabase, payload.sub, email);
}

/**
 * Best-effort extraction of a Supabase access token out of the raw
 * cookie header. Supabase Auth names its cookie sb-<project>-auth-token
 * and stores a JSON-encoded array whose first element is the JWT.
 * If parsing fails we just return null and fall through.
 */
function extractSupabaseAccessToken(cookieHeader: string): string | null {
  const parts = cookieHeader.split(/;\s*/);
  for (const part of parts) {
    const eq = part.indexOf("=");
    if (eq === -1) continue;
    const name = part.slice(0, eq).trim();
    if (!/^sb-.*-auth-token$/.test(name) && name !== "supabase-auth-token") {
      continue;
    }
    const raw = decodeURIComponent(part.slice(eq + 1));
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && typeof parsed[0] === "string") {
        return parsed[0];
      }
      if (
        parsed &&
        typeof parsed === "object" &&
        typeof (parsed as { access_token?: unknown }).access_token === "string"
      ) {
        return (parsed as { access_token: string }).access_token;
      }
    } catch {
      // Some clients may just drop the raw JWT in. Treat the whole
      // value as the token if it looks like a JWT.
      if (/^[\w-]+\.[\w-]+\.[\w-]+$/.test(raw)) return raw;
    }
  }
  return null;
}

export function applyMcpRequestEnv(
  apiKey: string,
  ctx: ApiKeyContext | null,
): void {
  if (apiKey && ctx) {
    process.env.UNCLICK_API_KEY = apiKey;
  } else {
    delete process.env.UNCLICK_API_KEY;
  }

  if (ctx) {
    process.env.UNCLICK_API_KEY_HASH = ctx.api_key_hash;
    process.env.UNCLICK_TIER = ctx.tier;
    if (ctx.account_email) {
      process.env.UNCLICK_ACCOUNT_EMAIL = ctx.account_email;
    } else {
      delete process.env.UNCLICK_ACCOUNT_EMAIL;
    }
    process.env.UNCLICK_MEMORY_QUOTA_EXEMPT = ctx.memory_quota_exempt
      ? "true"
      : "false";
    if (ctx.user_id) {
      process.env.UNCLICK_USER_ID = ctx.user_id;
    } else {
      delete process.env.UNCLICK_USER_ID;
    }
  } else {
    delete process.env.UNCLICK_API_KEY_HASH;
    delete process.env.UNCLICK_TIER;
    delete process.env.UNCLICK_USER_ID;
    delete process.env.UNCLICK_ACCOUNT_EMAIL;
    delete process.env.UNCLICK_MEMORY_QUOTA_EXEMPT;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // ── CORS - allow any origin so AI agents can connect from anywhere ──────────
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, mcp-session-id",
  );
  res.setHeader(
    "Access-Control-Expose-Headers",
    "mcp-session-id, WWW-Authenticate",
  );

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  // Peek up front so error responses can echo the request id and so the auth
  // gate can recognise protected tool execution.
  const peeked = peekRpc(req.body);

  if (req.method !== "POST") {
    return res.status(405).json({
      jsonrpc: "2.0",
      error: {
        code: -32601,
        message:
          "Method Not Allowed. POST to this endpoint with an MCP JSON-RPC message.",
      },
      id: peeked.id,
    });
  }

  // ── Auth ──────────────────────────────────────────────────────────────
  // Auth paths, tried in order:
  //   1. Authorization: Bearer <unclick_api_key>   (agents)
  //   2. Authorization: Bearer <mcp_oauth_access_token>
  //   3. ?key=<unclick_api_key> query param         (legacy clients
  //      connector UIs that can't set headers)
  //   4. Supabase Auth session cookie               (browser on
  //      unclick.world after Phase 2 sign in)
  //   5. Public MCP pair id                         (paired URL/session after
  //      the generated browser sign-in link binds this client to a user)
  //
  // The api_key paths produce an ApiKeyContext directly. The session
  // cookie path resolves to the same ApiKeyContext shape via the
  // api_keys.user_id FK added in Phase 2, so everything downstream
  // (memory tenancy, tier checks) is identical.
  const authHeader = (req.headers.authorization as string) ?? "";
  const keyFromHeader = authHeader.replace(/^Bearer\s+/i, "").trim();
  const keyRaw = req.query.key;
  const keyFromQuery =
    typeof keyRaw === "string"
      ? keyRaw.trim()
      : Array.isArray(keyRaw)
        ? (keyRaw[0] ?? "").trim()
        : "";
  const bearerToken = keyFromHeader;
  const apiKey =
    keyFromQuery ||
    (bearerToken.startsWith("uc_") || bearerToken.startsWith("agt_")
      ? bearerToken
      : "");
  const method = singleRpcMethod(req.body);
  const toolName = singleToolName(req.body);

  let ctx: ApiKeyContext | null;

  if (apiKey) {
    ctx = await validateApiKey(apiKey);
    if (!ctx && peeked.authRequired) {
      attachMcpOAuthChallenge(res, "invalid_token");
      return res.status(401).json({
        jsonrpc: "2.0",
        error: {
          code: -32001,
          message:
            "Invalid or revoked API key. Check that the key is correct and still active. " +
            "Manage keys at https://unclick.world",
        },
        id: peeked.id,
      });
    }
  } else if (bearerToken) {
    ctx = await validateMcpOAuthAccessToken(bearerToken);
    if (!ctx) {
      const publicPairId = publicPairIdFromRequest(req);
      if (publicPairId) {
        ctx = await validatePublicMcpPair(publicPairId);
      }
    }
    if (!ctx && method === "initialize") {
      ensurePublicPairId(req, res);
      return res.status(200).json({
        jsonrpc: "2.0",
        result: {
          protocolVersion: "2025-03-26",
          capabilities: { tools: {} },
          serverInfo: { name: "@unclick/mcp-server", version: "0.3.0" },
        },
        id: peeked.id,
      });
    }
    if (!ctx && peeked.authRequired) {
      attachMcpOAuthChallenge(res, "invalid_token");
      return res.status(401).json({
        jsonrpc: "2.0",
        error: {
          code: -32001,
          message:
            "Invalid or expired UnClick MCP OAuth token. Reconnect this MCP server using https://unclick.world/api/mcp.",
        },
        id: peeked.id,
      });
    }
  } else {
    // No api_key supplied - try resolving via Supabase session cookie,
    // then via the public MCP pairing id carried by mcp-session-id/cookie.
    // Unprotected protocol methods skip this so the MCP SDK can answer them.
    ctx = await validateSessionCookie(req);
    const publicPairId = publicPairIdFromRequest(req);
    if (!ctx && publicPairId) {
      ctx = await validatePublicMcpPair(publicPairId);
    }
    if (!ctx && method === "tools/list") {
      ensurePublicPairId(req, res);
      return res.status(200).json({
        jsonrpc: "2.0",
        result: { tools: publicToolsForUnpairedClient() },
        id: peeked.id,
      });
    }
    if (
      !ctx &&
      method === "tools/call" &&
      toolName === PUBLIC_PAIRING_TOOL.name
    ) {
      const pairId = ensurePublicPairId(req, res);
      return res.status(200).json({
        jsonrpc: "2.0",
        result: pairingToolResult(singleToolArgs(req.body), pairId),
        id: peeked.id,
      });
    }
    // Discovery-mode initialize: strict MCP clients (Grok) send initialize
    // before tools/list. Without a bearer token this is a bare public client
    // attempting discovery, not an OAuth handshake, so let it through with
    // minimal capabilities. No tenant data is exposed. The client can then
    // proceed to tools/list and see unclick_start_pairing.
    if (!ctx && method === "initialize") {
      const pairId = ensurePublicPairId(req, res);
      return res.status(200).json({
        jsonrpc: "2.0",
        result: {
          protocolVersion: "2025-03-26",
          capabilities: { tools: {} },
          serverInfo: { name: "@unclick/mcp-server", version: "0.3.0" },
        },
        id: peeked.id,
      });
    }
    if (!ctx && peeked.authRequired) {
      const pairId = ensurePublicPairId(req, res);
      attachMcpOAuthChallenge(res);
      const loginUrl = pairingLoginUrl(undefined, pairId);
      return res.status(401).json({
        jsonrpc: "2.0",
        error: {
          code: -32001,
          message:
            "UnClick is installed but this AI app is not paired yet. " +
            `Call unclick_start_pairing, or open ${loginUrl}. ` +
            "After sign-in, try this MCP connection again. If the app asks for a fresh link " +
            "after the ready page, it did not keep the web sign-in session; keep " +
            "https://unclick.world/api/mcp as the normal URL and use the paired URL or " +
            "Compatibility URL only as fallback.",
        },
        id: peeked.id,
      });
    }
  }

  if (!apiKey && !ctx) {
    ensurePublicPairId(req, res);
  }

  // Inject per-request context. Vercel invocations are isolated processes,
  // so mutating process.env here is safe and is the existing pattern used by
  // createClient() and the memory backend factory.
  //
  // UNCLICK_API_KEY is only set on the Bearer/query path because the
  // session-cookie path never sees the plaintext key. Downstream code
  // that actually needs the plaintext (BYOD credential decryption)
  // must accept that session-cookie-authenticated callers cannot
  // access it - this is the AES-256-GCM encryption property we
  // explicitly want to preserve: a logged-in user cannot decrypt
  // another device's stored credentials without holding the api_key.
  // ctx is null only on unauthenticated handshake calls. Clear stale tenancy
  // env vars from prior invocations on the same warm serverless instance, and
  // never leak an unvalidated Bearer token into the MCP server environment.
  applyMcpRequestEnv(apiKey, ctx);

  // ── MCP over Streamable HTTP (stateless per-request) ───────────────────────
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined, // stateless mode - no sessions in serverless
  });

  // Normalize the Accept header before delegating to the SDK. The SDK's
  // Streamable HTTP transport bounces requests that lack both
  // "application/json" and "text/event-stream" with HTTP 406 + -32000 +
  // id:null - which cascades into RPC-002 (id null), RPC-004/MCP-006
  // (-32000 instead of -32601), and MCP-001/003/004 (initialize never
  // returns a real result). Spec-strict clients send both; spec-curious
  // ones (TestPass-core, plain JSON-RPC tools) send only application/json.
  // Stateless mode always replies with a JSON body, so being more
  // permissive than the SDK here is safe.
  normalizeAcceptHeader(req);

  let server: Awaited<ReturnType<typeof createServer>> | null = null;
  try {
    server = await createServer();
    await server.connect(transport);
    // Vercel parses the body automatically; pass it through to avoid re-parsing
    await transport.handleRequest(req, res, req.body);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[/api/mcp] Unhandled error:", message);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: "2.0",
        error: { code: -32603, message: "Internal server error" },
        id: peeked.id,
      });
    }
  } finally {
    // Clean up after the response is sent
    server?.close().catch(() => {});
  }
}
