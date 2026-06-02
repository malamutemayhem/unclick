import { describe, it, expect } from "vitest";
import {
  validateRecordRun,
  computeOverallFromCategories,
  deriveEngineParts,
  CONTESTANTS,
} from "./benchmarks";

const CATS = [
  { key: "coding", weight: 20 },
  { key: "tool_use", weight: 25 },
  { key: "memory", weight: 25 },
  { key: "reasoning", weight: 15 },
  { key: "knowledge", weight: 15 },
];

describe("deriveEngineParts", () => {
  it("splits engine and unclick flag for every contestant", () => {
    expect(deriveEngineParts("codex_raw")).toEqual({ engine: "codex", usesUnclick: false });
    expect(deriveEngineParts("claude_unclick")).toEqual({ engine: "claude", usesUnclick: true });
    expect(CONTESTANTS).toHaveLength(4);
  });
});

describe("computeOverallFromCategories", () => {
  it("returns a 0-100 score", () => {
    const perfect = Object.fromEntries(CATS.map((c) => [c.key, { score: 100, max: 100 }]));
    expect(computeOverallFromCategories(perfect, CATS)).toBe(100);
  });

  it("returns 0 with no weight", () => {
    expect(computeOverallFromCategories({}, [])).toBe(0);
  });
});

describe("validateRecordRun", () => {
  const valid = {
    suite_slug: "unclick-capability-v1",
    run_label: "May baseline",
    results: [
      { contestant: "claude_raw", category_scores: { coding: { score: 80, max: 100 } } },
      { contestant: "claude_unclick", category_scores: { coding: { score: 80, max: 100 } } },
    ],
  };

  it("accepts a well-formed payload", () => {
    const out = validateRecordRun(valid);
    expect(out.ok).toBe(true);
  });

  it("rejects a missing suite_slug", () => {
    const out = validateRecordRun({ ...valid, suite_slug: "" });
    expect(out.ok).toBe(false);
  });

  it("rejects an empty results array", () => {
    const out = validateRecordRun({ ...valid, results: [] });
    expect(out.ok).toBe(false);
  });

  it("rejects an unknown contestant", () => {
    const out = validateRecordRun({
      ...valid,
      results: [{ contestant: "gpt5_raw", category_scores: {} }],
    });
    expect(out.ok).toBe(false);
  });

  it("rejects a duplicate contestant", () => {
    const out = validateRecordRun({
      ...valid,
      results: [
        { contestant: "claude_raw", category_scores: { coding: { score: 1, max: 1 } } },
        { contestant: "claude_raw", category_scores: { coding: { score: 1, max: 1 } } },
      ],
    });
    expect(out.ok).toBe(false);
  });

  it("rejects non-numeric category scores", () => {
    const out = validateRecordRun({
      ...valid,
      results: [{ contestant: "codex_raw", category_scores: { coding: { score: "high", max: 100 } } }],
    });
    expect(out.ok).toBe(false);
  });

  it("rejects a bad source", () => {
    const out = validateRecordRun({ ...valid, source: "magic" });
    expect(out.ok).toBe(false);
  });
});
