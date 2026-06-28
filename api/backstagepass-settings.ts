/**
 * UnClick BackstagePass settings API
 * Vercel serverless function - the per-tenant On/Off toggle for the
 * BackstagePass credential vault.
 *
 * GET  /api/backstagepass-settings
 *   Authorization: Bearer <unclick_api_key>
 *   Returns { vault_enabled: boolean }. Fail-open: defaults to true when the
 *   row or the column is absent (BYOD / pre-migration).
 *
 * POST /api/backstagepass-settings
 *   Authorization: Bearer <unclick_api_key>
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

  const authHeader = req.headers.authorization ?? "";
  const apiKey     = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!apiKey) return res.status(401).json({ error: "Authorization header required." });
  const apiKeyHash = sha256hex(apiKey);

  // ── POST: persist the toggle ───────────────────────────────────────
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

  // ── GET: read the toggle (fail-open to ON) ──────────────────────────
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
