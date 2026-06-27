import { describe, it, expect } from "vitest";
import { ReservoirSampler, sample, weightedSample } from "../reservoir-sampling.js";

describe("ReservoirSampler", () => {
  it("collects up to capacity", () => {
    const rs = new ReservoirSampler<number>(3);
    rs.add(1);
    rs.add(2);
    expect(rs.sample).toEqual([1, 2]);
    expect(rs.filled).toBe(false);
    rs.add(3);
    expect(rs.filled).toBe(true);
    expect(rs.sample).toHaveLength(3);
  });

  it("maintains capacity after overflow", () => {
    const rs = new ReservoirSampler<number>(3);
    for (let i = 0; i < 100; i++) rs.add(i);
    expect(rs.sample).toHaveLength(3);
    expect(rs.seen).toBe(100);
  });

  it("addAll processes iterables", () => {
    const rs = new ReservoirSampler<number>(5);
    rs.addAll([1, 2, 3, 4, 5, 6, 7]);
    expect(rs.sample).toHaveLength(5);
    expect(rs.seen).toBe(7);
  });

  it("reset clears state", () => {
    const rs = new ReservoirSampler<number>(3);
    rs.addAll([1, 2, 3, 4]);
    rs.reset();
    expect(rs.sample).toEqual([]);
    expect(rs.seen).toBe(0);
    expect(rs.filled).toBe(false);
  });

  it("reports capacity", () => {
    const rs = new ReservoirSampler<string>(10);
    expect(rs.capacity).toBe(10);
  });

  it("sample returns a copy", () => {
    const rs = new ReservoirSampler<number>(2);
    rs.add(1);
    rs.add(2);
    const s = rs.sample;
    s.push(999);
    expect(rs.sample).toHaveLength(2);
  });
});

describe("sample", () => {
  it("returns k items from array", () => {
    const result = sample([1, 2, 3, 4, 5], 3);
    expect(result).toHaveLength(3);
  });

  it("returns all items when k equals length", () => {
    const items = [1, 2, 3];
    const result = sample(items, 3);
    expect(result).toHaveLength(3);
    expect(result.sort()).toEqual([1, 2, 3]);
  });

  it("returns empty for k=0", () => {
    expect(sample([1, 2, 3], 0)).toEqual([]);
  });
});

describe("weightedSample", () => {
  it("returns k items", () => {
    const result = weightedSample(["a", "b", "c", "d"], [1, 1, 1, 1], 2);
    expect(result).toHaveLength(2);
  });

  it("throws for mismatched lengths", () => {
    expect(() => weightedSample([1, 2], [1], 1)).toThrow("equal length");
  });

  it("throws when k exceeds population", () => {
    expect(() => weightedSample([1], [1], 5)).toThrow("exceeds population");
  });

  it("heavily weighted items appear more often", () => {
    let heavyCount = 0;
    for (let trial = 0; trial < 100; trial++) {
      const result = weightedSample(["rare", "common"], [0.001, 1000], 1);
      if (result[0] === "common") heavyCount++;
    }
    expect(heavyCount).toBeGreaterThan(80);
  });
});
