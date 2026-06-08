import { describe, it, expect } from "vitest";
import { Trie } from "../trie.js";

describe("Trie", () => {
  it("inserts and finds words", () => {
    const t = new Trie();
    t.insert("hello");
    t.insert("help");
    expect(t.has("hello")).toBe(true);
    expect(t.has("help")).toBe(true);
    expect(t.has("hel")).toBe(false);
  });

  it("startsWith checks prefix", () => {
    const t = new Trie();
    t.insert("hello");
    expect(t.startsWith("hel")).toBe(true);
    expect(t.startsWith("xyz")).toBe(false);
  });

  it("autocomplete returns matches", () => {
    const t = new Trie();
    t.insert("hello");
    t.insert("help");
    t.insert("hero");
    t.insert("world");
    const results = t.autocomplete("hel");
    expect(results).toContain("hello");
    expect(results).toContain("help");
    expect(results).not.toContain("hero");
  });

  it("respects autocomplete limit", () => {
    const t = new Trie();
    for (let i = 0; i < 20; i++) t.insert("word" + i);
    expect(t.autocomplete("word", 5).length).toBe(5);
  });

  it("stores and retrieves data", () => {
    const t = new Trie();
    t.insert("key", { score: 42 });
    expect(t.get("key")).toEqual({ score: 42 });
    expect(t.get("missing")).toBeUndefined();
  });

  it("deletes words", () => {
    const t = new Trie();
    t.insert("hello");
    t.insert("help");
    expect(t.delete("hello")).toBe(true);
    expect(t.has("hello")).toBe(false);
    expect(t.has("help")).toBe(true);
    expect(t.size).toBe(1);
  });

  it("tracks size", () => {
    const t = new Trie();
    t.insert("a");
    t.insert("b");
    t.insert("a");
    expect(t.size).toBe(2);
  });

  it("clear resets", () => {
    const t = new Trie();
    t.insert("x");
    t.clear();
    expect(t.size).toBe(0);
    expect(t.has("x")).toBe(false);
  });
});
