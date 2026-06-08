import { describe, it, expect } from "vitest";
import { BitSet } from "../bit-set.js";

describe("BitSet", () => {
  it("starts all unset", () => {
    const bs = new BitSet(64);
    expect(bs.get(0)).toBe(false);
    expect(bs.get(63)).toBe(false);
    expect(bs.count()).toBe(0);
  });

  it("set and get", () => {
    const bs = new BitSet(100);
    bs.set(42);
    expect(bs.get(42)).toBe(true);
    expect(bs.get(41)).toBe(false);
  });

  it("clear unsets a bit", () => {
    const bs = new BitSet(64);
    bs.set(10);
    bs.clear(10);
    expect(bs.get(10)).toBe(false);
  });

  it("toggle flips a bit", () => {
    const bs = new BitSet(64);
    bs.toggle(5);
    expect(bs.get(5)).toBe(true);
    bs.toggle(5);
    expect(bs.get(5)).toBe(false);
  });

  it("count returns number of set bits", () => {
    const bs = new BitSet(100);
    bs.set(1);
    bs.set(50);
    bs.set(99);
    expect(bs.count()).toBe(3);
  });

  it("and returns intersection", () => {
    const a = new BitSet(32);
    const b = new BitSet(32);
    a.set(1); a.set(2); a.set(3);
    b.set(2); b.set(3); b.set(4);
    const result = a.and(b);
    expect(result.toArray()).toEqual([2, 3]);
  });

  it("or returns union", () => {
    const a = new BitSet(32);
    const b = new BitSet(32);
    a.set(1); a.set(2);
    b.set(2); b.set(3);
    const result = a.or(b);
    expect(result.toArray()).toEqual([1, 2, 3]);
  });

  it("xor returns symmetric difference", () => {
    const a = new BitSet(32);
    const b = new BitSet(32);
    a.set(1); a.set(2);
    b.set(2); b.set(3);
    const result = a.xor(b);
    expect(result.toArray()).toEqual([1, 3]);
  });

  it("clearAll resets all bits", () => {
    const bs = new BitSet(64);
    bs.set(1);
    bs.set(63);
    bs.clearAll();
    expect(bs.count()).toBe(0);
  });

  it("toArray returns set indices", () => {
    const bs = new BitSet(10);
    bs.set(0);
    bs.set(5);
    bs.set(9);
    expect(bs.toArray()).toEqual([0, 5, 9]);
  });

  it("throws on out of bounds", () => {
    const bs = new BitSet(10);
    expect(() => bs.set(10)).toThrow("out of bounds");
    expect(() => bs.set(-1)).toThrow("out of bounds");
  });

  it("size property", () => {
    const bs = new BitSet(128);
    expect(bs.size).toBe(128);
  });
});
