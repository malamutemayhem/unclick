import { describe, expect, it } from "vitest";

import {
  JOBSMITH_RULE_PACK_V1,
  loadRulePackFromYaml,
  runJobsmithChecks,
  ruleNeedsRefresh,
  summarizeRulePack,
} from "./checkEngine";

describe("JobSmith check engine", () => {
  it("loads the canonical 229-rule pack from YAML", () => {
    const summary = summarizeRulePack(JOBSMITH_RULE_PACK_V1, new Date("2026-05-19T00:00:00.000Z"));

    expect(summary.version).toBe(1);
    expect(summary.totalRules).toBe(229);
    expect(summary.categories).toContain("ATS");
    expect(summary.categories).toContain("VOICE");
    expect(summary.bySeverity.ERROR).toBeGreaterThan(0);
    expect(summary.byCheckType.regex).toBeGreaterThan(0);
    expect(summary.byCheckType.keyword_list).toBeGreaterThan(0);
  });

  it("rejects stale or mismatched rule-pack counts", () => {
    expect(() =>
      loadRulePackFromYaml(`
version: 1
generated_at: 2026-05-18
total_rules: 2
categories: [VOICE]
sources: [test]
rules: []
`),
    ).toThrow(/expected 2 rules but loaded 0/);
  });

  it("runs safe text checks without claiming the whole pack is automated", () => {
    const result = runJobsmithChecks(
      "I leveraged a vibrant tapestry of ideas — and used a rockstar Objective.",
      JOBSMITH_RULE_PACK_V1,
      new Date("2026-05-19T00:00:00.000Z"),
    );

    expect(result.version).toBe(1);
    expect(result.totalRules).toBe(229);
    expect(result.findings.length).toBeGreaterThan(0);
    expect(result.reviewNeeded.length).toBeGreaterThan(0);
    expect(result.bySeverity.ERROR).toBeGreaterThan(0);
    expect(result.blocked).toBe(true);
    expect(result.findings.some((finding) => finding.match === "—")).toBe(true);
    expect(result.findings.some((finding) => finding.match.toLowerCase() === "vibrant")).toBe(true);
  });

  it("does not flag JS-ATS-03 allowlist headings as banned keywords", () => {
    const result = runJobsmithChecks(
      `
Profile
Summary
Experience
Built proof-backed UnClick workflows.

Education
University Degree Equivalent

Skills
Automation, product strategy, AI operations
`,
      JOBSMITH_RULE_PACK_V1,
      new Date("2026-05-19T00:00:00.000Z"),
    );

    expect(result.findings.filter((finding) => finding.ruleId === "JS-ATS-03")).toEqual([]);
    expect(result.reviewNeeded.some((rule) => rule.ruleId === "JS-ATS-03")).toBe(true);
  });

  it("uses rule decay windows to surface needs-refresh badges", () => {
    const volatileRule = JOBSMITH_RULE_PACK_V1.rules.find((rule) => rule.decay_period_days === 90);
    expect(volatileRule).toBeTruthy();

    expect(ruleNeedsRefresh(volatileRule!, new Date("2026-05-19T00:00:00.000Z"))).toBe(false);
    expect(ruleNeedsRefresh(volatileRule!, new Date("2026-10-01T00:00:00.000Z"))).toBe(true);
  });
});
