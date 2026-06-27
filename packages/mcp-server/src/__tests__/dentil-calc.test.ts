import { describe, it, expect } from "vitest";
import {
  blockWidth, blockHeight, blockDepth, gapWidth,
  count, totalLength, weightKg, shadowDepthCm,
  carvingHoursPerBlock, paintVolumeMl, dentilMaterials,
} from "../dentil-calc.js";

describe("blockWidth", () => {
  it("8% of cornice", () => {
    expect(blockWidth(100)).toBe(8);
  });
});

describe("blockHeight", () => {
  it("1.5x width", () => {
    expect(blockHeight(8)).toBe(12);
  });
});

describe("blockDepth", () => {
  it("80% of width", () => {
    expect(blockDepth(8)).toBe(6.4);
  });
});

describe("gapWidth", () => {
  it("60% of block", () => {
    expect(gapWidth(8)).toBe(4.8);
  });
});

describe("count", () => {
  it("positive count", () => {
    expect(count(500, 8, 4.8)).toBeGreaterThan(0);
  });
  it("zero unit = 0", () => {
    expect(count(500, 0, 0)).toBe(0);
  });
});

describe("totalLength", () => {
  it("positive length", () => {
    expect(totalLength(39, 8, 4.8)).toBeGreaterThan(0);
  });
});

describe("weightKg", () => {
  it("stone heaviest", () => {
    expect(weightKg(39, 8, 12, 6.4, "stone")).toBeGreaterThan(weightKg(39, 8, 12, 6.4, "wood"));
  });
});

describe("shadowDepthCm", () => {
  it("positive depth", () => {
    expect(shadowDepthCm(6.4, 45)).toBeGreaterThan(0);
  });
  it("zero angle = 0", () => {
    expect(shadowDepthCm(6.4, 0)).toBe(0);
  });
});

describe("carvingHoursPerBlock", () => {
  it("stone slowest", () => {
    expect(carvingHoursPerBlock("stone")).toBeGreaterThan(carvingHoursPerBlock("plaster"));
  });
});

describe("paintVolumeMl", () => {
  it("positive ml", () => {
    expect(paintVolumeMl(39, 400, 2)).toBeGreaterThan(0);
  });
});

describe("dentilMaterials", () => {
  it("returns 5 materials", () => {
    expect(dentilMaterials()).toHaveLength(5);
  });
});
