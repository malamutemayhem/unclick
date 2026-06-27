import { describe, it, expect } from "vitest";
import {
  bowlDiameterCm, bowlDepthCm, fuelCapacityMl, burnTimeHours,
  lightRadiusM, heatOutputBtu, bracketWeightKg, smokeOutputIndex,
  refillCostPerHour, cressetFuels,
} from "../cresset-calc.js";

describe("bowlDiameterCm", () => {
  it("8x mount height", () => {
    expect(bowlDiameterCm(2)).toBe(16);
  });
});

describe("bowlDepthCm", () => {
  it("50% of diameter", () => {
    expect(bowlDepthCm(16)).toBe(8);
  });
});

describe("fuelCapacityMl", () => {
  it("positive capacity", () => {
    expect(fuelCapacityMl(16, 8)).toBeGreaterThan(0);
  });
});

describe("burnTimeHours", () => {
  it("resin shortest burn rate", () => {
    expect(burnTimeHours(500, "resin")).toBeGreaterThan(burnTimeHours(500, "oil"));
  });
});

describe("lightRadiusM", () => {
  it("resin brightest", () => {
    expect(lightRadiusM(16, "resin")).toBeGreaterThan(lightRadiusM(16, "tallow"));
  });
});

describe("heatOutputBtu", () => {
  it("positive output", () => {
    expect(heatOutputBtu(16)).toBeGreaterThan(0);
  });
});

describe("bracketWeightKg", () => {
  it("positive weight", () => {
    expect(bracketWeightKg(2)).toBeGreaterThan(0);
  });
});

describe("smokeOutputIndex", () => {
  it("pitch smokiest", () => {
    expect(smokeOutputIndex("pitch")).toBeGreaterThan(smokeOutputIndex("beeswax"));
  });
});

describe("refillCostPerHour", () => {
  it("beeswax most expensive", () => {
    expect(refillCostPerHour("beeswax", 10)).toBeGreaterThan(refillCostPerHour("pitch", 10));
  });
});

describe("cressetFuels", () => {
  it("returns 5 fuels", () => {
    expect(cressetFuels()).toHaveLength(5);
  });
});
