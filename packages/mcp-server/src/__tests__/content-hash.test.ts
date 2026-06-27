import { describe, it, expect } from "vitest";
import { fnv1a32, fnv1aHex, jsonFingerprint, FingerprintCache } from "../content-hash.js";

describe("fnv1a32", () => {
  it("produces consistent hashes", () => {
    expect(fnv1a32("hello")).toBe(fnv1a32("hello"));
  });

  it("produces different hashes for different inputs", () => {
    expect(fnv1a32("hello")).not.toBe(fnv1a32("world"));
  });

  it("returns a positive 32-bit integer", () => {
    const hash = fnv1a32("test");
    expect(hash).toBeGreaterThanOrEqual(0);
    expect(hash).toBeLessThanOrEqual(0xFFFFFFFF);
  });
});

describe("fnv1aHex", () => {
  it("returns an 8-character hex string", () => {
    const hex = fnv1aHex("test");
    expect(hex).toMatch(/^[0-9a-f]{8}$/);
  });
});

describe("jsonFingerprint", () => {
  it("produces same hash for same data", () => {
    expect(jsonFingerprint({ a: 1, b: 2 })).toBe(jsonFingerprint({ a: 1, b: 2 }));
  });

  it("is order-independent for object keys", () => {
    expect(jsonFingerprint({ a: 1, b: 2 })).toBe(jsonFingerprint({ b: 2, a: 1 }));
  });

  it("differentiates different data", () => {
    expect(jsonFingerprint({ a: 1 })).not.toBe(jsonFingerprint({ a: 2 }));
  });

  it("handles nested objects", () => {
    const a = { x: { y: { z: 1 } } };
    const b = { x: { y: { z: 1 } } };
    expect(jsonFingerprint(a)).toBe(jsonFingerprint(b));
  });

  it("handles arrays", () => {
    expect(jsonFingerprint([1, 2, 3])).toBe(jsonFingerprint([1, 2, 3]));
    expect(jsonFingerprint([1, 2])).not.toBe(jsonFingerprint([2, 1]));
  });

  it("handles primitives", () => {
    expect(jsonFingerprint("hello")).toBe(jsonFingerprint("hello"));
    expect(jsonFingerprint(42)).toBe(jsonFingerprint(42));
    expect(jsonFingerprint(null)).toBe(jsonFingerprint(null));
  });
});

describe("FingerprintCache", () => {
  it("caches and retrieves values", () => {
    const cache = new FingerprintCache<number>();
    cache.set({ key: "a" }, 42);
    expect(cache.get({ key: "a" })).toBe(42);
  });

  it("getOrSet returns cached value", () => {
    const cache = new FingerprintCache<string>();
    let calls = 0;
    const factory = () => { calls++; return "computed"; };
    cache.getOrSet({ id: 1 }, factory);
    cache.getOrSet({ id: 1 }, factory);
    expect(calls).toBe(1);
  });

  it("has checks existence", () => {
    const cache = new FingerprintCache<number>();
    expect(cache.has("key")).toBe(false);
    cache.set("key", 1);
    expect(cache.has("key")).toBe(true);
  });

  it("evicts oldest when at max size", () => {
    const cache = new FingerprintCache<number>(2);
    cache.set("a", 1);
    cache.set("b", 2);
    cache.set("c", 3);
    expect(cache.size).toBe(2);
    expect(cache.has("a")).toBe(false);
  });

  it("clear empties the cache", () => {
    const cache = new FingerprintCache<number>();
    cache.set("a", 1);
    cache.set("b", 2);
    cache.clear();
    expect(cache.size).toBe(0);
  });

  it("uses stable fingerprints so key order doesn't matter", () => {
    const cache = new FingerprintCache<string>();
    cache.set({ x: 1, y: 2 }, "val");
    expect(cache.get({ y: 2, x: 1 })).toBe("val");
  });
});
