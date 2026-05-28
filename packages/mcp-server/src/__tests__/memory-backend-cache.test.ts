import { describe, expect, it } from "vitest";

import {
  createBoundedMemoryBackendCache,
  parseBackendCacheMaxTenants,
} from "../memory/db.js";

describe("bounded MCP memory backend cache", () => {
  it("uses a generous bounded default and clamps unsafe env input", () => {
    const previous = process.env.UNCLICK_MEMORY_BACKEND_CACHE_MAX_TENANTS;
    delete process.env.UNCLICK_MEMORY_BACKEND_CACHE_MAX_TENANTS;
    try {
      expect(parseBackendCacheMaxTenants()).toBe(1024);
    } finally {
      if (previous === undefined) {
        delete process.env.UNCLICK_MEMORY_BACKEND_CACHE_MAX_TENANTS;
      } else {
        process.env.UNCLICK_MEMORY_BACKEND_CACHE_MAX_TENANTS = previous;
      }
    }
    expect(parseBackendCacheMaxTenants("")).toBe(1024);
    expect(parseBackendCacheMaxTenants("0")).toBe(1024);
    expect(parseBackendCacheMaxTenants("not-a-number")).toBe(1024);
    expect(parseBackendCacheMaxTenants("3")).toBe(3);
    expect(parseBackendCacheMaxTenants("250000")).toBe(100000);
  });

  it("records hits, misses, and LRU evictions without exposing tenant keys", () => {
    const cache = createBoundedMemoryBackendCache<string>(2);

    cache.set("tenant-a", "backend-a");
    cache.set("tenant-b", "backend-b");
    expect(cache.get("tenant-a")).toBe("backend-a");

    cache.set("tenant-c", "backend-c");

    expect(cache.get("tenant-b")).toBeNull();
    expect(cache.get("tenant-a")).toBe("backend-a");
    expect(cache.get("tenant-c")).toBe("backend-c");
    expect(cache.metrics()).toEqual({
      hits: 3,
      misses: 1,
      evictions: 1,
      size: 2,
      maxSize: 2,
    });
    expect(JSON.stringify(cache.metrics())).not.toContain("tenant-");
  });

  it("refreshes recency when an existing key is replaced", () => {
    const cache = createBoundedMemoryBackendCache<string>(2);

    cache.set("tenant-a", "backend-a1");
    cache.set("tenant-b", "backend-b");
    cache.set("tenant-a", "backend-a2");
    cache.set("tenant-c", "backend-c");

    expect(cache.get("tenant-a")).toBe("backend-a2");
    expect(cache.get("tenant-b")).toBeNull();
    expect(cache.get("tenant-c")).toBe("backend-c");
  });
});
