import { describe, it, expect } from "vitest";
import { BloomFilter } from "../bloom-filter.js";

describe("BloomFilter", () => {
  it("adds and checks items", () => {
    const bf = new BloomFilter(100);
    bf.add("hello");
    bf.add("world");
    expect(bf.mightContain("hello")).toBe(true);
    expect(bf.mightContain("world")).toBe(true);
  });

  it("returns false for items not added", () => {
    const bf = new BloomFilter(100);
    bf.add("hello");
    expect(bf.mightContain("goodbye")).toBe(false);
  });

  it("tracks size", () => {
    const bf = new BloomFilter(100);
    bf.add("a");
    bf.add("b");
    expect(bf.size).toBe(2);
  });

  it("reports capacity and hash functions", () => {
    const bf = new BloomFilter(100, 0.01);
    expect(bf.capacity).toBeGreaterThan(0);
    expect(bf.hashFunctions).toBeGreaterThan(0);
  });

  it("fill ratio increases with additions", () => {
    const bf = new BloomFilter(10);
    const before = bf.fillRatio();
    for (let i = 0; i < 10; i++) bf.add(`item${i}`);
    expect(bf.fillRatio()).toBeGreaterThan(before);
  });

  it("clear resets filter", () => {
    const bf = new BloomFilter(100);
    bf.add("test");
    bf.clear();
    expect(bf.size).toBe(0);
    expect(bf.mightContain("test")).toBe(false);
  });

  it("handles many items with low false positive rate", () => {
    const bf = new BloomFilter(1000, 0.01);
    for (let i = 0; i < 1000; i++) bf.add(`item_${i}`);
    let falsePositives = 0;
    for (let i = 0; i < 1000; i++) {
      if (bf.mightContain(`other_${i}`)) falsePositives++;
    }
    expect(falsePositives).toBeLessThan(50);
  });

  it("no false negatives", () => {
    const bf = new BloomFilter(100);
    const items = ["alpha", "beta", "gamma", "delta", "epsilon"];
    for (const item of items) bf.add(item);
    for (const item of items) expect(bf.mightContain(item)).toBe(true);
  });
});
