/**
 * UnClick BackstagePass settings API
 * Vercel serverless function - the per-tenant On/Off toggle for the
 * BackstagePass credential vault.
 *
 * Auth accepts either token shape (see resolveApiKeyHash):
 *   - a UnClick API key (uc_/agt_...), used by the agent runtime, or
 *   - a Supabase session JWT, used by the signed-in admin web UI.
 *
 * GET  /api/backstagepass-settings
 *   Returns { vault_enabled: boolean }. Fail-open: defaults to true when the
 *   row or the column is absent (BYOD / pre-migration), or when there is no
 *   resolvable tenant yet.
 *
 * POST /api/backstagepass-settings
 *   Body: { vault_enabled: boolean }
 *   Upserts tenant_settings.backstagepass_vault_enabled for this tenant.
 *
 * The tenant is identified by the SHA-256 hash of the UnClick API key - the
 * same hash the MCP runtime derives (vault-bridge.ts), so flipping this here
 * gates that tenant's agent credential lookups. Mirrors the auth and Supabase
 * REST style of api/credentials.ts.
 *
 * Required env vars (server-side only):
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import * as crypto from "crypto";

function sha256hex(input: string): string {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function supabaseHeaders(serviceRoleKey: string): Record<string, string> {
  return {
    apikey:         serviceRoleKey,
    Authorization:  `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
  };
}

/**
 * Resolve the tenant's api_key_hash from the request.
 *
 * Two callers, two token shapes:
 *   - Agent runtime / API key: a Bearer token starting uc_/agt_ is hashed
 *     directly (the same hash vault-bridge.ts derives).
 *   - Admin web UI: a Supabase session JWT. We verify it, find the user's
 *     api_keys row, and use its key_hash. This mirrors resolveTenant() in
 *     api/backstagepass.ts so the admin page authenticates with the same
 *     login session every other admin surface already uses - no API key has
 *     to be pasted into the browser first.
 *
 * Returns null when the token is missing or cannot be resolved.
 */
async function resolveApiKeyHash(
  req:            VercelRequest,
  supabaseUrl:    string,
  serviceRoleKey: string,
): Promise<string | null> {
  const authHeader = req.headers.authorization ?? "";
  const token      = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!token) return null;

  if (token.startsWith("uc_") || token.startsWith("agt_")) {
    return sha256hex(token);
  }

  // Supabase session JWT -> auth user -> api_keys row.
  const userRes = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: { apikey: serviceRoleKey, Authorization: `Bearer ${token}` },
  });
  if (!userRes.ok) return null;
  const user = (await userRes.json().catch(() => ({}))) as { id?: string };
  if (!user.id) return null;

  const qUrl =
    `${supabaseUrl}/rest/v1/api_keys` +
    `?user_id=eq.${encodeURIComponent(user.id)}` +
    `&select=key_hash,api_key&limit=1`;
  const resp = await fetch(qUrl, { headers: supabaseHeaders(serviceRoleKey) });
  if (!resp.ok) return null;
  const rows = (await resp.json().catch(() => [])) as Array<{
    key_hash?: string | null;
    api_key?:  string | null;
  }>;
  const row = rows[0];
  if (!row) return null;
  return row.key_hash ?? (row.api_key ? sha256hex(row.api_key) : null);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin",  "https://unclick.world");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  const supabaseUrl    = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({ error: "Server credentials not configured." });
  }

  const apiKeyHash = await resolveApiKeyHash(req, supabaseUrl, serviceRoleKey);
  // No identity we can key on (signed out, or no api_keys row yet). Reads
  // fail-open to ON so the plumbing stays wired; writes need a tenant, so they
  // ask the user to sign in rather than silently dropping the change.
  if (!apiKeyHash) {
    if (req.method === "GET") return res.status(200).json({ vault_enabled: true });
    return res.status(401).json({ error: "Sign in to manage BackstagePass." });
  }

  // ── POST: persist the toggle ───────────────────────────────────────────
  if (req.method === "POST") {
    const body = (req.body ?? {}) as { vault_enabled?: boolean };
    if (typeof body.vault_enabled !== "boolean") {
      return res.status(400).json({ error: "vault_enabled (boolean) required." });
    }
    const url = `${supabaseUrl}/rest/v1/tenant_settings?on_conflict=api_key_hash`;
    const resp = await fetch(url, {
      method:  "POST",
      headers: { ...supabaseHeaders(serviceRoleKey), Prefer: "resolution=merge-duplicates" },
      body: JSON.stringify({
        api_key_hash:                apiKeyHash,
        backstagepass_vault_enabled: body.vault_enabled,
        updated_at:                  new Date().toISOString(),
      }),
    });
    if (!resp.ok) {
      const detail = await resp.text().catch(() => "");
      console.error("backstagepass-settings upsert failed", { status: resp.status, detail });
      return res.status(502).json({ error: "Failed to save BackstagePass setting." });
    }
    return res.status(200).json({ success: true, vault_enabled: body.vault_enabled });
  }

  // ── GET: read the toggle (fail-open to ON) ───────────────────────────────
  if (req.method === "GET") {
    const url =
      `${supabaseUrl}/rest/v1/tenant_settings` +
      `?api_key_hash=eq.${encodeURIComponent(apiKeyHash)}` +
      `&select=backstagepass_vault_enabled`;
    const resp = await fetch(url, { headers: supabaseHeaders(serviceRoleKey) });
    if (!resp.ok) {
      // Column or table not migrated here yet: default ON, plumbing stays wired.
      return res.status(200).json({ vault_enabled: true });
    }
    const rows = (await resp.json().catch(() => [])) as Array<{
      backstagepass_vault_enabled?: boolean;
    }>;
    const row = rows[0];
    return res.status(200).json({ vault_enabled: row?.backstagepass_vault_enabled !== false });
  }

  return res.status(405).json({ error: "Method not allowed." });
}
