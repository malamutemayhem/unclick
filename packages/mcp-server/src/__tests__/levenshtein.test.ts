import { describe, it, expect } from "vitest";
import { distance, similarity, closestMatch, fuzzySearch } from "../levenshtein.js";

describe("distance", () => {
  it("returns 0 for identical strings", () => {
    expect(distance("hello", "hello")).toBe(0);
  });

  it("counts insertions", () => {
    expect(distance("cat", "cats")).toBe(1);
  });

  it("counts deletions", () => {
    expect(distance("cats", "cat")).toBe(1);
  });

  it("counts substitutions", () => {
    expect(distance("cat", "bat")).toBe(1);
  });

  it("handles empty strings", () => {
    expect(distance("", "hello")).toBe(5);
    expect(distance("hello", "")).toBe(5);
    expect(distance("", "")).toBe(0);
  });

  it("computes multi-edit distance", () => {
    expect(distance("kitten", "sitting")).toBe(3);
  });
});

describe("similarity", () => {
  it("returns 1 for identical strings", () => {
    expect(similarity("hello", "hello")).toBe(1);
  });

  it("returns 0 for completely different equal-length strings", () => {
    expect(similarity("abc", "xyz")).toBe(0);
  });

  it("returns value between 0 and 1", () => {
    const s = similarity("hello", "hallo");
    expect(s).toBeGreaterThan(0);
    expect(s).toBeLessThan(1);
  });

  it("handles empty strings", () => {
    expect(similarity("", "")).toBe(1);
  });
});

describe("closestMatch", () => {
  it("finds closest string", () => {
    const result = closestMatch("helo", ["hello", "world", "help"]);
    expect(result?.match).toBe("hello");
    expect(result?.distance).toBe(1);
  });

  it("returns undefined for empty list", () => {
    expect(closestMatch("test", [])).toBeUndefined();
  });
});

describe("fuzzySearch", () => {
  it("finds matches within distance", () => {
    const results = fuzzySearch("helo", ["hello", "world", "help", "hero"], 2);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].item).toBe("hello");
  });

  it("returns sorted by distance", () => {
    const results = fuzzySearch("cat", ["bat", "car", "cats", "dog"], 2);
    for (let i = 1; i < results.length; i++) {
      expect(results[i].distance).toBeGreaterThanOrEqual(results[i - 1].distance);
    }
  });

  it("returns empty for no matches", () => {
    expect(fuzzySearch("xyz", ["hello", "world"], 1)).toEqual([]);
  });
});
