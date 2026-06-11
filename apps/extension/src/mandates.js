/**
 * Mandate model for UnClick Local (Phase 1).
 *
 * A mandate is the only thing that authorizes a capability to run:
 * one capability, one time window, revocable at any moment. Pure
 * functions only; persistence lives in the service worker so these
 * can be unit-tested without a browser.
 *
 * Boundary contract: docs/rotatepass-local-phase0.md.
 */

export const DEFAULT_DURATION_MS = 60 * 60 * 1000;

export function createMandate(capabilityId, now = Date.now(), durationMs = DEFAULT_DURATION_MS) {
  if (!capabilityId || typeof capabilityId !== "string") {
    throw new Error("createMandate requires a capability id");
  }
  return {
    capability_id: capabilityId,
    granted_at: now,
    expires_at: now + durationMs,
    revoked: false,
  };
}

export function revokeMandate(mandate) {
  return { ...mandate, revoked: true };
}

export function isMandateLive(mandate, now = Date.now()) {
  if (!mandate) return false;
  if (mandate.revoked) return false;
  return now < mandate.expires_at;
}

/** Human label for the popup: active / expired / revoked / none. */
export function mandateState(mandate, now = Date.now()) {
  if (!mandate) return "none";
  if (mandate.revoked) return "revoked";
  if (now >= mandate.expires_at) return "expired";
  return "active";
}
