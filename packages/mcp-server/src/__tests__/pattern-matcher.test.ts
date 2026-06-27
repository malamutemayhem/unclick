import { describe, it, expect } from "vitest";
import { PatternMatcher, match } from "../pattern-matcher.js";

describe("PatternMatcher", () => {
  it("matches first pattern", () => {
    const m = new PatternMatcher<number, string>()
      .when((v) => v > 100, () => "big")
      .when((v) => v > 10, () => "medium")
      .otherwise(() => "small");
    expect(m.match(200)).toBe("big");
    expect(m.match(50)).toBe("medium");
    expect(m.match(5)).toBe("small");
  });

  it("throws without otherwise", () => {
    const m = new PatternMatcher<number, string>()
      .when((v) => v > 100, () => "big");
    expect(() => m.match(5)).toThrow("No matching");
  });

  it("matchAll returns all matches", () => {
    const m = new PatternMatcher<number, string>()
      .when((v) => v > 0, () => "positive")
      .when((v) => v % 2 === 0, () => "even");
    expect(m.matchAll(4)).toEqual(["positive", "even"]);
    expect(m.matchAll(-2)).toEqual(["even"]);
  });
});

describe("match function", () => {
  it("matches using cases array", () => {
    const result = match(
      42,
      [
        [(v) => v > 100, () => "big"],
        [(v) => v > 10, () => "medium"],
      ],
      () => "small",
    );
    expect(result).toBe("medium");
  });

  it("uses default case", () => {
    const result = match(0, [[(v) => v > 10, () => "big"]], () => "default");
    expect(result).toBe("default");
  });
});
