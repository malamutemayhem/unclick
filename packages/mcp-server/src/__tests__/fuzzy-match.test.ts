import { describe, it, expect } from "vitest";
import { fuzzyMatch, fuzzySearch, fuzzyFilter, highlight } from "../fuzzy-match.js";

describe("fuzzy-match", () => {
  describe("fuzzyMatch", () => {
    it("matches exact", () => {
      const r = fuzzyMatch("hello", "hello");
      expect(r).not.toBeNull();
      expect(r!.matches).toEqual([0, 1, 2, 3, 4]);
    });
    it("matches subsequence", () => {
      const r = fuzzyMatch("hlo", "hello");
      expect(r).not.toBeNull();
      expect(r!.matches).toEqual([0, 2, 4]);
    });
    it("returns null for no match", () => {
      expect(fuzzyMatch("xyz", "hello")).toBeNull();
    });
    it("is case insensitive", () => {
      expect(fuzzyMatch("HE", "hello")).not.toBeNull();
    });
    it("scores higher for start match", () => {
      const a = fuzzyMatch("h", "hello")!;
      const b = fuzzyMatch("l", "hello")!;
      expect(a.score).toBeGreaterThan(b.score);
    });
  });

  describe("fuzzySearch", () => {
    it("searches and sorts by score", () => {
      const results = fuzzySearch("js", ["javascript", "json", "css", "jsx"]);
      expect(results.length).toBe(3);
      expect(results[0].item).toBe("jsx");
    });
    it("limits results", () => {
      const results = fuzzySearch("a", ["apple", "avocado", "banana", "mango"], 2);
      expect(results).toHaveLength(2);
    });
    it("handles no matches", () => {
      expect(fuzzySearch("zzz", ["a", "b"])).toHaveLength(0);
    });
  });

  describe("fuzzyFilter", () => {
    it("filters objects by accessor", () => {
      const items = [{ name: "Alice" }, { name: "Bob" }, { name: "Alex" }];
      const results = fuzzyFilter("al", items, (i) => i.name);
      expect(results).toHaveLength(2);
      expect(results.every((r) => typeof r._fuzzyScore === "number")).toBe(true);
    });
  });

  describe("highlight", () => {
    it("highlights matched chars", () => {
      expect(highlight("hello", [0, 1])).toBe("<b>he</b>llo");
    });
    it("handles gaps", () => {
      expect(highlight("hello", [0, 4])).toBe("<b>h</b>ell<b>o</b>");
    });
    it("custom markers", () => {
      expect(highlight("abc", [1], "[", "]")).toBe("a[b]c");
    });
  });
});
