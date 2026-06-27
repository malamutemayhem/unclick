import { describe, it, expect } from "vitest";
import { exponentialDecay, linearDecay, stepDecay, noDecay, applyDecay, rankByRecency, filterStale } from "../temporal-decay.js";

describe("exponentialDecay", () => {
  it("returns 1 at age 0", () => {
    expect(exponentialDecay(60000)(0)).toBeCloseTo(1);
  });

  it("returns ~0.5 at half-life", () => {
    expect(exponentialDecay(60000)(60000)).toBeCloseTo(0.5, 1);
  });

  it("approaches 0 for very old items", () => {
    expect(exponentialDecay(1000)(100000)).toBeLessThan(0.001);
  });
});

describe("linearDecay", () => {
  it("returns 1 at age 0", () => {
    expect(linearDecay(10000)(0)).toBe(1);
  });

  it("returns 0.5 at half maxAge", () => {
    expect(linearDecay(10000)(5000)).toBeCloseTo(0.5);
  });

  it("returns 0 at or beyond maxAge", () => {
    expect(linearDecay(10000)(10000)).toBe(0);
    expect(linearDecay(10000)(15000)).toBe(0);
  });
});

describe("stepDecay", () => {
  it("returns correct scores at thresholds", () => {
    const decay = stepDecay([
      { ageMs: 0, score: 1 },
      { ageMs: 60000, score: 0.5 },
      { ageMs: 120000, score: 0.1 },
    ]);
    expect(decay(0)).toBe(1);
    expect(decay(30000)).toBe(1);
    expect(decay(60000)).toBe(0.5);
    expect(decay(90000)).toBe(0.5);
    expect(decay(120000)).toBe(0.1);
  });
});

describe("noDecay", () => {
  it("always returns 1", () => {
    const decay = noDecay();
    expect(decay(0)).toBe(1);
    expect(decay(999999)).toBe(1);
  });
});

describe("applyDecay", () => {
  it("applies decay factor to scores", () => {
    const now = Date.now();
    const entries = [
      { item: "recent", baseScore: 1, timestamp: now },
      { item: "old", baseScore: 1, timestamp: now - 60000 },
    ];
    const results = applyDecay(entries, exponentialDecay(60000), now);
    expect(results[0].score).toBeCloseTo(1);
    expect(results[1].score).toBeCloseTo(0.5, 1);
  });
});

describe("rankByRecency", () => {
  it("ranks recent items higher", () => {
    const now = Date.now();
    const entries = [
      { item: "old", baseScore: 1, timestamp: now - 100000 },
      { item: "new", baseScore: 1, timestamp: now },
    ];
    const ranked = rankByRecency(entries, exponentialDecay(10000), now);
    expect(ranked[0].item).toBe("new");
  });
});

describe("filterStale", () => {
  it("removes items below threshold", () => {
    const now = Date.now();
    const entries = [
      { item: "fresh", baseScore: 1, timestamp: now },
      { item: "stale", baseScore: 0.001, timestamp: now - 100000 },
    ];
    const filtered = filterStale(entries, exponentialDecay(1000), 0.01, now);
    expect(filtered.length).toBe(1);
    expect(filtered[0].item).toBe("fresh");
  });
});
