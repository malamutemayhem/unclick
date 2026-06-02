import { describe, expect, it } from "vitest";

import {
  FlowPassFindingSchema,
  FlowPassGeoPassAdapterSchema,
  FlowPassReceiptSchema,
  FlowPassReportSchema,
} from "../schema.js";

describe("FlowPass schema", () => {
  it("validates a fixture-safe flow finding", () => {
    const finding = FlowPassFindingSchema.parse({
      id: "primary-cta-missing",
      step_id: "primary-cta",
      severity: "high",
      title: "Primary CTA is missing",
      summary: "The fixture did not expose a clear primary action.",
      evidence: [
        {
          kind: "fixture",
          label: "Landing fixture",
          source_url: "https://example.com/",
          summary: "No button or link was marked as the primary CTA.",
        },
      ],
      recommendation: "Expose one primary action for the journey.",
    });

    expect(finding.evidence).toHaveLength(1);
  });

  it("accepts a GEOPass source adapter for shared scanner context", () => {
    const adapter = FlowPassGeoPassAdapterSchema.parse({
      source: "geopass",
      target_url: "https://example.com/",
      mode: "plan-only",
      shared_check_ids: ["aggregate-ai-engine-readiness"],
    });

    expect(adapter.shared_check_ids).toEqual([
      "aggregate-ai-engine-readiness",
    ]);
  });

  it("validates a plan-only FlowPass report", () => {
    const report = FlowPassReportSchema.parse({
      target_url: "https://example.com/",
      generated_at: "2026-05-09T17:38:00.000Z",
      mode: "plan-only",
      journey: {
        id: "signup",
        name: "Signup journey",
        kind: "signup",
      },
      journey_readiness_score: 0,
      verdict: "unknown",
      scanner_source: {
        kind: "fixture",
        mode: "plan-only",
        target_url: "https://example.com/",
      },
      steps: [
        {
          step_id: "entry-route",
          label: "Entry route loads",
          score: 0,
          verdict: "unknown",
        },
      ],
    });

    expect(report.steps[0]?.findings).toEqual([]);
  });

  it("validates a journey receipt envelope", () => {
    const receipt = FlowPassReceiptSchema.parse({
      kind: "flowpass_receipt_v1",
      status: "PENDING",
      run_id: "flowpass_plan_1",
      target_url: "https://example.com/signup",
      target_sha: "abc123",
      generated_at: "2026-05-30T14:10:00.000Z",
      mode: "plan-only",
      profile: "smoke",
      journey: {
        id: "signup",
        name: "Signup journey",
        kind: "signup",
      },
      score: 0,
      verdict: "unknown",
      checked: { total: 1, pass: 0, warn: 0, fail: 0, unknown: 1 },
      evidence_sources: [
        {
          kind: "manual-note",
          label: "Plan-only note",
          source_url: "https://example.com/signup",
          summary: "Fixture proof is still required.",
        },
      ],
      not_checked: [{ label: "Success state", reason: "No fixture supplied." }],
      disagreements_open: 0,
      action_needed: ["Provide fixture proof before using this as a PASS receipt."],
      boundaries: [
        "FlowPass uses provided public fixture evidence from this MCP surface.",
        "Plan-only results are not PASS receipts until fixture or live read-only proof is supplied.",
      ],
    });

    expect(receipt.kind).toBe("flowpass_receipt_v1");
    expect(receipt.status).toBe("PENDING");
  });
});
