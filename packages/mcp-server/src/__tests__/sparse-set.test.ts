import { describe, it, expect } from "vitest";
import { SparseSet } from "../sparse-set.js";

describe("SparseSet", () => {
  it("adds and checks membership", () => {
    const ss = new SparseSet(100);
    ss.add(5);
    ss.add(10);
    expect(ss.has(5)).toBe(true);
    expect(ss.has(10)).toBe(true);
    expect(ss.has(7)).toBe(false);
  });

  it("removes elements", () => {
    const ss = new SparseSet(100);
    ss.add(5);
    ss.add(10);
    ss.remove(5);
    expect(ss.has(5)).toBe(false);
    expect(ss.has(10)).toBe(true);
  });

  it("tracks size", () => {
    const ss = new SparseSet(100);
    ss.add(1);
    ss.add(2);
    ss.add(3);
    expect(ss.size).toBe(3);
    ss.remove(2);
    expect(ss.size).toBe(2);
  });

  it("ignores duplicate adds", () => {
    const ss = new SparseSet(100);
    ss.add(5);
    ss.add(5);
    expect(ss.size).toBe(1);
  });

  it("clear empties set", () => {
    const ss = new SparseSet(100);
    ss.add(1);
    ss.add(2);
    ss.clear();
    expect(ss.size).toBe(0);
    expect(ss.has(1)).toBe(false);
  });

  it("toArray returns elements", () => {
    const ss = new SparseSet(100);
    ss.add(3);
    ss.add(1);
    ss.add(2);
    expect(ss.toArray().sort()).toEqual([1, 2, 3]);
  });

  it("iterates", () => {
    const ss = new SparseSet(100);
    ss.add(5);
    ss.add(10);
    expect([...ss].sort((a: number, b: number) => a - b)).toEqual([5, 10]);
  });
});
