import { describe, it, expect } from "vitest";
import { BloomFilter } from "../bloom-filter.js";

describe("BloomFilter", () => {
  it("test returns true for added items", () => {
    const bf = new BloomFilter(1000, 3);
    bf.add("hello");
    bf.add("world");
    expect(bf.test("hello")).toBe(true);
    expect(bf.test("world")).toBe(true);
  });

  it("test returns false for items not added (low false positive)", () => {
    const bf = new BloomFilter(10000, 5);
    bf.add("apple");
    bf.add("banana");
    let falsePositives = 0;
    for (let i = 0; i < 100; i++) {
      if (bf.test("random_string_" + i)) falsePositives++;
    }
    expect(falsePositives).toBeLessThan(10);
  });

  it("clear resets the filter", () => {
    const bf = new BloomFilter(1000);
    bf.add("hello");
    expect(bf.test("hello")).toBe(true);
    bf.clear();
    expect(bf.test("hello")).toBe(false);
  });

  it("reports size", () => {
    const bf = new BloomFilter(256);
    expect(bf.size).toBe(256);
  });
});
