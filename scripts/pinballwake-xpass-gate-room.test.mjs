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

  it("routes worker claims and proof receipts to CommonSensePass", () => {
    const selected = checks({
      title: "False DONE proof receipt guard",
      changed_files: ["packages/commonsensepass/src/check.ts", "api/lib/orchestrator-context.ts"],
    });

    assert.ok(selected.includes("commonsensepass"));
    assert.ok(selected.includes("sloppass"));
  });

  it("routes product journeys to FlowPass", () => {
    const selected = checks({
      title: "Checkout journey handoff proof",
      changed_files: ["packages/flowpass/src/flow-plan.ts", "src/pages/admin/CheckoutFlow.tsx"],
    });

    assert.ok(selected.includes("flowpass"));
    assert.ok(selected.includes("uxpass"));
  });

  it("routes AI answer-engine readiness to GEOPass", () => {
    const selected = checks({
      title: "AI answer engine readiness",
      changed_files: ["packages/geopass/src/scanner-plan.ts", "public/llms.txt"],
    });

    assert.ok(selected.includes("geopass"));
    assert.ok(selected.includes("seopass"));
  });

  it("routes credential lifecycle changes to RotatePass as well as SecurityPass", () => {
    const selected = checks({
      title: "Credential revocation path",
      changed_files: ["docs/rotatepass-local-phase0.md", "src/lib/system-credentials.ts"],
    });

    assert.ok(selected.includes("rotatepass"));
    assert.ok(selected.includes("securitypass"));
  });

  it("routes stale scheduled work to WakePass", () => {
    const selected = checks({
      title: "Missed ACK stale heartbeat dispatch",
      changed_files: ["docs/prd/wakepass.md", ".github/workflows/testpass-scheduled-smoke.yml"],
    });

    assert.ok(selected.includes("wakepass"));
  });

  it("does not select every pass for a tiny docs-only wording change", () => {
    const selected = checks({
      title: "FAQ wording cleanup",
      changed_files: ["docs/faq.md"],
    });

    assert.deepEqual(selected, ["copypass"]);
  });

  it("routes Pass package changes to their own pass plus code quality", () => {
    const flow = checks({
      title: "Improve FlowPass journey verifier",
      changed_files: ["packages/flowpass/src/runner.ts"],
    });
    assert.ok(flow.includes("flowpass"));
    assert.ok(flow.includes("sloppass"));

    const geo = checks({
      title: "Tighten GEOPass AI answer-engine scanner",
      changed_files: ["packages/geopass/src/scanner.ts"],
    });
    assert.ok(geo.includes("geopass"));
    assert.ok(geo.includes("sloppass"));

    const commonSense = checks({
      title: "CommonSensePass false done guard",
      changed_files: ["packages/commonsensepass/src/rules.ts"],
    });
    assert.ok(commonSense.includes("commonsensepass"));
    assert.ok(commonSense.includes("sloppass"));
  });

  it("dogfoods every package-level Pass surface through its own XPass check", () => {
    for (const [dir, check] of [
      ["testpass", "testpass"],
      ["commonsensepass", "commonsensepass"],
      ["uxpass", "uxpass"],
      ["securitypass", "securitypass"],
      ["copypass", "copypass"],
      ["seopass", "seopass"],
      ["legalpass", "legalpass"],
      ["sloppass", "sloppass"],
      ["flowpass", "flowpass"],
      ["geopass", "geopass"],
    ]) {
      const selected = checks({
        title: `Dogfood ${dir}`,
        changed_files: [`packages/${dir}/src/index.ts`],
      });

      assert.ok(selected.includes(check), `${dir} should select ${check}`);
      assert.ok(selected.includes("sloppass"), `${dir} code changes should select SlopPass`);
    }
  });

  it("routes reliability and credential hygiene to WakePass and RotatePass", () => {
    const selected = checks({
      title: "WakePass stale ACK repair and RotatePass metadata",
      changed_files: [
        "scripts/pinballwake-ack-ledger-room.mjs",
        "docs/rotatepass-connector-metadata.md",
      ],
    });

    assert.ok(selected.includes("wakepass"));
    assert.ok(selected.includes("rotatepass"));
    assert.ok(selected.includes("copypass"));
    assert.ok(selected.includes("sloppass"));
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
  });

  it("normalizes old QualityPass receipts into SlopPass", () => {
    const result = evaluateXPassGate({
      mode: "enforce",
      target: { type: "pr", id: 547, sha: "abc123" },
      changed_files: ["scripts/pinballwake-xpass-gate-room.mjs"],
      pass_results: [
        { check: "QualityPass", status: "passed", run_id: "quality-1", target_sha: "abc123" },
        { check: "WakePass", status: "passed", run_id: "wake-1", target_sha: "abc123" },
      ],
    });

    assert.equal(result.ok, true);
    assert.equal(result.receipt.evidence[0].check, "sloppass");
    assert.equal(result.receipt.evidence[0].name, "SlopPass");
  });
});
