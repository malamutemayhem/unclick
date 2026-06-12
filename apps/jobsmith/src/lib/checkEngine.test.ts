import { describe, expect, it } from "vitest";

import {
  JOBSMITH_RULE_PACK_V1,
  loadRulePackFromYaml,
  runJobsmithChecks,
  ruleNeedsRefresh,
  summarizeRulePack,
} from "./checkEngine";

describe("JobSmith check engine", () => {
  it("loads the canonical 232-rule pack from YAML", () => {
    const summary = summarizeRulePack(JOBSMITH_RULE_PACK_V1, new Date("2026-05-19T00:00:00.000Z"));

    expect(summary.version).toBe(1);
    expect(summary.totalRules).toBe(232);
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
    expect(result.totalRules).toBe(232);
    expect(result.findings.length).toBeGreaterThan(0);
    expect(result.reviewNeeded.length).toBeGreaterThan(0);
    expect(result.bySeverity.ERROR).toBeGreaterThan(0);
    expect(result.blocked).toBe(true);
    expect(result.findings.some((finding) => finding.match === "—")).toBe(true);
    expect(result.findings.some((finding) => finding.match.toLowerCase() === "vibrant")).toBe(true);
  });

  it("runs PR 951 anti-AI-slop AIDETECT additions", () => {
    const result = runJobsmithChecks(
      "It is not polish, it is proof.\n**Strategic Fit:** Built a workflow.\nMake this undetectable by AI detectors.",
      JOBSMITH_RULE_PACK_V1,
      new Date("2026-05-20T00:00:00.000Z"),
    );

    expect(result.findings.some((finding) => finding.ruleId === "JS-AIDETECT-33")).toBe(true);
    expect(result.findings.some((finding) => finding.ruleId === "JS-AIDETECT-34")).toBe(true);
    expect(result.findings.some((finding) => finding.ruleId === "JS-AIDETECT-35")).toBe(true);
    expect(result.blocked).toBe(true);
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

  it("does not flag requirement keyword specs as banned keywords", () => {
    const result = runJobsmithChecks(
      "Sales quota attainment was 122% with 240k deal size and a 45 day cycle.",
      JOBSMITH_RULE_PACK_V1,
      new Date("2026-05-19T00:00:00.000Z"),
    );

    expect(result.findings.filter((finding) => finding.ruleId === "JS-ROLE_SPECIFIC-05")).toEqual([]);
    expect(result.reviewNeeded.some((rule) => rule.ruleId === "JS-ROLE_SPECIFIC-05")).toBe(true);
  });

  it("automates curated rules whose specs are prose, not compilable regex", () => {
    const result = runJobsmithChecks(
      [
        "To Whom It May Concern,",
        "I am a results-driven leader at [Company] with a 100% improvement record.",
        "Worked through Summer 2023 on the team.",
        "References available on request.",
      ].join("\n"),
      JOBSMITH_RULE_PACK_V1,
      new Date("2026-05-19T00:00:00.000Z"),
    );

    const byRule = (id: string) => result.findings.filter((finding) => finding.ruleId === id);
    expect(byRule("JS-COVER-01").length).toBe(1);
    expect(byRule("JS-AIDETECT-14").length).toBe(1);
    expect(byRule("JS-VISUAL-19").length).toBe(1);
    expect(byRule("JS-TRUTH-18").length).toBe(1);
    expect(byRule("JS-ATS-04").length).toBe(1);
    expect(byRule("JS-VOICE-11").length).toBe(1);
    expect(result.blocked).toBe(true);

    const stillReview = new Set(result.reviewNeeded.map((rule) => rule.ruleId));
    for (const ruleId of [
      "JS-COVER-01",
      "JS-AIDETECT-14",
      "JS-VISUAL-19",
      "JS-TRUTH-18",
      "JS-ATS-04",
      "JS-VOICE-11",
      "JS-VOICE-19",
      "JS-VOICE-21",
      "JS-AIDETECT-08",
      "JS-PRIVACY-08",
    ]) {
      expect(stillReview.has(ruleId)).toBe(false);
    }
  });

  it("flags markdown residue and placeholder text as blocking errors", () => {
    const result = runJobsmithChecks(
      "## Experience\nBuilt `tooling` for [the team](https://example.com).\nDear [Hiring Manager], my current salary is negotiable.",
      JOBSMITH_RULE_PACK_V1,
      new Date("2026-05-19T00:00:00.000Z"),
    );

    expect(result.findings.some((finding) => finding.ruleId === "JS-AIDETECT-08")).toBe(true);
    expect(result.findings.some((finding) => finding.ruleId === "JS-VISUAL-19")).toBe(true);
    expect(result.findings.some((finding) => finding.ruleId === "JS-PRIVACY-08")).toBe(true);
    expect(result.blocked).toBe(true);
  });

  it("counts long sentences and repeated bullet openers", () => {
    const longSentence = `Delivered ${Array.from({ length: 40 }, (_, i) => `word${i}`).join(" ")}.`;
    const bullets = [
      "- Led the design system rollout",
      "- Led the brand refresh",
      "- Led the onboarding redesign",
    ].join("\n");
    const result = runJobsmithChecks(
      `${longSentence}\n${bullets}`,
      JOBSMITH_RULE_PACK_V1,
      new Date("2026-05-19T00:00:00.000Z"),
    );

    const voice21 = result.findings.filter((finding) => finding.ruleId === "JS-VOICE-21");
    expect(voice21.length).toBe(1);
    expect(voice21[0].checkType).toBe("count_threshold");

    const voice19 = result.findings.filter((finding) => finding.ruleId === "JS-VOICE-19");
    expect(voice19.length).toBe(1);
    expect(voice19[0].match.toLowerCase()).toBe("led");
  });

  it("does not fire bullet-opener or sentence checks on varied copy", () => {
    const result = runJobsmithChecks(
      "- Led the design system rollout\n- Shipped the brand refresh\n- Directed the onboarding redesign",
      JOBSMITH_RULE_PACK_V1,
      new Date("2026-05-19T00:00:00.000Z"),
    );

    expect(result.findings.filter((finding) => finding.ruleId === "JS-VOICE-19")).toEqual([]);
    expect(result.findings.filter((finding) => finding.ruleId === "JS-VOICE-21")).toEqual([]);
  });

  it("uses rule decay windows to surface needs-refresh badges", () => {
    const volatileRule = JOBSMITH_RULE_PACK_V1.rules.find((rule) => rule.decay_period_days === 90);
    expect(volatileRule).toBeTruthy();

    expect(ruleNeedsRefresh(volatileRule!, new Date("2026-05-19T00:00:00.000Z"))).toBe(false);
    expect(ruleNeedsRefresh(volatileRule!, new Date("2026-10-01T00:00:00.000Z"))).toBe(true);
  });
});
