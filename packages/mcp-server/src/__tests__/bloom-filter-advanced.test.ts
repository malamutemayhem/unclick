import { describe, it, expect } from "vitest";
import { BloomFilter, CountingBloomFilter } from "../bloom-filter-advanced.js";

describe("BloomFilter", () => {
  it("adds and checks items", () => {
    const bf = new BloomFilter(100);
    bf.add("hello");
    bf.add("world");
    expect(bf.mightContain("hello")).toBe(true);
    expect(bf.mightContain("world")).toBe(true);
  });

  it("reports false for unseen items (probabilistic)", () => {
    const bf = new BloomFilter(1000, 0.001);
    bf.add("alpha");
    bf.add("beta");
    let falsePositives = 0;
    for (let i = 0; i < 100; i++) {
      if (bf.mightContain(`test-item-${i}`)) falsePositives++;
    }
    expect(falsePositives).toBeLessThan(10);
  });

  it("counts insertions", () => {
    const bf = new BloomFilter(100);
    bf.add("a");
    bf.add("b");
    bf.add("c");
    expect(bf.count()).toBe(3);
  });

  it("clears the filter", () => {
    const bf = new BloomFilter(100);
    bf.add("hello");
    bf.clear();
    expect(bf.mightContain("hello")).toBe(false);
    expect(bf.count()).toBe(0);
  });

  it("reports bit size and hash functions", () => {
    const bf = new BloomFilter(100, 0.01);
    expect(bf.bitSize()).toBeGreaterThan(0);
    expect(bf.hashFunctions()).toBeGreaterThan(0);
  });

  it("computes estimated false positive rate", () => {
    const bf = new BloomFilter(100, 0.01);
    for (let i = 0; i < 50; i++) {
      bf.add(`item-${i}`);
    }
    const fpr = bf.estimatedFalsePositiveRate();
    expect(fpr).toBeGreaterThanOrEqual(0);
    expect(fpr).toBeLessThanOrEqual(1);
  });

  it("merges two filters", () => {
    const a = new BloomFilter(100, 0.01);
    const b = new BloomFilter(100, 0.01);
    a.add("hello");
    b.add("world");
    const merged = a.merge(b);
    expect(merged.mightContain("hello")).toBe(true);
    expect(merged.mightContain("world")).toBe(true);
  });

  it("throws when merging incompatible filters", () => {
    const a = new BloomFilter(100, 0.01);
    const b = new BloomFilter(200, 0.01);
    expect(() => a.merge(b)).toThrow();
  });
});

describe("CountingBloomFilter", () => {
  it("adds and checks items", () => {
    const cbf = new CountingBloomFilter(100);
    cbf.add("hello");
    expect(cbf.mightContain("hello")).toBe(true);
  });

  it("removes items", () => {
    const cbf = new CountingBloomFilter(100);
    cbf.add("hello");
    expect(cbf.remove("hello")).toBe(true);
    expect(cbf.mightContain("hello")).toBe(false);
  });

  it("returns false when removing absent item", () => {
    const cbf = new CountingBloomFilter(100);
    expect(cbf.remove("missing")).toBe(false);
  });

  it("counts insertions", () => {
    const cbf = new CountingBloomFilter(100);
    cbf.add("a");
    cbf.add("b");
    expect(cbf.count()).toBe(2);
    cbf.remove("a");
    expect(cbf.count()).toBe(1);
  });
});
