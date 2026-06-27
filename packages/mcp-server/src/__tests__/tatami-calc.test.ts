import { describe, it, expect } from "vitest";
import {
  matCount, matDimensions, roomAreaM2, strawWeight,
  replacementYears, borderTrimM, moisturePercent,
  installTimeHours, costPerMat, loadBearingKgM2, tatamiSizes,
} from "../tatami-calc.js";

describe("matCount", () => {
  it("equals room jo", () => {
    expect(matCount(6)).toBe(6);
  });
});

describe("matDimensions", () => {
  it("kyoto longest", () => {
    expect(matDimensions("kyoto").lengthCm).toBeGreaterThan(matDimensions("danchi").lengthCm);
  });
});

describe("roomAreaM2", () => {
  it("positive area", () => {
    expect(roomAreaM2(6, "kyoto")).toBeGreaterThan(0);
  });
});

describe("strawWeight", () => {
  it("positive kg", () => {
    expect(strawWeight(6, 5.5)).toBeGreaterThan(0);
  });
});

describe("replacementYears", () => {
  it("heavy shorter than light", () => {
    expect(replacementYears("heavy")).toBeLessThan(replacementYears("light"));
  });
});

describe("borderTrimM", () => {
  it("positive meters", () => {
    expect(borderTrimM(6, "tokyo")).toBeGreaterThan(0);
  });
});

describe("moisturePercent", () => {
  it("capped at 20", () => {
    expect(moisturePercent(200)).toBeLessThanOrEqual(20);
  });
});

describe("installTimeHours", () => {
  it("positive hours", () => {
    expect(installTimeHours(6)).toBeGreaterThan(0);
  });
});

describe("costPerMat", () => {
  it("luxury most expensive", () => {
    expect(costPerMat("kyoto", "luxury")).toBeGreaterThan(costPerMat("kyoto", "economy"));
  });
});

describe("loadBearingKgM2", () => {
  it("positive load", () => {
    expect(loadBearingKgM2(5.5)).toBeGreaterThan(0);
  });
});

describe("tatamiSizes", () => {
  it("returns 4 sizes", () => {
    expect(tatamiSizes()).toHaveLength(4);
  });
});
