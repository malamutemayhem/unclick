import { describe, it, expect } from "vitest";
import { RadixTree } from "../radix-tree.js";

describe("RadixTree", () => {
  it("insert and get", () => {
    const t = new RadixTree<number>();
    t.insert("hello", 1);
    expect(t.get("hello")).toBe(1);
  });

  it("has returns true for existing key", () => {
    const t = new RadixTree<number>();
    t.insert("test", 42);
    expect(t.has("test")).toBe(true);
  });

  it("has returns false for missing key", () => {
    const t = new RadixTree();
    expect(t.has("missing")).toBe(false);
  });

  it("get returns undefined for missing key", () => {
    const t = new RadixTree<number>();
    expect(t.get("nope")).toBeUndefined();
  });

  it("handles shared prefixes", () => {
    const t = new RadixTree<number>();
    t.insert("test", 1);
    t.insert("testing", 2);
    t.insert("team", 3);
    expect(t.get("test")).toBe(1);
    expect(t.get("testing")).toBe(2);
    expect(t.get("team")).toBe(3);
    expect(t.size).toBe(3);
  });

  it("overwrite existing key", () => {
    const t = new RadixTree<number>();
    t.insert("key", 1);
    t.insert("key", 2);
    expect(t.get("key")).toBe(2);
    expect(t.size).toBe(1);
  });

  it("delete removes key", () => {
    const t = new RadixTree<number>();
    t.insert("hello", 1);
    expect(t.delete("hello")).toBe(true);
    expect(t.has("hello")).toBe(false);
    expect(t.size).toBe(0);
  });

  it("delete returns false for missing key", () => {
    const t = new RadixTree();
    expect(t.delete("nope")).toBe(false);
  });

  it("delete preserves other keys", () => {
    const t = new RadixTree<number>();
    t.insert("test", 1);
    t.insert("testing", 2);
    t.delete("test");
    expect(t.has("test")).toBe(false);
    expect(t.has("testing")).toBe(true);
  });

  it("keysWithPrefix finds matching keys", () => {
    const t = new RadixTree<number>();
    t.insert("apple", 1);
    t.insert("application", 2);
    t.insert("banana", 3);
    const results = t.keysWithPrefix("app");
    expect(results.sort()).toEqual(["apple", "application"]);
  });

  it("keysWithPrefix with empty prefix returns all", () => {
    const t = new RadixTree<number>();
    t.insert("a", 1);
    t.insert("b", 2);
    expect(t.keysWithPrefix("").sort()).toEqual(["a", "b"]);
  });

  it("keys returns all keys", () => {
    const t = new RadixTree<number>();
    t.insert("foo", 1);
    t.insert("bar", 2);
    t.insert("baz", 3);
    expect(t.keys().sort()).toEqual(["bar", "baz", "foo"]);
  });

  it("clear empties the tree", () => {
    const t = new RadixTree<number>();
    t.insert("a", 1);
    t.insert("b", 2);
    t.clear();
    expect(t.size).toBe(0);
    expect(t.has("a")).toBe(false);
  });

  it("handles empty string key", () => {
    const t = new RadixTree<number>();
    t.insert("", 99);
    expect(t.get("")).toBe(99);
    expect(t.size).toBe(1);
  });

  it("default value is true", () => {
    const t = new RadixTree();
    t.insert("x");
    expect(t.get("x")).toBe(true);
  });
});
