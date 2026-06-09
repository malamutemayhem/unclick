import { describe, it, expect } from "vitest";
import { PageCache } from "../page-cache.js";

describe("PageCache", () => {
  it("fetch creates new page", () => {
    const cache = new PageCache(4, 64);
    const page = cache.fetch(1);
    expect(page.id).toBe(1);
    expect(page.data.length).toBe(64);
    expect(page.dirty).toBe(false);
    expect(cache.size).toBe(1);
  });

  it("fetch returns cached page on second call", () => {
    const cache = new PageCache(4, 64);
    const p1 = cache.fetch(1);
    p1.data[0] = 42;
    const p2 = cache.fetch(1);
    expect(p2.data[0]).toBe(42);
  });

  it("tracks hits and misses", () => {
    const cache = new PageCache(4, 64);
    cache.fetch(1);
    cache.fetch(1);
    cache.fetch(2);
    const stats = cache.stats;
    expect(stats.hits).toBe(1);
    expect(stats.misses).toBe(2);
  });

  it("hitRate calculation", () => {
    const cache = new PageCache(4, 64);
    cache.fetch(1);
    cache.fetch(1);
    expect(cache.hitRate).toBe(0.5);
  });

  it("evicts LRU page when full", () => {
    const cache = new PageCache(2, 64);
    cache.fetch(1);
    cache.fetch(2);
    cache.fetch(3);
    expect(cache.has(1)).toBe(false);
    expect(cache.has(2)).toBe(true);
    expect(cache.has(3)).toBe(true);
  });

  it("pinned pages are not evicted", () => {
    const cache = new PageCache(2, 64);
    cache.fetch(1);
    cache.pin(1);
    cache.fetch(2);
    cache.fetch(3);
    expect(cache.has(1)).toBe(true);
    expect(cache.has(2)).toBe(false);
  });

  it("unpin allows eviction", () => {
    const cache = new PageCache(2, 64);
    cache.fetch(1);
    cache.pin(1);
    cache.unpin(1);
    cache.fetch(2);
    cache.fetch(3);
    expect(cache.has(1)).toBe(false);
  });

  it("markDirty and flush", () => {
    const cache = new PageCache(4, 64);
    cache.fetch(1);
    cache.markDirty(1);
    expect(cache.getDirtyPages()).toContain(1);
    cache.flush(1);
    expect(cache.getDirtyPages()).not.toContain(1);
  });

  it("flushAll clears all dirty flags", () => {
    const cache = new PageCache(4, 64);
    cache.fetch(1);
    cache.fetch(2);
    cache.markDirty(1);
    cache.markDirty(2);
    const count = cache.flushAll();
    expect(count).toBe(2);
    expect(cache.getDirtyPages()).toHaveLength(0);
  });

  it("evict removes specific page", () => {
    const cache = new PageCache(4, 64);
    cache.fetch(1);
    cache.fetch(2);
    expect(cache.evict(1)).toBe(true);
    expect(cache.has(1)).toBe(false);
  });

  it("evict fails on pinned page", () => {
    const cache = new PageCache(4, 64);
    cache.fetch(1);
    cache.pin(1);
    expect(cache.evict(1)).toBe(false);
  });

  it("clear resets everything", () => {
    const cache = new PageCache(4, 64);
    cache.fetch(1);
    cache.fetch(2);
    cache.clear();
    expect(cache.size).toBe(0);
    expect(cache.hitRate).toBe(0);
  });

  it("pin returns false for non-existent page", () => {
    const cache = new PageCache(4, 64);
    expect(cache.pin(99)).toBe(false);
  });
});
