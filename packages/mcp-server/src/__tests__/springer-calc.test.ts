import { describe, it, expect } from "vitest";
import {
  angleFromVertical, bedAngle, blockWidthCm, blockDepthCm,
  blockHeightCm, weightKg, bearingAreaCm2, bearingStressKpa,
  tasDeChargeCount, cuttingAccuracyMm, springerTypes,
} from "../springer-calc.js";

describe("angleFromVertical", () => {
  it("positive angle", () => {
    expect(angleFromVertical(200, 100)).toBeGreaterThan(0);
  });
  it("zero rise = 0", () => {
    expect(angleFromVertical(200, 0)).toBe(0);
  });
});

describe("bedAngle", () => {
  it("skewback full angle", () => {
    expect(bedAngle("skewback", 45)).toBe(45);
  });
  it("impost = 0", () => {
    expect(bedAngle("impost", 45)).toBe(0);
  });
});

describe("blockWidthCm", () => {
  it("12% of arch", () => {
    expect(blockWidthCm(200)).toBe(24);
  });
});

describe("blockDepthCm", () => {
  it("90% of wall", () => {
    expect(blockDepthCm(50)).toBe(45);
  });
});

describe("blockHeightCm", () => {
  it("120% of voussoir", () => {
    expect(blockHeightCm(20)).toBe(24);
  });
});

describe("weightKg", () => {
  it("positive weight", () => {
    expect(weightKg(24, 45, 24, 2.5)).toBeGreaterThan(0);
  });
});

describe("bearingAreaCm2", () => {
  it("positive area", () => {
    expect(bearingAreaCm2(24, 45)).toBeGreaterThan(0);
  });
});

describe("bearingStressKpa", () => {
  it("positive stress", () => {
    expect(bearingStressKpa(50, 1080)).toBeGreaterThan(0);
  });
  it("zero area = 0", () => {
    expect(bearingStressKpa(50, 0)).toBe(0);
  });
});

describe("tasDeChargeCount", () => {
  it("positive count", () => {
    expect(tasDeChargeCount(100, 20)).toBeGreaterThan(0);
  });
  it("zero course = 0", () => {
    expect(tasDeChargeCount(100, 0)).toBe(0);
  });
});

describe("cuttingAccuracyMm", () => {
  it("tas-de-charge most precise", () => {
    expect(cuttingAccuracyMm("tas-de-charge")).toBeLessThan(cuttingAccuracyMm("impost"));
  });
});

describe("springerTypes", () => {
  it("returns 5 types", () => {
    expect(springerTypes()).toHaveLength(5);
  });
});
