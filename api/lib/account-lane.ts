// ─── Account lane resolver ──────────────────────────────────────────────────
//
// Resolves a request to the caller's STABLE account lane (lane_hash, pinned at
// key birth and preserved across every key rotation). Works from either auth
// form:
//   - a Supabase session JWT (the logged-in website) -> auth user -> api_keys
//   - a raw uc_/agt_ UnClick api key -> key_hash -> api_keys
//
// AI provider keys are scoped to this lane and encrypted with a server secret,
// so recycling the master api key never touches them: the lane and the secret
// both stay the same. Returns null when the caller cannot be resolved.

import * as crypto from "crypto";

function sha256hex(input: string): string {
  return crypto.createHash("sha256").update(input).digest("hex");
}

async function sb(url: string, serviceKey: string): Promise<unknown> {
  const r = await fetch(url, {
    headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
  });
  if (!r.ok) return null;
  try { return await r.json(); } catch { return null; }
}

// lane_hash for the api_keys row matching this key hash (agent path).
async function laneForKeyHash(
  supabaseUrl: string, serviceKey: string, keyHash: string,
): Promise<string | null> {
  const rows = await sb(
    `${supabaseUrl}/rest/v1/api_keys?key_hash=eq.${encodeURIComponent(keyHash)}` +
    `&select=lane_hash&limit=1`,
    serviceKey,
  ) as Array<{ lane_hash?: string | null }> | null;
  const lane = Array.isArray(rows) ? rows[0]?.lane_hash : null;
  // Fall back to the key hash itself so a row without a lane still resolves.
  return lane || keyHash;
}

// lane_hash for the signed-in user (session path): freshest active key wins,
// matching every other resolver in the app. Exported so shared-room flows can
// resolve a target human's lane from their auth.users id the same way.
export async function laneForUserId(
  supabaseUrl: string, serviceKey: string, userId: string,
): Promise<string | null> {
  const rows = await sb(
    `${supabaseUrl}/rest/v1/api_keys?user_id=eq.${encodeURIComponent(userId)}` +
    `&is_active=eq.true&select=lane_hash,key_hash` +
    `&order=last_used_at.desc.nullslast&limit=1`,
    serviceKey,
  ) as Array<{ lane_hash?: string | null; key_hash?: string | null }> | null;
  const row = Array.isArray(rows) ? rows[0] : null;
  return row ? (row.lane_hash || row.key_hash || null) : null;
}

/**
 * Resolve the Authorization header to the caller's stable account lane.
 * Accepts a uc_/agt_ key or a Supabase session JWT. Returns null if neither
 * resolves.
 */
export async function resolveAccountLane(
  authHeader: string | undefined,
  supabaseUrl: string,
  serviceKey: string,
): Promise<string | null> {
  const token = (authHeader ?? "").replace(/^Bearer\s+/i, "").trim();
  if (!token) return null;

  // Agent path: raw api key -> hash -> lane.
  if (token.startsWith("uc_") || token.startsWith("agt_")) {
    return laneForKeyHash(supabaseUrl, serviceKey, sha256hex(token));
  }

  // Session path: verify the JWT via Supabase Auth, then map user -> lane.
  const userRes = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: { apikey: serviceKey, Authorization: `Bearer ${token}` },
  });
  if (!userRes.ok) return null;
  const user = (await userRes.json().catch(() => null)) as { id?: string } | null;
  if (!user?.id) return null;
  return laneForUserId(supabaseUrl, serviceKey, user.id);
}

// auth.users id for the api_keys row matching this key hash (agent path).
async function userIdForKeyHash(
  supabaseUrl: string, serviceKey: string, keyHash: string,
): Promise<string | null> {
  const rows = await sb(
    `${supabaseUrl}/rest/v1/api_keys?key_hash=eq.${encodeURIComponent(keyHash)}` +
    `&select=user_id&limit=1`,
    serviceKey,
  ) as Array<{ user_id?: string | null }> | null;
  const id = Array.isArray(rows) ? rows[0]?.user_id : null;
  return id || null;
}

/**
 * Resolve the Authorization header to the caller's auth.users id (NOT their
 * lane). Mirrors resolveAccountLane's two auth forms. Shared-room flows need
 * the user id to look up an accepted Circle link between caller and target.
 * Returns null when the caller cannot be resolved.
 */
export async function resolveCallerUserId(
  authHeader: string | undefined,
  supabaseUrl: string,
  serviceKey: string,
): Promise<string | null> {
  const token = (authHeader ?? "").replace(/^Bearer\s+/i, "").trim();
  if (!token) return null;

  // Agent path: raw api key -> hash -> user_id.
  if (token.startsWith("uc_") || token.startsWith("agt_")) {
    return userIdForKeyHash(supabaseUrl, serviceKey, sha256hex(token));
  }

  // Session path: verify the JWT via Supabase Auth, then take the user id.
  const userRes = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: { apikey: serviceKey, Authorization: `Bearer ${token}` },
  });
  if (!userRes.ok) return null;
  const user = (await userRes.json().catch(() => null)) as { id?: string } | null;
  return user?.id || null;
}
