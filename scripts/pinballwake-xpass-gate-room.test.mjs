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
  it("routes UI/admin/navigation changes to UXPass, FlowPass, and SlopPass", () => {
    const selected = checks({
      title: "UI navigation polish",
      changed_files: ["src/pages/admin/AdminShell.tsx", "src/components/Nav.tsx"],
    });

    assert.deepEqual(selected, ["uxpass", "flowpass", "sloppass"]);
  });

  it("does not route backend memory-admin mentions to UXPass", () => {
    const selected = checks({
      title: "Runner memory-admin queue fallback",
      description: "Use the memory-admin endpoint when MCP queue reads fail.",
      changed_files: ["scripts/pinballwake-autonomous-runner.mjs"],
    });

    assert.equal(selected.includes("uxpass"), false);
    assert.ok(selected.includes("testpass"));
    assert.ok(selected.includes("sloppass"));
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

  it("does not recommend a Crews Council for a tiny single-pass wording change", () => {
    const result = evaluateXPassGate({
      title: "FAQ wording cleanup",
      changed_files: ["docs/faq.md"],
    });

    assert.equal(result.crews_council.needed, false);
    assert.equal(result.crews_council.status, "not_needed");
    assert.equal(result.crews_council.lite_check.needed, true);
    assert.equal(result.crews_council.lite_check.mode, "anti_rubber_stamp");
    assert.ok(result.crews_council.lite_check.questions.length >= 4);
    assert.equal(result.receipt.crews_council.needed, false);
  });

  it("returns advisory xpass_needed when selected checks have no receipts yet", () => {
    const result = evaluateXPassGate({
      mode: "advisory",
      target: { type: "pr", id: 547, sha: "abc123" },
      changed_files: ["src/pages/admin/You.tsx"],
    });

    assert.equal(result.ok, true);
    assert.equal(result.result, "xpass_needed");
    assert.deepEqual(result.missing_checks, ["uxpass", "flowpass", "sloppass"]);
    assert.equal(result.receipt.action_needed.length, 3);
  });

  it("blocks missing receipts in enforce mode", () => {
    const result = evaluateXPassGate({
      mode: "enforce",
      target: { type: "pr", id: 547, sha: "abc123" },
      changed_files: ["src/pages/admin/You.tsx"],
    });

    assert.equal(result.ok, false);
    assert.equal(result.result, "xpass_needed");
    assert.deepEqual(result.missing_checks, ["uxpass", "flowpass", "sloppass"]);
  });

  it("passes when all selected receipts are current and green", () => {
    const result = evaluateXPassGate({
      mode: "enforce",
      target: { type: "pr", id: 547, sha: "abc123" },
      changed_files: ["src/pages/admin/You.tsx"],
      pass_results: [
        { check: "UXPass", status: "passed", run_id: "ux-1", target_sha: "abc123", url: "https://example.test/ux" },
        { check: "FlowPass", status: "passed", run_id: "flow-1", target_sha: "abc123" },
        { check: "SlopPass", status: "green", run_id: "slop-1", target_sha: "abc123" },
      ],
    });

    assert.equal(result.ok, true);
    assert.equal(result.result, "passed");
    assert.equal(result.receipt.evidence.length, 3);
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
      { check: "flowpass", name: "FlowPass", reason: "pass_not_available" },
      { check: "sloppass", name: "SlopPass", reason: "pass_not_available" },
    ]);
  });

  it("normalizes old QualityPass receipts into SlopPass", () => {
    const result = evaluateXPassGate({
      mode: "enforce",
      target: { type: "pr", id: 547, sha: "abc123" },
      changed_files: ["src/lib/quality-review.ts"],
      pass_results: [
        { check: "QualityPass", status: "passed", run_id: "quality-1", target_sha: "abc123" },
      ],
    });

    assert.equal(result.ok, true);
    assert.equal(result.receipt.evidence[0].check, "sloppass");
    assert.equal(result.receipt.evidence[0].name, "SlopPass");
  });

  it("dogfoods Pass product package changes through their own specialist check", () => {
    const selected = checks({
      title: "Tighten SEOPass robots scanner",
      changed_files: ["packages/seopass/src/robots.ts"],
    });

    assert.ok(selected.includes("testpass"));
    assert.ok(selected.includes("seopass"));
    assert.ok(selected.includes("sloppass"));
  });

  it("dogfoods CopyPass package changes through CopyPass, TestPass, and SlopPass", () => {
    const selected = checks({
      title: "Improve CopyPass claim evidence matching",
      changed_files: ["packages/copypass/src/runner.ts"],
    });

    assert.ok(selected.includes("testpass"));
    assert.ok(selected.includes("commonsensepass"));
    assert.ok(selected.includes("copypass"));
    assert.ok(selected.includes("sloppass"));
  });

  it("routes XPass gate changes through TestPass, CommonSensePass, and SlopPass", () => {
    const selected = checks({
      title: "XPass gate routing update",
      changed_files: ["scripts/pinballwake-xpass-gate-room.mjs"],
    });

    assert.ok(selected.includes("testpass"));
    assert.ok(selected.includes("commonsensepass"));
    assert.ok(selected.includes("sloppass"));
  });

  it("routes EnterprisePass and CompliancePass readiness work through cross-pass evidence checks", () => {
    const selected = checks({
      title: "CompliancePass enterprise readiness evidence runner",
      changed_files: [
        "docs/enterprisepass-product-brief.md",
        "public/enterprise/latest.json",
      ],
    });

    assert.ok(selected.includes("testpass"));
    assert.ok(selected.includes("securitypass"));
    assert.ok(selected.includes("commonsensepass"));
    assert.ok(selected.includes("copypass"));
    assert.ok(selected.includes("seopass"));
    assert.ok(selected.includes("legalpass"));
    assert.ok(selected.includes("enterprisepass"));
    assert.ok(selected.includes("sloppass"));
  });

  it("recommends a Crews Council for broad public launch and compliance judgement", () => {
    const result = evaluateXPassGate({
      title: "Launch pricing and compliance readiness decision",
      context: "Need a go/no-go judgement before this public enterprise page ships.",
      changed_files: [
        "docs/enterprisepass-product-brief.md",
        "docs/legal/pricing-claims.md",
        "src/pages/Enterprise.tsx",
      ],
    });

    assert.equal(result.crews_council.needed, true);
    assert.equal(result.crews_council.status, "recommended");
    assert.equal(result.crews_council.suggested_template, "Council");
    assert.equal(result.crews_council.suggested_tool, "start_crew_run");
    assert.match(result.crews_council.reasons.join("\n"), /judgement|launch|decision/i);
    assert.equal(result.receipt.crews_council.needed, true);
  });

  it("recommends a Crews Council when pass evidence is mixed", () => {
    const result = evaluateXPassGate({
      target: { type: "pr", id: 548, sha: "abc123" },
      changed_files: ["docs/pricing.md", "docs/legal/terms.md"],
      pass_results: [
        { check: "CopyPass", status: "passed", run_id: "copy-1", target_sha: "abc123" },
        { check: "LegalPass", status: "failed", run_id: "legal-1", target_sha: "abc123" },
      ],
    });

    assert.equal(result.crews_council.needed, true);
    assert.match(result.crews_council.reasons.join("\n"), /mixed/i);
  });

  it("dogfoods Crews surfaces by recommending a Crews Council", () => {
    const result = evaluateXPassGate({
      title: "Improve Crews composer council handoff",
      changed_files: ["src/pages/admin/crews/CrewComposer.tsx"],
    });

    assert.equal(result.crews_council.needed, true);
    assert.match(result.crews_council.reasons.join("\n"), /Crews|Council/);
  });

  it("routes current accessibility and AI security terms from external standards to the right checks", () => {
    const selected = checks({
      title: "WCAG focus target size and LLM prompt injection review",
      changed_files: ["docs/research/xpass-gap-notes.md"],
    });

    assert.ok(selected.includes("uxpass"));
    assert.ok(selected.includes("securitypass"));
    assert.ok(selected.includes("copypass"));
  });

  it("routes public SEO changes through SEOPass and GEOPass", () => {
    const selected = checks({
      title: "Canonical and sitemap metadata refresh",
      changed_files: ["public/robots.txt", "src/pages/Landing.tsx"],
    });

    assert.ok(selected.includes("seopass"));
    assert.ok(selected.includes("geopass"));
    assert.ok(selected.includes("uxpass"));
    assert.ok(selected.includes("flowpass"));
  });

  it("routes credential rotation changes through SecurityPass and RotatePass", () => {
    const selected = checks({
      title: "Rotate provider credential redaction proof",
      changed_files: ["api/credentials.ts", "docs/rotatepass-connector-metadata.md"],
    });

    assert.ok(selected.includes("securitypass"));
    assert.ok(selected.includes("rotatepass"));
    assert.ok(selected.includes("copypass"));
  });

  it("routes dependency and lockfile changes through SecurityPass and EnterprisePass", () => {
    const selected = checks({
      title: "Dependency audit lockfile refresh",
      changed_files: ["package-lock.json"],
    });

    assert.ok(selected.includes("securitypass"));
    assert.ok(selected.includes("enterprisepass"));
    assert.ok(selected.includes("sloppass"));
  });

  it("routes completion and merge proof through CommonSensePass and WakePass", () => {
    const selected = checks({
      title: "Runner queue done proof and stale heartbeat cleanup",
      changed_files: ["scripts/pinballwake-autonomous-runner.mjs"],
    });

    assert.ok(selected.includes("commonsensepass"));
    assert.ok(selected.includes("wakepass"));
    assert.ok(selected.includes("sloppass"));
  });

  it("routes compliance and audit evidence through EnterprisePass", () => {
    const selected = checks({
      title: "CompliancePass audit receipt update",
      changed_files: ["public/enterprise/latest.json", "docs/enterprisepass-product-brief.md", "docs/legal/dpa.md"],
    });

    assert.ok(selected.includes("enterprisepass"));
    assert.ok(selected.includes("copypass"));
    assert.ok(selected.includes("legalpass"));
  });

  it("normalizes CompliancePass receipts into EnterprisePass", () => {
    const result = evaluateXPassGate({
      mode: "enforce",
      target: { type: "pr", id: 548, sha: "def456" },
      changed_files: ["public/enterprise/latest.json"],
      available_checks: ["enterprisepass"],
      pass_results: [
        { check: "CompliancePass", status: "passed", run_id: "compliance-1", target_sha: "def456" },
      ],
    });

    assert.equal(result.ok, true);
    assert.equal(result.receipt.evidence[0].check, "enterprisepass");
    assert.equal(result.receipt.evidence[0].name, "EnterprisePass");
  });
});
