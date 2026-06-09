import { describe, it, expect } from "vitest";
import {
  mandelbrot, julia, mandelbrotGrid, juliaGrid,
  sierpinskiTriangle, kochSnowflakePoints, cantorSet,
  gridToAscii, burningShip,
} from "../fractal-gen.js";

describe("mandelbrot", () => {
  it("returns maxIter for origin (in set)", () => {
    expect(mandelbrot(0, 0, 100)).toBe(100);
  });

  it("escapes quickly for points outside set", () => {
    expect(mandelbrot(2, 2, 100)).toBeLessThan(10);
  });

  it("returns iteration count for boundary points", () => {
    const iter = mandelbrot(-0.75, 0.1, 100);
    expect(iter).toBeGreaterThan(0);
    expect(iter).toBeLessThanOrEqual(100);
  });
});

describe("julia", () => {
  it("returns maxIter for fixed point", () => {
    expect(julia(0, 0, 0, 0, 100)).toBe(100);
  });

  it("escapes for distant points", () => {
    expect(julia(3, 3, -0.7, 0.27, 100)).toBeLessThan(5);
  });
});

describe("mandelbrotGrid", () => {
  it("generates grid with correct dimensions", () => {
    const grid = mandelbrotGrid(10, 8, -2, 1, -1, 1, 50);
    expect(grid.length).toBe(8);
    expect(grid[0].length).toBe(10);
  });

  it("contains values in range 0 to maxIter", () => {
    const grid = mandelbrotGrid(5, 5, -2, 1, -1, 1, 30);
    for (const row of grid) {
      for (const v of row) {
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThanOrEqual(30);
      }
    }
  });
});

describe("juliaGrid", () => {
  it("generates grid with correct dimensions", () => {
    const grid = juliaGrid(10, 8, -1.5, 1.5, -1.5, 1.5, -0.7, 0.27, 50);
    expect(grid.length).toBe(8);
    expect(grid[0].length).toBe(10);
  });
});

describe("sierpinskiTriangle", () => {
  it("depth 0 is single character", () => {
    const tri = sierpinskiTriangle(0);
    expect(tri).toEqual(["*"]);
  });

  it("depth 1 produces correct shape", () => {
    const tri = sierpinskiTriangle(1);
    expect(tri.length).toBe(2);
  });

  it("depth grows exponentially", () => {
    const d2 = sierpinskiTriangle(2);
    const d3 = sierpinskiTriangle(3);
    expect(d3.length).toBe(d2.length * 2);
  });
});

describe("kochSnowflakePoints", () => {
  it("depth 0 returns two points", () => {
    const pts = kochSnowflakePoints(0, 0, 100, 0, 0);
    expect(pts.length).toBe(2);
  });

  it("depth 1 returns five points", () => {
    const pts = kochSnowflakePoints(0, 0, 100, 0, 1);
    expect(pts.length).toBe(5);
  });

  it("more depth means more points", () => {
    const d1 = kochSnowflakePoints(0, 0, 100, 0, 1);
    const d2 = kochSnowflakePoints(0, 0, 100, 0, 2);
    expect(d2.length).toBeGreaterThan(d1.length);
  });
});

describe("cantorSet", () => {
  it("depth 0 is single hash", () => {
    expect(cantorSet(0)).toEqual(["#"]);
  });

  it("depth 1 has gap in middle", () => {
    const c = cantorSet(1);
    expect(c.length).toBe(2);
    expect(c[1]).toBe("# #");
  });
});

describe("gridToAscii", () => {
  it("converts grid to string", () => {
    const grid = [[0, 5, 10], [10, 5, 0]];
    const ascii = gridToAscii(grid, 10);
    const lines = ascii.split("\n");
    expect(lines.length).toBe(2);
    expect(lines[0].length).toBe(3);
  });
});

describe("burningShip", () => {
  it("returns maxIter for origin", () => {
    expect(burningShip(0, 0, 100)).toBe(100);
  });

  it("escapes for distant points", () => {
    expect(burningShip(3, 3, 100)).toBeLessThan(5);
  });
});
