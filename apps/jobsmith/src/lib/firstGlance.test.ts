import { describe, expect, test } from "vitest";

import { auditFirstGlance } from "./firstGlance";

const STRONG_CV = `
Jane Smith
Melbourne VIC | jane.smith@example.com | linkedin.com/in/janesmith
Senior Product Designer
Design systems and zero-to-one product across fintech and SaaS; 23% retention lift on the last launch.

Work Experience

Senior Product Designer, Finlode
Jan 2022 - Present
- Led the checkout redesign; 23% retention lift over 7 days vs prior baseline
- Shipped a design system adopted by 4 product teams

Education
University Degree Equivalent

Skills
Design systems, Figma, prototyping, user research
`;

const WEAK_CV = `
Jane Smith

I am a passionate, results-driven team player with a proven track record of working with stakeholders to deliver solutions and I believe my skills and experience make me an ideal candidate for any position that requires dedication and hard work in a fast-paced environment.

Employment

Various roles in several companies performing duties as assigned and supporting projects, helping the team with daily operations and other tasks that were required of me during my time there over many years of service.
`;

const JOB_AD = `
We are hiring a Senior Product Designer to own our design system and checkout
experience. You will work in Figma, run user research, and partner with
product teams to lift retention. Design systems experience is required, and
checkout or payments experience is a plus. Retention focus matters: the
checkout redesign is our top priority. Senior designers here ship.
`;

describe("auditFirstGlance", () => {
  test("a tailored CV with a strong opening lands in the yes pile", () => {
    const report = auditFirstGlance(STRONG_CV, JOB_AD);
    expect(report.verdict).toBe("yes-pile");
    expect(report.score).toBeGreaterThanOrEqual(80);
    expect(report.firstBullet).toMatch(/^Led the checkout redesign/);
    expect(report.matchedJdKeywords.length).toBeGreaterThanOrEqual(4);
  });

  test("a generic wall-of-text CV needs work", () => {
    const report = auditFirstGlance(WEAK_CV);
    expect(report.verdict).toBe("needs-work");
    const failed = report.findings.filter((finding) => !finding.ok);
    expect(failed.some((finding) => finding.zone === "top-third")).toBe(true);
    expect(failed.some((finding) => finding.zone === "first-role")).toBe(true);
  });

  test("keyword zone is only scored when a job ad is supplied", () => {
    const withoutJob = auditFirstGlance(STRONG_CV);
    expect(withoutJob.findings.some((finding) => finding.zone === "keywords")).toBe(false);
    expect(withoutJob.matchedJdKeywords).toEqual([]);

    const withJob = auditFirstGlance(STRONG_CV, JOB_AD);
    expect(withJob.findings.some((finding) => finding.zone === "keywords")).toBe(true);
  });

  test("finds the first bullet of the most recent role, not a skills bullet", () => {
    const report = auditFirstGlance(STRONG_CV, JOB_AD);
    expect(report.firstBullet).toContain("checkout redesign");
  });

  test("flags a duty-shaped first bullet", () => {
    const dutyCv = STRONG_CV.replace(
      "- Led the checkout redesign; 23% retention lift over 7 days vs prior baseline",
      "- Responsible for assisting with various design tasks and supporting the wider team wherever required across many different and unrelated projects and initiatives",
    );
    const report = auditFirstGlance(dutyCv, JOB_AD);
    const firstRole = report.findings.filter((finding) => finding.zone === "first-role");
    expect(firstRole.some((finding) => !finding.ok)).toBe(true);
  });
});
