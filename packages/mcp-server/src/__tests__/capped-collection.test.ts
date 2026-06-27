import { describe, it, expect } from "vitest";
import { CappedCollection } from "../capped-collection.js";

describe("CappedCollection", () => {
  it("adds and retrieves items", () => {
    const c = new CappedCollection<number>(5);
    c.add(1);
    c.add(2);
    expect(c.get(0)).toBe(1);
    expect(c.size).toBe(2);
  });

  it("evicts oldest when full", () => {
    const c = new CappedCollection<number>(3);
    c.add(1); c.add(2); c.add(3);
    const evicted = c.add(4);
    expect(evicted).toBe(1);
    expect(c.toArray()).toEqual([2, 3, 4]);
  });

  it("calls onEvict callback", () => {
    const evicted: number[] = [];
    const c = new CappedCollection<number>(2, (item) => evicted.push(item));
    c.add(1); c.add(2); c.add(3);
    expect(evicted).toEqual([1]);
  });

  it("latest returns last N", () => {
    const c = new CappedCollection<number>(10);
    [1, 2, 3, 4, 5].forEach((n) => c.add(n));
    expect(c.latest(3)).toEqual([3, 4, 5]);
  });

  it("oldest returns first N", () => {
    const c = new CappedCollection<number>(10);
    [1, 2, 3, 4, 5].forEach((n) => c.add(n));
    expect(c.oldest(2)).toEqual([1, 2]);
  });

  it("full check", () => {
    const c = new CappedCollection<number>(2);
    expect(c.full).toBe(false);
    c.add(1); c.add(2);
    expect(c.full).toBe(true);
  });

  it("find and filter", () => {
    const c = new CappedCollection<number>(10);
    [1, 2, 3, 4].forEach((n) => c.add(n));
    expect(c.find((n) => n > 2)).toBe(3);
    expect(c.filter((n) => n % 2 === 0)).toEqual([2, 4]);
  });

  it("clear empties", () => {
    const c = new CappedCollection<number>(5);
    c.add(1);
    c.clear();
    expect(c.size).toBe(0);
  });
});
