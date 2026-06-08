import { describe, it, expect } from "vitest";
import { BoyerMoore } from "../boyer-moore.js";

describe("BoyerMoore", () => {
  it("search finds all occurrences", () => {
    const bm = new BoyerMoore("abc");
    expect(bm.search("abcxyzabc")).toEqual([0, 6]);
  });

  it("search returns empty for no match", () => {
    const bm = new BoyerMoore("xyz");
    expect(bm.search("abcdef")).toEqual([]);
  });

  it("firstMatch returns first index", () => {
    const bm = new BoyerMoore("cd");
    expect(bm.firstMatch("abcdef")).toBe(2);
  });

  it("firstMatch returns -1 for no match", () => {
    const bm = new BoyerMoore("xyz");
    expect(bm.firstMatch("abc")).toBe(-1);
  });

  it("count returns number of occurrences", () => {
    const bm = new BoyerMoore("ab");
    expect(bm.count("ababab")).toBe(3);
  });

  it("static findAll works", () => {
    expect(BoyerMoore.findAll("hello world hello", "hello")).toEqual([0, 12]);
  });

  it("static contains checks presence", () => {
    expect(BoyerMoore.contains("hello world", "world")).toBe(true);
    expect(BoyerMoore.contains("hello world", "xyz")).toBe(false);
  });

  it("handles single character pattern", () => {
    const bm = new BoyerMoore("a");
    expect(bm.search("banana")).toEqual([1, 3, 5]);
  });

  it("handles pattern longer than text", () => {
    const bm = new BoyerMoore("longpattern");
    expect(bm.search("short")).toEqual([]);
  });
});
