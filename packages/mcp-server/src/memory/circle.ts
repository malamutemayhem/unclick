/**
 * Circle sharing: cross-user memory access for UnClick Memory.
 *
 * This module is the single source of truth for "may this reader see another
 * user's memory". It is the gate predicate the read path consults before it
 * ever widens a read beyond the caller's own tenant.
 *
 * It is the opposite direction to lane-04 scopes (memory/scopes.ts): scopes
 * NARROW what an agent may recall WITHIN one tenant; Circle WIDENS a read
 * ACROSS tenants, from an owner to a consenting grantee. Because widening is
 * the more dangerous direction, every rule here is deny-by-default and the
 * whole behaviour is gated by MEMORY_CIRCLE_ENABLED (default off).
 *
 * Hard architecture constraint: Circle sharing is managed-cloud only. In BYOD
 * mode each user's memory lives in their OWN Supabase, which a grantee has no
 * credentials for, so cross-user sharing is impossible there by construction.
 * The gate denies any cross-user read unless the backend mode is "managed".
 *
 * Consent model (the circle_link_permissions row): a share is active only when
 * BOTH sides opt in (owner_enabled AND grantee_enabled) and it has not been
 * revoked (revoked_at IS NULL). Either side can withdraw at any time by
 * clearing their flag or setting revoked_at, which immediately deactivates the
 * share. A reader always retains full access to their own memory; this gate
 * only governs reading SOMEONE ELSE'S memory.
 *
 * Flag: MEMORY_CIRCLE_ENABLED (default off). When off, callers skip the
 * cross-user path entirely, so behaviour is byte-identical to today and there
 * is no schema dependency.
 */

/** The backend mode a read is running under (see memory/db.ts tenancy). */
export type CircleBackendMode = "managed" | "byod" | "local";

/**
 * A consent row from circle_link_permissions. Field names mirror the table
 * columns so the mapping from a DB row is direct. owner is the memory owner
 * (the grantor); grantee is the reader who may receive access.
 */
export interface CircleGrant {
  owner_api_key_hash: string;
  grantee_api_key_hash: string;
  owner_enabled?: boolean | null;
  grantee_enabled?: boolean | null;
  revoked_at?: string | null;
}

/** A cross-user read request, evaluated against the known consent rows. */
export interface CircleReadRequest {
  /** The api_key_hash of the caller doing the read, or null when unknown. */
  readerApiKeyHash: string | null;
  /** The api_key_hash whose memory is being requested, or null when unknown. */
  ownerApiKeyHash: string | null;
  /** The backend mode this read runs under. */
  mode: CircleBackendMode;
  /** Consent rows relevant to this owner/reader pair (may be empty). */
  grants: CircleGrant[];
}

type EnvLike = Record<string, string | undefined>;

function flagOn(raw: string | undefined): boolean {
  const v = raw ?? "";
  return v === "1" || v.toLowerCase() === "true";
}

function nonEmpty(value: string | null | undefined): string | null {
  if (value == null) return null;
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}

/** True when Circle cross-user sharing is enabled. Default off. */
export function circleSharingEnabled(env: EnvLike = process.env): boolean {
  return flagOn(env.MEMORY_CIRCLE_ENABLED);
}

/**
 * A consent row is active only when both sides have opted in and the share has
 * not been revoked. Missing/null booleans count as not-opted-in (deny).
 */
export function isCircleGrantActive(grant: CircleGrant): boolean {
  return (
    grant.owner_enabled === true &&
    grant.grantee_enabled === true &&
    nonEmpty(grant.revoked_at) === null
  );
}

/**
 * Find the single active grant that lets `reader` read `owner`'s memory, or
 * null when none applies. Matches on the exact owner -> grantee direction;
 * a grant in the other direction does not authorize this read.
 */
export function selectActiveGrant(
  grants: CircleGrant[],
  ownerApiKeyHash: string,
  readerApiKeyHash: string,
): CircleGrant | null {
  for (const grant of grants) {
    if (
      grant.owner_api_key_hash === ownerApiKeyHash &&
      grant.grantee_api_key_hash === readerApiKeyHash &&
      isCircleGrantActive(grant)
    ) {
      return grant;
    }
  }
  return null;
}

/**
 * The core gate: may this reader read this owner's memory?
 *
 * Deny-by-default at every branch:
 *   - reader or owner identity missing      -> deny
 *   - reading your OWN memory               -> allow (not a cross-user share)
 *   - cross-user read in non-managed mode   -> deny (BYOD/local cannot share)
 *   - cross-user read with no active grant  -> deny
 *   - cross-user read with an active grant  -> allow
 *
 * Callers must additionally check circleSharingEnabled() before taking the
 * cross-user path; this predicate stays pure and env-free.
 */
export function canReadCircleMemory(req: CircleReadRequest): boolean {
  const reader = nonEmpty(req.readerApiKeyHash);
  const owner = nonEmpty(req.ownerApiKeyHash);

  // Unknown identity on either side never leaks data.
  if (reader === null || owner === null) return false;

  // A reader always sees their own memory; this gate governs other people's.
  if (reader === owner) return true;

  // Cross-user access only exists in managed cloud. BYOD memory lives in the
  // owner's private Supabase that the reader cannot reach, and local files are
  // single-tenant, so neither can ever satisfy a cross-user read.
  if (req.mode !== "managed") return false;

  return selectActiveGrant(req.grants, owner, reader) !== null;
}
