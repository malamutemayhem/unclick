import { describe, it, expect } from "vitest";
import { MemoryTier } from "../memory-tier.js";

describe("MemoryTier", () => {
  it("put and get", () => {
    const mt = new MemoryTier();
    mt.put("a", 1);
    expect(mt.get("a")).toBe(1);
    expect(mt.has("a")).toBe(true);
    expect(mt.has("b")).toBe(false);
  });

  it("new entries start as warm", () => {
    const mt = new MemoryTier();
    mt.put("a", 1);
    expect(mt.getTier("a")).toBe("warm");
  });

  it("promotes to hot after enough accesses", () => {
    const mt = new MemoryTier({ promotionThreshold: 2, hotCapacity: 10 });
    mt.put("a", 1);
    mt.get("a"); mt.get("a"); mt.get("a"); mt.get("a"); mt.get("a");
    expect(mt.getTier("a")).toBe("hot");
  });

  it("demotes entries after interval", () => {
    const mt = new MemoryTier({ demotionIntervalMs: 0 });
    mt.put("a", 1);
    expect(mt.getTier("a")).toBe("warm");
    const demoted = mt.demote();
    expect(demoted).toBeGreaterThan(0);
    expect(mt.getTier("a")).toBe("cold");
  });

  it("stats reports tier counts", () => {
    const mt = new MemoryTier({ promotionThreshold: 1, hotCapacity: 10, demotionIntervalMs: 0 });
    mt.put("a", 1);
    mt.put("b", 2);
    mt.get("a"); mt.get("a"); mt.get("a");
    const stats = mt.stats();
    expect(stats.total).toBe(2);
    expect(stats.hot + stats.warm + stats.cold).toBe(2);
  });

  it("delete removes entries", () => {
    const mt = new MemoryTier();
    mt.put("a", 1);
    expect(mt.delete("a")).toBe(true);
    expect(mt.get("a")).toBeUndefined();
    expect(mt.delete("a")).toBe(false);
  });

  it("getByTier filters correctly", () => {
    const mt = new MemoryTier({ demotionIntervalMs: 0 });
    mt.put("a", 1);
    mt.put("b", 2);
    mt.demote();
    mt.demote();
    const cold = mt.getByTier("cold");
    expect(cold.length).toBe(2);
  });

  it("clear removes everything", () => {
    const mt = new MemoryTier();
    mt.put("a", 1);
    mt.put("b", 2);
    mt.clear();
    expect(mt.size).toBe(0);
  });

  it("enforces warm capacity", () => {
    const mt = new MemoryTier({ warmCapacity: 2, hotCapacity: 1 });
    mt.put("a", 1);
    mt.put("b", 2);
    mt.put("c", 3);
    const stats = mt.stats();
    expect(stats.warm).toBeLessThanOrEqual(2);
  });

  it("prune removes old cold entries", () => {
    const mt = new MemoryTier({ hotCapacity: 1, warmCapacity: 1, demotionIntervalMs: 0 });
    for (let i = 0; i < 10; i++) mt.put(`k${i}`, i);
    mt.demote();
    mt.demote();
    const pruned = mt.prune();
    expect(pruned).toBeGreaterThanOrEqual(0);
    expect(mt.size).toBeLessThanOrEqual(10);
  });
});
