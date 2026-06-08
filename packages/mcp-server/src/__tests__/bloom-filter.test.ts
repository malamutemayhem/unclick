import { describe, it, expect } from "vitest";
import { BloomFilter } from "../bloom-filter.js";

describe("BloomFilter", () => {
  it("finds added items", () => {
    const bf = new BloomFilter(1000, 3);
    bf.add("hello");
    bf.add("world");
    expect(bf.mightContain("hello")).toBe(true);
    expect(bf.mightContain("world")).toBe(true);
  });

  it("probably rejects non-added items", () => {
    const bf = new BloomFilter(10000, 5);
    for (let i = 0; i < 100; i++) bf.add(`item-${i}`);
    let falsePositives = 0;
    for (let i = 1000; i < 2000; i++) {
      if (bf.mightContain(`item-${i}`)) falsePositives++;
    }
    expect(falsePositives).toBeLessThan(100);
  });

  it("tracks count", () => {
    const bf = new BloomFilter(100);
    bf.add("a");
    bf.add("b");
    expect(bf.count).toBe(2);
  });

  it("calculates false positive rate", () => {
    const bf = new BloomFilter(1000, 3);
    for (let i = 0; i < 50; i++) bf.add(`item-${i}`);
    expect(bf.falsePositiveRate).toBeGreaterThan(0);
    expect(bf.falsePositiveRate).toBeLessThan(1);
  });

  it("clear resets", () => {
    const bf = new BloomFilter(100);
    bf.add("x");
    bf.clear();
    expect(bf.count).toBe(0);
    expect(bf.mightContain("x")).toBe(false);
  });

  it("optimal creates sized filter", () => {
    const bf = BloomFilter.optimal(1000, 0.01);
    expect(bf).toBeInstanceOf(BloomFilter);
  });
});
