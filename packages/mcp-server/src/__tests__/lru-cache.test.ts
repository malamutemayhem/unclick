import { describe, it, expect } from "vitest";
import { LRUCache } from "../lru-cache.js";

describe("LRUCache", () => {
  it("set and get", () => {
    const c = new LRUCache<string, number>(3);
    c.set("a", 1).set("b", 2);
    expect(c.get("a")).toBe(1);
    expect(c.get("b")).toBe(2);
  });

  it("evicts least recently used", () => {
    const c = new LRUCache<string, number>(2);
    c.set("a", 1).set("b", 2);
    c.set("c", 3);
    expect(c.has("a")).toBe(false);
    expect(c.has("b")).toBe(true);
    expect(c.has("c")).toBe(true);
  });

  it("get refreshes access order", () => {
    const c = new LRUCache<string, number>(2);
    c.set("a", 1).set("b", 2);
    c.get("a");
    c.set("c", 3);
    expect(c.has("a")).toBe(true);
    expect(c.has("b")).toBe(false);
  });

  it("returns undefined for missing keys", () => {
    const c = new LRUCache<string, number>(2);
    expect(c.get("missing")).toBeUndefined();
  });

  it("delete removes key", () => {
    const c = new LRUCache<string, number>(3);
    c.set("a", 1);
    expect(c.delete("a")).toBe(true);
    expect(c.has("a")).toBe(false);
    expect(c.size).toBe(0);
  });

  it("clear empties cache", () => {
    const c = new LRUCache<string, number>(3);
    c.set("a", 1).set("b", 2);
    c.clear();
    expect(c.size).toBe(0);
  });

  it("keys/values/entries in MRU order", () => {
    const c = new LRUCache<string, number>(3);
    c.set("a", 1).set("b", 2).set("c", 3);
    expect(c.keys()).toEqual(["c", "b", "a"]);
    expect(c.values()).toEqual([3, 2, 1]);
  });

  it("peek does not change order", () => {
    const c = new LRUCache<string, number>(2);
    c.set("a", 1).set("b", 2);
    c.peek("a");
    c.set("c", 3);
    expect(c.has("a")).toBe(false);
  });

  it("throws on invalid capacity", () => {
    expect(() => new LRUCache(0)).toThrow();
  });

  it("update existing key", () => {
    const c = new LRUCache<string, number>(2);
    c.set("a", 1).set("a", 2);
    expect(c.get("a")).toBe(2);
    expect(c.size).toBe(1);
  });
});
