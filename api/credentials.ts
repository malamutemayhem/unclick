/**
 * UnClick Credentials API
 * Vercel serverless function - serves GET and POST for platform credentials.
 *
 * GET  /api/credentials?platform=xero[&label=foo]
 *   Authorization: Bearer <unclick_api_key OR Supabase session JWT
 *                          OR MCP OAuth access token>
 *   Returns decrypted credential fields for the platform.
 *   If label is omitted, returns the default (NULL-label) row, falling
 *   back to the first labeled row.
 *   Used by vault-bridge.ts in the MCP server (UNCLICK_API_KEY env var, or the
 *   verifiable UNCLICK_MCP_SESSION_TOKEN on a keyless login session).
 *
 * POST /api/credentials
 *   Body: { platform: string, credentials: Record<string, string>,
 *           api_key?: string, label?: string, mark_tested?: boolean }
 *   Authorization: Bearer <Supabase session JWT> (optional, login path)
 *   Encrypts and stores credentials in Supabase user_credentials table.
 *   Upserts on (api_key_hash, platform_slug, label). Pass different
 *   labels to store multiple credentials for the same platform.
 *   Used by Connect.tsx for bot_token / api_key flows (no OAuth exchange needed).
 *
 * Two encryption schemes coexist on user_credentials (enc_scheme column):
 *   'apikey' (default) - AES-256-GCM with a PBKDF2 key derived from the
 *                        caller's raw UnClick api key. The api key is never
 *                        stored, only its SHA-256 hash for lookups, so only the
 *                        key-holder can decrypt. This is the original scheme and
 *                        the agent (vault-bridge UNCLICK_API_KEY) path.
 *   'server'           - AES-256-GCM with a stable SERVER secret bound to the
 *                        account lane (UNCLICK_AI_KEY_SECRET). Readable on a
 *                        logged-in session alone and untouched by master-key
 *                        rotation. Written only when UNCLICK_LOGIN_CONNECT_ENABLED
 *                        is on and a Supabase session (or uc_/agt_ key) resolves
 *                        an account lane. Mirrors api/ai-provider-key.ts.
 *
 * Feature flag UNCLICK_LOGIN_CONNECT_ENABLED (default OFF): with it off, the
 * server-scheme write path and the lazy migration are never taken and behaviour
 * is byte-identical to the api-key-only original.
 *
 * Required env vars (server-side only, never exposed to frontend):
 *   SUPABASE_URL              - same value as VITE_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY - Supabase service role key (bypasses RLS)
 *   UNCLICK_AI_KEY_SECRET     - stable server secret for the 'server' scheme
 *                               (only needed for the login-connect path)
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import * as crypto from "crypto";
import {
  fetchManagedConnectionCredentials,
  type ManagedConnectionRow,
} from "./lib/managed-connections.js";
import { needsRefresh, refreshOAuthCredential } from "./lib/oauth-refresh.js";
import { resolveAccountLane } from "./lib/account-lane.js";
import {
  decryptForAccount,
  encryptForAccount,
  type EncryptedCredential,
} from "./lib/chat-crypto.js";

// ─── Crypto helpers ───────────────────────────────────────────────────

const PBKDF2_ITERATIONS = 100_000;
const KEY_BYTES         = 32;
const IV_BYTES          = 12;
const SALT_BYTES        = 32;

function sha256hex(input: string): string {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function deriveKey(apiKey: string, salt: Buffer): Buffer {
  return crypto.pbkdf2Sync(apiKey, salt, PBKDF2_ITERATIONS, KEY_BYTES, "sha256");
}

function encrypt(plaintext: string, key: Buffer): { iv: string; authTag: string; ciphertext: string } {
  const iv     = crypto.randomBytes(IV_BYTES);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const enc    = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  return {
    iv:         iv.toString("hex"),
    authTag:    cipher.getAuthTag().toString("hex"),
    ciphertext: enc.toString("hex"),
  };
}

function decrypt(
  iv: string,
  authTag: string,
  ciphertext: string,
  key: Buffer
): string {
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, Buffer.from(iv, "hex"));
  decipher.setAuthTag(Buffer.from(authTag, "hex"));
  return Buffer.concat([
    decipher.update(Buffer.from(ciphertext, "hex")),
    decipher.final(),
  ]).toString("utf8");
}

// ─── Server-scheme (login-connect) helpers ───────────────────────────────────────

// Default OFF. The session-authed server-scheme path (and its lazy migration)
// is only taken when this flag is explicitly enabled. With it off, behaviour is
// byte-identical to the api-key-only original.
function loginConnectEnabled(env: NodeJS.ProcessEnv): boolean {
  const v = String(env.UNCLICK_LOGIN_CONNECT_ENABLED ?? "").trim().toLowerCase();
  return v === "1" || v === "true" || v === "yes" || v === "on";
}

// Same fallback name convention as api/ai-provider-key.ts.
function aiKeySecret(env: NodeJS.ProcessEnv): string {
  return (env.UNCLICK_AI_KEY_SECRET || env.UNCLICK_AI_KEY_SECRET_V2 || "").trim();
}

function rowEncScheme(row: Record<string, unknown>): string {
  const s = row.enc_scheme;
  return typeof s === "string" && s ? s : "apikey";
}

function encryptedCredentialFromRow(row: Record<string, unknown>): EncryptedCredential {
  return {
    encryption_iv:   String(row.encryption_iv ?? ""),
    encryption_tag:  String(row.encryption_tag ?? ""),
    encrypted_data:  String(row.encrypted_data ?? ""),
    encryption_salt: String(row.encryption_salt ?? ""),
  };
}

// ─── Supabase helpers ─────────────────────────────────────────────────

function supabaseHeaders(serviceRoleKey: string): Record<string, string> {
  return {
    apikey:          serviceRoleKey,
    Authorization:   `Bearer ${serviceRoleKey}`,
    "Content-Type":  "application/json",
    Prefer:          "return=representation",
  };
}

async function supabaseFetch(
  url:     string,
  method:  string,
  headers: Record<string, string>,
  body?:   unknown
): Promise<{ ok: boolean; status: number; data: unknown }> {
  const res = await fetch(url, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  let data: unknown;
  try { data = await res.json(); } catch { data = null; }
  return { ok: res.ok, status: res.status, data };
}

// ─── OAuth refresh on read ───────────────────────────────────────────────
// The single chokepoint every OAuth connector funnels through (vault-bridge ->
// GET /api/credentials). If a stored access token is expiring and we hold a
// refresh token, mint a fresh one here so connectors never receive a dead token.
// Best-effort: any failure returns the stored credential unchanged, so this can
// never be worse than not refreshing at all.
//
// reseal: re-encrypts the rotated credential under the row's existing scheme.
// 'apikey' rows reseal with the raw api key (legacy path); 'server' rows reseal
// with the account secret + lane so a session-saved credential stays readable
// without the master key.
async function refreshStoredCredential(params: {
  platform:       string;
  credentials:    Record<string, string>;
  rowId:          string;
  apiKey:         string;
  supabaseUrl:    string;
  serviceRoleKey: string;
  force:          boolean;
  reseal:
    | { scheme: "apikey" }
    | { scheme: "server"; serverSecret: string; lane: string };
}): Promise<Record<string, string>> {
  const { platform, credentials, rowId, apiKey, supabaseUrl, serviceRoleKey, force, reseal } = params;

  try {
    if (!needsRefresh(platform, credentials, force)) return credentials;

    const refreshed = await refreshOAuthCredential(platform, credentials, process.env);
    if (!refreshed) return credentials;

    // Persist the rotated token so the next read is already fresh, and stamp the
    // proof fields (a successful refresh proves the credential is live).
    if (rowId) {
      try {
        let enc: EncryptedCredential;
        if (reseal.scheme === "server") {
          enc = encryptForAccount(reseal.serverSecret, reseal.lane, JSON.stringify(refreshed));
        } else {
          const salt = crypto.randomBytes(SALT_BYTES);
          const key  = deriveKey(apiKey, salt);
          try {
            const { iv, authTag, ciphertext } = encrypt(JSON.stringify(refreshed), key);
            enc = {
              encryption_iv:   iv,
              encryption_tag:  authTag,
              encrypted_data:  ciphertext,
              encryption_salt: salt.toString("hex"),
            };
          } finally {
            key.fill(0);
          }
        }
        const now = new Date().toISOString();
        await supabaseFetch(
          `${supabaseUrl}/rest/v1/user_credentials?id=eq.${encodeURIComponent(rowId)}`,
          "PATCH",
          { ...supabaseHeaders(serviceRoleKey), Prefer: "return=minimal" },
          {
            encrypted_data:  enc.encrypted_data,
            encryption_iv:   enc.encryption_iv,
            encryption_tag:  enc.encryption_tag,
            encryption_salt: enc.encryption_salt,
            is_valid:        true,
            last_tested_at:  now,
            updated_at:      now,
          }
        );
      } catch {
        // persistence is best-effort; still hand back the freshly minted token
        return refreshed;
      }
    }

    return refreshed;
  } catch {
    // Any unexpected failure falls back to the stored credential, so refresh can
    // never be worse than not refreshing.
    return credentials;
  }
}

// ─── Lazy migration: apikey row -> server scheme ────────────────────────────────
// Best-effort and NON-destructive. When an 'apikey' row is read on a request
// that also resolves an account lane (flag on, secret present), write a new
// server-scheme copy of the SAME plaintext and verify it decrypts before we
// flip enc_scheme / lane_hash. The new ciphertext is proven decryptable in
// memory first, so a working credential is never replaced by an unreadable one.
// api_key_hash is left UNCHANGED so the agent's existing api-key lookup keeps
// finding the row (it then decrypts via the 'server' branch on enc_scheme).
async function migrateRowToServerScheme(params: {
  plaintext:      string;
  rowId:          string;
  serverSecret:   string;
  lane:           string;
  supabaseUrl:    string;
  serviceRoleKey: string;
}): Promise<void> {
  const { plaintext, rowId, serverSecret, lane, supabaseUrl, serviceRoleKey } = params;
  if (!rowId || !lane || !serverSecret) return;
  try {
    const enc = encryptForAccount(serverSecret, lane, plaintext);
    // Verify the new ciphertext decrypts to the same plaintext BEFORE flipping.
    if (decryptForAccount(serverSecret, lane, enc) !== plaintext) return;
    await supabaseFetch(
      `${supabaseUrl}/rest/v1/user_credentials?id=eq.${encodeURIComponent(rowId)}`,
      "PATCH",
      { ...supabaseHeaders(serviceRoleKey), Prefer: "return=minimal" },
      {
        encrypted_data:  enc.encrypted_data,
        encryption_iv:   enc.encryption_iv,
        encryption_tag:  enc.encryption_tag,
        encryption_salt: enc.encryption_salt,
        enc_scheme:      "server",
        lane_hash:       lane,
      }
    );
  } catch {
    // Migration is best-effort; the working apikey ciphertext is untouched on
    // any failure (we never PATCH unless the new ciphertext verified above).
  }
}

// ─── Main handler ──────────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin",  "https://unclick.world");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.setHeader("Cache-Control", "private, no-store, max-age=0, must-revalidate");
  res.setHeader("CDN-Cache-Control", "no-store");
  res.setHeader("Vercel-CDN-Cache-Control", "no-store");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  const supabaseUrl     = process.env.SUPABASE_URL;
  const serviceRoleKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({ error: "Server credentials not configured." });
  }

  const loginConnect = loginConnectEnabled(process.env);
  const serverSecret = aiKeySecret(process.env);

  // ── PATCH: record live proof after a connector call succeeds ──────────────
  if (req.method === "PATCH") {
    const authHeader = req.headers.authorization ?? "";
    const apiKey     = authHeader.replace(/^Bearer\s+/i, "").trim();
    const body       = req.body as { platform?: string; label?: string | null } | undefined;
    const platform   = String(body?.platform ?? "").trim();
    const label      = typeof body?.label === "string" ? body.label.trim() : "";

    if (!apiKey)   return res.status(401).json({ error: "Authorization header required." });
    if (!platform) return res.status(400).json({ error: "platform is required." });

    const labelFilter = label
      ? `&label=eq.${encodeURIComponent(label)}`
      : "&label=is.null";
    const testedAt   = new Date().toISOString();

    // Login-connect path: a session JWT (or uc_/agt_ key) resolves a lane and
    // marks the server-scheme row tested, scoped to this lane only.
    if (loginConnect && serverSecret) {
      const lane = await resolveAccountLane(authHeader, supabaseUrl, serviceRoleKey);
      if (lane) {
        const serverUrl =
          `${supabaseUrl}/rest/v1/user_credentials?lane_hash=eq.${encodeURIComponent(lane)}` +
          `&enc_scheme=eq.server&platform_slug=eq.${encodeURIComponent(platform)}${labelFilter}`;
        const probe = await supabaseFetch(
          serverUrl,
          "PATCH",
          supabaseHeaders(serviceRoleKey),
          { is_valid: true, last_tested_at: testedAt, updated_at: testedAt }
        );
        const serverRows = Array.isArray(probe.data) ? probe.data : [];
        if (probe.ok && serverRows.length > 0) {
          return res.status(200).json({
            success: true,
            platform,
            label: label || null,
            last_tested_at: testedAt,
          });
        }
        // No server-scheme row matched; fall through to the api-key path below
        // (e.g. a uc_/agt_ caller whose row has not been migrated yet).
      }
    }

    const apiKeyHash = sha256hex(apiKey);
    const tableUrl =
      `${supabaseUrl}/rest/v1/user_credentials?api_key_hash=eq.${encodeURIComponent(apiKeyHash)}` +
      `&platform_slug=eq.${encodeURIComponent(platform)}${labelFilter}`;

    const { ok, status, data } = await supabaseFetch(
      tableUrl,
      "PATCH",
      supabaseHeaders(serviceRoleKey),
      { is_valid: true, last_tested_at: testedAt, updated_at: testedAt }
    );
    if (!ok) return res.status(status).json({ error: "Failed to mark credential tested." });

    const rows = Array.isArray(data) ? data : [];
    if (rows.length === 0) {
      return res.status(404).json({ error: "No stored credential matched this platform." });
    }

    return res.status(200).json({
      success: true,
      platform,
      label: label || null,
      last_tested_at: testedAt,
    });
  }

  // ── GET: retrieve decrypted credentials ──────────────────────────────
  if (req.method === "GET") {
    const authHeader = req.headers.authorization ?? "";
    const apiKey     = authHeader.replace(/^Bearer\s+/i, "").trim();
    const platform   = String(req.query.platform ?? "").trim();
    const label      = typeof req.query.label === "string" ? req.query.label.trim() : "";
    const forceRefresh = String(req.query.force_refresh ?? "").toLowerCase() === "1"
      || String(req.query.force_refresh ?? "").toLowerCase() === "true";

    if (!apiKey)   return res.status(401).json({ error: "Authorization header required." });
    if (!platform) return res.status(400).json({ error: "platform query param required." });

    const apiKeyHash = sha256hex(apiKey);
    // Login-connect path: resolve the caller's stable lane so we can find
    // server-scheme rows (and lazily migrate apikey rows). Off unless the flag
    // is on and the server secret is configured. resolveAccountLane accepts a
    // uc_/agt_ key, a Supabase session JWT, OR a cryptographically-verifiable
    // MCP OAuth access token (the keyless login-session path). A bare lane_hash
    // or any unverified bearer never resolves here, so a leaked lane is useless:
    // only a token whose signature/issuer/audience/expiry verify maps (via its
    // `sub`) to a lane.
    const lane = (loginConnect && serverSecret)
      ? await resolveAccountLane(authHeader, supabaseUrl, serviceRoleKey)
      : null;

    // Label handling:
    //   - If caller passed ?label=foo, filter to exactly that row.
    //   - If no label passed, prefer the row with NULL label (the "default"),
    //     otherwise fall back to the first row.
    const labelFilter = label
      ? `&label=eq.${encodeURIComponent(label)}`
      : "";
    const tableUrl   = `${supabaseUrl}/rest/v1/user_credentials?api_key_hash=eq.${encodeURIComponent(apiKeyHash)}&platform_slug=eq.${encodeURIComponent(platform)}${labelFilter}&select=*&order=label.asc.nullsfirst`;

    const { ok, data } = await supabaseFetch(tableUrl, "GET", supabaseHeaders(serviceRoleKey));
    if (!ok) return res.status(502).json({ error: "Supabase lookup failed." });

    let rows = data as Array<Record<string, unknown>>;

    // Session callers (no uc_/agt_ key) never match by api_key_hash, so look up
    // server-scheme rows by lane. Scoped to this lane AND enc_scheme='server'
    // so one account can never touch another's rows.
    if ((!rows || rows.length === 0) && lane) {
      const laneUrl =
        `${supabaseUrl}/rest/v1/user_credentials?lane_hash=eq.${encodeURIComponent(lane)}` +
        `&enc_scheme=eq.server&platform_slug=eq.${encodeURIComponent(platform)}${labelFilter}` +
        `&select=*&order=label.asc.nullsfirst`;
      const laneRes = await supabaseFetch(laneUrl, "GET", supabaseHeaders(serviceRoleKey));
      if (laneRes.ok && Array.isArray(laneRes.data)) {
        rows = laneRes.data as Array<Record<string, unknown>>;
      }
    }

    if (!rows || rows.length === 0) {
      const managedUrl = `${supabaseUrl}/rest/v1/managed_app_connections?api_key_hash=eq.${encodeURIComponent(apiKeyHash)}&platform_slug=eq.${encodeURIComponent(platform)}&status=eq.connected&select=id,platform_slug,provider,provider_config_key,external_connection_id,auth_mode,status,account_label,scope_summary,last_checked_at,connected_at,created_at,updated_at,metadata&order=updated_at.desc.nullslast&limit=1`;
      const managed = await supabaseFetch(managedUrl, "GET", supabaseHeaders(serviceRoleKey));
      const managedRows = managed.ok ? (managed.data as ManagedConnectionRow[]) : [];
      const managedConnection = managedRows[0];
      if (managedConnection) {
        const brokerResult = await fetchManagedConnectionCredentials({ connection: managedConnection });
        if (brokerResult.ok && brokerResult.credentials) {
          return res.status(200).json(brokerResult.credentials);
        }
        return res.status(brokerResult.status || 502).json({
          error: brokerResult.error ?? "Managed connection could not provide credentials.",
          setup_url: `https://unclick.world/admin/apps?lens=connected`,
        });
      }

      return res.status(404).json({
        error:     label
          ? `No credentials stored for platform "${platform}" with label "${label}".`
          : `No credentials stored for platform "${platform}".`,
        setup_url: `https://unclick.world/connect/${platform}`,
      });
    }

    const row = rows[0];
    const scheme = rowEncScheme(row);
    try {
      let credentials: Record<string, string>;

      if (scheme === "server") {
        // Server-scheme rows decrypt with the account secret + the row's lane.
        // Require the resolved caller lane to match the row's lane so a caller
        // can only read their own server rows.
        const rowLane = String(row.lane_hash ?? "");
        if (!serverSecret || !rowLane || lane !== rowLane) {
          return res.status(500).json({ error: "Failed to decrypt credentials." });
        }
        const plaintext = decryptForAccount(serverSecret, rowLane, encryptedCredentialFromRow(row));
        credentials = JSON.parse(plaintext) as Record<string, string>;
        const finalCredentials = await refreshStoredCredential({
          platform,
          credentials,
          rowId:          String(row.id ?? ""),
          apiKey,
          supabaseUrl,
          serviceRoleKey,
          force:          forceRefresh,
          reseal:         { scheme: "server", serverSecret, lane: rowLane },
        });
        return res.status(200).json(finalCredentials);
      }

      // apikey scheme (default): decrypt with the raw api key (legacy + agent).
      const salt         = Buffer.from(row.encryption_salt as string, "hex");
      const key          = deriveKey(apiKey, salt);
      let plaintext: string;
      try {
        plaintext = decrypt(
          row.encryption_iv  as string,
          row.encryption_tag as string,
          row.encrypted_data as string,
          key
        );
      } finally {
        key.fill(0);
      }
      credentials = JSON.parse(plaintext) as Record<string, string>;

      // Best-effort, non-destructive lazy migration to the server scheme when a
      // lane is resolvable for this request. The working apikey ciphertext is
      // only replaced after the new server ciphertext is verified to decrypt.
      if (loginConnect && serverSecret && lane) {
        await migrateRowToServerScheme({
          plaintext,
          rowId:          String(row.id ?? ""),
          serverSecret,
          lane,
          supabaseUrl,
          serviceRoleKey,
        });
      }

      const finalCredentials = await refreshStoredCredential({
        platform,
        credentials,
        rowId:          String(row.id ?? ""),
        apiKey,
        supabaseUrl,
        serviceRoleKey,
        force:          forceRefresh,
        reseal:         { scheme: "apikey" },
      });
      return res.status(200).json(finalCredentials);
    } catch {
      return res.status(500).json({ error: "Failed to decrypt credentials. The API key may have changed." });
    }
  }

  // ── POST: store encrypted credentials ───────────────────────────────
  if (req.method === "POST") {
    const body = req.body as {
      platform:    string;
      credentials: Record<string, string>;
      api_key?:    string;
      label?:      string;
      mark_tested?: boolean;
    };

    const { platform, credentials, api_key, label, mark_tested } = body ?? {};
    if (!platform)    return res.status(400).json({ error: "platform is required." });
    if (!credentials) return res.status(400).json({ error: "credentials is required." });

    // Label normalization: empty string → null (treat "no label" uniformly).
    const normalizedLabel = label && label.trim() ? label.trim() : null;
    const updatedAt = new Date().toISOString();

    // Login-connect path: a Supabase session (or uc_/agt_ key) in the
    // Authorization header resolves a lane and stores a server-scheme row, so
    // the caller never has to paste their private UnClick api key. Mirrors
    // api/ai-provider-key.ts (api_key_hash = lane_hash = lane). Only taken when
    // the flag is on and the server secret is configured; an explicit api_key in
    // the body always wins so the agent / token-paste fallback is unchanged.
    if (loginConnect && serverSecret && !api_key) {
      const lane = await resolveAccountLane(req.headers.authorization, supabaseUrl, serviceRoleKey);
      if (!lane) {
        return res.status(401).json({ error: "Sign in or provide api_key to store credentials." });
      }

      const enc = encryptForAccount(serverSecret, lane, JSON.stringify(credentials));
      const row = {
        api_key_hash:    lane, // server-scheme rows are stamped to the stable lane
        lane_hash:       lane,
        enc_scheme:      "server",
        platform_slug:   platform,
        label:           normalizedLabel,
        encrypted_data:  enc.encrypted_data,
        encryption_iv:   enc.encryption_iv,
        encryption_tag:  enc.encryption_tag,
        encryption_salt: enc.encryption_salt,
        ...(mark_tested ? { is_valid: true, last_tested_at: updatedAt } : {}),
        updated_at:      updatedAt,
      };

      const tableUrl = `${supabaseUrl}/rest/v1/user_credentials?on_conflict=api_key_hash,platform_slug,label`;
      const headers  = {
        ...supabaseHeaders(serviceRoleKey),
        Prefer: "resolution=merge-duplicates,return=minimal",
      };
      const { ok, status } = await supabaseFetch(tableUrl, "POST", headers, row);
      if (!ok) {
        return res.status(status).json({ error: "Failed to store credentials." });
      }
      return res.status(200).json({
        success:  true,
        platform,
        label:    normalizedLabel,
        message:  normalizedLabel
          ? `${platform} credentials stored successfully (label: ${normalizedLabel}).`
          : `${platform} credentials stored successfully.`,
      });
    }

    // api-key path (default / fallback): unchanged from the original.
    if (!api_key)     return res.status(400).json({ error: "api_key is required." });

    // Validate API key format (basic sanity check)
    if (!api_key.startsWith("uc_") && !api_key.startsWith("agt_")) {
      return res.status(400).json({ error: "Invalid api_key format." });
    }

    const salt       = crypto.randomBytes(SALT_BYTES);
    const key        = deriveKey(api_key, salt);
    const plaintext  = JSON.stringify(credentials);
    const { iv, authTag, ciphertext } = encrypt(plaintext, key);
    key.fill(0);

    const row = {
      api_key_hash:    sha256hex(api_key),
      platform_slug:   platform,
      label:           normalizedLabel,
      encrypted_data:  ciphertext,
      encryption_iv:   iv,
      encryption_tag:  authTag,
      encryption_salt: salt.toString("hex"),
      ...(mark_tested ? { is_valid: true, last_tested_at: updatedAt } : {}),
      updated_at:      updatedAt,
    };

    // Upsert on the (api_key_hash, platform_slug, label) unique index.
    // PostgREST requires the explicit `on_conflict` param to know which
    // constraint to merge on; without it, Prefer=merge-duplicates falls back
    // to the PK and every insert 409s (the bug that blocked the original
    // vault seed). The index is declared NULLS NOT DISTINCT so a NULL label
    // behaves as a single distinct "default" value; see migration
    // 20260420040000_user_credentials_label.sql.
    const tableUrl = `${supabaseUrl}/rest/v1/user_credentials?on_conflict=api_key_hash,platform_slug,label`;
    const headers  = {
      ...supabaseHeaders(serviceRoleKey),
      Prefer: "resolution=merge-duplicates,return=representation",
    };

    const { ok, status } = await supabaseFetch(tableUrl, "POST", headers, row);
    if (!ok) {
      return res.status(status).json({ error: "Failed to store credentials." });
    }

    return res.status(200).json({
      success:  true,
      platform,
      label:    normalizedLabel,
      message:  normalizedLabel
        ? `${platform} credentials stored successfully (label: ${normalizedLabel}).`
        : `${platform} credentials stored successfully.`,
    });
  }

  return res.status(405).json({ error: "Method not allowed." });
}
