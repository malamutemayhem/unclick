import { describe, it, expect } from "vitest";
import { CountingBloomFilter, CountMinSketch, HyperLogLog } from "../counting-filter.js";

describe("CountingBloomFilter", () => {
  it("reports added items as present", () => {
    const bf = new CountingBloomFilter(1024, 3);
    bf.add("hello");
    bf.add("world");
    expect(bf.mightContain("hello")).toBe(true);
    expect(bf.mightContain("world")).toBe(true);
  });

  it("reports missing items as absent (usually)", () => {
    const bf = new CountingBloomFilter(10000, 5);
    bf.add("a");
    bf.add("b");
    expect(bf.mightContain("zzzzzzz")).toBe(false);
  });

  it("supports removal", () => {
    const bf = new CountingBloomFilter(1024, 3);
    bf.add("item");
    expect(bf.remove("item")).toBe(true);
    expect(bf.mightContain("item")).toBe(false);
  });

  it("remove returns false for absent item", () => {
    const bf = new CountingBloomFilter(1024, 3);
    expect(bf.remove("nope")).toBe(false);
  });

  it("tracks count", () => {
    const bf = new CountingBloomFilter();
    bf.add("a");
    bf.add("b");
    expect(bf.count).toBe(2);
  });

  it("clear resets state", () => {
    const bf = new CountingBloomFilter();
    bf.add("x");
    bf.clear();
    expect(bf.count).toBe(0);
    expect(bf.mightContain("x")).toBe(false);
  });

  it("estimateFPR returns a number", () => {
    const bf = new CountingBloomFilter(1024, 3);
    for (let i = 0; i < 100; i++) bf.add(`item${i}`);
    const fpr = bf.estimateFPR();
    expect(fpr).toBeGreaterThanOrEqual(0);
    expect(fpr).toBeLessThanOrEqual(1);
  });
});

describe("CountMinSketch", () => {
  it("estimates frequency", () => {
    const cms = new CountMinSketch(1024, 4);
    cms.add("a", 5);
    cms.add("b", 3);
    expect(cms.estimate("a")).toBe(5);
    expect(cms.estimate("b")).toBe(3);
  });

  it("returns 0 for unseen items", () => {
    const cms = new CountMinSketch();
    expect(cms.estimate("unknown")).toBe(0);
  });

  it("accumulates counts", () => {
    const cms = new CountMinSketch();
    cms.add("x");
    cms.add("x");
    cms.add("x");
    expect(cms.estimate("x")).toBe(3);
  });
});

describe("HyperLogLog", () => {
  it("estimates cardinality for small sets", () => {
    const hll = new HyperLogLog(10);
    for (let i = 0; i < 100; i++) hll.add(`item${i}`);
    const est = hll.estimate();
    expect(est).toBeGreaterThan(50);
    expect(est).toBeLessThan(200);
  });

  it("handles duplicates", () => {
    const hll = new HyperLogLog(10);
    for (let i = 0; i < 1000; i++) hll.add("same");
    const est = hll.estimate();
    expect(est).toBeLessThan(5);
  });

  it("clear resets", () => {
    const hll = new HyperLogLog(8);
    hll.add("a");
    hll.clear();
    const est = hll.estimate();
    expect(est).toBe(0);
  });
});
