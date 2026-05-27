import { describe, expect, it } from "vitest";
import {
  createDeterministicCopyPassReport,
  createCopyPassVerdictPack,
  createFixtureCopyPassReport,
} from "../verdict-pack.js";

describe("CopyPass verdict pack", () => {
  it("creates a plan-only pack without scanning production", () => {
    const report = createCopyPassVerdictPack({
      target: {
        kind: "page",
        label: "UnClick home",
        url: "https://unclick.world/",
      },
      generated_at: "2026-05-09T19:00:00.000Z",
    });

    expect(report.mode).toBe("plan-only");
    expect(report.verdict).toBe("unknown");
    expect(report.not_checked.map((item) => item.label)).toContain("Production crawl");
    expect(report.disclaimer.headline).toContain("scoped review");
    expect(report.summary.coverage_note).toContain("plan artifact");
  });

  it("creates a deterministic evidence report for caller-provided copy", () => {
    const report = createDeterministicCopyPassReport({
      target: {
        kind: "page",
        label: "CopyPass landing page",
      },
      generated_at: "2026-05-09T19:00:00.000Z",
      blocks: [
        {
          id: "hero",
          kind: "hero",
          text: "The ultimate AI writing tool. Coming soon.",
        },
      ],
    });

    expect(report.mode).toBe("deterministic");
    expect(report.scanner_source.kind).toBe("local-detector");
    expect(report.verdict).toBe("fail");
    expect(report.summary.counts_by_severity.high).toBeGreaterThan(0);
    expect(report.disclaimer.compact).toContain("Scoped review only");
  });

  it("fails a fixture with unsupported outcome language", () => {
    const report = createFixtureCopyPassReport({
      target: {
        kind: "page",
        label: "CopyPass fixture",
      },
      generated_at: "2026-05-09T19:00:00.000Z",
      blocks: [
        {
          id: "hero",
          kind: "hero",
          text: "The best platform with guaranteed instant revenue. Coming soon.",
        },
      ],
    });

    expect(report.verdict).toBe("fail");
    expect(report.overall_score).toBeLessThan(100);
    expect(report.findings.map((finding) => finding.check_id)).toContain(
      "risky-guarantee-language",
    );
  });

  it("passes a clean public fixture", () => {
    const report = createFixtureCopyPassReport({
      target: {
        kind: "page",
        label: "CopyPass fixture",
      },
      generated_at: "2026-05-09T19:00:00.000Z",
      blocks: [
        {
          id: "hero",
          kind: "hero",
          text:
            "UnClick helps teams review AI work with shared context, public proof, and green checks. Start a free review.",
        },
        {
          id: "proof",
          kind: "proof",
          text: "Public receipts and privacy notes show what was checked.",
        },
      ],
    });

    expect(report.verdict).toBe("pass");
    expect(report.overall_score).toBe(100);
    expect(report.findings).toEqual([]);
    expect(report.summary.posture).toContain("no deterministic copy-quality issues");
  });

  it("does not allow an empty deterministic review to pass", () => {
    expect(() =>
      createDeterministicCopyPassReport({
        target: {
          kind: "artifact",
          label: "Empty fixture",
        },
        blocks: [],
      }),
    ).toThrow(/at least one copy block/);
  });

  it("does not allow a report with no checks attempted", () => {
    expect(() =>
      createCopyPassVerdictPack({
        target: {
          kind: "page",
          label: "No checks",
        },
        checks: [],
      }),
    ).toThrow(/at least one check/);
  });
});
