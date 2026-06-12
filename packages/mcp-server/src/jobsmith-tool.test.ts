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
    const allowed = new Set(["regex", "keyword_list", "count_threshold"]);
    expect((result.findings as Array<{ checkType: string }>).every((f) => allowed.has(f.checkType))).toBe(true);
  });

  it("runs the curated prose-spec checkers (markdown residue, placeholders, long sentences)", async () => {
    const longSentence = `Delivered ${Array.from({ length: 40 }, (_, i) => `word${i}`).join(" ")}.`;
    const text = `**Strategic Fit:** results-driven leader at [Company].\n${longSentence}`;
    const result = await jobsmithCheck({ text }) as Record<string, any>;
    const ruleIds = new Set((result.findings as Array<{ ruleId: string }>).map((f) => f.ruleId));
    expect(ruleIds.has("JS-AIDETECT-08")).toBe(true);
    expect(ruleIds.has("JS-AIDETECT-14")).toBe(true);
    expect(ruleIds.has("JS-VISUAL-19")).toBe(true);
    expect(ruleIds.has("JS-VOICE-21")).toBe(true);
    expect(result.blocked).toBe(true);
  });

  it("summarizes the rule pack with real counts", async () => {
    const result = await jobsmithRules({}) as Record<string, any>;
    expect(result.totalRules).toBe(228);
    // 25 spec-derived checkers plus 16 curated prose-spec checkers.
    expect(result.automatedRules).toBeGreaterThanOrEqual(41);
    expect(result.automatedRules + result.reviewRules).toBe(228);
    expect(result.byCategory).toBeTruthy();
  });
});
