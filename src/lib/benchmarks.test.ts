import { describe, it, expect } from "vitest";
import {
  computeOverall,
  contestantParts,
  engineLifts,
  averageLift,
  formatLift,
  round2,
  type BenchmarkRun,
  type SuiteCategory,
} from "./benchmarks";

const CATEGORIES: SuiteCategory[] = [
  { key: "coding", label: "Coding", weight: 20 },
  { key: "reasoning", label: "Reasoning", weight: 15 },
  { key: "knowledge", label: "Knowledge", weight: 15 },
  { key: "tool_use", label: "Tool use", weight: 25, unclick_strength: true },
  { key: "memory", label: "Memory", weight: 25, unclick_strength: true },
];

describe("contestantParts", () => {
  it("derives engine and unclick flag from the contestant key", () => {
    expect(contestantParts("codex_raw")).toEqual({ engine: "codex", usesUnclick: false });
    expect(contestantParts("claude_unclick")).toEqual({ engine: "claude", usesUnclick: true });
  });
});

describe("computeOverall", () => {
  it("returns 100 when every category is perfect", () => {
    const scores = Object.fromEntries(
      CATEGORIES.map((c) => [c.key, { score: 100, max: 100 }]),
    );
    expect(computeOverall(scores, CATEGORIES)).toBe(100);
  });

  it("returns 0 when nothing is passed", () => {
    const scores = Object.fromEntries(CATEGORIES.map((c) => [c.key, { score: 0, max: 100 }]));
    expect(computeOverall(scores, CATEGORIES)).toBe(0);
  });

  it("weights tool_use and memory heavily (UnClick strengths)", () => {
    // Perfect on the two heavy categories only (50 of 100 weight).
    const scores = {
      coding: { score: 0, max: 100 },
      reasoning: { score: 0, max: 100 },
      knowledge: { score: 0, max: 100 },
      tool_use: { score: 100, max: 100 },
      memory: { score: 100, max: 100 },
    };
    expect(computeOverall(scores, CATEGORIES)).toBe(50);
  });

  it("matches the hand-computed seed sample for claude_raw", () => {
    const scores = {
      coding: { score: 80, max: 100 },
      reasoning: { score: 78, max: 100 },
      knowledge: { score: 70, max: 100 },
      tool_use: { score: 20, max: 100 },
      memory: { score: 15, max: 100 },
    };
    expect(computeOverall(scores, CATEGORIES)).toBe(46.95);
  });

  it("ignores categories with no max and never exceeds 100", () => {
    const scores = {
      coding: { score: 999, max: 100 }, // over-perfect is clamped
      tool_use: { score: 50, max: 0 }, // zero max is skipped
    };
    const overall = computeOverall(scores, CATEGORIES);
    expect(overall).toBeLessThanOrEqual(100);
    expect(overall).toBeGreaterThan(0);
  });

  it("normalises onto 0-100 even when weights do not sum to 100", () => {
    const cats: SuiteCategory[] = [
      { key: "a", label: "A", weight: 1 },
      { key: "b", label: "B", weight: 1 },
    ];
    const scores = { a: { score: 100, max: 100 }, b: { score: 0, max: 100 } };
    expect(computeOverall(scores, cats)).toBe(50);
  });
});

function makeRun(overrides: Partial<Record<string, number>> = {}): BenchmarkRun {
  const s = {
    claude_raw: 47,
    claude_unclick: 83,
    codex_raw: 45,
    codex_unclick: 80,
    ...overrides,
  };
  return {
    id: "run-1",
    suite_id: "suite-1",
    run_label: "test",
    run_date: "2026-05-29",
    status: "complete",
    source: "manual",
    notes: "",
    results: [
      { contestant: "claude_raw", engine: "claude", uses_unclick: false, overall_score: s.claude_raw!, tasks_total: 100, tasks_passed: 47, category_scores: {} },
      { contestant: "claude_unclick", engine: "claude", uses_unclick: true, overall_score: s.claude_unclick!, tasks_total: 100, tasks_passed: 83, category_scores: {} },
      { contestant: "codex_raw", engine: "codex", uses_unclick: false, overall_score: s.codex_raw!, tasks_total: 100, tasks_passed: 45, category_scores: {} },
      { contestant: "codex_unclick", engine: "codex", uses_unclick: true, overall_score: s.codex_unclick!, tasks_total: 100, tasks_passed: 80, category_scores: {} },
    ],
  };
}

describe("engineLifts / averageLift", () => {
  it("computes the per-engine UnClick lift", () => {
    const lifts = engineLifts(makeRun());
    const claude = lifts.find((l) => l.engine === "claude")!;
    const codex = lifts.find((l) => l.engine === "codex")!;
    expect(claude.lift).toBe(36);
    expect(codex.lift).toBe(35);
  });

  it("averages the lift across engines", () => {
    expect(averageLift(makeRun())).toBe(35.5);
  });

  it("returns null lift when a side is missing", () => {
    const run = makeRun();
    run.results = run.results.filter((r) => r.contestant !== "claude_unclick");
    const claude = engineLifts(run).find((l) => l.engine === "claude")!;
    expect(claude.lift).toBeNull();
  });
});

describe("formatLift", () => {
  it("adds an explicit plus sign for gains", () => {
    expect(formatLift(14)).toBe("+14");
    expect(formatLift(-3)).toBe("-3");
    expect(formatLift(null)).toBe("n/a");
  });
});

describe("round2", () => {
  it("rounds to two decimals", () => {
    expect(round2(46.954)).toBe(46.95);
  });
});
