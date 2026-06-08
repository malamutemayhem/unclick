import { describe, it, expect } from "vitest";
import {
  generateHeightmap, classifyBiome, applyErosion, normalizeHeightmap,
} from "../terrain-generator.js";

describe("generateHeightmap", () => {
  it("generates correct dimensions", () => {
    const map = generateHeightmap({ width: 10, height: 8 });
    expect(map).toHaveLength(8);
    expect(map[0]).toHaveLength(10);
  });

  it("values between 0 and 1", () => {
    const map = generateHeightmap({ width: 20, height: 20, seed: 42 });
    for (const row of map) {
      for (const v of row) {
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThanOrEqual(1);
      }
    }
  });

  it("is deterministic with same seed", () => {
    const a = generateHeightmap({ width: 5, height: 5, seed: 123 });
    const b = generateHeightmap({ width: 5, height: 5, seed: 123 });
    expect(a).toEqual(b);
  });

  it("differs with different seed", () => {
    const a = generateHeightmap({ width: 5, height: 5, seed: 1 });
    const b = generateHeightmap({ width: 5, height: 5, seed: 2 });
    expect(a).not.toEqual(b);
  });
});

describe("classifyBiome", () => {
  it("classifies water", () => expect(classifyBiome(0.1)).toBe("water"));
  it("classifies beach", () => expect(classifyBiome(0.32)).toBe("beach"));
  it("classifies grass", () => expect(classifyBiome(0.5)).toBe("grass"));
  it("classifies forest with moisture", () => expect(classifyBiome(0.5, 0.8)).toBe("forest"));
  it("classifies mountain", () => expect(classifyBiome(0.7)).toBe("mountain"));
  it("classifies snow", () => expect(classifyBiome(0.9)).toBe("snow"));
});

describe("applyErosion", () => {
  it("smooths heightmap", () => {
    const map = [[0, 1, 0], [1, 0, 1], [0, 1, 0]];
    const eroded = applyErosion(map, 1, 0.5);
    expect(eroded[1][1]).not.toBe(0);
  });
});

describe("normalizeHeightmap", () => {
  it("normalizes to 0-1", () => {
    const map = [[5, 10], [15, 20]];
    const norm = normalizeHeightmap(map);
    expect(norm[0][0]).toBeCloseTo(0);
    expect(norm[1][1]).toBeCloseTo(1);
  });
});
