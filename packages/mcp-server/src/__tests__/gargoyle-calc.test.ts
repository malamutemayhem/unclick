import { describe, it, expect } from "vitest";
import {
  spoutLength, drainageCapacity, carvingHours, weightKg,
  erosionRate, mountingBolts, projectionCm, waterFlowAngle,
  restorationCost, stoneTypes,
} from "../gargoyle-calc.js";

describe("spoutLength", () => {
  it("positive cm", () => {
    expect(spoutLength(10)).toBeGreaterThan(0);
  });
});

describe("drainageCapacity", () => {
  it("positive liters", () => {
    expect(drainageCapacity(50, 20)).toBeGreaterThan(0);
  });
});

describe("carvingHours", () => {
  it("harder stone = more hours", () => {
    expect(carvingHours(5, 8)).toBeGreaterThan(carvingHours(5, 3));
  });
});

describe("weightKg", () => {
  it("granite heaviest", () => {
    expect(weightKg(50, 30, 40, "granite")).toBeGreaterThan(weightKg(50, 30, 40, "sandstone"));
  });
});

describe("erosionRate", () => {
  it("granite slowest", () => {
    expect(erosionRate("granite")).toBeLessThan(erosionRate("sandstone"));
  });
});

describe("mountingBolts", () => {
  it("1 per 50kg", () => {
    expect(mountingBolts(150)).toBe(3);
  });
});

describe("projectionCm", () => {
  it("60% of wall", () => {
    expect(projectionCm(100)).toBe(60);
  });
});

describe("waterFlowAngle", () => {
  it("positive angle", () => {
    expect(waterFlowAngle(50, 10)).toBeGreaterThan(0);
  });
  it("zero spout = 0", () => {
    expect(waterFlowAngle(0, 10)).toBe(0);
  });
});

describe("restorationCost", () => {
  it("increases with age", () => {
    expect(restorationCost(100, "limestone")).toBeGreaterThan(restorationCost(10, "limestone"));
  });
});

describe("stoneTypes", () => {
  it("returns 5 types", () => {
    expect(stoneTypes()).toHaveLength(5);
  });
});
