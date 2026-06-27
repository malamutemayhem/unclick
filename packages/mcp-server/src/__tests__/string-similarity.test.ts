import { describe, it, expect } from "vitest";
import { levenshtein, damerauLevenshtein, jaroWinkler, dice, similarity, closestMatch } from "../string-similarity.js";

describe("levenshtein", () => {
  it("identical strings have distance 0", () => {
    expect(levenshtein("hello", "hello")).toBe(0);
  });

  it("empty to string is string length", () => {
    expect(levenshtein("", "abc")).toBe(3);
    expect(levenshtein("abc", "")).toBe(3);
  });

  it("single edit distances", () => {
    expect(levenshtein("cat", "hat")).toBe(1);
    expect(levenshtein("cat", "cats")).toBe(1);
    expect(levenshtein("cats", "cat")).toBe(1);
  });

  it("multiple edits", () => {
    expect(levenshtein("kitten", "sitting")).toBe(3);
  });
});

describe("damerauLevenshtein", () => {
  it("transposition costs 1", () => {
    expect(damerauLevenshtein("ab", "ba")).toBe(1);
  });

  it("same as levenshtein for non-transpositions", () => {
    expect(damerauLevenshtein("cat", "hat")).toBe(1);
  });
});

describe("jaroWinkler", () => {
  it("identical strings score 1", () => {
    expect(jaroWinkler("hello", "hello")).toBe(1);
  });

  it("completely different strings score low", () => {
    expect(jaroWinkler("abc", "xyz")).toBeLessThan(0.5);
  });

  it("similar strings score high", () => {
    expect(jaroWinkler("martha", "marhta")).toBeGreaterThan(0.9);
  });

  it("empty strings score 0", () => {
    expect(jaroWinkler("", "test")).toBe(0);
    expect(jaroWinkler("test", "")).toBe(0);
  });
});

describe("dice", () => {
  it("identical strings score 1", () => {
    expect(dice("night", "night")).toBe(1);
  });

  it("similar strings score high", () => {
    expect(dice("night", "nacht")).toBeGreaterThan(0.2);
  });

  it("single char strings score 0", () => {
    expect(dice("a", "b")).toBe(0);
  });
});

describe("similarity", () => {
  it("identical is 1", () => {
    expect(similarity("abc", "abc")).toBe(1);
  });

  it("completely different approaches 0", () => {
    expect(similarity("abc", "xyz")).toBeLessThan(0.5);
  });
});

describe("closestMatch", () => {
  it("finds closest candidate", () => {
    expect(closestMatch("helo", ["hello", "world", "help"])).toBe("hello");
  });

  it("empty candidates returns undefined", () => {
    expect(closestMatch("test", [])).toBeUndefined();
  });
});
