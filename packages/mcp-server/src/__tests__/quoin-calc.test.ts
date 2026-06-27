import { describe, it, expect } from "vitest";
import {
  blockCount, projectionCm, blockVolumeCm3, weightKg,
  mortarJointMm, cornerStrength, carvingHoursPerBlock,
  totalCarvingHours, weatheringDepthMm, repairCostPerBlock, quoinPatterns,
} from "../quoin-calc.js";

describe("blockCount", () => {
  it("positive count", () => {
    expect(blockCount(300, 30)).toBe(10);
  });
  it("zero course = 0", () => {
    expect(blockCount(300, 0)).toBe(0);
  });
});

describe("projectionCm", () => {
  it("8% of wall", () => {
    expect(projectionCm(50)).toBe(4);
  });
});

describe("blockVolumeCm3", () => {
  it("positive volume", () => {
    expect(blockVolumeCm3(30, 20, 40)).toBeGreaterThan(0);
  });
});

describe("weightKg", () => {
  it("positive weight", () => {
    expect(weightKg(24000, 2.5)).toBeGreaterThan(0);
  });
});

describe("mortarJointMm", () => {
  it("rusticated widest", () => {
    expect(mortarJointMm("rusticated")).toBeGreaterThan(mortarJointMm("stacked"));
  });
});

describe("cornerStrength", () => {
  it("positive strength", () => {
    expect(cornerStrength(10, 4)).toBeGreaterThan(0);
  });
});

describe("carvingHoursPerBlock", () => {
  it("vermiculated slowest", () => {
    expect(carvingHoursPerBlock("vermiculated")).toBeGreaterThan(carvingHoursPerBlock("stacked"));
  });
});

describe("totalCarvingHours", () => {
  it("positive hours", () => {
    expect(totalCarvingHours(10, "rusticated")).toBeGreaterThan(0);
  });
});

describe("weatheringDepthMm", () => {
  it("positive depth", () => {
    expect(weatheringDepthMm(100, 2)).toBeGreaterThan(0);
  });
});

describe("repairCostPerBlock", () => {
  it("positive cost", () => {
    expect(repairCostPerBlock(24000, 0.01, 2, 50)).toBeGreaterThan(0);
  });
});

describe("quoinPatterns", () => {
  it("returns 5 patterns", () => {
    expect(quoinPatterns()).toHaveLength(5);
  });
});
