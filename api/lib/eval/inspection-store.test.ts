import { describe, it, expect } from "vitest";
import {
  frictionKeyFor,
  advanceStreaks,
  proposalToTodoRow,
  type InspectionStreakRow,
} from "./inspection-store.js";
import type { ImprovementJobProposal } from "./session-inspection.js";

describe("frictionKeyFor", () => {
  it("returns null when healthy", () => {
    expect(frictionKeyFor("healthy", false, false)).toBeNull();
  });
  it("prefers fake_green when both fire", () => {
    expect(frictionKeyFor("needs_attention", true, true)).toBe("fake_green");
  });
  it("returns stale when only stale fires", () => {
    expect(frictionKeyFor("watch", false, true)).toBe("stale");
  });
});

describe("advanceStreaks", () => {
  it("bumps the active key and resets others", () => {
    const prior: InspectionStreakRow[] = [
      { friction_key: "fake_green", streak: 2 },
      { friction_key: "stale", streak: 1 },
    ];
    const u = advanceStreaks(prior, "fake_green");
    expect(u.frictionKey).toBe("fake_green");
    expect(u.streak).toBe(3);
    expect(u.toPersist.find((r) => r.friction_key === "fake_green")?.streak).toBe(3);
    expect(u.toPersist.find((r) => r.friction_key === "stale")?.streak).toBe(0);
  });

  it("starts a fresh streak at 1", () => {
    const u = advanceStreaks([], "stale");
    expect(u.streak).toBe(1);
  });

  it("resets everything to zero when healthy (no active key)", () => {
    const prior: InspectionStreakRow[] = [{ friction_key: "fake_green", streak: 5 }];
    const u = advanceStreaks(prior, null);
    expect(u.frictionKey).toBeNull();
    expect(u.streak).toBe(0);
    expect(u.toPersist.every((r) => r.streak === 0)).toBe(true);
  });
});

describe("proposalToTodoRow", () => {
  const proposal: ImprovementJobProposal = {
    lane: "improver",
    priority: "high",
    title: "Recurring proof-quality friction (2 fake-green)",
    rationale: "Friction recurred.",
    evidence: ["truth_rate=0.5", "false_green=2"],
  };

  it("maps a proposal to a valid open todo row", () => {
    const row = proposalToTodoRow(proposal, "hash-1", "inspector-agent");
    expect(row.api_key_hash).toBe("hash-1");
    expect(row.status).toBe("open");
    expect(row.priority).toBe("high");
    expect(row.created_by_agent_id).toBe("inspector-agent");
    expect(row.title).toContain("Recurring proof-quality");
    expect(row.description).toContain("Evidence: truth_rate=0.5");
    expect(row.description).toContain("Gated");
  });
});
