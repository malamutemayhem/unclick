import { describe, it, expect } from "vitest";
import { Trie } from "../trie.js";

describe("Trie", () => {
  it("starts empty", () => {
    const t = new Trie();
    expect(t.size).toBe(0);
  });

  it("set and has", () => {
    const t = new Trie();
    t.set("hello");
    expect(t.has("hello")).toBe(true);
    expect(t.has("hell")).toBe(false);
  });

  it("set with value and get", () => {
    const t = new Trie<number>();
    t.set("key", 42);
    expect(t.get("key")).toBe(42);
  });

  it("get returns undefined for missing key", () => {
    const t = new Trie<number>();
    expect(t.get("nope")).toBeUndefined();
  });

  it("delete removes a key", () => {
    const t = new Trie();
    t.set("hello");
    expect(t.delete("hello")).toBe(true);
    expect(t.has("hello")).toBe(false);
    expect(t.size).toBe(0);
  });

  it("delete returns false for missing key", () => {
    const t = new Trie();
    expect(t.delete("nope")).toBe(false);
  });

  it("startsWith finds matching keys", () => {
    const t = new Trie();
    t.set("app");
    t.set("apple");
    t.set("application");
    t.set("bat");
    const results = t.startsWith("app");
    expect(results).toContain("app");
    expect(results).toContain("apple");
    expect(results).toContain("application");
    expect(results).not.toContain("bat");
  });

  it("startsWith returns empty for no match", () => {
    const t = new Trie();
    t.set("hello");
    expect(t.startsWith("xyz")).toEqual([]);
  });

  it("keys returns all keys", () => {
    const t = new Trie();
    t.set("a");
    t.set("ab");
    t.set("abc");
    const keys = t.keys();
    expect(keys).toHaveLength(3);
    expect(keys).toContain("a");
    expect(keys).toContain("ab");
    expect(keys).toContain("abc");
  });

  it("clear empties the trie", () => {
    const t = new Trie();
    t.set("a");
    t.set("b");
    t.clear();
    expect(t.size).toBe(0);
    expect(t.has("a")).toBe(false);
  });

  it("overwriting a key does not change size", () => {
    const t = new Trie<number>();
    t.set("key", 1);
    t.set("key", 2);
    expect(t.size).toBe(1);
    expect(t.get("key")).toBe(2);
  });
});
