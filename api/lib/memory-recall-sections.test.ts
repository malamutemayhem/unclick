import { describe, expect, it } from "vitest";

import { buildRecallFactSections } from "./memory-recall-sections";

function fact(
  id: string,
  overrides: Partial<{
    fact: string;
    category: string;
    access_count: number;
    decay_tier: string;
  }> = {},
) {
  return {
    id,
    fact: overrides.fact ?? `fact ${id}`,
    category: overrides.category ?? "technical",
    access_count: overrides.access_count ?? 1,
    decay_tier: overrides.decay_tier ?? "hot",
  };
}

describe("memory recall sections", () => {
  it("uses a broader candidate pool for Top of Mind than raw Most Accessed", () => {
    const rawMostAccessed = Array.from({ length: 10 }, (_, index) =>
      fact(`static-${index + 1}`, {
        fact: `Chris profile preference ${index + 1}`,
        category: "preference",
        access_count: 2080 - index,
      }),
    );
    const activeProjectFact = fact("active-project", {
      fact: "PR #997 made FidelityCopy receipts green",
      category: "technical",
      access_count: 42,
    });

    const sections = buildRecallFactSections(rawMostAccessed, [...rawMostAccessed, activeProjectFact]);

    expect(sections.top_facts).toHaveLength(10);
    expect(sections.top_facts.every((row) => row.recall_signal === "background-heavy")).toBe(true);
    expect(sections.top_of_mind_facts.map((row) => row.id)).toContain("active-project");
    expect(sections.top_of_mind_facts.map((row) => row.id)).not.toContain("static-1");
    expect(sections.recall_diagnostics).toMatchObject({
      inspected_top_facts: 10,
      inspected_top_of_mind_candidates: 11,
      background_heavy_count: 10,
      background_heavy_candidate_count: 10,
    });
  });
});
