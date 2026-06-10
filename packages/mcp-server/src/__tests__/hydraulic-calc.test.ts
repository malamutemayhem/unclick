import { describe, it, expect } from "vitest";
import {
  pascalPressure, forceMultiplier, outputForce, flowRate,
  reynoldsNumber, isLaminar, pressureDrop, cylinderForce,
  pumpPowerW, fluidDensity, viscosity, fluidTypes,
} from "../hydraulic-calc.js";

describe("pascalPressure", () => {
  it("F/A", () => {
    expect(pascalPressure(100, 0.01)).toBe(10000);
  });
  it("zero area = 0", () => {
    expect(pascalPressure(100, 0)).toBe(0);
  });
});

describe("forceMultiplier", () => {
  it("correct ratio", () => {
    expect(forceMultiplier(1, 10)).toBe(10);
  });
});

describe("outputForce", () => {
  it("multiplied force", () => {
    expect(outputForce(50, 10)).toBe(500);
  });
});

describe("flowRate", () => {
  it("positive L/s", () => {
    expect(flowRate(2, 0.01)).toBeGreaterThan(0);
  });
});

describe("reynoldsNumber", () => {
  it("positive number", () => {
    expect(reynoldsNumber(1, 0.05, 0.001)).toBeGreaterThan(0);
  });
  it("zero viscosity = 0", () => {
    expect(reynoldsNumber(1, 0.05, 0)).toBe(0);
  });
});

describe("isLaminar", () => {
  it("low Re = laminar", () => {
    expect(isLaminar(1000)).toBe(true);
  });
  it("high Re = turbulent", () => {
    expect(isLaminar(5000)).toBe(false);
  });
});

describe("pressureDrop", () => {
  it("positive drop", () => {
    expect(pressureDrop(10, 0.05, 2, 0.02)).toBeGreaterThan(0);
  });
});

describe("cylinderForce", () => {
  it("positive force", () => {
    expect(cylinderForce(1000000, 0.1)).toBeGreaterThan(0);
  });
});

describe("pumpPowerW", () => {
  it("positive watts", () => {
    expect(pumpPowerW(60, 100)).toBeGreaterThan(0);
  });
});

describe("fluidDensity", () => {
  it("water = 1000", () => {
    expect(fluidDensity("water")).toBe(1000);
  });
});

describe("viscosity", () => {
  it("oil thickest", () => {
    expect(viscosity("oil")).toBeGreaterThan(viscosity("water"));
  });
});

describe("fluidTypes", () => {
  it("returns 4 types", () => {
    expect(fluidTypes()).toHaveLength(4);
  });
});
