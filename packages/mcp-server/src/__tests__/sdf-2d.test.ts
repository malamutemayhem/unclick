import { describe, it, expect } from "vitest";
import {
  circle, box, line, sdfUnion, sdfIntersection, sdfDifference,
  sdfSmoothUnion, translate, rotate, scale, round, annular,
  repeat, renderGrid, gridToAscii, estimateArea,
} from "../sdf-2d.js";

describe("circle", () => {
  it("returns negative inside", () => {
    const c = circle(0, 0, 5);
    expect(c(0, 0)).toBeLessThan(0);
  });

  it("returns zero on boundary", () => {
    const c = circle(0, 0, 5);
    expect(c(5, 0)).toBeCloseTo(0);
  });

  it("returns positive outside", () => {
    const c = circle(0, 0, 5);
    expect(c(10, 0)).toBeGreaterThan(0);
  });
});

describe("box", () => {
  it("returns negative inside", () => {
    const b = box(0, 0, 5, 5);
    expect(b(0, 0)).toBeLessThan(0);
  });

  it("returns positive outside", () => {
    const b = box(0, 0, 5, 5);
    expect(b(10, 10)).toBeGreaterThan(0);
  });
});

describe("line", () => {
  it("returns distance to line segment", () => {
    const l = line(0, 0, 10, 0);
    expect(l(5, 3)).toBeCloseTo(3);
    expect(l(5, 0)).toBeCloseTo(0);
  });
});

describe("CSG operations", () => {
  it("union takes minimum", () => {
    const a = circle(0, 0, 5);
    const b = circle(8, 0, 5);
    const u = sdfUnion(a, b);
    expect(u(4, 0)).toBeLessThan(0);
    expect(u(0, 0)).toBeLessThan(0);
  });

  it("intersection takes maximum", () => {
    const a = circle(0, 0, 5);
    const b = circle(3, 0, 5);
    const isect = sdfIntersection(a, b);
    expect(isect(1.5, 0)).toBeLessThan(0);
    expect(isect(-4, 0)).toBeGreaterThan(0);
  });

  it("difference subtracts", () => {
    const a = circle(0, 0, 10);
    const b = circle(0, 0, 5);
    const diff = sdfDifference(a, b);
    expect(diff(7, 0)).toBeLessThan(0);
    expect(diff(0, 0)).toBeGreaterThan(0);
  });

  it("smooth union blends", () => {
    const a = circle(-2, 0, 3);
    const b = circle(2, 0, 3);
    const su = sdfSmoothUnion(a, b, 1);
    expect(su(0, 0)).toBeLessThan(0);
  });
});

describe("transforms", () => {
  it("translate moves shape", () => {
    const c = translate(circle(0, 0, 3), 10, 10);
    expect(c(10, 10)).toBeLessThan(0);
    expect(c(0, 0)).toBeGreaterThan(0);
  });

  it("rotate rotates shape", () => {
    const b = rotate(box(0, 0, 5, 1), Math.PI / 2);
    expect(b(0, 0)).toBeLessThan(0);
  });

  it("scale resizes shape", () => {
    const c = scale(circle(0, 0, 1), 10);
    expect(c(5, 0)).toBeLessThan(0);
    expect(c(15, 0)).toBeGreaterThan(0);
  });
});

describe("modifiers", () => {
  it("round expands shape", () => {
    const c = round(circle(0, 0, 3), 2);
    expect(c(4, 0)).toBeLessThan(0);
  });

  it("annular creates ring", () => {
    const ring = annular(circle(0, 0, 5), 1);
    expect(ring(5, 0)).toBeLessThan(0);
    expect(ring(0, 0)).toBeGreaterThan(0);
  });
});

describe("repeat", () => {
  it("tiles the shape", () => {
    const c = repeat(circle(0, 0, 2), 10, 10);
    expect(c(5, 5)).toBeLessThan(0);
    expect(c(15, 15)).toBeLessThan(0);
  });
});

describe("renderGrid", () => {
  it("produces grid with correct dimensions", () => {
    const g = renderGrid(circle(0, 0, 1), 10, 8, -2, 2, -2, 2);
    expect(g.length).toBe(8);
    expect(g[0].length).toBe(10);
  });
});

describe("gridToAscii", () => {
  it("renders interior as #", () => {
    const g = renderGrid(circle(0, 0, 5), 20, 20, -10, 10, -10, 10);
    const ascii = gridToAscii(g);
    expect(ascii).toContain("#");
    expect(ascii).toContain(".");
  });
});

describe("estimateArea", () => {
  it("approximates circle area", () => {
    const area = estimateArea(circle(0, 0, 5), -10, 10, -10, 10, 200);
    const expected = Math.PI * 25;
    expect(area).toBeCloseTo(expected, 0);
  });
});
