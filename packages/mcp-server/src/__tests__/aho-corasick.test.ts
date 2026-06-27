import { describe, it, expect } from "vitest";
import { AhoCorasick } from "../aho-corasick.js";

describe("AhoCorasick", () => {
  it("finds single pattern", () => {
    const ac = new AhoCorasick();
    ac.addPattern("he");
    const matches = ac.search("she he her");
    expect(matches.some((m) => m.pattern === "he")).toBe(true);
  });

  it("finds multiple patterns", () => {
    const ac = new AhoCorasick();
    ac.addPatterns(["he", "she", "his", "hers"]);
    const matches = ac.search("ahishers");
    const patterns = matches.map((m) => m.pattern);
    expect(patterns).toContain("his");
    expect(patterns).toContain("she");
    expect(patterns).toContain("he");
    expect(patterns).toContain("hers");
  });

  it("reports correct positions", () => {
    const ac = new AhoCorasick();
    ac.addPattern("abc");
    const matches = ac.search("xabcyabc");
    expect(matches).toEqual([
      { pattern: "abc", position: 1 },
      { pattern: "abc", position: 5 },
    ]);
  });

  it("finds overlapping matches", () => {
    const ac = new AhoCorasick();
    ac.addPatterns(["ab", "bc"]);
    const matches = ac.search("abc");
    expect(matches).toHaveLength(2);
  });

  it("returns empty for no matches", () => {
    const ac = new AhoCorasick();
    ac.addPattern("xyz");
    expect(ac.search("abc")).toEqual([]);
  });

  it("hasMatch returns true when found", () => {
    const ac = new AhoCorasick();
    ac.addPattern("needle");
    expect(ac.hasMatch("haystackneedlehaystack")).toBe(true);
  });

  it("hasMatch returns false when not found", () => {
    const ac = new AhoCorasick();
    ac.addPattern("needle");
    expect(ac.hasMatch("haystack")).toBe(false);
  });

  it("auto-builds on search", () => {
    const ac = new AhoCorasick();
    ac.addPattern("test");
    const matches = ac.search("test");
    expect(matches).toHaveLength(1);
  });

  it("handles empty text", () => {
    const ac = new AhoCorasick();
    ac.addPattern("a");
    expect(ac.search("")).toEqual([]);
  });

  it("handles single character patterns", () => {
    const ac = new AhoCorasick();
    ac.addPatterns(["a", "b"]);
    const matches = ac.search("abba");
    expect(matches).toHaveLength(4);
  });
});
