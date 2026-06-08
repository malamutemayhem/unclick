import { describe, it, expect } from "vitest";
import { BloomFilter, createBloomFilter } from "../bloom-filter.js";

describe("BloomFilter", () => {
  it("reports has after add", () => {
    const bf = new BloomFilter(1000, 3);
    bf.add("hello");
    expect(bf.has("hello")).toBe(true);
  });

  it("reports false for absent items", () => {
    const bf = new BloomFilter(1000, 3);
    bf.add("hello");
    expect(bf.has("world")).toBe(false);
  });

  it("tracks item count", () => {
    const bf = new BloomFilter(1000, 3);
    bf.add("a");
    bf.add("b");
    expect(bf.itemCount).toBe(2);
  });

  it("falsePositiveRate computes", () => {
    const bf = new BloomFilter(1000, 3);
    expect(bf.falsePositiveRate()).toBe(0);
    bf.add("x");
    expect(bf.falsePositiveRate()).toBeGreaterThan(0);
  });

  it("clear resets", () => {
    const bf = new BloomFilter(1000, 3);
    bf.add("test");
    bf.clear();
    expect(bf.has("test")).toBe(false);
    expect(bf.itemCount).toBe(0);
  });

  it("handles many items", () => {
    const bf = new BloomFilter(10000, 5);
    for (let i = 0; i < 100; i++) bf.add(`item-${i}`);
    let present = 0;
    for (let i = 0; i < 100; i++) {
      if (bf.has(`item-${i}`)) present++;
    }
    expect(present).toBe(100);
  });
});

describe("createBloomFilter", () => {
  it("creates filter with auto-sized params", () => {
    const bf = createBloomFilter(1000, 0.01);
    for (let i = 0; i < 100; i++) bf.add(`key-${i}`);
    let found = 0;
    for (let i = 0; i < 100; i++) {
      if (bf.has(`key-${i}`)) found++;
    }
    expect(found).toBe(100);
  });
});
