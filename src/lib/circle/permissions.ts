/**
 * Circle permissions engine - a pure, deterministic share-state machine.
 *
 * Why this file is tiny and has zero dependencies: permissions must not be
 * decided by an AI. They are decided here, by a fixed rule engine. An agent
 * may READ the ledger through isSharedWith; it can never set, infer, or argue
 * its way around a permission. There is no clock, no randomness, no network,
 * and no IO in this module, so the same input always returns the same output
 * and the logic can be lifted into a server-side gate verbatim.
 *
 * The ledger is a flat map keyed by cellKey(tableId, resourceId, memberId).
 * Each entry is two independent booleans:
 *   - youShares:  YOUR outbound grant. Only you flip it. This is the bit the
 *                 gate reads. It is the answer to "may this member's AI read
 *                 this resource of mine?"
 *   - peerShares: the other side's inbound bit. You can never flip it from
 *                 your column. It exists so a two-way handshake renders
 *                 correctly and is never silently dropped by a master toggle.
 */

export type ShareVisual = "off" | "out" | "in" | "both";

export interface ShareState {
  youShares: boolean;
  peerShares: boolean;
}

export type ShareLedger = Record<string, ShareState>;

/** The canonical "nothing shared" state. Frozen so it can never be mutated. */
export const EMPTY_SHARE: ShareState = Object.freeze({
  youShares: false,
  peerShares: false,
});

/** Stable key for one cell of the matrix. */
export function cellKey(tableId: string, resourceId: string, memberId: string): string {
  return `${tableId}::${resourceId}::${memberId}`;
}

/** Read one cell, defaulting to EMPTY_SHARE when absent. */
export function getShare(ledger: ShareLedger, key: string): ShareState {
  return ledger[key] ?? EMPTY_SHARE;
}

/** Total function from the bit pair to a visual. */
export function deriveVisual(state: ShareState): ShareVisual {
  if (state.youShares && state.peerShares) return "both";
  if (state.youShares) return "out";
  if (state.peerShares) return "in";
  return "off";
}

/**
 * THE gate predicate. The only question an agent or a server-side gate should
 * ever ask before letting data cross a member line. Reads the ledger, nothing
 * else.
 */
export function isSharedWith(
  ledger: ShareLedger,
  tableId: string,
  resourceId: string,
  memberId: string,
): boolean {
  return getShare(ledger, cellKey(tableId, resourceId, memberId)).youShares;
}

/** Flip your outbound bit for one cell. Always preserves the peer bit. */
export function toggleYourShare(ledger: ShareLedger, key: string): ShareLedger {
  const current = getShare(ledger, key);
  return {
    ...ledger,
    [key]: { youShares: !current.youShares, peerShares: current.peerShares },
  };
}

/** Set your outbound bit for many cells at once. Preserves every peer bit. */
export function setYourShare(ledger: ShareLedger, keys: string[], on: boolean): ShareLedger {
  const next: ShareLedger = { ...ledger };
  for (const key of keys) {
    const current = getShare(next, key);
    next[key] = { youShares: on, peerShares: current.peerShares };
  }
  return next;
}

/** How many of these cells you currently share out. */
export function countShared(ledger: ShareLedger, keys: string[]): number {
  return keys.reduce((n, key) => (getShare(ledger, key).youShares ? n + 1 : n), 0);
}

/** True when you share out every one of these cells. */
export function isFullyShared(ledger: ShareLedger, keys: string[]): boolean {
  return keys.length > 0 && keys.every((key) => getShare(ledger, key).youShares);
}

/** True when you share out some but not all of these cells (mixed master). */
export function isPartiallyShared(ledger: ShareLedger, keys: string[]): boolean {
  const n = countShared(ledger, keys);
  return n > 0 && n < keys.length;
}

/**
 * Master toggle rule: if every cell is already on, turn them all off;
 * otherwise turn them all on. Peer bits are preserved either way, so an
 * inbound-only cell becomes a two-way handshake when turned on and falls back
 * to inbound-only (not nothing) when turned off.
 */
export function toggleMaster(ledger: ShareLedger, keys: string[]): ShareLedger {
  const turnOff = isFullyShared(ledger, keys);
  return setYourShare(ledger, keys, !turnOff);
}
