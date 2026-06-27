import { describe, it, expect } from "vitest";
import { BloomFilter2D } from "../bloom-filter-2d.js";

describe("BloomFilter2D", () => {
  it("add and test returns true for added points", () => {
    const bf = new BloomFilter2D(100, 100, 3);
    bf.add(10, 20);
    expect(bf.test(10, 20)).toBe(true);
  });

  it("test returns false for points not added", () => {
    const bf = new BloomFilter2D(100, 100, 3);
    expect(bf.test(50, 50)).toBe(false);
  });

  it("size tracks number of additions", () => {
    const bf = new BloomFilter2D(100, 100);
    bf.add(1, 1);
    bf.add(2, 2);
    bf.add(3, 3);
    expect(bf.size()).toBe(3);
  });

  it("clear resets all bits and count", () => {
    const bf = new BloomFilter2D(100, 100);
    bf.add(5, 5);
    bf.add(10, 10);
    bf.clear();
    expect(bf.size()).toBe(0);
    expect(bf.test(5, 5)).toBe(false);
  });

  it("falsePositiveRate returns a number between 0 and 1", () => {
    const bf = new BloomFilter2D(100, 100, 3);
    for (let i = 0; i < 10; i++) bf.add(i, i);
    const rate = bf.falsePositiveRate();
    expect(rate).toBeGreaterThanOrEqual(0);
    expect(rate).toBeLessThanOrEqual(1);
  });

  it("fillRatio increases as items are added", () => {
    const bf = new BloomFilter2D(50, 50, 3);
    const before = bf.fillRatio();
    for (let i = 0; i < 20; i++) bf.add(i, i * 2);
    const after = bf.fillRatio();
    expect(after).toBeGreaterThan(before);
  });

  it("union combines two filters", () => {
    const a = new BloomFilter2D(100, 100, 3);
    const b = new BloomFilter2D(100, 100, 3);
    a.add(1, 1);
    b.add(2, 2);
    const u = a.union(b);
    expect(u.test(1, 1)).toBe(true);
    expect(u.test(2, 2)).toBe(true);
  });

  it("intersection keeps only common bits", () => {
    const a = new BloomFilter2D(100, 100, 3);
    const b = new BloomFilter2D(100, 100, 3);
    a.add(1, 1);
    b.add(1, 1);
    a.add(2, 2);
    const inter = a.intersection(b);
    expect(inter.test(1, 1)).toBe(true);
  });
});
