/**
 * Circle consent write path: create, accept, revoke, and list memory shares.
 *
 * This module provides the data operations for managing circle_link_permissions
 * rows. It is the write counterpart to circle.ts (the read gate). All operations
 * require the caller's identity (api_key_hash / lane_hash) and enforce:
 *
 *   - Only the owner can create a share offer (sets owner_enabled)
 *   - Only the grantee can accept a share (sets grantee_enabled)
 *   - Either side can revoke (sets revoked_at)
 *   - Self-shares are rejected (matches the DB CHECK constraint)
 *   - All writes go to the central Supabase (managed cloud only)
 *
 * The module is flag-gated: callers must check circleSharingEnabled() before
 * invoking any operation. The operations themselves do not check the flag so
 * they stay pure and testable.
 */

import type { SupabaseClient } from "@supabase/supabase-js";
import type { CircleGrant } from "./circle.js";

export interface CircleShareSummary {
  owner_api_key_hash: string;
  grantee_api_key_hash: string;
  owner_enabled: boolean;
  grantee_enabled: boolean;
  revoked_at: string | null;
  created_at: string;
  updated_at: string;
  active: boolean;
  role: "owner" | "grantee";
}

export interface CircleConsentResult {
  ok: boolean;
  error?: string;
  grant?: CircleGrant;
}

function nonEmpty(value: string | null | undefined): string | null {
  if (value == null) return null;
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}

function validatePair(
  ownerHash: string | null | undefined,
  granteeHash: string | null | undefined,
): { owner: string; grantee: string } | { error: string } {
  const owner = nonEmpty(ownerHash);
  const grantee = nonEmpty(granteeHash);
  if (!owner) return { error: "Owner identity is required." };
  if (!grantee) return { error: "Grantee identity is required." };
  if (owner === grantee) return { error: "Cannot share memory with yourself." };
  return { owner, grantee };
}

/**
 * Owner offers to share their memory with a grantee. Creates the row if it
 * does not exist, or re-enables a previously revoked share. The grantee must
 * still accept before the share becomes active.
 */
export async function createShareOffer(
  supabase: SupabaseClient,
  ownerHash: string,
  granteeHash: string,
): Promise<CircleConsentResult> {
  const v = validatePair(ownerHash, granteeHash);
  if ("error" in v) return { ok: false, error: v.error };

  const { data, error } = await supabase
    .from("circle_link_permissions")
    .upsert(
      {
        owner_api_key_hash: v.owner,
        grantee_api_key_hash: v.grantee,
        owner_enabled: true,
        grantee_enabled: false,
        revoked_at: null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "owner_api_key_hash,grantee_api_key_hash" },
    )
    .select()
    .single();

  if (error) return { ok: false, error: error.message };
  return { ok: true, grant: data as CircleGrant };
}

/**
 * Grantee accepts a pending share offer. Only sets grantee_enabled on an
 * existing, non-revoked row where the grantee matches.
 */
export async function acceptShare(
  supabase: SupabaseClient,
  ownerHash: string,
  granteeHash: string,
): Promise<CircleConsentResult> {
  const v = validatePair(ownerHash, granteeHash);
  if ("error" in v) return { ok: false, error: v.error };

  const { data, error } = await supabase
    .from("circle_link_permissions")
    .update({
      grantee_enabled: true,
      updated_at: new Date().toISOString(),
    })
    .eq("owner_api_key_hash", v.owner)
    .eq("grantee_api_key_hash", v.grantee)
    .is("revoked_at", null)
    .select()
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return { ok: false, error: "No pending share offer found from this owner." };
    }
    return { ok: false, error: error.message };
  }
  return { ok: true, grant: data as CircleGrant };
}

/**
 * Either side revokes the share by setting revoked_at. The revokerHash must
 * match either the owner or the grantee.
 */
export async function revokeShare(
  supabase: SupabaseClient,
  ownerHash: string,
  granteeHash: string,
  revokerHash: string,
): Promise<CircleConsentResult> {
  const v = validatePair(ownerHash, granteeHash);
  if ("error" in v) return { ok: false, error: v.error };

  const revoker = nonEmpty(revokerHash);
  if (!revoker) return { ok: false, error: "Revoker identity is required." };
  if (revoker !== v.owner && revoker !== v.grantee) {
    return { ok: false, error: "Only the owner or grantee can revoke a share." };
  }

  const { data, error } = await supabase
    .from("circle_link_permissions")
    .update({
      revoked_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("owner_api_key_hash", v.owner)
    .eq("grantee_api_key_hash", v.grantee)
    .is("revoked_at", null)
    .select()
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return { ok: false, error: "No active or pending share found to revoke." };
    }
    return { ok: false, error: error.message };
  }
  return { ok: true, grant: data as CircleGrant };
}

/**
 * List all shares where the caller is either the owner or the grantee.
 * Returns both active and inactive shares so the UI can show pending/revoked.
 */
export async function listShares(
  supabase: SupabaseClient,
  callerHash: string,
): Promise<{ ok: boolean; shares: CircleShareSummary[]; error?: string }> {
  const caller = nonEmpty(callerHash);
  if (!caller) return { ok: false, shares: [], error: "Caller identity is required." };

  const { data: owned, error: ownedErr } = await supabase
    .from("circle_link_permissions")
    .select("*")
    .eq("owner_api_key_hash", caller)
    .order("created_at", { ascending: false });

  if (ownedErr) return { ok: false, shares: [], error: ownedErr.message };

  const { data: granted, error: grantedErr } = await supabase
    .from("circle_link_permissions")
    .select("*")
    .eq("grantee_api_key_hash", caller)
    .order("created_at", { ascending: false });

  if (grantedErr) return { ok: false, shares: [], error: grantedErr.message };

  const shares: CircleShareSummary[] = [];

  for (const row of owned ?? []) {
    shares.push({
      owner_api_key_hash: row.owner_api_key_hash,
      grantee_api_key_hash: row.grantee_api_key_hash,
      owner_enabled: row.owner_enabled ?? false,
      grantee_enabled: row.grantee_enabled ?? false,
      revoked_at: row.revoked_at ?? null,
      created_at: row.created_at,
      updated_at: row.updated_at,
      active: row.owner_enabled === true && row.grantee_enabled === true && row.revoked_at == null,
      role: "owner",
    });
  }

  for (const row of granted ?? []) {
    shares.push({
      owner_api_key_hash: row.owner_api_key_hash,
      grantee_api_key_hash: row.grantee_api_key_hash,
      owner_enabled: row.owner_enabled ?? false,
      grantee_enabled: row.grantee_enabled ?? false,
      revoked_at: row.revoked_at ?? null,
      created_at: row.created_at,
      updated_at: row.updated_at,
      active: row.owner_enabled === true && row.grantee_enabled === true && row.revoked_at == null,
      role: "grantee",
    });
  }

  return { ok: true, shares };
}

/**
 * Fetch the active grants for a specific owner-grantee pair from the DB.
 * Used by the read path to get the consent rows needed by canReadCircleMemory.
 */
export async function fetchCircleGrants(
  supabase: SupabaseClient,
  ownerHash: string,
  readerHash: string,
): Promise<CircleGrant[]> {
  const owner = nonEmpty(ownerHash);
  const reader = nonEmpty(readerHash);
  if (!owner || !reader) return [];

  const { data, error } = await supabase
    .from("circle_link_permissions")
    .select("owner_api_key_hash, grantee_api_key_hash, owner_enabled, grantee_enabled, revoked_at")
    .eq("owner_api_key_hash", owner)
    .eq("grantee_api_key_hash", reader);

  if (error || !data) return [];
  return data as CircleGrant[];
}
