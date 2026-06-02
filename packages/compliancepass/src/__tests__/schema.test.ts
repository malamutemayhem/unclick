import { describe, expect, it } from "vitest";

import { CompliancePassReceiptSchema } from "../schema.js";

describe("CompliancePass schema", () => {
  it("validates a readiness receipt envelope", () => {
    const receipt = CompliancePassReceiptSchema.parse({
      kind: "compliancepass_receipt_v1",
      status: "WARN",
      run_id: "compliancepass-20260530141000-abc12345",
      target_name: "UnClick",
      target_sha: "abc123",
      generated_at: "2026-05-30T14:10:00.000Z",
      valid_until: "2026-06-06T14:10:00.000Z",
      readiness_score: {
        value: 82,
        band: "amber",
        traffic_light: "yellow",
        rationale: "Some readiness gaps remain.",
      },
      checked: {
        total: 12,
        pass: 9,
        partial: 2,
        fail: 1,
        unknown: 0,
        na: 0,
        pending: 0,
      },
      gap_severity_counts: {
        critical: 0,
        high: 1,
        medium: 2,
        low: 0,
        info: 0,
      },
      blocking_gap_count: 1,
      evidence_sources: [
        {
          type: "doc",
          label: "Framework mapping",
          path: "docs/compliancepass-framework-mapping.md",
          summary: "Control mapping exists but needs owner proof.",
        },
      ],
      action_needed: ["Close the high-severity readiness gap before claiming green."],
      boundaries: [
        "CompliancePass is readiness guidance, not a compliance certification.",
        "CompliancePass receipts must not expose secrets or private production data.",
      ],
    });

    expect(receipt.kind).toBe("compliancepass_receipt_v1");
    expect(receipt.target_sha).toBe("abc123");
  });
});
