import { describe, it, expect } from "vitest";
import { fuzzyScore, fuzzySearch, highlight } from "../fuzzy-search.js";

describe("fuzzyScore", () => {
  it("exact match gets high score", () => {
    const { score } = fuzzyScore("hello", "hello");
    expect(score).toBeGreaterThan(0);
  });

  it("no match returns 0", () => {
    const { score } = fuzzyScore("xyz", "hello");
    expect(score).toBe(0);
  });

  it("partial match scores less than exact", () => {
    const exact = fuzzyScore("foo", "foo").score;
    const partial = fuzzyScore("fo", "foo").score;
    expect(exact).toBeGreaterThan(partial);
  });

  it("prefix match gets bonus", () => {
    const prefix = fuzzyScore("he", "hello").score;
    const middle = fuzzyScore("ll", "hello").score;
    expect(prefix).toBeGreaterThan(middle);
  });

  it("returns match positions", () => {
    const { matches } = fuzzyScore("ab", "aXbY");
    expect(matches.length).toBeGreaterThan(0);
  });

  it("empty query returns 0", () => {
    expect(fuzzyScore("", "anything").score).toBe(0);
  });

  it("query longer than target returns 0", () => {
    expect(fuzzyScore("longquery", "ab").score).toBe(0);
  });
});

describe("fuzzySearch", () => {
  it("ranks results by score", () => {
    const items = ["apple", "application", "banana", "apply"];
    const results = fuzzySearch("app", items);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].item).toMatch(/app/);
  });

  it("uses accessor function", () => {
    const items = [{ name: "Alice" }, { name: "Bob" }, { name: "Alana" }];
    const results = fuzzySearch("al", items, (i) => i.name);
    expect(results.length).toBe(2);
  });

  it("respects minScore", () => {
    const items = ["abc", "xyz"];
    const results = fuzzySearch("abc", items, undefined, 100);
    expect(results.length).toBeLessThanOrEqual(1);
  });
});

describe("highlight", () => {
  it("wraps matched ranges", () => {
    const result = highlight("hello", [[0, 1]], "<b>", "</b>");
    expect(result).toBe("<b>he</b>llo");
  });

  it("returns unchanged for no matches", () => {
    expect(highlight("hello", [])).toBe("hello");
  });

  it("handles multiple ranges", () => {
    const result = highlight("abcde", [[0, 0], [3, 4]], "[", "]");
    expect(result).toBe("[a]bc[de]");
  });
});
