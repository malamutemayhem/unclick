import { describe, it, expect } from "vitest";
import { Range, range, rangeFrom } from "../range.js";

describe("Range", () => {
  it("creates a range", () => {
    const r = new Range(1, 10);
    expect(r.start).toBe(1);
    expect(r.end).toBe(10);
  });

  it("throws if start > end", () => {
    expect(() => new Range(10, 1)).toThrow("Start must be <= end");
  });

  it("computes length", () => {
    expect(new Range(3, 7).length).toBe(4);
  });

  it("contains a value", () => {
    const r = new Range(1, 10);
    expect(r.contains(5)).toBe(true);
    expect(r.contains(1)).toBe(true);
    expect(r.contains(10)).toBe(true);
    expect(r.contains(0)).toBe(false);
    expect(r.contains(11)).toBe(false);
  });

  it("containsRange", () => {
    const r = new Range(1, 10);
    expect(r.containsRange(new Range(2, 8))).toBe(true);
    expect(r.containsRange(new Range(0, 5))).toBe(false);
  });

  it("overlaps", () => {
    const r = new Range(1, 5);
    expect(r.overlaps(new Range(3, 8))).toBe(true);
    expect(r.overlaps(new Range(6, 10))).toBe(false);
    expect(r.overlaps(new Range(5, 10))).toBe(true);
  });

  it("intersection", () => {
    const r = new Range(1, 5);
    const inter = r.intersection(new Range(3, 8));
    expect(inter).not.toBeNull();
    expect(inter!.start).toBe(3);
    expect(inter!.end).toBe(5);
  });

  it("intersection returns null for non-overlapping", () => {
    expect(new Range(1, 3).intersection(new Range(5, 7))).toBeNull();
  });

  it("union of overlapping ranges", () => {
    const u = new Range(1, 5).union(new Range(3, 8));
    expect(u.start).toBe(1);
    expect(u.end).toBe(8);
  });

  it("union of adjacent ranges", () => {
    const u = new Range(1, 5).union(new Range(5, 10));
    expect(u.start).toBe(1);
    expect(u.end).toBe(10);
  });

  it("union throws for non-overlapping non-adjacent", () => {
    expect(() => new Range(1, 3).union(new Range(5, 7))).toThrow("do not overlap");
  });

  it("equals", () => {
    expect(new Range(1, 5).equals(new Range(1, 5))).toBe(true);
    expect(new Range(1, 5).equals(new Range(1, 6))).toBe(false);
  });

  it("clamps value", () => {
    const r = new Range(1, 10);
    expect(r.clamp(5)).toBe(5);
    expect(r.clamp(-5)).toBe(1);
    expect(r.clamp(20)).toBe(10);
  });

  it("toArray", () => {
    expect(new Range(1, 5).toArray()).toEqual([1, 2, 3, 4, 5]);
  });

  it("toArray with step", () => {
    expect(new Range(0, 10).toArray(3)).toEqual([0, 3, 6, 9]);
  });

  it("iterator", () => {
    const values = [...new Range(1, 4)];
    expect(values).toEqual([1, 2, 3, 4]);
  });

  it("toString", () => {
    expect(new Range(1, 5).toString()).toBe("[1, 5]");
  });
});

describe("range factory", () => {
  it("creates a Range", () => {
    const r = range(3, 7);
    expect(r.start).toBe(3);
    expect(r.end).toBe(7);
  });
});

describe("rangeFrom", () => {
  it("creates range from array", () => {
    const r = rangeFrom([5, 2, 8, 1, 9]);
    expect(r.start).toBe(1);
    expect(r.end).toBe(9);
  });

  it("throws on empty array", () => {
    expect(() => rangeFrom([])).toThrow("Empty array");
  });
});
