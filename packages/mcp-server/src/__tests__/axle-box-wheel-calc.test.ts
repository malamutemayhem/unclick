import { describe, it, expect } from "vitest";
import {
  frictionLow, loadCapacity, wearLife, adjustEase,
  boxCost, adjustable, forHeavy, bearingType,
  bestUse, axleBoxWheels,
} from "../axle-box-wheel-calc.js";

describe("frictionLow", () => {
  it("roller bearing modern lowest friction", () => {
    expect(frictionLow("roller_bearing_modern")).toBeGreaterThan(frictionLow("cast_iron_standard"));
  });
});

describe("loadCapacity", () => {
  it("bronze bearing heavy best load capacity", () => {
    expect(loadCapacity("bronze_bearing_heavy")).toBeGreaterThan(loadCapacity("lignum_vitae_wooden"));
  });
});

describe("wearLife", () => {
  it("roller bearing modern best wear life", () => {
    expect(wearLife("roller_bearing_modern")).toBeGreaterThan(wearLife("lignum_vitae_wooden"));
  });
});

describe("adjustEase", () => {
  it("split box adjustable easiest adjust", () => {
    expect(adjustEase("split_box_adjustable")).toBeGreaterThan(adjustEase("bronze_bearing_heavy"));
  });
});

describe("boxCost", () => {
  it("roller bearing modern most expensive", () => {
    expect(boxCost("roller_bearing_modern")).toBeGreaterThan(boxCost("lignum_vitae_wooden"));
  });
});

describe("adjustable", () => {
  it("split box adjustable is adjustable", () => {
    expect(adjustable("split_box_adjustable")).toBe(true);
  });
  it("cast iron standard not adjustable", () => {
    expect(adjustable("cast_iron_standard")).toBe(false);
  });
});

describe("forHeavy", () => {
  it("bronze bearing heavy is for heavy", () => {
    expect(forHeavy("bronze_bearing_heavy")).toBe(true);
  });
  it("cast iron standard not for heavy", () => {
    expect(forHeavy("cast_iron_standard")).toBe(false);
  });
});

describe("bearingType", () => {
  it("roller bearing modern uses tapered roller set", () => {
    expect(bearingType("roller_bearing_modern")).toBe("tapered_roller_set");
  });
});

describe("bestUse", () => {
  it("cast iron standard best for general cart axle", () => {
    expect(bestUse("cast_iron_standard")).toBe("general_cart_axle");
  });
});

describe("axleBoxWheels", () => {
  it("returns 5 types", () => {
    expect(axleBoxWheels()).toHaveLength(5);
  });
});
