import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  evaluateXPassGate,
  selectXPassChecks,
} from "./pinballwake-xpass-gate-room.mjs";

function checks(input) {
  return selectXPassChecks(input).map((check) => check.check);
}

describe("PinballWake XPass Gate Room", () => {
  it("routes UI/admin/navigation changes to UXPass and SlopPass", () => {
    const selected = checks({
      title: "UI navigation polish",
      changed_files: ["src/pages/admin/AdminShell.tsx", "src/components/Nav.tsx"],
    });

    assert.deepEqual(selected, ["uxpass", "sloppass"]);
  });

  it("routes MCP/tool changes to TestPass and SlopPass", () => {
    const selected = checks({
      title: "Add connector tool",
      changed_files: ["packages/mcp-server/src/weather-tool.ts"],
    });

    assert.deepEqual(selected, ["testpass", "sloppass"]);
  });

  it("routes auth, key, and redaction changes to SecurityPass", () => {
    const selected = checks({
      title: "Harden keychain token redaction",
      changed_files: ["src/lib/keychain/token-redaction.ts"],
    });

    assert.ok(selected.includes("securitypass"));
    assert.ok(selected.includes("sloppass"));
  });

  it("routes legal, pricing, and public claim copy to LegalPass and CopyPass", () => {
    const selected = checks({
      title: "Pricing page public claims",
      changed_files: ["docs/pricing.md", "docs/legal/terms.md"],
    });

    assert.ok(selected.includes("copypass"));
    assert.ok(selected.includes("legalpass"));
  });

  it("routes exact-copy work to FidelityPass instead of generic CopyPass", () => {
    const selected = checks({
      title: "Copy this source exactly word-for-word",
      description: "Need 1:1 preservation with no rewriting.",
    });

    assert.ok(selected.includes("fidelitypass"));
    assert.equal(selected.includes("copypass"), false);
  });

  it("routes trusted status claims to CommonSensePass", () => {
    const selected = checks({
      title: "Worker says merge-ready and no-work",
      description: "Sanity check this PASS claim before it is trusted.",
    });

    assert.ok(selected.includes("commonsensepass"));
  });

  it("routes enterprise/compliance readiness to CompliancePass", () => {
    const selected = checks({
      title: "Compliance audit readiness",
      description: "Prepare procurement evidence for an enterprise customer.",
    });

    assert.ok(selected.includes("compliancepass"));
  });

  it("does not select every pass for a tiny docs-only wording change", () => {
    const selected = checks({
      title: "FAQ wording cleanup",
      changed_files: ["docs/faq.md"],
    });

    assert.deepEqual(selected, ["copypass"]);
  });

  it("returns advisory xpass_needed when selected checks have no receipts yet", () => {
    const result = evaluateXPassGate({
      mode: "advisory",
      target: { type: "pr", id: 547, sha: "abc123" },
      changed_files: ["src/pages/admin/You.tsx"],
    });

    assert.equal(result.ok, true);
    assert.equal(result.result, "xpass_needed");
    assert.deepEqual(result.missing_checks, ["uxpass", "sloppass"]);
    assert.equal(result.receipt.action_needed.length, 2);
    assert.equal(result.receipt.full_checklist.find((row) => row.check === "uxpass")?.status, "missing");
    assert.equal(result.receipt.full_checklist.find((row) => row.check === "fidelitypass")?.status, "not_applicable");
    assert.equal(result.receipt.improvement_signals.some((signal) => signal.check === "uxpass"), true);
  });

  it("blocks missing receipts in enforce mode", () => {
    const result = evaluateXPassGate({
      mode: "enforce",
      target: { type: "pr", id: 547, sha: "abc123" },
      changed_files: ["src/pages/admin/You.tsx"],
    });

    assert.equal(result.ok, false);
    assert.equal(result.result, "xpass_needed");
    assert.deepEqual(result.missing_checks, ["uxpass", "sloppass"]);
  });

  it("passes when all selected receipts are current and green", () => {
    const result = evaluateXPassGate({
      mode: "enforce",
      target: { type: "pr", id: 547, sha: "abc123" },
      changed_files: ["src/pages/admin/You.tsx"],
      pass_results: [
        { check: "UXPass", status: "passed", run_id: "ux-1", target_sha: "abc123", url: "https://example.test/ux" },
        { check: "SlopPass", status: "green", run_id: "slop-1", target_sha: "abc123" },
      ],
    });

    assert.equal(result.ok, true);
    assert.equal(result.result, "passed");
    assert.equal(result.receipt.evidence.length, 2);
    assert.deepEqual(result.receipt.action_needed, []);
  });

  it("blocks unscoped receipts that do not name the target head", () => {
    const result = evaluateXPassGate({
      mode: "enforce",
      target: { type: "pr", id: 547, sha: "abc123" },
      changed_files: ["src/pages/admin/You.tsx"],
      pass_results: [
        { check: "UXPass", status: "passed", run_id: "ux-1" },
        { check: "SlopPass", status: "passed", run_id: "slop-1", target_sha: "abc123" },
      ],
    });

    assert.equal(result.ok, false);
    assert.equal(result.result, "blocker");
    assert.equal(result.reason, "unscoped_pass_result");
    assert.deepEqual(result.unscoped_checks, ["uxpass"]);
    assert.deepEqual(result.receipt.staleness.unscoped_checks, ["uxpass"]);
    assert.match(result.receipt.action_needed.join("\n"), /UXPass receipt is missing target scope/);
  });

  it("blocks stale receipts that were generated for another head", () => {
    const result = evaluateXPassGate({
      mode: "advisory",
      target: { type: "pr", id: 547, sha: "new-head" },
      changed_files: ["src/pages/admin/You.tsx"],
      pass_results: [
        { check: "UXPass", status: "passed", run_id: "ux-1", target_sha: "old-head" },
        { check: "SlopPass", status: "passed", run_id: "slop-1", target_sha: "new-head" },
      ],
    });

    assert.equal(result.ok, false);
    assert.equal(result.result, "blocker");
    assert.deepEqual(result.stale_checks, ["uxpass"]);
  });

  it("blocks failed pass results", () => {
    const result = evaluateXPassGate({
      target: { type: "pr", id: 547, sha: "abc123" },
      changed_files: ["src/pages/admin/You.tsx"],
      pass_results: [
        { check: "uxpass", status: "failed", run_id: "ux-1", target_sha: "abc123" },
        { check: "sloppass", status: "passed", run_id: "slop-1", target_sha: "abc123" },
      ],
    });

    assert.equal(result.ok, false);
    assert.equal(result.result, "blocker");
    assert.deepEqual(result.blocked_checks, ["uxpass"]);
  });

  it("records unavailable pass-family checks as explicit skips", () => {
    const result = evaluateXPassGate({
      mode: "enforce",
      target: { type: "pr", id: 547, sha: "abc123" },
      changed_files: ["src/pages/admin/You.tsx"],
      available_checks: ["uxpass"],
      pass_results: [
        { check: "uxpass", status: "passed", run_id: "ux-1", target_sha: "abc123" },
      ],
    });

    assert.equal(result.ok, true);
    assert.equal(result.result, "passed");
    assert.deepEqual(result.skipped_checks, [
      { check: "sloppass", name: "SlopPass", reason: "pass_not_available" },
    ]);
    assert.equal(result.receipt.improvement_signals.some((signal) => signal.signal === "pass_not_available"), true);
  });

  it("normalizes legacy QualityPass receipts into SlopPass", () => {
    const result = evaluateXPassGate({
      mode: "enforce",
      target: { type: "pr", id: 547, sha: "abc123" },
      changed_files: ["scripts/pinballwake-xpass-gate-room.mjs"],
      pass_results: [
        { check: "QualityPass", status: "passed", run_id: "legacy-quality-1", target_sha: "abc123" },
      ],
    });

    assert.equal(result.ok, true);
    assert.equal(result.receipt.evidence[0].check, "sloppass");
    assert.equal(result.receipt.evidence[0].name, "SlopPass");
  });

  it("normalizes legacy EnterprisePass receipts into CompliancePass", () => {
    const result = evaluateXPassGate({
      mode: "enforce",
      target: { type: "pr", id: 548, sha: "abc123" },
      title: "Compliance readiness review",
      pass_results: [
        { check: "LegalPass", status: "passed", run_id: "legal-1", target_sha: "abc123" },
        { check: "EnterprisePass", status: "passed", run_id: "legacy-enterprise-1", target_sha: "abc123" },
      ],
    });

    assert.equal(result.ok, true);
    assert.equal(result.receipt.evidence.some((entry) => entry.check === "compliancepass"), true);
    assert.equal(result.receipt.evidence.some((entry) => entry.name === "CompliancePass"), true);
  });
});
