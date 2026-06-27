import { describe, it, expect } from "vitest";
import { RadixTrie } from "../radix-trie.js";

describe("RadixTrie", () => {
  it("insert and get retrieve values", () => {
    const rt = new RadixTrie<number>();
    rt.insert("hello", 1);
    rt.insert("help", 2);
    expect(rt.get("hello")).toBe(1);
    expect(rt.get("help")).toBe(2);
  });

  it("get returns undefined for missing keys", () => {
    const rt = new RadixTrie<number>();
    rt.insert("abc", 1);
    expect(rt.get("abd")).toBeUndefined();
  });

  it("has checks key existence", () => {
    const rt = new RadixTrie<string>();
    rt.insert("test", "val");
    expect(rt.has("test")).toBe(true);
    expect(rt.has("tes")).toBe(false);
  });

  it("size tracks unique keys", () => {
    const rt = new RadixTrie<number>();
    rt.insert("a", 1);
    rt.insert("ab", 2);
    rt.insert("abc", 3);
    expect(rt.size()).toBe(3);
  });

  it("insert overwrites existing keys", () => {
    const rt = new RadixTrie<number>();
    rt.insert("key", 1);
    rt.insert("key", 2);
    expect(rt.get("key")).toBe(2);
    expect(rt.size()).toBe(1);
  });

  it("keysWithPrefix returns matching keys", () => {
    const rt = new RadixTrie<number>();
    rt.insert("apple", 1);
    rt.insert("application", 2);
    rt.insert("banana", 3);
    const keys = rt.keysWithPrefix("app");
    expect(keys.length).toBe(2);
    expect(keys).toContain("apple");
    expect(keys).toContain("application");
  });

  it("keys returns all keys", () => {
    const rt = new RadixTrie<number>();
    rt.insert("cat", 1);
    rt.insert("car", 2);
    rt.insert("card", 3);
    const keys = rt.keys();
    expect(keys.length).toBe(3);
    expect(keys).toContain("cat");
    expect(keys).toContain("car");
    expect(keys).toContain("card");
  });

  it("handles single character keys", () => {
    const rt = new RadixTrie<number>();
    rt.insert("a", 1);
    rt.insert("b", 2);
    expect(rt.get("a")).toBe(1);
    expect(rt.get("b")).toBe(2);
  });

  it("handles keys sharing long prefixes", () => {
    const rt = new RadixTrie<number>();
    rt.insert("romane", 1);
    rt.insert("romanus", 2);
    rt.insert("romulus", 3);
    rt.insert("rubens", 4);
    expect(rt.size()).toBe(4);
    expect(rt.get("romane")).toBe(1);
    expect(rt.get("rubens")).toBe(4);
  });
});
