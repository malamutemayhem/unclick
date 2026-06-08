import { describe, it, expect } from "vitest";
import { Trie } from "../trie.js";

describe("Trie", () => {
  it("insert and has", () => {
    const t = new Trie();
    t.insert("hello");
    expect(t.has("hello")).toBe(true);
    expect(t.has("hell")).toBe(false);
  });

  it("stores values", () => {
    const t = new Trie<number>();
    t.insert("key", 42);
    expect(t.get("key")).toBe(42);
    expect(t.get("missing")).toBeUndefined();
  });

  it("delete removes key", () => {
    const t = new Trie();
    t.insert("hello");
    t.insert("help");
    expect(t.delete("hello")).toBe(true);
    expect(t.has("hello")).toBe(false);
    expect(t.has("help")).toBe(true);
  });

  it("delete returns false for missing", () => {
    const t = new Trie();
    expect(t.delete("nope")).toBe(false);
  });

  it("startsWith returns matching keys", () => {
    const t = new Trie();
    t.insert("hello");
    t.insert("help");
    t.insert("world");
    const results = t.startsWith("hel");
    expect(results.sort()).toEqual(["hello", "help"]);
  });

  it("startsWith returns empty for no match", () => {
    const t = new Trie();
    t.insert("hello");
    expect(t.startsWith("xyz")).toEqual([]);
  });

  it("tracks size", () => {
    const t = new Trie();
    t.insert("a");
    t.insert("b");
    t.insert("a");
    expect(t.size).toBe(2);
    t.delete("a");
    expect(t.size).toBe(1);
  });

  it("keys returns all keys", () => {
    const t = new Trie();
    t.insert("cat");
    t.insert("car");
    t.insert("dog");
    expect(t.keys().sort()).toEqual(["car", "cat", "dog"]);
  });

  it("clear resets", () => {
    const t = new Trie();
    t.insert("test");
    t.clear();
    expect(t.size).toBe(0);
    expect(t.has("test")).toBe(false);
  });

  it("longestPrefix finds match", () => {
    const t = new Trie();
    t.insert("http");
    t.insert("https");
    t.insert("httpserver");
    expect(t.longestPrefix("httpserver123")).toBe("httpserver");
    expect(t.longestPrefix("httprequest")).toBe("http");
  });

  it("longestPrefix returns empty when no match", () => {
    const t = new Trie();
    t.insert("abc");
    expect(t.longestPrefix("xyz")).toBe("");
  });
});
