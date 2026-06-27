import { describe, it, expect } from "vitest";
import { CacheSim } from "../cache-sim.js";

describe("CacheSim", () => {
  it("first read is a miss", () => {
    const cache = new CacheSim(4, 1);
    const r = cache.read(0x100);
    expect(r.hit).toBe(false);
  });

  it("second read to same address is a hit", () => {
    const cache = new CacheSim(4, 1);
    cache.read(0x100);
    const r = cache.read(0x100);
    expect(r.hit).toBe(true);
  });

  it("write miss then read hit", () => {
    const cache = new CacheSim(4, 1);
    cache.write(0x100, 42);
    const r = cache.read(0x100);
    expect(r.hit).toBe(true);
  });

  it("write hit updates data", () => {
    const cache = new CacheSim(4, 1);
    cache.write(0x100, 10);
    const w = cache.write(0x100, 20);
    expect(w.hit).toBe(true);
  });

  it("tracks hits and misses", () => {
    const cache = new CacheSim(4, 1);
    cache.read(0x100);
    cache.read(0x100);
    cache.read(0x200);
    const stats = cache.getStats();
    expect(stats.hits).toBe(1);
    expect(stats.misses).toBe(2);
    expect(stats.reads).toBe(3);
  });

  it("hit rate calculated correctly", () => {
    const cache = new CacheSim(4, 1);
    cache.read(0x100);
    cache.read(0x100);
    expect(cache.getStats().hitRate).toBe(0.5);
  });

  it("LRU eviction", () => {
    const cache = new CacheSim(2, 2, 64, "LRU");
    cache.read(0x000);
    cache.read(0x100);
    cache.read(0x000);
    cache.read(0x200);
    const r = cache.read(0x000);
    expect(r.hit).toBe(true);
  });

  it("flush clears dirty lines", () => {
    const cache = new CacheSim(16, 4);
    cache.write(0x100, 1);
    cache.write(0x200, 2);
    const flushed = cache.flush();
    expect(flushed).toBe(2);
  });

  it("invalidate clears all lines", () => {
    const cache = new CacheSim(4, 1);
    cache.read(0x100);
    cache.read(0x200);
    cache.invalidate();
    expect(cache.read(0x100).hit).toBe(false);
  });

  it("resetStats clears counters", () => {
    const cache = new CacheSim(4, 1);
    cache.read(0x100);
    cache.resetStats();
    expect(cache.getStats().reads).toBe(0);
  });

  it("eviction increments stat", () => {
    const cache = new CacheSim(1, 1);
    cache.read(0x000);
    cache.read(0x100);
    expect(cache.getStats().evictions).toBe(1);
  });

  it("set-associative has correct dimensions", () => {
    const cache = new CacheSim(8, 2);
    expect(cache.setCount).toBe(4);
    expect(cache.ways).toBe(2);
  });

  it("totalCapacity", () => {
    const cache = new CacheSim(8, 2, 64);
    expect(cache.totalCapacity).toBe(8 * 64);
  });
});
