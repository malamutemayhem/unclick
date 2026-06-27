import { describe, it, expect } from "vitest";
import {
  waterCapacity, filterQuality, noiseLevel, cleanEase,
  fountainCost, dishwasherSafe, cordFree, pumpType,
  bestCat, catFountains,
} from "../cat-fountain-calc.js";

describe("waterCapacity", () => {
  it("plastic gravity flow largest water capacity", () => {
    expect(waterCapacity("plastic_gravity_flow")).toBeGreaterThan(waterCapacity("cordless_battery_pump"));
  });
});

describe("filterQuality", () => {
  it("stainless steel tower best filter quality", () => {
    expect(filterQuality("stainless_steel_tower")).toBeGreaterThan(filterQuality("plastic_gravity_flow"));
  });
});

describe("noiseLevel", () => {
  it("cordless battery pump quietest", () => {
    expect(noiseLevel("cordless_battery_pump")).toBeGreaterThan(noiseLevel("glass_bubble_stream"));
  });
});

describe("cleanEase", () => {
  it("stainless steel tower easiest to clean", () => {
    expect(cleanEase("stainless_steel_tower")).toBeGreaterThan(cleanEase("glass_bubble_stream"));
  });
});

describe("fountainCost", () => {
  it("cordless battery pump most expensive", () => {
    expect(fountainCost("cordless_battery_pump")).toBeGreaterThan(fountainCost("plastic_gravity_flow"));
  });
});

describe("dishwasherSafe", () => {
  it("ceramic flower is dishwasher safe", () => {
    expect(dishwasherSafe("ceramic_flower")).toBe(true);
  });
  it("plastic gravity flow is not", () => {
    expect(dishwasherSafe("plastic_gravity_flow")).toBe(false);
  });
});

describe("cordFree", () => {
  it("cordless battery pump is cord free", () => {
    expect(cordFree("cordless_battery_pump")).toBe(true);
  });
  it("ceramic flower is not", () => {
    expect(cordFree("ceramic_flower")).toBe(false);
  });
});

describe("pumpType", () => {
  it("plastic gravity flow uses gravity no pump passive", () => {
    expect(pumpType("plastic_gravity_flow")).toBe("gravity_no_pump_passive");
  });
});

describe("bestCat", () => {
  it("stainless steel tower best for multi cat household", () => {
    expect(bestCat("stainless_steel_tower")).toBe("multi_cat_household");
  });
});

describe("catFountains", () => {
  it("returns 5 types", () => {
    expect(catFountains()).toHaveLength(5);
  });
});
