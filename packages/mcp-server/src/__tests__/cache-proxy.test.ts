import { describe, it, expect } from "vitest";
import { CacheProxy } from "../cache-proxy.js";

describe("CacheProxy", () => {
  it("set and get", () => {
    const c = new CacheProxy<string>();
    c.set("key", "value", undefined, 1000);
    expect(c.get("key", 1000)).toBe("value");
  });

  it("returns undefined for miss", () => {
    const c = new CacheProxy<string>();
    expect(c.get("nope")).toBeUndefined();
  });

  it("expires after ttl", () => {
    const c = new CacheProxy<string>(100);
    c.set("key", "value", undefined, 1000);
    expect(c.get("key", 1200)).toBeUndefined();
  });

  it("tracks hit rate", () => {
    const c = new CacheProxy<string>();
    c.set("a", "1", undefined, 1000);
    c.get("a", 1000);
    c.get("b", 1000);
    expect(c.stats.hits).toBe(1);
    expect(c.stats.misses).toBe(1);
    expect(c.hitRate).toBe(0.5);
  });

  it("getOrSet populates cache", async () => {
    const c = new CacheProxy<number>();
    const val = await c.getOrSet("x", async () => 42);
    expect(val).toBe(42);
    expect(c.get("x")).toBe(42);
  });

  it("getOrSet returns cached on second call", async () => {
    const c = new CacheProxy<number>();
    let calls = 0;
    const factory = async () => { calls++; return 42; };
    await c.getOrSet("x", factory);
    await c.getOrSet("x", factory);
    expect(calls).toBe(1);
  });

  it("delete removes entry", () => {
    const c = new CacheProxy<string>();
    c.set("k", "v");
    c.delete("k");
    expect(c.has("k")).toBe(false);
  });

  it("clear empties all", () => {
    const c = new CacheProxy<string>();
    c.set("a", "1");
    c.set("b", "2");
    c.clear();
    expect(c.size).toBe(0);
  });

  it("prune removes expired", () => {
    const c = new CacheProxy<string>(100);
    c.set("a", "1", undefined, 1000);
    c.set("b", "2", undefined, 1050);
    const pruned = c.prune(1200);
    expect(pruned).toBe(2);
  });

  it("evicts LFU when at max size", () => {
    const c = new CacheProxy<string>(10000, 2);
    c.set("a", "1", undefined, 1000);
    c.set("b", "2", undefined, 1000);
    c.get("b", 1000);
    c.set("c", "3", undefined, 1000);
    expect(c.size).toBe(2);
    expect(c.has("b", 1000)).toBe(true);
  });
});
