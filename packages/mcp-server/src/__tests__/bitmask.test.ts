import { describe, it, expect } from "vitest";
import { Bitmask } from "../bitmask.js";

describe("Bitmask", () => {
  it("sets and checks bits", () => {
    const bm = new Bitmask();
    bm.set(0).set(2).set(4);
    expect(bm.has(0)).toBe(true);
    expect(bm.has(1)).toBe(false);
    expect(bm.has(2)).toBe(true);
  });

  it("clears bits", () => {
    const bm = new Bitmask();
    bm.set(0).set(1);
    bm.clear(0);
    expect(bm.has(0)).toBe(false);
    expect(bm.has(1)).toBe(true);
  });

  it("toggles bits", () => {
    const bm = new Bitmask();
    bm.toggle(3);
    expect(bm.has(3)).toBe(true);
    bm.toggle(3);
    expect(bm.has(3)).toBe(false);
  });

  it("hasAll and hasAny", () => {
    const bm = new Bitmask();
    bm.set(0).set(1).set(2);
    expect(bm.hasAll(0b011)).toBe(true);
    expect(bm.hasAll(0b1111)).toBe(false);
    expect(bm.hasAny(0b1000)).toBe(false);
    expect(bm.hasAny(0b0010)).toBe(true);
  });

  it("bitwise operations", () => {
    const a = Bitmask.from([0, 1]);
    const b = Bitmask.from([1, 2]);
    expect(a.and(b).toArray()).toEqual([1]);
    expect(a.or(b).toArray()).toEqual([0, 1, 2]);
    expect(a.xor(b).toArray()).toEqual([0, 2]);
  });

  it("count returns popcount", () => {
    const bm = Bitmask.from([0, 3, 7, 15]);
    expect(bm.count()).toBe(4);
  });

  it("toBinary", () => {
    const bm = new Bitmask(0b1010);
    expect(bm.toBinary()).toBe("1010");
  });

  it("from static constructor", () => {
    const bm = Bitmask.from([0, 2, 4]);
    expect(bm.toNumber()).toBe(0b10101);
  });
});
