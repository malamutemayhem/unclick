/**
 * UnClick Worker Keys API
 * Vercel serverless function - mint, list, and revoke headless "worker" keys.
 *
 * A worker key is a static `agt_*` UnClick API key scoped to a user account
 * and made for headless / CI / cloud agents. Unlike the interactive login,
 * a worker key carried in the connection (Authorization: Bearer agt_... or
 * ?key=agt_...) re-authorizes on its own, so an unattended session reconnects
 * after an idle drop instead of going dark.
 *
 * Worker keys are stored as ordinary rows in `api_keys` with tier="worker".
 * They authenticate through the existing api_key path in api/mcp.ts, and that
 * path remaps a worker key's tenancy onto the account's PRIMARY (non-worker)
 * key so the worker shares the same memory and platform connections as the
 * human's main `uc_` key. Minting or revoking a worker key never touches the
 * primary key, and rotating the primary `uc_` key never breaks a worker key
 * (separate row, separate hash).
 *
 * Auth: session JWT only (the signed-in account owner). API keys are NOT
 * accepted here - you manage worker keys from a logged-in browser session,
 * never from another key. Every query is scoped to the authenticated user_id,
 * so one account can never see or revoke another account's keys.
 *
 *   POST   /api/worker-keys        body: { label?: string }
 *            -> mints an agt_ key, returns the plaintext exactly once.
 *   GET    /api/worker-keys
 *            -> lists this account's worker keys (masked prefix, never the key).
 *   DELETE /api/worker-keys?id=<uuid>   (or body: { id })
 *            -> revokes one worker key the account owns. That key only.
 *
 * Required env vars (server-side only, never exposed to frontend):
 *   SUPABASE_URL              - same value as VITE_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY - Supabase service role key (bypasses RLS)
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";
import * as crypto from "crypto";

// Soft cap so a single account cannot mint an unbounded number of keys.
const MAX_WORKER_KEYS_PER_USER = 25;
const WORKER_TIER = "worker";

function sha256hex(input: string): string {
  return crypto.createHash("sha256").update(input).digest("hex");
}

/**
 * Mint a fresh worker key. Returns the plaintext (shown to the user once), its
 * SHA-256 hash (the only thing stored), and a short display prefix. Exported so
 * the format/hash contract can be unit tested.
 */
export function newWorkerKey(): { rawKey: string; keyHash: string; keyPrefix: string } {
  const rawKey = `agt_${crypto.randomBytes(32).toString("hex")}`;
  return { rawKey, keyHash: sha256hex(rawKey), keyPrefix: rawKey.slice(0, 12) };
}

function bearerFrom(req: VercelRequest): string {
  const header = (req.headers.authorization as string) ?? "";
  return header.replace(/^Bearer\s+/i, "").trim();
}

/**
 * Resolve the signed-in account from the session JWT. Mirrors the
 * resolveSessionUser pattern in api/memory-admin.ts: uc_/agt_ tokens are
 * never valid JWTs and are rejected up front, then getUser() verifies the
 * token against the project's Auth secret server-side.
 */
async function resolveSessionUser(
  req: VercelRequest,
  supabaseUrl: string,
  serviceRoleKey: string,
): Promise<{ id: string; email: string | null } | null> {
  const token = bearerFrom(req);
  if (!token) return null;
  if (token.startsWith("uc_") || token.startsWith("agt_")) return null;
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "https://unclick.world");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  const supabaseUrl    = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({ error: "Server credentials not configured." });
  }

  const user = await resolveSessionUser(req, supabaseUrl, serviceRoleKey);
  if (!user) {
    return res.status(401).json({ error: "Unauthorized. Sign in to manage worker keys." });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // ── POST: mint a new worker key ───────────────────────────────────────────
  if (req.method === "POST") {
    const body = (req.body ?? {}) as { label?: string };
    const label = body.label && body.label.trim()
      ? body.label.trim().slice(0, 80)
      : "worker";

    // Enforce the per-account cap before minting.
    const { count, error: countErr } = await supabase
      .from("api_keys")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("tier", WORKER_TIER);
    if (countErr) return res.status(500).json({ error: countErr.message });
    if ((count ?? 0) >= MAX_WORKER_KEYS_PER_USER) {
      return res.status(409).json({
        error: `Worker key limit reached (${MAX_WORKER_KEYS_PER_USER}). Revoke an unused key first.`,
      });
    }

    const { rawKey, keyHash, keyPrefix } = newWorkerKey();
    const { data: inserted, error } = await supabase
      .from("api_keys")
      .insert({
        user_id:     user.id,
        key_hash:    keyHash,
        key_prefix:  keyPrefix,
        label,
        tier:        WORKER_TIER,
        is_active:   true,
        usage_count: 0,
      })
      .select("id, key_prefix, label, created_at")
      .single();
    if (error || !inserted) {
      return res.status(500).json({ error: error?.message ?? "Failed to mint worker key." });
    }

    // The plaintext key is returned exactly once and never stored.
    return res.status(201).json({
      id:         inserted.id,
      api_key:    rawKey,
      prefix:     inserted.key_prefix,
      label:      inserted.label,
      created_at: inserted.created_at,
      warning:    "Copy this key now. It is shown only once and cannot be retrieved later.",
    });
  }

  // ── GET: list this account's worker keys (never the raw key) ──────────────
  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("api_keys")
      .select("id, key_prefix, label, tier, is_active, created_at, last_used_at")
      .eq("user_id", user.id)
      .eq("tier", WORKER_TIER)
      .order("created_at", { ascending: false });
    if (error) return res.status(500).json({ error: error.message });

    const worker_keys = (data ?? []).map((row) => ({
      id:           row.id,
      label:        row.label,
      key_prefix:   row.key_prefix,
      is_active:    row.is_active,
      created_at:   row.created_at,
      last_used_at: row.last_used_at,
    }));
    return res.status(200).json({ worker_keys });
  }

  // ── DELETE: revoke one worker key the account owns ────────────────────────
  if (req.method === "DELETE") {
    const idFromQuery = typeof req.query.id === "string" ? req.query.id : "";
    const idFromBody  = (req.body as { id?: string } | undefined)?.id ?? "";
    const id = (idFromQuery || idFromBody).trim();
    if (!id) return res.status(400).json({ error: "id is required to revoke a worker key." });

    // Owner + tier scoped: you can only revoke YOUR OWN worker keys, never
    // your primary uc_ key and never another account's key.
    const { data, error } = await supabase
      .from("api_keys")
      .delete({ count: "exact" })
      .eq("id", id)
      .eq("user_id", user.id)
      .eq("tier", WORKER_TIER)
      .select("id");
    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Worker key not found for this account." });
    }
    return res.status(200).json({ success: true, revoked: id });
  }

  return res.status(405).json({ error: "Method not allowed." });
}
