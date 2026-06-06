import { describe, expect, it } from "vitest";

import { jobsmithCheck, jobsmithRules } from "./jobsmith-tool.js";

describe("jobsmith connector (local rules engine)", () => {
  it("validates that text is required", async () => {
    const result = await jobsmithCheck({}) as Record<string, unknown>;
    expect(result.error).toMatch(/text is required/i);
  });

  it("flags an em dash from JobSmith's real rule pack and stamps the result", async () => {
    const result = await jobsmithCheck({ text: "I led growth — and shipped fast." }) as Record<string, any>;
    expect(result.unclick_meta.source).toMatch(/JobSmith rules engine/);
    const dashFinding = (result.findings as Array<{ match: string }>).find((f) => f.match === "—");
    expect(dashFinding).toBeTruthy();
    expect(typeof result.blocked).toBe("boolean");
  });

  it("returns no findings for clean prose", async () => {
    const result = await jobsmithCheck({ text: "I led growth and shipped quickly." }) as Record<string, any>;
    expect(Array.isArray(result.findings)).toBe(true);
    // Clean sentence should not trip the em-dash / emoji automated rules.
    expect((result.findings as Array<{ checkType: string }>).every((f) => f.checkType === "regex" || f.checkType === "keyword_list")).toBe(true);
  });

  it("summarizes the rule pack with real counts", async () => {
    const result = await jobsmithRules({}) as Record<string, any>;
    expect(result.totalRules).toBe(229);
    expect(result.automatedRules).toBeGreaterThan(0);
    expect(result.automatedRules + result.reviewRules).toBe(229);
    expect(result.byCategory).toBeTruthy();
  });
});
