import { describe, expect, it } from "vitest";

import { buildRecallFactSections } from "./memory-recall-sections";

function fact(
  id: string,
  overrides: Partial<{
    fact: string;
    category: string;
    access_count: number;
    decay_tier: string;
    invalidated_at: string | null;
    source_type: string | null;
    startup_fact_kind: string | null;
    status: string | null;
    valid_from: string | null;
    valid_to: string | null;
  }> = {},
) {
  return {
    id,
    fact: overrides.fact ?? `fact ${id}`,
    category: overrides.category ?? "technical",
    access_count: overrides.access_count ?? 1,
    decay_tier: overrides.decay_tier ?? "hot",
    invalidated_at: overrides.invalidated_at,
    source_type: overrides.source_type,
    startup_fact_kind: overrides.startup_fact_kind,
    status: overrides.status,
    valid_from: overrides.valid_from,
    valid_to: overrides.valid_to,
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
      excluded_ineligible_candidate_count: 0,
      background_heavy_count: 10,
      background_heavy_candidate_count: 10,
    });
  });

  it("keeps invalidated, future, expired, and operational facts out of Top of Mind", () => {
    const visible = fact("visible", {
      fact: "Memory Recall Check should show durable current facts.",
      category: "technical",
      access_count: 88,
    });
    const invalidated = fact("invalidated", {
      fact: "Old invalidated fact",
      invalidated_at: "2026-05-01T00:00:00.000Z",
    });
    const future = fact("future", {
      fact: "Future fact",
      valid_from: "2099-01-01T00:00:00.000Z",
    });
    const expired = fact("expired", {
      fact: "Expired fact",
      valid_to: "2026-05-01T00:00:00.000Z",
    });
    const operational = fact("operational", {
      fact: "heartbeat self-report: no new signals",
      startup_fact_kind: "operational",
    });

    const sections = buildRecallFactSections(
      [visible, invalidated, future, expired, operational],
      [visible, invalidated, future, expired, operational],
    );

    expect(sections.top_of_mind_facts.map((row) => row.id)).toEqual(["visible"]);
    expect(sections.recall_diagnostics).toMatchObject({
      inspected_top_of_mind_candidates: 1,
      excluded_ineligible_candidate_count: 4,
    });
  });
});
