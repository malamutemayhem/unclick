import { describe, it, expect } from "vitest";
import { BloomFilter } from "../bloom-filter.js";

describe("BloomFilter", () => {
  it("reports added items as present", () => {
    const bf = new BloomFilter(1000, 3);
    bf.add("hello");
    bf.add("world");
    expect(bf.has("hello")).toBe(true);
    expect(bf.has("world")).toBe(true);
  });

  it("reports missing items as absent (usually)", () => {
    const bf = new BloomFilter(10000, 3);
    bf.add("hello");
    expect(bf.has("goodbye")).toBe(false);
  });

  it("tracks item count", () => {
    const bf = new BloomFilter(1000, 3);
    bf.add("a");
    bf.add("b");
    expect(bf.itemCount).toBe(2);
  });

  it("computes false positive rate", () => {
    const bf = new BloomFilter(1000, 3);
    for (let i = 0; i < 10; i++) bf.add(`item-${i}`);
    expect(bf.falsePositiveRate).toBeGreaterThanOrEqual(0);
    expect(bf.falsePositiveRate).toBeLessThan(1);
  });

  it("clears the filter", () => {
    const bf = new BloomFilter(1000, 3);
    bf.add("hello");
    bf.clear();
    expect(bf.has("hello")).toBe(false);
    expect(bf.itemCount).toBe(0);
  });

  it("optimal creates appropriately sized filter", () => {
    const bf = BloomFilter.optimal(1000, 0.01);
    for (let i = 0; i < 100; i++) bf.add(`item-${i}`);
    let falsePositives = 0;
    for (let i = 0; i < 1000; i++) {
      if (bf.has(`miss-${i}`)) falsePositives++;
    }
    expect(falsePositives).toBeLessThan(100);
  });
});
