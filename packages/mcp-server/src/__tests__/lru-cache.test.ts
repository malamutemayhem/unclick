import { describe, it, expect } from "vitest";
import { LRUCache } from "../lru-cache.js";

describe("LRUCache", () => {
  it("get and set", () => {
    const cache = new LRUCache<string, number>(3);
    cache.set("a", 1);
    cache.set("b", 2);
    expect(cache.get("a")).toBe(1);
    expect(cache.get("b")).toBe(2);
    expect(cache.get("c")).toBeUndefined();
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

  it("get promotes to most recently used", () => {
    const cache = new LRUCache<string, number>(2);
    cache.set("a", 1);
    cache.set("b", 2);
    cache.get("a");
    cache.set("c", 3);
    expect(cache.get("a")).toBe(1);
    expect(cache.get("b")).toBeUndefined();
  });

  it("set updates existing keys", () => {
    const cache = new LRUCache<string, number>(2);
    cache.set("a", 1);
    cache.set("a", 10);
    expect(cache.get("a")).toBe(10);
    expect(cache.size).toBe(1);
  });

  it("delete removes entries", () => {
    const cache = new LRUCache<string, number>(3);
    cache.set("a", 1);
    cache.set("b", 2);
    expect(cache.delete("a")).toBe(true);
    expect(cache.get("a")).toBeUndefined();
    expect(cache.size).toBe(1);
    expect(cache.delete("nope")).toBe(false);
  });

  it("has checks existence", () => {
    const cache = new LRUCache<string, number>(3);
    cache.set("x", 1);
    expect(cache.has("x")).toBe(true);
    expect(cache.has("y")).toBe(false);
  });

  it("keys returns in MRU order", () => {
    const cache = new LRUCache<string, number>(5);
    cache.set("a", 1);
    cache.set("b", 2);
    cache.set("c", 3);
    cache.get("a");
    expect(cache.keys()).toEqual(["a", "c", "b"]);
  });

  it("clear empties cache", () => {
    const cache = new LRUCache<string, number>(3);
    cache.set("a", 1);
    cache.set("b", 2);
    cache.clear();
    expect(cache.size).toBe(0);
    expect(cache.get("a")).toBeUndefined();
  });
});
