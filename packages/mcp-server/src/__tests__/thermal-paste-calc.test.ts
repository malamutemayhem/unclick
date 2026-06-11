import { describe, it, expect } from "vitest";
import {
  conductivity, applyEase, longevity, cleanEase,
  pasteCost, conductive, nonCuring, baseCompound,
  bestUse, thermalPastes,
} from "../thermal-paste-calc.js";

describe("conductivity", () => {
  it("liquid metal gallium highest conductivity", () => {
    expect(conductivity("liquid_metal_gallium")).toBeGreaterThan(conductivity("silicone_based_standard"));
  });
});

describe("applyEase", () => {
  it("phase change pad easiest apply", () => {
    expect(applyEase("phase_change_pad")).toBeGreaterThan(applyEase("liquid_metal_gallium"));
  });
});

describe("longevity", () => {
  it("carbon fiber compound longest lasting", () => {
    expect(longevity("carbon_fiber_compound")).toBeGreaterThan(longevity("phase_change_pad"));
  });
});

describe("cleanEase", () => {
  it("phase change pad easiest clean", () => {
    expect(cleanEase("phase_change_pad")).toBeGreaterThan(cleanEase("liquid_metal_gallium"));
  });
});

describe("pasteCost", () => {
  it("liquid metal gallium most expensive", () => {
    expect(pasteCost("liquid_metal_gallium")).toBeGreaterThan(pasteCost("silicone_based_standard"));
  });
});

describe("conductive", () => {
  it("liquid metal gallium is conductive", () => {
    expect(conductive("liquid_metal_gallium")).toBe(true);
  });
  it("silicone based standard not conductive", () => {
    expect(conductive("silicone_based_standard")).toBe(false);
  });
});

describe("nonCuring", () => {
  it("silicone based standard is non curing", () => {
    expect(nonCuring("silicone_based_standard")).toBe(true);
  });
  it("phase change pad not non curing", () => {
    expect(nonCuring("phase_change_pad")).toBe(false);
  });
});

describe("baseCompound", () => {
  it("carbon fiber compound uses carbon fiber matrix", () => {
    expect(baseCompound("carbon_fiber_compound")).toBe("carbon_fiber_matrix");
  });
});

describe("bestUse", () => {
  it("liquid metal gallium best for extreme overclock", () => {
    expect(bestUse("liquid_metal_gallium")).toBe("extreme_overclock");
  });
});

describe("thermalPastes", () => {
  it("returns 5 types", () => {
    expect(thermalPastes()).toHaveLength(5);
  });
});
