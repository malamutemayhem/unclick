import { describe, it, expect } from "vitest";
import { MortonCode } from "../morton-code.js";

describe("MortonCode", () => {
  it("encode2D and decode2D round-trip", () => {
    const code = MortonCode.encode2D(5, 9);
    const { x, y } = MortonCode.decode2D(code);
    expect(x).toBe(5);
    expect(y).toBe(9);
  });

  it("encode2D interleaves bits", () => {
    expect(MortonCode.encode2D(0, 0)).toBe(0);
    expect(MortonCode.encode2D(1, 0)).toBe(1);
    expect(MortonCode.encode2D(0, 1)).toBe(2);
    expect(MortonCode.encode2D(1, 1)).toBe(3);
  });

  it("encode3D and decode3D round-trip", () => {
    const code = MortonCode.encode3D(3, 5, 7);
    const { x, y, z } = MortonCode.decode3D(code);
    expect(x).toBe(3);
    expect(y).toBe(5);
    expect(z).toBe(7);
  });

  it("compare2D orders by Morton code", () => {
    expect(MortonCode.compare2D(0, 0, 1, 0)).toBeLessThan(0);
    expect(MortonCode.compare2D(1, 1, 0, 0)).toBeGreaterThan(0);
    expect(MortonCode.compare2D(2, 3, 2, 3)).toBe(0);
  });

  it("sort2D sorts points by Morton code", () => {
    const points = [
      { x: 3, y: 3 },
      { x: 0, y: 0 },
      { x: 1, y: 1 },
    ];
    const sorted = MortonCode.sort2D(points);
    expect(sorted[0]).toEqual({ x: 0, y: 0 });
  });

  it("range2D returns sorted Morton codes", () => {
    const codes = MortonCode.range2D(0, 0, 1, 1);
    expect(codes.length).toBe(4);
    for (let i = 1; i < codes.length; i++) {
      expect(codes[i]).toBeGreaterThanOrEqual(codes[i - 1]);
    }
  });

  it("decode2D handles zero", () => {
    const { x, y } = MortonCode.decode2D(0);
    expect(x).toBe(0);
    expect(y).toBe(0);
  });

  it("encode3D handles zero", () => {
    expect(MortonCode.encode3D(0, 0, 0)).toBe(0);
  });
});
