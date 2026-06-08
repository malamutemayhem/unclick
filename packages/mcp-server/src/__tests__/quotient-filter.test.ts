import { describe, it, expect } from "vitest";
import { QuotientFilter } from "../quotient-filter.js";

describe("QuotientFilter", () => {
  it("insert and mayContain", () => {
    const qf = new QuotientFilter(8);
    qf.insert("apple");
    qf.insert("banana");
    expect(qf.mayContain("apple")).toBe(true);
    expect(qf.mayContain("banana")).toBe(true);
  });

  it("mayContain returns false for missing items", () => {
    const qf = new QuotientFilter(8);
    qf.insert("hello");
    expect(qf.mayContain("world")).toBe(false);
  });

  it("count tracks insertions", () => {
    const qf = new QuotientFilter(4);
    qf.insert("a");
    qf.insert("b");
    qf.insert("c");
    expect(qf.count()).toBe(3);
  });

  it("loadFactor reflects usage", () => {
    const qf = new QuotientFilter(4);
    expect(qf.loadFactor()).toBe(0);
    qf.insert("test");
    expect(qf.loadFactor()).toBeGreaterThan(0);
  });

  it("capacity reflects quotient bits", () => {
    const qf = new QuotientFilter(6);
    expect(qf.capacity()).toBe(64);
  });

  it("handles many insertions", () => {
    const qf = new QuotientFilter(8);
    for (let i = 0; i < 100; i++) qf.insert(`item-${i}`);
    expect(qf.count()).toBe(100);
    let found = 0;
    for (let i = 0; i < 100; i++) {
      if (qf.mayContain(`item-${i}`)) found++;
    }
    expect(found).toBeGreaterThan(80);
  });

  it("empty filter contains nothing", () => {
    const qf = new QuotientFilter(4);
    expect(qf.mayContain("anything")).toBe(false);
    expect(qf.count()).toBe(0);
  });
});
