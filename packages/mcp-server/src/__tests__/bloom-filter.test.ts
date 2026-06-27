import { describe, it, expect } from "vitest";
import { BloomFilter } from "../bloom-filter.js";

describe("BloomFilter", () => {
  it("add and has returns true", () => {
    const bf = new BloomFilter(100);
    bf.add("hello");
    expect(bf.has("hello")).toBe(true);
  });

  it("has returns false for absent items", () => {
    const bf = new BloomFilter(100);
    bf.add("hello");
    expect(bf.has("world")).toBe(false);
  });

  it("count tracks additions", () => {
    const bf = new BloomFilter(100);
    expect(bf.count).toBe(0);
    bf.add("a");
    bf.add("b");
    expect(bf.count).toBe(2);
  });

  it("clear resets filter", () => {
    const bf = new BloomFilter(100);
    bf.add("hello");
    bf.clear();
    expect(bf.has("hello")).toBe(false);
    expect(bf.count).toBe(0);
  });

  it("sizeInBytes returns buffer size", () => {
    const bf = new BloomFilter(1000);
    expect(bf.sizeInBytes).toBeGreaterThan(0);
  });

  it("estimatedFalsePositiveRate increases with items", () => {
    const bf = new BloomFilter(100, 0.01);
    const rate0 = bf.estimatedFalsePositiveRate();
    for (let i = 0; i < 50; i++) bf.add(`item-${i}`);
    expect(bf.estimatedFalsePositiveRate()).toBeGreaterThan(rate0);
  });

  it("handles many items with low false positive rate", () => {
    const bf = new BloomFilter(1000, 0.01);
    for (let i = 0; i < 1000; i++) bf.add(`key-${i}`);
    let falsePositives = 0;
    for (let i = 0; i < 1000; i++) {
      if (bf.has(`other-${i}`)) falsePositives++;
    }
    expect(falsePositives).toBeLessThan(50);
  });
});
