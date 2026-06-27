import { describe, it, expect } from "vitest";
import { BitFlags, createFlags } from "../bit-flags.js";

describe("BitFlags", () => {
  it("starts at zero by default", () => {
    const f = new BitFlags();
    expect(f.raw).toBe(0);
  });

  it("accepts initial value", () => {
    const f = new BitFlags(0b1010);
    expect(f.raw).toBe(10);
  });

  it("set adds a flag", () => {
    const f = new BitFlags();
    f.set(0b0100);
    expect(f.raw).toBe(4);
  });

  it("set is chainable", () => {
    const f = new BitFlags().set(1).set(2).set(4);
    expect(f.raw).toBe(7);
  });

  it("clear removes a flag", () => {
    const f = new BitFlags(0b111);
    f.clear(0b010);
    expect(f.raw).toBe(0b101);
  });

  it("toggle flips flag on and off", () => {
    const f = new BitFlags();
    f.toggle(4);
    expect(f.has(4)).toBe(true);
    f.toggle(4);
    expect(f.has(4)).toBe(false);
  });

  it("has checks exact flag presence", () => {
    const f = new BitFlags(0b110);
    expect(f.has(0b110)).toBe(true);
    expect(f.has(0b010)).toBe(true);
    expect(f.has(0b001)).toBe(false);
  });

  it("hasAny checks any bit overlap", () => {
    const f = new BitFlags(0b100);
    expect(f.hasAny(0b110)).toBe(true);
    expect(f.hasAny(0b001)).toBe(false);
  });

  it("reset clears all bits", () => {
    const f = new BitFlags(0xFF);
    f.reset();
    expect(f.raw).toBe(0);
  });

  it("toArray returns individual set flags", () => {
    const f = new BitFlags(0b1010);
    expect(f.toArray()).toEqual([2, 8]);
  });

  it("toString returns binary string", () => {
    const f = new BitFlags(0b1101);
    expect(f.toString()).toBe("1101");
  });

  it("combine merges flags via OR", () => {
    expect(BitFlags.combine(1, 2, 4)).toBe(7);
  });

  it("fromArray creates from flag array", () => {
    const f = BitFlags.fromArray([1, 4, 8]);
    expect(f.raw).toBe(13);
    expect(f.has(4)).toBe(true);
  });
});

describe("createFlags", () => {
  it("creates power-of-two flags from names", () => {
    const flags = createFlags(["read", "write", "execute"]);
    expect(flags.read).toBe(1);
    expect(flags.write).toBe(2);
    expect(flags.execute).toBe(4);
  });

  it("flags work with BitFlags", () => {
    const perms = createFlags(["read", "write", "execute"]);
    const f = new BitFlags().set(perms.read).set(perms.execute);
    expect(f.has(perms.read)).toBe(true);
    expect(f.has(perms.write)).toBe(false);
    expect(f.has(perms.execute)).toBe(true);
  });
});
