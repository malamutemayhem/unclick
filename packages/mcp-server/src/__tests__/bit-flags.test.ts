import { describe, it, expect } from "vitest";
import { BitFlags, defineFlags, combine, intersect, difference } from "../bit-flags.js";

describe("BitFlags", () => {
  it("set and has", () => {
    const f = new BitFlags();
    f.set(1);
    expect(f.has(1)).toBe(true);
    expect(f.has(2)).toBe(false);
  });

  it("clear removes flag", () => {
    const f = new BitFlags(3);
    f.clear(1);
    expect(f.has(1)).toBe(false);
    expect(f.has(2)).toBe(true);
  });

  it("toggle flips flag", () => {
    const f = new BitFlags();
    f.toggle(4);
    expect(f.has(4)).toBe(true);
    f.toggle(4);
    expect(f.has(4)).toBe(false);
  });

  it("hasAny checks any", () => {
    const f = new BitFlags(6);
    expect(f.hasAny(2, 8)).toBe(true);
    expect(f.hasAny(1, 8)).toBe(false);
  });

  it("hasAll checks all", () => {
    const f = new BitFlags(7);
    expect(f.hasAll(1, 2, 4)).toBe(true);
    expect(f.hasAll(1, 8)).toBe(false);
  });

  it("toBinary", () => {
    expect(new BitFlags(5).toBinary()).toBe("101");
  });

  it("toArray maps names", () => {
    const flags = { READ: 1, WRITE: 2, EXEC: 4 };
    const f = new BitFlags(5);
    expect(f.toArray(flags)).toEqual(["READ", "EXEC"]);
  });

  it("count returns set bits", () => {
    expect(new BitFlags(7).count()).toBe(3);
    expect(new BitFlags(0).count()).toBe(0);
  });

  it("reset clears all", () => {
    const f = new BitFlags(255);
    f.reset();
    expect(f.valueOf()).toBe(0);
  });
});

describe("defineFlags", () => {
  it("creates flag map", () => {
    const f = defineFlags(["A", "B", "C"]);
    expect(f.A).toBe(1);
    expect(f.B).toBe(2);
    expect(f.C).toBe(4);
  });
});

describe("combine/intersect/difference", () => {
  it("combine ORs flags", () => {
    expect(combine(1, 2, 4)).toBe(7);
  });

  it("intersect ANDs flags", () => {
    expect(intersect(7, 3)).toBe(3);
  });

  it("difference removes flags", () => {
    expect(difference(7, 2)).toBe(5);
  });
});
