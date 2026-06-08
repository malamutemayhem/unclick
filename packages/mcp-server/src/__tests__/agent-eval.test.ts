import { describe, it, expect } from "vitest";
import { runEval, summarize, filterByTag, exactMatch, containsMatch, numericCloseness, EvalCase } from "../agent-eval.js";

describe("scorers", () => {
  it("exactMatch scores 1 for equal", () => {
    expect(exactMatch("hello", "hello")).toBe(1);
    expect(exactMatch({ a: 1 }, { a: 1 })).toBe(1);
  });

  it("exactMatch scores 0 for different", () => {
    expect(exactMatch("hello", "world")).toBe(0);
  });

  it("containsMatch finds substring", () => {
    expect(containsMatch("paris", "The capital is Paris, France")).toBe(1);
    expect(containsMatch("tokyo", "The capital is Paris")).toBe(0);
  });

  it("numericCloseness within tolerance", () => {
    expect(numericCloseness(10, 10.005, 0.01)).toBe(1);
    expect(numericCloseness(10, 15, 0.01)).toBeLessThan(1);
    expect(numericCloseness(10, 15, 0.01)).toBeGreaterThanOrEqual(0);
  });
});

describe("runEval", () => {
  it("runs cases and scores them", async () => {
    const cases: EvalCase<number, number>[] = [
      { name: "double 2", input: 2, expected: 4 },
      { name: "double 3", input: 3, expected: 6 },
      { name: "double 5", input: 5, expected: 10 },
    ];
    const results = await runEval(cases, (n) => n * 2);
    expect(results.length).toBe(3);
    expect(results.every((r) => r.passed)).toBe(true);
    expect(results.every((r) => r.score === 1)).toBe(true);
  });

  it("catches failures", async () => {
    const cases: EvalCase<number, number>[] = [
      { name: "wrong", input: 2, expected: 5 },
    ];
    const results = await runEval(cases, (n) => n * 2);
    expect(results[0].passed).toBe(false);
    expect(results[0].score).toBe(0);
  });

  it("catches errors", async () => {
    const cases: EvalCase<string, string>[] = [
      { name: "boom", input: "x", expected: "y" },
    ];
    const results = await runEval(cases, () => { throw new Error("fail"); });
    expect(results[0].passed).toBe(false);
    expect(results[0].error).toBe("fail");
  });

  it("filters by tags", async () => {
    const cases: EvalCase<number, number>[] = [
      { name: "a", input: 1, expected: 2, tags: ["fast"] },
      { name: "b", input: 2, expected: 4, tags: ["slow"] },
      { name: "c", input: 3, expected: 6, tags: ["fast"] },
    ];
    const results = await runEval(cases, (n) => n * 2, exactMatch, { tags: ["fast"] });
    expect(results.length).toBe(2);
  });

  it("works with async functions", async () => {
    const cases: EvalCase<number, number>[] = [
      { name: "async", input: 5, expected: 25 },
    ];
    const results = await runEval(cases, async (n) => n * n);
    expect(results[0].passed).toBe(true);
  });
});

describe("summarize", () => {
  it("summarizes results", async () => {
    const cases: EvalCase<number, number>[] = [
      { name: "pass1", input: 2, expected: 4 },
      { name: "pass2", input: 3, expected: 6 },
      { name: "fail", input: 4, expected: 0 },
    ];
    const results = await runEval(cases, (n) => n * 2);
    const summary = summarize(results);
    expect(summary.total).toBe(3);
    expect(summary.passed).toBe(2);
    expect(summary.failed).toBe(1);
    expect(summary.passRate).toBeCloseTo(2 / 3);
  });

  it("handles empty results", () => {
    const summary = summarize([]);
    expect(summary.total).toBe(0);
    expect(summary.passRate).toBe(0);
  });
});

describe("filterByTag", () => {
  it("filters results by tag", async () => {
    const cases: EvalCase<number, number>[] = [
      { name: "a", input: 1, expected: 2, tags: ["math"] },
      { name: "b", input: 2, expected: 4, tags: ["logic"] },
    ];
    const results = await runEval(cases, (n) => n * 2);
    const mathOnly = filterByTag(results, "math");
    expect(mathOnly.length).toBe(1);
    expect(mathOnly[0].case.name).toBe("a");
  });
});
