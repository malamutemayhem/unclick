import { describe, test } from "node:test";
import assert from "node:assert/strict";

import {
  parseBackendCacheMaxTenants,
  createBoundedMemoryBackendCache,
  type BackendCacheMetrics,
} from "../db.js";

describe("parseBackendCacheMaxTenants", () => {
  test("returns 1024 for undefined", () => {
    assert.equal(parseBackendCacheMaxTenants(undefined), 1024);
  });

  test("returns 1024 for empty string", () => {
    assert.equal(parseBackendCacheMaxTenants(""), 1024);
  });

  test("returns 1024 for null", () => {
    assert.equal(parseBackendCacheMaxTenants(null as any), 1024);
  });

  test("parses a valid integer", () => {
    assert.equal(parseBackendCacheMaxTenants("512"), 512);
  });

  test("parses 1 as the minimum valid value", () => {
    assert.equal(parseBackendCacheMaxTenants("1"), 1);
  });

  test("returns default for zero", () => {
    assert.equal(parseBackendCacheMaxTenants("0"), 1024);
  });

  test("returns default for negative numbers", () => {
    assert.equal(parseBackendCacheMaxTenants("-5"), 1024);
  });

  test("returns default for non-numeric strings", () => {
    assert.equal(parseBackendCacheMaxTenants("abc"), 1024);
  });

  test("returns default for floats", () => {
    assert.equal(parseBackendCacheMaxTenants("3.7"), 1024);
  });

  test("clamps to 100000 maximum", () => {
    assert.equal(parseBackendCacheMaxTenants("999999"), 100000);
  });

  test("allows exactly 100000", () => {
    assert.equal(parseBackendCacheMaxTenants("100000"), 100000);
  });

  test("allows values just under the max", () => {
    assert.equal(parseBackendCacheMaxTenants("99999"), 99999);
  });
});

describe("createBoundedMemoryBackendCache", () => {
  test("starts empty with zero counters", () => {
    const cache = createBoundedMemoryBackendCache(10);
    const m = cache.metrics();
    assert.equal(m.size, 0);
    assert.equal(m.hits, 0);
    assert.equal(m.misses, 0);
    assert.equal(m.evictions, 0);
    assert.equal(m.maxSize, 10);
  });

  test("get returns null for missing keys and increments misses", () => {
    const cache = createBoundedMemoryBackendCache(10);
    assert.equal(cache.get("missing"), null);
    assert.equal(cache.metrics().misses, 1);
  });

  test("set then get returns the value and increments hits", () => {
    const cache = createBoundedMemoryBackendCache<string>(10);
    cache.set("k1", "v1");
    assert.equal(cache.get("k1"), "v1");
    const m = cache.metrics();
    assert.equal(m.hits, 1);
    assert.equal(m.size, 1);
  });

  test("overwriting a key updates the value", () => {
    const cache = createBoundedMemoryBackendCache<number>(10);
    cache.set("k1", 1);
    cache.set("k1", 2);
    assert.equal(cache.get("k1"), 2);
    assert.equal(cache.metrics().size, 1);
  });

  test("evicts oldest entry when full", () => {
    const cache = createBoundedMemoryBackendCache<string>(2);
    cache.set("a", "1");
    cache.set("b", "2");
    cache.set("c", "3");
    assert.equal(cache.get("a"), null);
    assert.equal(cache.get("b"), "2");
    assert.equal(cache.get("c"), "3");
    assert.equal(cache.metrics().evictions, 1);
    assert.equal(cache.metrics().size, 2);
  });

  test("reading a key promotes it (LRU behavior)", () => {
    const cache = createBoundedMemoryBackendCache<string>(2);
    cache.set("a", "1");
    cache.set("b", "2");
    cache.get("a");
    cache.set("c", "3");
    assert.equal(cache.get("a"), "1");
    assert.equal(cache.get("b"), null);
    assert.equal(cache.get("c"), "3");
  });

  test("multiple evictions tracked correctly", () => {
    const cache = createBoundedMemoryBackendCache<number>(1);
    cache.set("a", 1);
    cache.set("b", 2);
    cache.set("c", 3);
    assert.equal(cache.metrics().evictions, 2);
    assert.equal(cache.metrics().size, 1);
    assert.equal(cache.get("c"), 3);
  });

  test("metrics returns a snapshot object", () => {
    const cache = createBoundedMemoryBackendCache<string>(5);
    cache.set("x", "y");
    cache.get("x");
    cache.get("missing");
    const m: BackendCacheMetrics = cache.metrics();
    assert.equal(m.hits, 1);
    assert.equal(m.misses, 1);
    assert.equal(m.size, 1);
    assert.equal(m.maxSize, 5);
    assert.equal(m.evictions, 0);
  });

  test("works with complex value types", () => {
    const cache = createBoundedMemoryBackendCache<{ name: string }>(5);
    const obj = { name: "test" };
    cache.set("k", obj);
    assert.deepEqual(cache.get("k"), { name: "test" });
  });

  test("uses parseBackendCacheMaxTenants default when no arg given", () => {
    const cache = createBoundedMemoryBackendCache();
    assert.equal(cache.metrics().maxSize, 1024);
  });
});
