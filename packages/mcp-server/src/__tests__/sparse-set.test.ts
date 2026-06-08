import { describe, it, expect } from "vitest";
import { SparseSet } from "../sparse-set.js";

describe("SparseSet", () => {
  it("adds and checks membership", () => {
    const s = new SparseSet(100);
    expect(s.add(5)).toBe(true);
    expect(s.has(5)).toBe(true);
    expect(s.has(6)).toBe(false);
  });

  it("prevents duplicate adds", () => {
    const s = new SparseSet(100);
    s.add(10);
    expect(s.add(10)).toBe(false);
    expect(s.size).toBe(1);
  });

  it("deletes values", () => {
    const s = new SparseSet(100);
    s.add(1);
    s.add(2);
    s.add(3);
    expect(s.delete(2)).toBe(true);
    expect(s.has(2)).toBe(false);
    expect(s.has(1)).toBe(true);
    expect(s.has(3)).toBe(true);
    expect(s.size).toBe(2);
  });

  it("delete returns false for missing values", () => {
    const s = new SparseSet(100);
    expect(s.delete(5)).toBe(false);
  });

  it("rejects out-of-range values", () => {
    const s = new SparseSet(10);
    expect(s.add(-1)).toBe(false);
    expect(s.add(10)).toBe(false);
    expect(s.has(-1)).toBe(false);
    expect(s.has(10)).toBe(false);
  });

  it("clears all values", () => {
    const s = new SparseSet(100);
    s.add(1);
    s.add(2);
    s.clear();
    expect(s.size).toBe(0);
    expect(s.has(1)).toBe(false);
  });

  it("returns values array", () => {
    const s = new SparseSet(100);
    s.add(3);
    s.add(1);
    s.add(7);
    expect(s.values().sort()).toEqual([1, 3, 7]);
  });

  it("forEach iterates all values", () => {
    const s = new SparseSet(100);
    s.add(10);
    s.add(20);
    const collected: number[] = [];
    s.forEach((v) => collected.push(v));
    expect(collected.sort()).toEqual([10, 20]);
  });
});
