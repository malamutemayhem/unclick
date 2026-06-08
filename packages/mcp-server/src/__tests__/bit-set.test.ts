import { describe, it, expect } from "vitest";
import { BitSet } from "../bit-set.js";

describe("BitSet", () => {
  it("set and get bits", () => {
    const bs = new BitSet(64);
    bs.set(0);
    bs.set(63);
    expect(bs.get(0)).toBe(true);
    expect(bs.get(1)).toBe(false);
    expect(bs.get(63)).toBe(true);
  });

  it("clear bits", () => {
    const bs = new BitSet(32);
    bs.set(5);
    expect(bs.get(5)).toBe(true);
    bs.clear(5);
    expect(bs.get(5)).toBe(false);
  });

  it("toggle bits", () => {
    const bs = new BitSet(32);
    bs.toggle(10);
    expect(bs.get(10)).toBe(true);
    bs.toggle(10);
    expect(bs.get(10)).toBe(false);
  });

  it("counts set bits", () => {
    const bs = new BitSet(100);
    bs.set(1);
    bs.set(50);
    bs.set(99);
    expect(bs.count()).toBe(3);
  });

  it("AND operation", () => {
    const a = new BitSet(32);
    const b = new BitSet(32);
    a.set(1); a.set(2); a.set(3);
    b.set(2); b.set(3); b.set(4);
    const result = a.and(b);
    expect(result.get(1)).toBe(false);
    expect(result.get(2)).toBe(true);
    expect(result.get(3)).toBe(true);
    expect(result.get(4)).toBe(false);
  });

  it("OR operation", () => {
    const a = new BitSet(32);
    const b = new BitSet(32);
    a.set(1);
    b.set(2);
    const result = a.or(b);
    expect(result.get(1)).toBe(true);
    expect(result.get(2)).toBe(true);
  });

  it("XOR operation", () => {
    const a = new BitSet(32);
    const b = new BitSet(32);
    a.set(1); a.set(2);
    b.set(2); b.set(3);
    const result = a.xor(b);
    expect(result.get(1)).toBe(true);
    expect(result.get(2)).toBe(false);
    expect(result.get(3)).toBe(true);
  });

  it("clearAll and toArray", () => {
    const bs = new BitSet(64);
    bs.set(5); bs.set(10); bs.set(60);
    expect(bs.toArray()).toEqual([5, 10, 60]);
    bs.clearAll();
    expect(bs.count()).toBe(0);
    expect(bs.toArray()).toEqual([]);
  });

  it("ignores out-of-range", () => {
    const bs = new BitSet(8);
    bs.set(-1);
    bs.set(100);
    expect(bs.get(-1)).toBe(false);
    expect(bs.get(100)).toBe(false);
    expect(bs.count()).toBe(0);
  });
});
