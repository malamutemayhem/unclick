import { describe, it, expect } from "vitest";
import {
  cushioning, impactProtect, mobility, stayInPlace,
  padCost, waterproof, adjustableStrap, capMaterial,
  bestTask, kneePads,
} from "../knee-pad-calc.js";

describe("cushioning", () => {
  it("gel insert flooring best cushioning", () => {
    expect(cushioning("gel_insert_flooring")).toBeGreaterThan(cushioning("hinged_sport_brace"));
  });
});

describe("impactProtect", () => {
  it("hard cap construction best impact protection", () => {
    expect(impactProtect("hard_cap_construction")).toBeGreaterThan(impactProtect("foam_soft_gardening"));
  });
});

describe("mobility", () => {
  it("roller wheel creeper best mobility", () => {
    expect(mobility("roller_wheel_creeper")).toBeGreaterThan(mobility("hard_cap_construction"));
  });
});

describe("stayInPlace", () => {
  it("hinged sport brace stays in place best", () => {
    expect(stayInPlace("hinged_sport_brace")).toBeGreaterThan(stayInPlace("foam_soft_gardening"));
  });
});

describe("padCost", () => {
  it("roller wheel creeper most expensive", () => {
    expect(padCost("roller_wheel_creeper")).toBeGreaterThan(padCost("foam_soft_gardening"));
  });
});

describe("waterproof", () => {
  it("hard cap construction is waterproof", () => {
    expect(waterproof("hard_cap_construction")).toBe(true);
  });
  it("foam soft gardening is not", () => {
    expect(waterproof("foam_soft_gardening")).toBe(false);
  });
});

describe("adjustableStrap", () => {
  it("hinged sport brace has adjustable strap", () => {
    expect(adjustableStrap("hinged_sport_brace")).toBe(true);
  });
  it("foam soft gardening does not", () => {
    expect(adjustableStrap("foam_soft_gardening")).toBe(false);
  });
});

describe("capMaterial", () => {
  it("hard cap construction uses polyethylene hard cap", () => {
    expect(capMaterial("hard_cap_construction")).toBe("polyethylene_hard_cap");
  });
});

describe("bestTask", () => {
  it("gel insert flooring best for tile flooring install", () => {
    expect(bestTask("gel_insert_flooring")).toBe("tile_flooring_install");
  });
});

describe("kneePads", () => {
  it("returns 5 types", () => {
    expect(kneePads()).toHaveLength(5);
  });
});
