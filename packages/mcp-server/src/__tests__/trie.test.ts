import { describe, it, expect } from "vitest";
import { Trie } from "../trie.js";

describe("Trie", () => {
  it("inserts and searches", () => {
    const t = new Trie<number>();
    t.insert("hello", 1);
    expect(t.search("hello")).toBe(1);
    expect(t.has("hello")).toBe(true);
  });

  it("returns undefined for missing key", () => {
    const t = new Trie();
    expect(t.search("nope")).toBeUndefined();
    expect(t.has("nope")).toBe(false);
  });

  it("does not match prefixes as keys", () => {
    const t = new Trie();
    t.insert("hello");
    expect(t.has("hel")).toBe(false);
  });

  it("startsWith finds completions", () => {
    const t = new Trie();
    t.insert("apple");
    t.insert("app");
    t.insert("application");
    t.insert("banana");
    const results = t.startsWith("app");
    expect(results).toContain("apple");
    expect(results).toContain("app");
    expect(results).toContain("application");
    expect(results).not.toContain("banana");
  });

  it("delete removes key", () => {
    const t = new Trie();
    t.insert("hello");
    expect(t.delete("hello")).toBe(true);
    expect(t.has("hello")).toBe(false);
    expect(t.size).toBe(0);
  });

  it("delete returns false for missing key", () => {
    const t = new Trie();
    expect(t.delete("nope")).toBe(false);
  });

  it("delete preserves other keys", () => {
    const t = new Trie();
    t.insert("hello");
    t.insert("help");
    t.delete("hello");
    expect(t.has("help")).toBe(true);
  });

  it("tracks size", () => {
    const t = new Trie();
    t.insert("a");
    t.insert("b");
    t.insert("c");
    expect(t.size).toBe(3);
  });

  it("keys returns all keys", () => {
    const t = new Trie();
    t.insert("cat");
    t.insert("car");
    t.insert("dog");
    expect(t.keys().sort()).toEqual(["car", "cat", "dog"]);
  });

  it("clear empties trie", () => {
    const t = new Trie();
    t.insert("a");
    t.clear();
    expect(t.size).toBe(0);
    expect(t.keys()).toEqual([]);
  });

  it("longestPrefix finds longest matching key", () => {
    const t = new Trie();
    t.insert("he");
    t.insert("hello");
    t.insert("helloworld");
    expect(t.longestPrefix("hello there")).toBe("hello");
    expect(t.longestPrefix("hey")).toBe("he");
    expect(t.longestPrefix("xyz")).toBe("");
  });
});
