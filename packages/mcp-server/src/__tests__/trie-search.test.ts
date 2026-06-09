import { describe, it, expect } from "vitest";
import { Trie, createFromWords } from "../trie-search.js";

describe("Trie", () => {
  it("insert and search", () => {
    const t = new Trie();
    t.insert("hello");
    expect(t.search("hello")).toBe(true);
    expect(t.search("hell")).toBe(false);
    expect(t.search("helloo")).toBe(false);
  });

  it("tracks size", () => {
    const t = new Trie();
    t.insert("a");
    t.insert("b");
    t.insert("a");
    expect(t.size).toBe(2);
  });

  it("startsWith", () => {
    const t = new Trie();
    t.insert("hello");
    t.insert("help");
    expect(t.startsWith("hel")).toBe(true);
    expect(t.startsWith("hex")).toBe(false);
  });

  it("delete", () => {
    const t = new Trie();
    t.insert("hello");
    t.insert("help");
    expect(t.delete("hello")).toBe(true);
    expect(t.search("hello")).toBe(false);
    expect(t.search("help")).toBe(true);
    expect(t.size).toBe(1);
  });

  it("delete nonexistent returns false", () => {
    const t = new Trie();
    expect(t.delete("nope")).toBe(false);
  });

  it("autocomplete", () => {
    const t = createFromWords(["cat", "car", "card", "care", "dog"]);
    const results = t.autocomplete("car");
    expect(results).toContain("car");
    expect(results).toContain("card");
    expect(results).toContain("care");
    expect(results).not.toContain("cat");
  });

  it("autocomplete with limit", () => {
    const t = createFromWords(["aa", "ab", "ac", "ad", "ae"]);
    const results = t.autocomplete("a", 3);
    expect(results.length).toBe(3);
  });

  it("countPrefix", () => {
    const t = createFromWords(["cat", "car", "card", "dog"]);
    expect(t.countPrefix("ca")).toBe(3);
    expect(t.countPrefix("dog")).toBe(1);
    expect(t.countPrefix("z")).toBe(0);
  });

  it("longestCommonPrefix", () => {
    const t = createFromWords(["flow", "flower", "flight"]);
    expect(t.longestCommonPrefix()).toBe("fl");
  });

  it("longestCommonPrefix with single word", () => {
    const t = createFromWords(["hello"]);
    expect(t.longestCommonPrefix()).toBe("hello");
  });

  it("allWords returns sorted", () => {
    const t = createFromWords(["banana", "apple", "cherry"]);
    const words = t.allWords();
    expect(words).toEqual(["apple", "banana", "cherry"]);
  });

  it("fuzzySearch finds close matches", () => {
    const t = createFromWords(["hello", "help", "world", "held"]);
    const results = t.fuzzySearch("helo", 1);
    expect(results).toContain("hello");
    expect(results).not.toContain("world");
  });

  it("fuzzySearch with distance 0 is exact match", () => {
    const t = createFromWords(["hello", "help"]);
    expect(t.fuzzySearch("hello", 0)).toEqual(["hello"]);
  });

  it("empty trie", () => {
    const t = new Trie();
    expect(t.search("anything")).toBe(false);
    expect(t.autocomplete("a")).toEqual([]);
    expect(t.size).toBe(0);
  });
});

describe("createFromWords", () => {
  it("builds trie from array", () => {
    const t = createFromWords(["one", "two", "three"]);
    expect(t.size).toBe(3);
    expect(t.search("two")).toBe(true);
  });
});
