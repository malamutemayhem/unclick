import { describe, it, expect } from "vitest";
import { BloomFilter } from "../bloom-filter.js";

describe("BloomFilter", () => {
  it("reports added items as possibly present", () => {
    const bf = new BloomFilter(1000, 3);
    bf.add("hello");
    bf.add("world");
    expect(bf.mightContain("hello")).toBe(true);
    expect(bf.mightContain("world")).toBe(true);
  });

  it("reports unknown items as absent (with high probability)", () => {
    const bf = new BloomFilter(10000, 5);
    bf.add("alpha");
    bf.add("beta");
    let falsePositives = 0;
    for (let i = 0; i < 100; i++) {
      if (bf.mightContain(`random_${i}`)) falsePositives++;
    }
    expect(falsePositives).toBeLessThan(10);
  });

  it("tracks count", () => {
    const bf = new BloomFilter(1000);
    bf.add("a");
    bf.add("b");
    bf.add("c");
    expect(bf.count).toBe(3);
  });

  it("computes false positive rate", () => {
    const bf = new BloomFilter(1000, 3);
    expect(bf.falsePositiveRate).toBe(0);
    bf.add("x");
    expect(bf.falsePositiveRate).toBeGreaterThan(0);
    expect(bf.falsePositiveRate).toBeLessThan(1);
  });

  it("clear resets everything", () => {
    const bf = new BloomFilter(1000, 3);
    bf.add("hello");
    bf.clear();
    expect(bf.count).toBe(0);
    expect(bf.mightContain("hello")).toBe(false);
  });
});
