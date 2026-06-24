import type { CirclePermission, LinkPermissionRow } from "./account-links-model.js";

/**
 * Read-path enforcement for Circle sharing.
 *
 * The Circle handshake (see docs/prd/connections-circle.md) records sharing
 * intent in link_permissions, but a share only becomes real when the read
 * path refuses to serve another account's data unless that intent is active.
 * These helpers are that gate. They are pure so the decision is unit-testable
 * in isolation from the database; the wiring that calls them (load/search and
 * the audit write) is described in docs/prd/connections-circle-enforcement.md.
 *
 * A share from owner -> grantee for a permission is ACTIVE only when the
 * matching row is both owner_enabled and grantee_enabled, which is the
 * both-sides-opt-in rule the PRD requires (it mirrors receive_active in
 * buildCirclePermissionState, kept as a standalone predicate so the read path
 * does not have to build the full permission map).
 */

function isActiveShare(
  row: LinkPermissionRow,
  ownerUserId: string,
  granteeUserId: string,
  permission: CirclePermission,
): boolean {
  return (
    row.permission === permission &&
    row.owner_user_id === ownerUserId &&
    row.grantee_user_id === granteeUserId &&
    Boolean(row.owner_enabled) &&
    Boolean(row.grantee_enabled)
  );
}

/**
 * May `granteeUserId` read `ownerUserId`'s data for `permission` right now?
 *
 * Deny-by-default: returns true only when an active (both-sides-opt-in) share
 * exists. Self-access (owner === grantee) is never a share and returns false;
 * a caller reads its own data through the normal owner path, not this gate.
 */
export function canGranteeReadOwner(
  rows: LinkPermissionRow[],
  params: { ownerUserId: string; granteeUserId: string; permission: CirclePermission },
): boolean {
  const { ownerUserId, granteeUserId, permission } = params;
  if (!ownerUserId || !granteeUserId || ownerUserId === granteeUserId) return false;
  return rows.some((row) => isActiveShare(row, ownerUserId, granteeUserId, permission));
}

/**
 * Every owner account id that has an ACTIVE `permission` share to
 * `granteeUserId`. The read path uses this to enumerate whose shared data a
 * caller may pull (for example, "load shared memory from everyone who shared
 * with me"). De-duplicated; self is excluded.
 */
export function ownersSharingWith(
  rows: LinkPermissionRow[],
  params: { granteeUserId: string; permission: CirclePermission },
): string[] {
  const { granteeUserId, permission } = params;
  if (!granteeUserId) return [];
  const owners = new Set<string>();
  for (const row of rows) {
    if (
      row.owner_user_id !== granteeUserId &&
      isActiveShare(row, row.owner_user_id, granteeUserId, permission)
    ) {
      owners.add(row.owner_user_id);
    }
  }
  return [...owners];
}
