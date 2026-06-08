import { describe, it, expect } from "vitest";
import { LRUCache } from "../lru-cache.js";

describe("LRUCache", () => {
  it("set and get", () => {
    const cache = new LRUCache<string, number>(3);
    cache.set("a", 1);
    expect(cache.get("a")).toBe(1);
  });

  it("returns undefined for missing key", () => {
    const cache = new LRUCache<string, number>(3);
    expect(cache.get("nope")).toBeUndefined();
  });

  it("evicts least recently used", () => {
    const cache = new LRUCache<string, number>(2);
    cache.set("a", 1);
    cache.set("b", 2);
    cache.set("c", 3);
    expect(cache.has("a")).toBe(false);
    expect(cache.has("b")).toBe(true);
    expect(cache.has("c")).toBe(true);
  });

  it("get refreshes access", () => {
    const cache = new LRUCache<string, number>(2);
    cache.set("a", 1);
    cache.set("b", 2);
    cache.get("a");
    cache.set("c", 3);
    expect(cache.has("a")).toBe(true);
    expect(cache.has("b")).toBe(false);
  });

  it("overwrites existing key", () => {
    const cache = new LRUCache<string, number>(2);
    cache.set("a", 1);
    cache.set("a", 2);
    expect(cache.get("a")).toBe(2);
    expect(cache.size).toBe(1);
  });

  it("delete removes entry", () => {
    const cache = new LRUCache<string, number>(3);
    cache.set("a", 1);
    cache.delete("a");
    expect(cache.has("a")).toBe(false);
  });

  it("peek does not change order", () => {
    const cache = new LRUCache<string, number>(2);
    cache.set("a", 1);
    cache.set("b", 2);
    cache.peek("a");
    cache.set("c", 3);
    expect(cache.has("a")).toBe(false);
  });

  it("keys, values, entries", () => {
    const cache = new LRUCache<string, number>(3);
    cache.set("a", 1);
    cache.set("b", 2);
    expect(cache.keys()).toEqual(["a", "b"]);
    expect(cache.values()).toEqual([1, 2]);
    expect(cache.entries()).toEqual([["a", 1], ["b", 2]]);
  });

  it("clear empties cache", () => {
    const cache = new LRUCache<string, number>(3);
    cache.set("a", 1);
    cache.clear();
    expect(cache.size).toBe(0);
  });

  it("maxCapacity returns capacity", () => {
    expect(new LRUCache(10).maxCapacity).toBe(10);
  });

  it("throws for invalid capacity", () => {
    expect(() => new LRUCache(0)).toThrow();
  });
});
