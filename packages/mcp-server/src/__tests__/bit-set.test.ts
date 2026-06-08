import { describe, it, expect } from "vitest";
import { BitSet } from "../bit-set.js";

describe("BitSet", () => {
  it("set and has work", () => {
    const bs = new BitSet(100);
    bs.set(42);
    expect(bs.has(42)).toBe(true);
    expect(bs.has(43)).toBe(false);
  });

  it("clear removes a bit", () => {
    const bs = new BitSet(100);
    bs.set(10);
    bs.clear(10);
    expect(bs.has(10)).toBe(false);
  });

  it("toggle flips a bit", () => {
    const bs = new BitSet(100);
    bs.toggle(5);
    expect(bs.has(5)).toBe(true);
    bs.toggle(5);
    expect(bs.has(5)).toBe(false);
  });

  it("count returns number of set bits", () => {
    const bs = new BitSet(64);
    bs.set(0);
    bs.set(31);
    bs.set(32);
    bs.set(63);
    expect(bs.count()).toBe(4);
  });

  it("clearAll resets all bits", () => {
    const bs = new BitSet(100);
    bs.set(1);
    bs.set(50);
    bs.set(99);
    bs.clearAll();
    expect(bs.count()).toBe(0);
  });

  it("toArray returns set indices", () => {
    const bs = new BitSet(10);
    bs.set(1);
    bs.set(5);
    bs.set(9);
    expect(bs.toArray()).toEqual([1, 5, 9]);
  });

  it("ignores out-of-range operations", () => {
    const bs = new BitSet(10);
    bs.set(-1);
    bs.set(10);
    expect(bs.has(-1)).toBe(false);
    expect(bs.has(10)).toBe(false);
  });

  it("size returns total capacity", () => {
    const bs = new BitSet(256);
    expect(bs.size).toBe(256);
  });

  it("handles large sets", () => {
    const bs = new BitSet(10000);
    for (let i = 0; i < 10000; i += 2) bs.set(i);
    expect(bs.count()).toBe(5000);
  });
});
