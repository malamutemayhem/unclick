import { describe, it, expect } from "vitest";
import { exactMatch, containsMatch, numericCloseness, levenshteinScore, runEval, summarize } from "../eval-scorer.js";

describe("exactMatch", () => {
  it("returns 1 for equal", () => {
    expect(exactMatch("hello", "hello")).toBe(1);
  });

  it("returns 0 for different", () => {
    expect(exactMatch("hello", "world")).toBe(0);
  });

  it("works with objects", () => {
    expect(exactMatch({ a: 1 }, { a: 1 })).toBe(1);
    expect(exactMatch({ a: 1 }, { a: 2 })).toBe(0);
  });
});

describe("containsMatch", () => {
  it("returns 1 if actual contains expected", () => {
    expect(containsMatch("hello", "say hello world")).toBe(1);
  });

  it("returns 0 if not contained", () => {
    expect(containsMatch("goodbye", "hello world")).toBe(0);
  });
});

describe("numericCloseness", () => {
  it("returns 1 for exact", () => {
    expect(numericCloseness(10, 10)).toBe(1);
  });

  it("returns partial for close", () => {
    const score = numericCloseness(100, 90);
    expect(score).toBeGreaterThan(0.5);
    expect(score).toBeLessThan(1);
  });
});

describe("levenshteinScore", () => {
  it("returns 1 for identical", () => {
    expect(levenshteinScore("abc", "abc")).toBe(1);
  });

  it("returns partial for similar", () => {
    const score = levenshteinScore("kitten", "sitting");
    expect(score).toBeGreaterThan(0.4);
    expect(score).toBeLessThan(1);
  });

  it("returns 0 for completely different", () => {
    expect(levenshteinScore("abc", "xyz")).toBeLessThan(0.5);
  });
});

describe("runEval", () => {
  it("evaluates cases", async () => {
    const cases = [
      { input: 2, expected: 4 },
      { input: 3, expected: 9 },
    ];
    const results = await runEval(cases, (x) => x * x, exactMatch);
    expect(results.length).toBe(2);
    expect(results[0].pass).toBe(true);
    expect(results[0].score).toBe(1);
    expect(results[1].pass).toBe(true);
  });

  it("marks failures", async () => {
    const cases = [{ input: 2, expected: 5 }];
    const results = await runEval(cases, (x) => x * 2, exactMatch);
    expect(results[0].pass).toBe(false);
    expect(results[0].actual).toBe(4);
  });
});

describe("summarize", () => {
  it("produces summary", () => {
    const results = [
      { input: 1, expected: 2, actual: 2, score: 1, pass: true, duration: 10, tags: ["math"] },
      { input: 2, expected: 5, actual: 4, score: 0, pass: false, duration: 20, tags: ["math"] },
    ];
    const summary = summarize(results);
    expect(summary.total).toBe(2);
    expect(summary.passed).toBe(1);
    expect(summary.failed).toBe(1);
    expect(summary.passRate).toBe(0.5);
    expect(summary.byTag.math.passRate).toBe(0.5);
  });
});
