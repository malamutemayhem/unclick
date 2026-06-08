import { describe, it, expect } from "vitest";
import { BloomFilter } from "../bloom-filter.js";

describe("BloomFilter", () => {
  it("reports added items as possibly present", () => {
    const bf = new BloomFilter(100);
    bf.add("hello");
    bf.add("world");
    expect(bf.mightContain("hello")).toBe(true);
    expect(bf.mightContain("world")).toBe(true);
  });

  it("reports missing items as absent (usually)", () => {
    const bf = new BloomFilter(1000);
    bf.add("hello");
    expect(bf.mightContain("goodbye")).toBe(false);
    expect(bf.mightContain("test123")).toBe(false);
  });

  it("tracks item count", () => {
    const bf = new BloomFilter(100);
    bf.add("a");
    bf.add("b");
    expect(bf.size).toBe(2);
  });

  it("has reasonable capacity", () => {
    const bf = new BloomFilter(1000, 0.01);
    expect(bf.capacity).toBeGreaterThan(1000);
  });

  it("low false positive rate with proper sizing", () => {
    const bf = new BloomFilter(10000, 0.01);
    for (let i = 0; i < 10000; i++) bf.add(`item-${i}`);
    let falsePositives = 0;
    for (let i = 0; i < 10000; i++) {
      if (bf.mightContain(`other-${i}`)) falsePositives++;
    }
    expect(falsePositives / 10000).toBeLessThan(0.05);
  });
});
