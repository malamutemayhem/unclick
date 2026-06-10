import { describe, it, expect } from "vitest";
import {
  lintPickup, fabricSafe, costPerUse, portability,
  rollerCost, reusable, needsPower, removalMethod,
  bestUse, lintRollers,
} from "../lint-roller-calc.js";

describe("lintPickup", () => {
  it("electric fabric shaver best pickup", () => {
    expect(lintPickup("electric_fabric_shaver")).toBeGreaterThan(lintPickup("velvet_brush_static"));
  });
});

describe("fabricSafe", () => {
  it("reusable silicone most fabric safe", () => {
    expect(fabricSafe("reusable_silicone")).toBeGreaterThan(fabricSafe("electric_fabric_shaver"));
  });
});

describe("costPerUse", () => {
  it("reusable silicone best cost per use", () => {
    expect(costPerUse("reusable_silicone")).toBeGreaterThan(costPerUse("adhesive_tear_sheet"));
  });
});

describe("portability", () => {
  it("travel mini roll most portable", () => {
    expect(portability("travel_mini_roll")).toBeGreaterThan(portability("electric_fabric_shaver"));
  });
});

describe("rollerCost", () => {
  it("electric fabric shaver most expensive", () => {
    expect(rollerCost("electric_fabric_shaver")).toBeGreaterThan(rollerCost("adhesive_tear_sheet"));
  });
});

describe("reusable", () => {
  it("reusable silicone is reusable", () => {
    expect(reusable("reusable_silicone")).toBe(true);
  });
  it("adhesive tear sheet is not", () => {
    expect(reusable("adhesive_tear_sheet")).toBe(false);
  });
});

describe("needsPower", () => {
  it("electric fabric shaver needs power", () => {
    expect(needsPower("electric_fabric_shaver")).toBe(true);
  });
  it("velvet brush static does not", () => {
    expect(needsPower("velvet_brush_static")).toBe(false);
  });
});

describe("removalMethod", () => {
  it("electric fabric shaver uses rotating blade shave", () => {
    expect(removalMethod("electric_fabric_shaver")).toBe("rotating_blade_shave");
  });
});

describe("bestUse", () => {
  it("velvet brush static best for wool suit coat care", () => {
    expect(bestUse("velvet_brush_static")).toBe("wool_suit_coat_care");
  });
});

describe("lintRollers", () => {
  it("returns 5 types", () => {
    expect(lintRollers()).toHaveLength(5);
  });
});
