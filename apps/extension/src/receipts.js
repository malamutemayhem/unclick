/**
 * Redacted receipt builder for UnClick Local (Phase 1).
 *
 * The cloud (and the receipt log itself) may know WHAT was approved and
 * whether it worked, never the session material that made it possible.
 * Field names matching secret-material patterns are stripped by
 * construction, so a future capability cannot accidentally log what
 * the boundary forbids (docs/rotatepass-local-phase0.md).
 */

const DISALLOWED_FIELD_PATTERN = /cookie|token|passkey|mfa|secret|password|session/i;

export const MAX_RECEIPTS = 50;

export function redactFields(details) {
  const safe = {};
  for (const [key, value] of Object.entries(details || {})) {
    if (DISALLOWED_FIELD_PATTERN.test(key)) continue;
    if (typeof value === "object" && value !== null) {
      safe[key] = redactFields(value);
    } else {
      safe[key] = value;
    }
  }
  return safe;
}

export function buildReceipt(capabilityId, action, outcome, details = {}, now = Date.now()) {
  return {
    capability_id: capabilityId,
    action,
    outcome,
    details: redactFields(details),
    at: new Date(now).toISOString(),
  };
}

/** Newest first, capped so the log cannot grow without bound. */
export function appendReceipt(receipts, receipt) {
  return [receipt, ...(receipts || [])].slice(0, MAX_RECEIPTS);
}
