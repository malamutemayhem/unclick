import { describe, it, expect } from "vitest";
import { lruSimulate } from "./lrucache-tool.js";

describe("lruSimulate", () => {
  it("computes hit rate for simple access pattern", async () => {
    const r = await lruSimulate({
      accesses: ["a", "b", "c", "a", "b", "d", "a"],
      capacity: 3,
    }) as any;
    expect(r.capacity).toBe(3);
    expect(r.total_accesses).toBe(7);
    expect(r.hits + r.misses).toBe(7);
    expect(r.hit_rate).toBeGreaterThan(0);
  });

  it("cache too small causes evictions", async () => {
    const r = await lruSimulate({
      accesses: ["a", "b", "c", "d"],
      capacity: 2,
    }) as any;
    expect(r.total_evictions).toBe(2);
    expect(r.final_cache_state).toHaveLength(2);
  });

  it("all hits when all fit", async () => {
    const r = await lruSimulate({
      accesses: ["a", "b", "a", "b", "a"],
      capacity: 10,
    }) as any;
    expect(r.hits).toBe(3);
    expect(r.misses).toBe(2);
  });

  it("all misses for unique keys with cap 1", async () => {
    const r = await lruSimulate({
      accesses: ["a", "b", "c"],
      capacity: 1,
    }) as any;
    expect(r.hits).toBe(0);
    expect(r.misses).toBe(3);
  });

  it("stamps meta", async () => {
    const r = await lruSimulate({
      accesses: ["a"],
      capacity: 1,
    }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
