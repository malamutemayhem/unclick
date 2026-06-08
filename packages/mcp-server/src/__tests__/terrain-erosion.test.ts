import { describe, it, expect } from "vitest";
import { TerrainErosion } from "../terrain-erosion.js";

describe("TerrainErosion", () => {
  it("constructor creates flat heightmap", () => {
    const t = new TerrainErosion(10, 10, 5);
    expect(t.get(0, 0)).toBe(5);
    expect(t.get(9, 9)).toBe(5);
  });

  it("set and get work", () => {
    const t = new TerrainErosion(10, 10);
    t.set(3, 4, 7.5);
    expect(t.get(3, 4)).toBe(7.5);
  });

  it("out of bounds get returns 0", () => {
    const t = new TerrainErosion(5, 5);
    expect(t.get(-1, 0)).toBe(0);
    expect(t.get(10, 10)).toBe(0);
  });

  it("thermalErosion smooths peaks", () => {
    const t = new TerrainErosion(5, 5, 0);
    t.set(2, 2, 10);
    const before = t.get(2, 2);
    t.thermalErosion(10, 0.5);
    expect(t.get(2, 2)).toBeLessThan(before);
  });

  it("minHeight and maxHeight report correctly", () => {
    const t = new TerrainErosion(5, 5, 1);
    t.set(0, 0, 0);
    t.set(4, 4, 10);
    expect(t.minHeight()).toBe(0);
    expect(t.maxHeight()).toBe(10);
  });

  it("averageHeight computes mean", () => {
    const t = new TerrainErosion(2, 2, 0);
    t.set(0, 0, 4);
    t.set(1, 0, 4);
    t.set(0, 1, 4);
    t.set(1, 1, 4);
    expect(t.averageHeight()).toBe(4);
  });

  it("snapshot returns copy", () => {
    const t = new TerrainErosion(3, 3, 1);
    const snap = t.snapshot();
    snap[0][0] = 99;
    expect(t.get(0, 0)).toBe(1);
  });

  it("hydraulicErosion modifies terrain", () => {
    const t = new TerrainErosion(20, 20, 0);
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 20; x++) {
        t.set(x, y, 10 - Math.abs(x - 10) - Math.abs(y - 10));
      }
    }
    const before = t.snapshot();
    t.hydraulicErosion(50);
    let changed = false;
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 20; x++) {
        if (Math.abs(t.get(x, y) - before[y][x]) > 0.0001) { changed = true; break; }
      }
      if (changed) break;
    }
    expect(changed).toBe(true);
  });
});
