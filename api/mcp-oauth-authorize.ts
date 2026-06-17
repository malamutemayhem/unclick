import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createHash, randomBytes } from "node:crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { effectiveMemoryTier } from "../packages/mcp-server/src/memory/quota-policy.js";
import {
  appendOAuthResponseParams,
  createMcpOAuthAuthorizationCode,
  isSafeOAuthRedirectUri,
  MCP_OAUTH_ISSUER,
  MCP_OAUTH_RESOURCE,
  normalizeMcpOAuthScope,
  validateRegisteredRedirectUri,
} from "./lib/mcp-oauth.js";

function sha256hex(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

function getSupabaseEnv(): { url: string; key: string } | null {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  return url && key ? { url, key } : null;
}

function bearerFrom(req: VercelRequest): string {
  return String(req.headers.authorization ?? "").replace(/^Bearer\s+/i, "").trim();
}

async function resolveSessionUser(
  req: VercelRequest,
  supabaseUrl: string,
  serviceRoleKey: string,
): Promise<{ id: string; email: string | null } | null> {
  const token = bearerFrom(req);
  if (!token || token.startsWith("uc_") || token.startsWith("agt_")) return null;
  try {
    const scoped = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    const { data, error } = await scoped.auth.getUser(token);
    if (error || !data?.user) return null;
    return { id: data.user.id, email: data.user.email ?? null };
  } catch {
    return null;
  }
}

async function ensureActiveApiKeyForUser(
  supabase: SupabaseClient,
  userId: string,
  email: string | null,
): Promise<boolean> {
  const existing = await supabase
    .from("api_keys")
    .select("id")
    .eq("user_id", userId)
    .eq("is_active", true)
    .limit(1)
    .maybeSingle();
  if (!existing.error && existing.data) return true;

  const rawKey = `uc_${randomBytes(16).toString("hex")}`;
  const insert = await supabase
    .from("api_keys")
    .insert({
      user_id: userId,
      key_hash: sha256hex(rawKey),
      key_prefix: rawKey.slice(0, 8),
      label: "mcp-oauth",
      tier: effectiveMemoryTier("free", email),
      is_active: true,
      usage_count: 0,
    })
    .select("id")
    .maybeSingle();

  if (!insert.error && insert.data) return true;

  const retry = await supabase
    .from("api_keys")
    .select("id")
    .eq("user_id", userId)
    .eq("is_active", true)
    .limit(1)
    .maybeSingle();
  return !retry.error && Boolean(retry.data);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "https://unclick.world");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "POST required" });

  const env = getSupabaseEnv();
  if (!env) return res.status(500).json({ error: "Supabase is not configured" });

  const body = (req.body ?? {}) as Record<string, unknown>;
  const clientId = String(body.client_id ?? "").trim();
  const redirectUri = String(body.redirect_uri ?? "").trim();
  const responseType = String(body.response_type ?? "").trim();
  const state = typeof body.state === "string" ? body.state : undefined;
  const scope = normalizeMcpOAuthScope(typeof body.scope === "string" ? body.scope : undefined);
  const resource = typeof body.resource === "string" ? body.resource.trim() : "";
  const codeChallenge = String(body.code_challenge ?? "").trim();
  const codeChallengeMethod = String(body.code_challenge_method ?? "").trim();

  if (responseType !== "code") return res.status(400).json({ error: "response_type must be code" });
  if (!clientId) return res.status(400).json({ error: "client_id required" });
  if (!isSafeOAuthRedirectUri(redirectUri)) return res.status(400).json({ error: "redirect_uri is not allowed" });
  try {
    if (!validateRegisteredRedirectUri(clientId, redirectUri, process.env)) {
      return res.status(400).json({ error: "redirect_uri was not registered for this client" });
    }
  } catch {
    return res.status(400).json({ error: "client_id is not a valid UnClick MCP registration" });
  }
  if (resource && resource !== MCP_OAUTH_RESOURCE) return res.status(400).json({ error: "resource must be the UnClick MCP URL" });
  if (!codeChallenge || codeChallengeMethod !== "S256") {
    return res.status(400).json({ error: "PKCE S256 code challenge required" });
  }

  const user = await resolveSessionUser(req, env.url, env.key);
  if (!user) return res.status(401).json({ error: "Sign in required" });

  const supabase = createClient(env.url, env.key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const hasKey = await ensureActiveApiKeyForUser(supabase, user.id, user.email);
  if (!hasKey) return res.status(409).json({ error: "Could not prepare UnClick account key" });

  const code = createMcpOAuthAuthorizationCode(
    {
      clientId,
      codeChallenge,
      redirectUri,
      scope,
      userId: user.id,
    },
    process.env,
  );

  return res.status(200).json({
    redirect_to: appendOAuthResponseParams(redirectUri, {
      code,
      state,
      iss: MCP_OAUTH_ISSUER,
    }),
  });
}
