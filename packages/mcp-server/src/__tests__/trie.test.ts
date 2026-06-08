import { describe, it, expect } from "vitest";
import { Trie } from "../trie.js";

describe("Trie", () => {
  it("insert and has", () => {
    const t = new Trie();
    t.insert("hello");
    t.insert("help");
    expect(t.has("hello")).toBe(true);
    expect(t.has("help")).toBe(true);
    expect(t.has("hel")).toBe(false);
    expect(t.has("world")).toBe(false);
  });

  it("insert with values", () => {
    const t = new Trie<number>();
    t.insert("a", 1);
    t.insert("b", 2);
    expect(t.get("a")).toBe(1);
    expect(t.get("b")).toBe(2);
    expect(t.get("c")).toBeUndefined();
  });

  it("delete removes keys", () => {
    const t = new Trie();
    t.insert("hello");
    t.insert("help");
    expect(t.delete("hello")).toBe(true);
    expect(t.has("hello")).toBe(false);
    expect(t.has("help")).toBe(true);
    expect(t.size).toBe(1);
  });

  it("delete returns false for missing", () => {
    const t = new Trie();
    expect(t.delete("nope")).toBe(false);
  });

  it("startsWith returns matching keys", () => {
    const t = new Trie();
    t.insert("app");
    t.insert("apple");
    t.insert("apply");
    t.insert("banana");
    const matches = t.startsWith("app");
    expect(matches.sort()).toEqual(["app", "apple", "apply"]);
  });

  it("keys returns all keys", () => {
    const t = new Trie();
    t.insert("a");
    t.insert("b");
    t.insert("c");
    expect(t.keys().sort()).toEqual(["a", "b", "c"]);
  });

  it("size tracks correctly", () => {
    const t = new Trie();
    expect(t.size).toBe(0);
    t.insert("a");
    t.insert("b");
    expect(t.size).toBe(2);
    t.insert("a");
    expect(t.size).toBe(2);
    t.delete("a");
    expect(t.size).toBe(1);
  });
});
