import { test } from "node:test";
import assert from "node:assert/strict";
import { createMandate, revokeMandate, isMandateLive, mandateState, DEFAULT_DURATION_MS } from "../src/mandates.js";
import { redactFields, buildReceipt, appendReceipt, MAX_RECEIPTS } from "../src/receipts.js";
import { getCapability, validateArchiveSaveInput, CAPABILITIES } from "../src/capabilities.js";

const T0 = 1_000_000;

test("mandate lifecycle: granted mandates are live, expire on schedule, and revoke immediately", () => {
  const mandate = createMandate("local.visibility.archive-save", T0);
  assert.equal(isMandateLive(mandate, T0 + 1), true);
  assert.equal(mandateState(mandate, T0 + 1), "active");

  assert.equal(isMandateLive(mandate, T0 + DEFAULT_DURATION_MS), false);
  assert.equal(mandateState(mandate, T0 + DEFAULT_DURATION_MS), "expired");

  const revoked = revokeMandate(mandate);
  assert.equal(isMandateLive(revoked, T0 + 1), false);
  assert.equal(mandateState(revoked, T0 + 1), "revoked");
});

test("no mandate means not live (the boundary's default-deny)", () => {
  assert.equal(isMandateLive(null), false);
  assert.equal(mandateState(undefined), "none");
});

test("createMandate refuses an empty capability id", () => {
  assert.throws(() => createMandate(""), /capability id/);
});

test("receipts strip secret-material fields by name, recursively", () => {
  const details = {
    page_url: "https://unclick.world/",
    raw_cookie: "nope",
    sessionToken: "nope",
    nested: { mfa_secret: "nope", outcome_note: "fine" },
  };
  const safe = redactFields(details);
  assert.deepEqual(safe, { page_url: "https://unclick.world/", nested: { outcome_note: "fine" } });
});

test("buildReceipt records capability, action, outcome, and an ISO timestamp", () => {
  const r = buildReceipt("local.visibility.archive-save", "archive_save_request", "tab_opened", { page_url: "https://unclick.world/why" }, T0);
  assert.equal(r.capability_id, "local.visibility.archive-save");
  assert.equal(r.outcome, "tab_opened");
  assert.equal(r.details.page_url, "https://unclick.world/why");
  assert.match(r.at, /^\d{4}-\d{2}-\d{2}T/);
});

test("appendReceipt keeps newest first and caps the log", () => {
  let log = [];
  for (let i = 0; i < MAX_RECEIPTS + 5; i++) {
    log = appendReceipt(log, buildReceipt("c", "a", `o${i}`, {}, T0 + i));
  }
  assert.equal(log.length, MAX_RECEIPTS);
  assert.equal(log[0].outcome, `o${MAX_RECEIPTS + 4}`);
});

test("archive-save input gate allows only https unclick.world URLs", () => {
  assert.equal(validateArchiveSaveInput("https://unclick.world/why").ok, true);
  assert.equal(
    validateArchiveSaveInput("https://unclick.world/memory").save_url,
    "https://web.archive.org/save/https://unclick.world/memory",
  );
  assert.equal(validateArchiveSaveInput("https://example.com/").ok, false);
  assert.equal(validateArchiveSaveInput("http://unclick.world/").ok, false);
  assert.equal(validateArchiveSaveInput("not a url").ok, false);
});

test("registry: every capability declares the Phase 0 planning-shape fields", () => {
  assert.ok(CAPABILITIES.length >= 1);
  for (const cap of CAPABILITIES) {
    for (const field of ["capability_id", "provider", "action", "risk_level", "requires_user_confirmation", "allowed_inputs", "disallowed_inputs", "session_material", "revocation_key", "verification_hint"]) {
      assert.ok(field in cap, `${cap.capability_id} missing ${field}`);
    }
  }
  assert.equal(getCapability("local.visibility.archive-save").risk_level, "low");
  assert.equal(getCapability("does-not-exist"), null);
});
