import { describe, it, expect } from "vitest";
import { LRUCache } from "../lru-cache.js";

describe("LRUCache", () => {
  it("get and set", () => {
    const cache = new LRUCache<string, number>(3);
    cache.set("a", 1);
    expect(cache.get("a")).toBe(1);
  });

  it("evicts least recently used", () => {
    const cache = new LRUCache<string, number>(2);
    cache.set("a", 1);
    cache.set("b", 2);
    cache.set("c", 3);
    expect(cache.get("a")).toBeUndefined();
    expect(cache.get("b")).toBe(2);
    expect(cache.get("c")).toBe(3);
  });

  it("access refreshes priority", () => {
    const cache = new LRUCache<string, number>(2);
    cache.set("a", 1);
    cache.set("b", 2);
    cache.get("a");
    cache.set("c", 3);
    expect(cache.get("a")).toBe(1);
    expect(cache.get("b")).toBeUndefined();
  });

  it("has checks existence", () => {
    const cache = new LRUCache<string, number>(3);
    cache.set("x", 1);
    expect(cache.has("x")).toBe(true);
    expect(cache.has("y")).toBe(false);
  });

  it("delete removes entry", () => {
    const cache = new LRUCache<string, number>(3);
    cache.set("x", 1);
    cache.delete("x");
    expect(cache.has("x")).toBe(false);
  });

  it("clear resets everything", () => {
    const cache = new LRUCache<string, number>(3);
    cache.set("a", 1);
    cache.get("a");
    cache.get("z");
    cache.clear();
    expect(cache.size).toBe(0);
    expect(cache.hitRate).toBe(0);
  });

  it("tracks hit rate", () => {
    const cache = new LRUCache<string, number>(3);
    cache.set("a", 1);
    cache.get("a");
    cache.get("b");
    expect(cache.stats.hits).toBe(1);
    expect(cache.stats.misses).toBe(1);
    expect(cache.hitRate).toBe(0.5);
  });

  it("peek does not change order", () => {
    const cache = new LRUCache<string, number>(2);
    cache.set("a", 1);
    cache.set("b", 2);
    cache.peek("a");
    cache.set("c", 3);
    expect(cache.has("a")).toBe(false);
  });

  it("keys/values/entries", () => {
    const cache = new LRUCache<string, number>(3);
    cache.set("a", 1);
    cache.set("b", 2);
    expect(cache.keys()).toEqual(["a", "b"]);
    expect(cache.values()).toEqual([1, 2]);
    expect(cache.entries()).toEqual([["a", 1], ["b", 2]]);
  });

  it("update existing key", () => {
    const cache = new LRUCache<string, number>(2);
    cache.set("a", 1);
    cache.set("a", 10);
    expect(cache.get("a")).toBe(10);
    expect(cache.size).toBe(1);
  });
});
