import { describe, expect, it } from "vitest";
import {
  buildSkillLibrarySummary,
  filterSkills,
  isRecommendedMode,
  parseSkillMarkdown,
  skillCategoryLabel,
  sortSkillsForLibrary,
} from "./skillLibrary";
import { STARTER_SKILLS } from "./skillLibrarySeeds";

describe("skillLibrary", () => {
  it("parses Agent Skills-compatible frontmatter and keeps capability grants separate", () => {
    const parsed = parseSkillMarkdown(`---
name: Browser QA tester
slug: browser-qa-tester
version: 1.0.0
description: Runs a browser QA pass after a UI change.
category: browser-automation
tags: [browser, qa]
safety_level: cautious
source_kind: rewritten
source_url: https://github.com/example/agent-skills
source_license: MIT
reuse: Original UnClick rewrite of a permissive browser testing pattern.
unclick_usefulness: 5
unclick_native: hybrid
required_worker_roles: [Tester]
required_mcp_tools: [browser.open, browser.screenshot]
required_apps: []
---

# Browser QA tester

Open the target page, verify the primary workflow, and report screenshot proof.
`);

    expect(parsed.slug).toBe("browser-qa-tester");
    expect(parsed.reviewState).toBe("reviewed");
    expect(parsed.installState).toBe("Use as a skill, with native UnClick rails underneath.");
    expect(parsed.requiredMcpTools).toEqual(["browser.open", "browser.screenshot"]);
    expect(parsed.contentHash).toMatch(/^skill-fnv1a-/);
  });

  it("blocks invalid hardwired restricted skills", () => {
    const parsed = parseSkillMarkdown(`---
name: Unsafe Rail
slug: unsafe-rail
version: 1.0.0
description: Bad rail.
category: safety
safety_level: restricted
source_kind: original
unclick_native: hardwired
---

# Unsafe Rail

Do risky things.
`);

    expect(parsed.reviewState).toBe("blocked");
    expect(parsed.validationIssues.map((issue) => issue.code)).toContain("restricted_hardwire");
  });

  it("ships a validated top-20 starter pack with native rails separated from optional skills", () => {
    expect(STARTER_SKILLS).toHaveLength(20);
    expect(STARTER_SKILLS.every((skill) => skill.validationIssues.every((issue) => issue.severity !== "error"))).toBe(true);

    const summary = buildSkillLibrarySummary(STARTER_SKILLS);
    expect(summary.hardwired).toBeGreaterThanOrEqual(6);
    expect(summary.hybrid).toBeGreaterThanOrEqual(4);
    expect(summary.categories).toEqual(expect.arrayContaining(["agent-orchestration", "testing-qa", "code-review"]));
  });

  it("searches across names, tags, tools, roles, and bodies", () => {
    const results = filterSkills(STARTER_SKILLS, "failed ci");
    expect(results.map((skill) => skill.slug)).toContain("fix-failing-ci");
  });

  it("sorts high-value hardwired and hybrid skills first", () => {
    const sorted = sortSkillsForLibrary(STARTER_SKILLS);
    expect(sorted[0].unclickUsefulness).toBe(5);
    expect(["hardwired", "hybrid"]).toContain(sorted[0].nativeMode);
  });

  it("derives the recommended (leave-on) group from the native rails", () => {
    expect(isRecommendedMode("hardwired")).toBe(true);
    expect(isRecommendedMode("hybrid")).toBe(false);
    expect(isRecommendedMode("skill")).toBe(false);

    const summary = buildSkillLibrarySummary(STARTER_SKILLS);
    expect(summary.recommended).toBe(summary.hardwired);
    expect(summary.recommended + summary.optional).toBe(summary.total);

    const router = STARTER_SKILLS.find((skill) => skill.slug === "coordinator-router");
    expect(router?.recommended).toBe(true);
  });

  it("humanises category slugs and filters by category", () => {
    expect(skillCategoryLabel("agent-orchestration")).toBe("Agent orchestration");
    expect(skillCategoryLabel("github-pr")).toBe("GitHub PR");
    expect(skillCategoryLabel("brand-new-area")).toBe("Brand new area");

    const research = filterSkills(STARTER_SKILLS, "", "research");
    expect(research.length).toBeGreaterThan(0);
    expect(research.every((skill) => skill.category === "research")).toBe(true);
  });
});
