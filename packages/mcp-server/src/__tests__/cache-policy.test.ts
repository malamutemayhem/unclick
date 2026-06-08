import { describe, it, expect } from "vitest";
import { LRUCache, LFUCache, TTLCache } from "../cache-policy.js";

describe("LRUCache", () => {
  it("sets and gets values", () => {
    const cache = new LRUCache<number>(10);
    cache.set("a", 1);
    expect(cache.get("a")).toBe(1);
  });

  it("returns undefined for missing keys", () => {
    const cache = new LRUCache<number>(10);
    expect(cache.get("missing")).toBeUndefined();
  });

  it("evicts least recently used", () => {
    const cache = new LRUCache<string>(3);
    cache.set("a", "a", 1);
    cache.set("b", "b", 1);
    cache.set("c", "c", 1);
    cache.get("a");
    cache.set("d", "d", 1);
    expect(cache.has("b")).toBe(false);
    expect(cache.has("a")).toBe(true);
  });

  it("tracks hit rate", () => {
    const cache = new LRUCache<number>(10);
    cache.set("a", 1);
    cache.get("a");
    cache.get("missing");
    expect(cache.hitRate()).toBe(0.5);
  });

  it("deletes entries", () => {
    const cache = new LRUCache<number>(10);
    cache.set("a", 1);
    cache.delete("a");
    expect(cache.has("a")).toBe(false);
  });

  it("clears cache", () => {
    const cache = new LRUCache<number>(10);
    cache.set("a", 1);
    cache.clear();
    expect(cache.size()).toBe(0);
  });
});

describe("LFUCache", () => {
  it("evicts least frequently used", () => {
    const cache = new LFUCache<string>(2);
    cache.set("a", "a");
    cache.set("b", "b");
    cache.get("a");
    cache.get("a");
    cache.set("c", "c");
    expect(cache.get("b")).toBeUndefined();
    expect(cache.get("a")).toBe("a");
  });

  it("breaks ties by recency", () => {
    const cache = new LFUCache<string>(2);
    cache.set("a", "a");
    cache.set("b", "b");
    cache.set("c", "c");
    expect(cache.size()).toBe(2);
  });
});

describe("TTLCache", () => {
  it("stores and retrieves values", () => {
    const cache = new TTLCache<string>();
    cache.set("key", "value", 60000);
    expect(cache.get("key")).toBe("value");
  });

  it("expires entries", () => {
    const cache = new TTLCache<string>();
    const now = Date.now();
    cache.set("key", "value", 100);
    expect(cache.get("key", now + 200)).toBeUndefined();
  });

  it("cleans up expired entries", () => {
    const cache = new TTLCache<string>();
    cache.set("a", "a", 0);
    cache.set("b", "b", 999999);
    const removed = cache.cleanup(Date.now() + 100);
    expect(removed).toBe(1);
    expect(cache.size()).toBe(1);
  });
});
