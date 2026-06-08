import { describe, it, expect } from "vitest";
import { BitSet } from "../bit-set.js";

describe("BitSet", () => {
  it("starts empty", () => {
    const bs = new BitSet(64);
    expect(bs.size).toBe(64);
    expect(bs.isEmpty()).toBe(true);
    expect(bs.count()).toBe(0);
  });

  it("set/get/clear individual bits", () => {
    const bs = new BitSet(100);
    bs.set(0);
    bs.set(31);
    bs.set(32);
    bs.set(99);
    expect(bs.get(0)).toBe(true);
    expect(bs.get(31)).toBe(true);
    expect(bs.get(32)).toBe(true);
    expect(bs.get(99)).toBe(true);
    expect(bs.get(1)).toBe(false);
    expect(bs.count()).toBe(4);

    bs.clear(31);
    expect(bs.get(31)).toBe(false);
    expect(bs.count()).toBe(3);
  });

  it("toggle flips bits", () => {
    const bs = new BitSet(8);
    bs.toggle(3);
    expect(bs.get(3)).toBe(true);
    bs.toggle(3);
    expect(bs.get(3)).toBe(false);
  });

  it("AND operation", () => {
    const a = new BitSet(8);
    const b = new BitSet(8);
    a.set(0); a.set(1); a.set(2);
    b.set(1); b.set(2); b.set(3);
    const result = a.and(b);
    expect(result.toArray()).toEqual([1, 2]);
  });

  it("OR operation", () => {
    const a = new BitSet(8);
    const b = new BitSet(8);
    a.set(0); a.set(1);
    b.set(2); b.set(3);
    const result = a.or(b);
    expect(result.toArray()).toEqual([0, 1, 2, 3]);
  });

  it("XOR operation", () => {
    const a = new BitSet(8);
    const b = new BitSet(8);
    a.set(0); a.set(1);
    b.set(1); b.set(2);
    const result = a.xor(b);
    expect(result.toArray()).toEqual([0, 2]);
  });

  it("NOT operation", () => {
    const bs = new BitSet(4);
    bs.set(0);
    const inv = bs.not();
    expect(inv.get(0)).toBe(false);
    expect(inv.get(1)).toBe(true);
    expect(inv.get(2)).toBe(true);
    expect(inv.get(3)).toBe(true);
  });

  it("setAll/clearAll", () => {
    const bs = new BitSet(16);
    bs.setAll();
    expect(bs.isEmpty()).toBe(false);
    bs.clearAll();
    expect(bs.isEmpty()).toBe(true);
  });

  it("iteration via Symbol.iterator", () => {
    const bs = new BitSet(10);
    bs.set(2); bs.set(5); bs.set(9);
    const indices = [...bs];
    expect(indices).toEqual([2, 5, 9]);
  });

  it("out-of-range access is safe", () => {
    const bs = new BitSet(8);
    bs.set(-1);
    bs.set(100);
    expect(bs.get(-1)).toBe(false);
    expect(bs.get(100)).toBe(false);
    expect(bs.isEmpty()).toBe(true);
  });
});
