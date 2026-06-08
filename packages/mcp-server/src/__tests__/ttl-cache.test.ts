import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { TtlCache } from "../ttl-cache.js";

describe("TtlCache", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("stores and retrieves values", () => {
    const cache = new TtlCache<string>({ defaultTtlMs: 1000 });
    cache.set("key", "value");
    expect(cache.get("key")).toBe("value");
  });

  it("expires values after TTL", () => {
    const cache = new TtlCache<string>({ defaultTtlMs: 1000 });
    cache.set("key", "value");
    vi.advanceTimersByTime(1001);
    expect(cache.get("key")).toBeUndefined();
  });

  it("supports per-key TTL override", () => {
    const cache = new TtlCache<string>({ defaultTtlMs: 1000 });
    cache.set("short", "val", 500);
    cache.set("long", "val", 5000);
    vi.advanceTimersByTime(600);
    expect(cache.get("short")).toBeUndefined();
    expect(cache.get("long")).toBe("val");
  });

  it("has returns false for expired keys", () => {
    const cache = new TtlCache<string>({ defaultTtlMs: 100 });
    cache.set("key", "val");
    expect(cache.has("key")).toBe(true);
    vi.advanceTimersByTime(200);
    expect(cache.has("key")).toBe(false);
  });

  it("delete removes a key", () => {
    const cache = new TtlCache<string>({ defaultTtlMs: 1000 });
    cache.set("key", "val");
    cache.delete("key");
    expect(cache.get("key")).toBeUndefined();
  });

  it("clear removes everything", () => {
    const cache = new TtlCache<string>({ defaultTtlMs: 1000 });
    cache.set("a", "1");
    cache.set("b", "2");
    cache.clear();
    expect(cache.size).toBe(0);
  });

  it("getOrSet caches the factory result", () => {
    const cache = new TtlCache<number>({ defaultTtlMs: 1000 });
    let calls = 0;
    const factory = () => { calls++; return 42; };
    cache.getOrSet("key", factory);
    cache.getOrSet("key", factory);
    expect(calls).toBe(1);
    expect(cache.get("key")).toBe(42);
  });

  it("getOrSetAsync caches async factory result", async () => {
    vi.useRealTimers();
    const cache = new TtlCache<string>({ defaultTtlMs: 5000 });
    let calls = 0;
    const factory = async () => { calls++; return "async-val"; };
    await cache.getOrSetAsync("key", factory);
    await cache.getOrSetAsync("key", factory);
    expect(calls).toBe(1);
  });

  it("evicts oldest when at max size", () => {
    const cache = new TtlCache<string>({ defaultTtlMs: 10000, maxSize: 2 });
    cache.set("a", "1");
    vi.advanceTimersByTime(1);
    cache.set("b", "2");
    vi.advanceTimersByTime(1);
    cache.set("c", "3");
    expect(cache.size).toBe(2);
    expect(cache.has("a")).toBe(false);
    expect(cache.has("b")).toBe(true);
    expect(cache.has("c")).toBe(true);
  });

  it("dispose clears cache and timer", () => {
    const cache = new TtlCache<string>({ defaultTtlMs: 1000, cleanupIntervalMs: 500 });
    cache.set("key", "val");
    cache.dispose();
    expect(cache.size).toBe(0);
  });
});
