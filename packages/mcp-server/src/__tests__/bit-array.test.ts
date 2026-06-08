import { describe, it, expect } from "vitest";
import { BitArray } from "../bit-array.js";

describe("BitArray", () => {
  it("set and get individual bits", () => {
    const ba = new BitArray(64);
    ba.set(0);
    ba.set(63);
    expect(ba.get(0)).toBe(true);
    expect(ba.get(63)).toBe(true);
    expect(ba.get(1)).toBe(false);
  });

  it("clear removes a set bit", () => {
    const ba = new BitArray(32);
    ba.set(5);
    ba.clear(5);
    expect(ba.get(5)).toBe(false);
  });

  it("toggle flips a bit", () => {
    const ba = new BitArray(32);
    ba.toggle(10);
    expect(ba.get(10)).toBe(true);
    ba.toggle(10);
    expect(ba.get(10)).toBe(false);
  });

  it("popcount counts set bits", () => {
    const ba = new BitArray(100);
    ba.set(0);
    ba.set(50);
    ba.set(99);
    expect(ba.popcount()).toBe(3);
  });

  it("and performs bitwise AND", () => {
    const a = BitArray.fromString("1100");
    const b = BitArray.fromString("1010");
    const result = a.and(b);
    expect(result.toString()).toBe("1000");
  });

  it("or performs bitwise OR", () => {
    const a = BitArray.fromString("1100");
    const b = BitArray.fromString("1010");
    const result = a.or(b);
    expect(result.toString()).toBe("1110");
  });

  it("xor performs bitwise XOR", () => {
    const a = BitArray.fromString("1100");
    const b = BitArray.fromString("1010");
    const result = a.xor(b);
    expect(result.toString()).toBe("0110");
  });

  it("equals compares two bit arrays", () => {
    const a = BitArray.fromString("10101");
    const b = BitArray.fromString("10101");
    const c = BitArray.fromString("10100");
    expect(a.equals(b)).toBe(true);
    expect(a.equals(c)).toBe(false);
  });

  it("fromString and toString round-trip", () => {
    const s = "10110100";
    const ba = BitArray.fromString(s);
    expect(ba.toString()).toBe(s);
  });

  it("setAll and clearAll work", () => {
    const ba = new BitArray(8);
    ba.setAll();
    expect(ba.popcount()).toBe(8);
    ba.clearAll();
    expect(ba.popcount()).toBe(0);
  });
});
