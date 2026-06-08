import { describe, it, expect } from "vitest";
import { BloomFilter } from "../bloom-filter.js";

describe("BloomFilter", () => {
  it("reports added items as possibly present", () => {
    const bf = new BloomFilter(100);
    bf.add("hello");
    bf.add("world");
    expect(bf.test("hello")).toBe(true);
    expect(bf.test("world")).toBe(true);
  });

  it("reports non-added items as absent (mostly)", () => {
    const bf = new BloomFilter(1000, 0.001);
    for (let i = 0; i < 100; i++) bf.add(`item-${i}`);
    let falsePositives = 0;
    for (let i = 100; i < 200; i++) {
      if (bf.test(`item-${i}`)) falsePositives++;
    }
    expect(falsePositives).toBeLessThan(10);
  });

  it("tracks count", () => {
    const bf = new BloomFilter(100);
    bf.add("a");
    bf.add("b");
    expect(bf.count).toBe(2);
  });

  it("clears the filter", () => {
    const bf = new BloomFilter(100);
    bf.add("hello");
    bf.clear();
    expect(bf.test("hello")).toBe(false);
    expect(bf.count).toBe(0);
  });

  it("has positive size and hash count", () => {
    const bf = new BloomFilter(100, 0.01);
    expect(bf.size).toBeGreaterThan(0);
    expect(bf.hashCount).toBeGreaterThan(0);
  });

  it("handles empty string", () => {
    const bf = new BloomFilter(100);
    bf.add("");
    expect(bf.test("")).toBe(true);
  });
});
