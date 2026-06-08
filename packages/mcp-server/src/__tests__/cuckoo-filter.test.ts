import { describe, it, expect } from "vitest";
import { CuckooFilter } from "../cuckoo-filter.js";

describe("CuckooFilter", () => {
  it("add and has", () => {
    const cf = new CuckooFilter(100);
    expect(cf.add("hello")).toBe(true);
    expect(cf.has("hello")).toBe(true);
  });

  it("has returns false for missing items", () => {
    const cf = new CuckooFilter(100);
    expect(cf.has("missing")).toBe(false);
  });

  it("delete removes an item", () => {
    const cf = new CuckooFilter(100);
    cf.add("hello");
    expect(cf.delete("hello")).toBe(true);
    expect(cf.has("hello")).toBe(false);
  });

  it("delete returns false for missing item", () => {
    const cf = new CuckooFilter(100);
    expect(cf.delete("nope")).toBe(false);
  });

  it("size tracks count", () => {
    const cf = new CuckooFilter(100);
    expect(cf.size).toBe(0);
    cf.add("a");
    cf.add("b");
    expect(cf.size).toBe(2);
    cf.delete("a");
    expect(cf.size).toBe(1);
  });

  it("handles many insertions", () => {
    const cf = new CuckooFilter(200);
    const items: string[] = [];
    for (let i = 0; i < 50; i++) {
      const item = `item-${i}`;
      items.push(item);
      cf.add(item);
    }
    let found = 0;
    for (const item of items) {
      if (cf.has(item)) found++;
    }
    expect(found).toBeGreaterThan(40);
  });

  it("loadFactor reflects usage", () => {
    const cf = new CuckooFilter(100);
    expect(cf.loadFactor).toBe(0);
    cf.add("a");
    expect(cf.loadFactor).toBeGreaterThan(0);
  });
});
