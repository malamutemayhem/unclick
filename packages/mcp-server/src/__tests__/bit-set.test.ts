import { describe, it, expect } from "vitest";
import { BitSet } from "../bit-set.js";

describe("BitSet", () => {
  it("starts all cleared", () => {
    const bs = new BitSet(64);
    expect(bs.get(0)).toBe(false);
    expect(bs.get(63)).toBe(false);
    expect(bs.count()).toBe(0);
  });

  it("set and get", () => {
    const bs = new BitSet(100);
    bs.set(0);
    bs.set(50);
    bs.set(99);
    expect(bs.get(0)).toBe(true);
    expect(bs.get(50)).toBe(true);
    expect(bs.get(99)).toBe(true);
    expect(bs.get(1)).toBe(false);
  });

  it("clear removes bit", () => {
    const bs = new BitSet(32);
    bs.set(5);
    expect(bs.get(5)).toBe(true);
    bs.clear(5);
    expect(bs.get(5)).toBe(false);
  });

  it("toggle flips bit", () => {
    const bs = new BitSet(32);
    bs.toggle(10);
    expect(bs.get(10)).toBe(true);
    bs.toggle(10);
    expect(bs.get(10)).toBe(false);
  });

  it("count returns popcount", () => {
    const bs = new BitSet(64);
    bs.set(0);
    bs.set(31);
    bs.set(32);
    bs.set(63);
    expect(bs.count()).toBe(4);
  });

  it("and returns intersection", () => {
    const a = new BitSet(32);
    const b = new BitSet(32);
    a.set(1); a.set(2); a.set(3);
    b.set(2); b.set(3); b.set(4);
    const c = a.and(b);
    expect(c.get(1)).toBe(false);
    expect(c.get(2)).toBe(true);
    expect(c.get(3)).toBe(true);
    expect(c.get(4)).toBe(false);
  });

  it("or returns union", () => {
    const a = new BitSet(32);
    const b = new BitSet(32);
    a.set(1);
    b.set(2);
    const c = a.or(b);
    expect(c.get(1)).toBe(true);
    expect(c.get(2)).toBe(true);
  });

  it("xor returns symmetric difference", () => {
    const a = new BitSet(32);
    const b = new BitSet(32);
    a.set(1); a.set(2);
    b.set(2); b.set(3);
    const c = a.xor(b);
    expect(c.get(1)).toBe(true);
    expect(c.get(2)).toBe(false);
    expect(c.get(3)).toBe(true);
  });

  it("toArray lists set indices", () => {
    const bs = new BitSet(10);
    bs.set(1); bs.set(5); bs.set(9);
    expect(bs.toArray()).toEqual([1, 5, 9]);
  });

  it("out of bounds is safe", () => {
    const bs = new BitSet(8);
    bs.set(-1);
    bs.set(100);
    expect(bs.get(-1)).toBe(false);
    expect(bs.get(100)).toBe(false);
  });
});
