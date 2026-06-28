/**
 * Capability registry for UnClick Local (Phase 1).
 *
 * Follows the Phase 0 planning shape (docs/rotatepass-local-phase0.md).
 * One launch capability, chosen because it needs zero credentials and
 * still exercises the full mandate -> execute -> receipt -> revoke loop:
 * requesting a Wayback Machine snapshot of an unclick.world page.
 */

export const CAPABILITIES = [
  {
    capability_id: "local.visibility.archive-save",
    label: "Wayback archive save",
    provider: "web.archive.org",
    action: "archive_save_request",
    risk_level: "low",
    requires_user_confirmation: true,
    allowed_inputs: ["page_url"],
    disallowed_inputs: ["raw_cookie", "passkey_material", "mfa_secret"],
    session_material: "none",
    revocation_key: "local.visibility.archive-save",
    verification_hint: "snapshot URL visible in the opened tab; receipt records the request only",
    explain: "Opens the Wayback Machine save page for one unclick.world URL in a new tab. Uses no login, reads nothing from the page, and records a redacted receipt of the request.",
  },
];

export function getCapability(capabilityId) {
  return CAPABILITIES.find((c) => c.capability_id === capabilityId) || null;
}

/** Allow-list gate: archive saves accept unclick.world URLs only. */
export function validateArchiveSaveInput(pageUrl) {
  let url;
  try {
    url = new URL(String(pageUrl));
  } catch {
    return { ok: false, reason: "not a valid URL" };
  }
  if (url.protocol !== "https:") return { ok: false, reason: "https URLs only" };
  if (url.hostname !== "unclick.world") return { ok: false, reason: "unclick.world URLs only" };
  return { ok: true, save_url: `https://web.archive.org/save/${url.href}` };
}
