import { describe, it, expect } from "vitest";
import { Trie } from "../trie.js";

describe("Trie", () => {
  it("set and get", () => {
    const t = new Trie<number>();
    t.set("hello", 1);
    expect(t.get("hello")).toBe(1);
  });

  it("has returns true for existing keys", () => {
    const t = new Trie<number>();
    t.set("abc", 1);
    expect(t.has("abc")).toBe(true);
    expect(t.has("ab")).toBe(false);
    expect(t.has("abcd")).toBe(false);
  });

  it("get returns undefined for missing keys", () => {
    const t = new Trie<number>();
    expect(t.get("missing")).toBeUndefined();
  });

  it("overwrite value", () => {
    const t = new Trie<number>();
    t.set("key", 1);
    t.set("key", 2);
    expect(t.get("key")).toBe(2);
    expect(t.size).toBe(1);
  });

  it("size tracks entries", () => {
    const t = new Trie<number>();
    expect(t.size).toBe(0);
    t.set("a", 1);
    t.set("ab", 2);
    expect(t.size).toBe(2);
  });

  it("delete removes key", () => {
    const t = new Trie<number>();
    t.set("hello", 1);
    expect(t.delete("hello")).toBe(true);
    expect(t.has("hello")).toBe(false);
    expect(t.size).toBe(0);
  });

  it("delete returns false for missing key", () => {
    const t = new Trie<number>();
    expect(t.delete("nope")).toBe(false);
  });

  it("delete preserves other keys sharing prefix", () => {
    const t = new Trie<number>();
    t.set("ab", 1);
    t.set("abc", 2);
    t.delete("abc");
    expect(t.has("ab")).toBe(true);
    expect(t.has("abc")).toBe(false);
  });

  it("startsWith finds matching keys", () => {
    const t = new Trie<number>();
    t.set("app", 1);
    t.set("apple", 2);
    t.set("apply", 3);
    t.set("banana", 4);
    expect(t.startsWith("app").sort()).toEqual(["app", "apple", "apply"]);
  });

  it("startsWith returns empty for no match", () => {
    const t = new Trie<number>();
    t.set("abc", 1);
    expect(t.startsWith("xyz")).toEqual([]);
  });

  it("longestPrefix finds longest matching key", () => {
    const t = new Trie<number>();
    t.set("/", 1);
    t.set("/api", 2);
    t.set("/api/v1", 3);
    expect(t.longestPrefix("/api/v1/users")).toBe("/api/v1");
  });

  it("longestPrefix returns empty for no match", () => {
    const t = new Trie<number>();
    t.set("abc", 1);
    expect(t.longestPrefix("xyz")).toBe("");
  });

  it("clear resets trie", () => {
    const t = new Trie<number>();
    t.set("a", 1);
    t.set("b", 2);
    t.clear();
    expect(t.size).toBe(0);
    expect(t.has("a")).toBe(false);
  });

  it("keys returns all keys", () => {
    const t = new Trie<number>();
    t.set("cat", 1);
    t.set("car", 2);
    t.set("dog", 3);
    expect(t.keys().sort()).toEqual(["car", "cat", "dog"]);
  });
});
