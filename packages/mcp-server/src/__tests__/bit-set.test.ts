import { describe, it, expect } from "vitest";
import { BitSet } from "../bit-set.js";

describe("BitSet", () => {
  it("set and get", () => {
    const bs = new BitSet(100);
    bs.set(5).set(50).set(99);
    expect(bs.get(5)).toBe(true);
    expect(bs.get(50)).toBe(true);
    expect(bs.get(99)).toBe(true);
    expect(bs.get(6)).toBe(false);
  });

  it("clear bit", () => {
    const bs = new BitSet(100);
    bs.set(5);
    bs.clear(5);
    expect(bs.get(5)).toBe(false);
  });

  it("toggle", () => {
    const bs = new BitSet(100);
    bs.toggle(5);
    expect(bs.get(5)).toBe(true);
    bs.toggle(5);
    expect(bs.get(5)).toBe(false);
  });

  it("count popcount", () => {
    const bs = new BitSet(100);
    bs.set(1).set(2).set(3);
    expect(bs.count).toBe(3);
  });

  it("clearAll", () => {
    const bs = new BitSet(100);
    bs.set(1).set(50);
    bs.clearAll();
    expect(bs.count).toBe(0);
  });

  it("and operation", () => {
    const a = new BitSet(64);
    const b = new BitSet(64);
    a.set(1).set(2).set(3);
    b.set(2).set(3).set(4);
    const result = a.and(b);
    expect(result.toArray()).toEqual([2, 3]);
  });

  it("or operation", () => {
    const a = new BitSet(64);
    const b = new BitSet(64);
    a.set(1).set(2);
    b.set(3).set(4);
    const result = a.or(b);
    expect(result.toArray()).toEqual([1, 2, 3, 4]);
  });

  it("toArray", () => {
    const bs = new BitSet(64);
    bs.set(0).set(31).set(32).set(63);
    expect(bs.toArray()).toEqual([0, 31, 32, 63]);
  });

  it("out of bounds returns false", () => {
    const bs = new BitSet(10);
    expect(bs.get(100)).toBe(false);
    expect(bs.get(-1)).toBe(false);
  });
});
