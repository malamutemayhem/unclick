import { describe, it, expect } from "vitest";
import { Trie } from "../trie.js";

describe("Trie", () => {
  it("insert and has", () => {
    const t = new Trie();
    t.insert("hello").insert("help");
    expect(t.has("hello")).toBe(true);
    expect(t.has("help")).toBe(true);
    expect(t.has("hel")).toBe(false);
  });

  it("hasPrefix", () => {
    const t = new Trie();
    t.insert("hello");
    expect(t.hasPrefix("hel")).toBe(true);
    expect(t.hasPrefix("xyz")).toBe(false);
  });

  it("remove", () => {
    const t = new Trie();
    t.insert("hello").insert("help");
    expect(t.remove("hello")).toBe(true);
    expect(t.has("hello")).toBe(false);
    expect(t.has("help")).toBe(true);
    expect(t.size).toBe(1);
  });

  it("remove returns false for missing", () => {
    const t = new Trie();
    t.insert("hello");
    expect(t.remove("world")).toBe(false);
    expect(t.remove("hel")).toBe(false);
  });

  it("autocomplete", () => {
    const t = new Trie();
    t.insert("cat").insert("car").insert("card").insert("dog");
    const results = t.autocomplete("ca");
    expect(results).toContain("cat");
    expect(results).toContain("car");
    expect(results).toContain("card");
    expect(results).not.toContain("dog");
  });

  it("autocomplete with limit", () => {
    const t = new Trie();
    t.insert("a1").insert("a2").insert("a3");
    expect(t.autocomplete("a", 2)).toHaveLength(2);
  });

  it("autocomplete empty prefix returns all", () => {
    const t = new Trie();
    t.insert("a").insert("b");
    expect(t.autocomplete("")).toHaveLength(2);
  });

  it("tracks size", () => {
    const t = new Trie();
    t.insert("a").insert("b").insert("a");
    expect(t.size).toBe(2);
  });

  it("clear", () => {
    const t = new Trie();
    t.insert("a").insert("b");
    t.clear();
    expect(t.size).toBe(0);
    expect(t.has("a")).toBe(false);
  });
});
