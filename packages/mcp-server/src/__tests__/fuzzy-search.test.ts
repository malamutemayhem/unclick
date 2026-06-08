import { describe, it, expect } from "vitest";
import { fuzzyMatch, fuzzySearch, bestMatch, levenshtein } from "../fuzzy-search.js";

describe("fuzzyMatch", () => {
  it("matches subsequences", () => {
    expect(fuzzyMatch("fb", "foobar").match).toBe(true);
    expect(fuzzyMatch("fzb", "foobar").match).toBe(false);
  });

  it("scores consecutive matches higher", () => {
    const exact = fuzzyMatch("foo", "foobar");
    const scattered = fuzzyMatch("for", "foobar");
    expect(exact.score).toBeGreaterThan(scattered.score);
  });

  it("scores word boundary matches higher", () => {
    const boundary = fuzzyMatch("st", "send_text");
    const middle = fuzzyMatch("st", "fastest");
    expect(boundary.score).toBeGreaterThan(middle.score);
  });

  it("empty query matches everything", () => {
    expect(fuzzyMatch("", "anything").match).toBe(true);
  });
});

describe("fuzzySearch", () => {
  it("returns sorted results", () => {
    const items = ["sendEmail", "searchEmoji", "setEmoji", "deleteEntry"];
    const results = fuzzySearch("se", items, (x) => x);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].score).toBeGreaterThanOrEqual(results[results.length - 1].score);
  });
});

describe("bestMatch", () => {
  it("returns the best matching item", () => {
    const items = ["apple", "application", "banana"];
    expect(bestMatch("app", items, (x) => x)).toBe("apple");
  });

  it("returns undefined when nothing matches", () => {
    expect(bestMatch("xyz", ["abc"], (x) => x)).toBeUndefined();
  });
});

describe("levenshtein", () => {
  it("returns 0 for identical strings", () => {
    expect(levenshtein("hello", "hello")).toBe(0);
  });

  it("counts edits correctly", () => {
    expect(levenshtein("kitten", "sitting")).toBe(3);
    expect(levenshtein("", "abc")).toBe(3);
    expect(levenshtein("abc", "")).toBe(3);
  });
});
