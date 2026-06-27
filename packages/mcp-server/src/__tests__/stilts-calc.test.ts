import { describe, it, expect } from "vitest";
import {
  stiltHeight, footplatformSize, strapCount, balancePoint,
  fallRisk, trainingHours, loadCapacityKg, speedReduction,
  stiltTypes,
} from "../stilts-calc.js";

describe("stiltHeight", () => {
  it("desired minus user", () => {
    expect(stiltHeight(170, 230)).toBe(60);
  });
});

describe("footplatformSize", () => {
  it("returns dimensions", () => {
    const fp = footplatformSize(42);
    expect(fp.lengthCm).toBeGreaterThan(0);
    expect(fp.widthCm).toBeGreaterThan(0);
  });
});

describe("strapCount", () => {
  it("1 for short stilts", () => {
    expect(strapCount(20)).toBe(1);
  });
  it("3 for tall stilts", () => {
    expect(strapCount(80)).toBe(3);
  });
});

describe("balancePoint", () => {
  it("60% of height", () => {
    expect(balancePoint(100)).toBe(60);
  });
});

describe("fallRisk", () => {
  it("low for short expert", () => {
    expect(fallRisk(20, "expert")).toBe("low");
  });
  it("high for tall beginner", () => {
    expect(fallRisk(100, "beginner")).toBe("high");
  });
});

describe("trainingHours", () => {
  it("circus most", () => {
    expect(trainingHours("circus")).toBeGreaterThan(trainingHours("drywall"));
  });
});

describe("loadCapacityKg", () => {
  it("positive kg", () => {
    expect(loadCapacityKg(5, "aluminum")).toBeGreaterThan(0);
  });
  it("carbon fiber strongest", () => {
    expect(loadCapacityKg(5, "carbon_fiber")).toBeGreaterThan(loadCapacityKg(5, "wood"));
  });
});

describe("speedReduction", () => {
  it("less reduction at low height", () => {
    expect(speedReduction(20)).toBeGreaterThan(speedReduction(100));
  });
});

describe("stiltTypes", () => {
  it("returns 5 types", () => {
    expect(stiltTypes()).toHaveLength(5);
  });
});
