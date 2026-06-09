import { describe, it, expect } from "vitest";
import { XorFilter, QuotientFilter } from "../xor-filter.js";

describe("XorFilter", () => {
  it("contains all inserted items", () => {
    const items = ["apple", "banana", "cherry", "date", "elderberry"];
    const filter = new XorFilter(items);
    for (const item of items) {
      expect(filter.contains(item)).toBe(true);
    }
  });

  it("rejects most non-members", () => {
    const items = Array.from({ length: 100 }, (_, i) => `item${i}`);
    const filter = new XorFilter(items);
    let falsePositives = 0;
    for (let i = 0; i < 1000; i++) {
      if (filter.contains(`nonmember${i}`)) falsePositives++;
    }
    expect(falsePositives).toBeLessThan(50);
  });

  it("reports filter size", () => {
    const items = ["a", "b", "c"];
    const filter = new XorFilter(items);
    expect(filter.filterSize).toBeGreaterThan(0);
  });

  it("handles single item", () => {
    const filter = new XorFilter(["only"]);
    expect(filter.contains("only")).toBe(true);
  });

  it("handles larger sets", () => {
    const items = Array.from({ length: 500 }, (_, i) => `key${i}`);
    const filter = new XorFilter(items);
    let hits = 0;
    for (const item of items) {
      if (filter.contains(item)) hits++;
    }
    expect(hits).toBe(500);
  });
});

describe("QuotientFilter", () => {
  it("inserts and queries items", () => {
    const qf = new QuotientFilter(8);
    qf.insert("hello");
    expect(qf.mightContain("hello")).toBe(true);
  });

  it("reports absent items as not present (usually)", () => {
    const qf = new QuotientFilter(12);
    qf.insert("a");
    qf.insert("b");
    expect(qf.mightContain("zzzzzzzzz")).toBe(false);
  });

  it("tracks size and capacity", () => {
    const qf = new QuotientFilter(8);
    expect(qf.capacity).toBe(256);
    qf.insert("x");
    expect(qf.size).toBe(1);
  });

  it("loadFactor increases with insertions", () => {
    const qf = new QuotientFilter(8);
    const initial = qf.loadFactor;
    for (let i = 0; i < 10; i++) qf.insert(`item${i}`);
    expect(qf.loadFactor).toBeGreaterThan(initial);
  });
});
