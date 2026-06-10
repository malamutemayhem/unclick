import { describe, it, expect } from "vitest";
import {
  dentsPerCm, reedWidthCm, endsPerDent, sleySizeForPpi, reedDepthMm,
  wireGaugeMm, reedWeightG, lifespanYears, costEstimate, reedDents,
} from "../loom-reed-calc.js";

describe("dentsPerCm", () => {
  it("higher reed = more dents", () => {
    expect(dentsPerCm("25")).toBeGreaterThan(dentsPerCm("10"));
  });
});

describe("reedWidthCm", () => {
  it("5cm wider than warp", () => {
    expect(reedWidthCm(50)).toBe(55);
  });
});

describe("endsPerDent", () => {
  it("returns positive number for valid inputs", () => {
    expect(endsPerDent(400, 50, 4)).toBeGreaterThan(0);
  });
});

describe("sleySizeForPpi", () => {
  it("half the picks per inch", () => {
    expect(sleySizeForPpi(20)).toBe(10);
  });
});

describe("reedDepthMm", () => {
  it("coarser reed is deeper", () => {
    expect(reedDepthMm("10")).toBeGreaterThan(reedDepthMm("25"));
  });
});

describe("wireGaugeMm", () => {
  it("finer reed has thinner wire", () => {
    expect(wireGaugeMm("25")).toBeLessThan(wireGaugeMm("10"));
  });
});

describe("reedWeightG", () => {
  it("wider reed = heavier", () => {
    expect(reedWeightG(100, "15")).toBeGreaterThan(reedWeightG(50, "15"));
  });
});

describe("lifespanYears", () => {
  it("stainless lasts longer", () => {
    expect(lifespanYears("stainless")).toBeGreaterThan(lifespanYears("carbon_steel"));
  });
});

describe("costEstimate", () => {
  it("finer reed costs more", () => {
    expect(costEstimate("25", 60)).toBeGreaterThan(costEstimate("10", 60));
  });
});

describe("reedDents", () => {
  it("returns 5 dents", () => {
    expect(reedDents()).toHaveLength(5);
  });
});
