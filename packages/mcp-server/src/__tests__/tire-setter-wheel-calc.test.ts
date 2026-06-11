import { describe, it, expect } from "vitest";
import {
  fitTight, heatControl, speedSet, sizeRange,
  setterCost, powered, portable, heatMethod,
  bestUse, tireSetterWheels,
} from "../tire-setter-wheel-calc.js";

describe("fitTight", () => {
  it("pit fire traditional tightest fit", () => {
    expect(fitTight("pit_fire_traditional")).toBeGreaterThan(fitTight("portable_setter_field"));
  });
});

describe("heatControl", () => {
  it("electric heat ring best heat control", () => {
    expect(heatControl("electric_heat_ring")).toBeGreaterThan(heatControl("pit_fire_traditional"));
  });
});

describe("speedSet", () => {
  it("hydraulic press modern fastest set", () => {
    expect(speedSet("hydraulic_press_modern")).toBeGreaterThan(speedSet("pit_fire_traditional"));
  });
});

describe("sizeRange", () => {
  it("pit fire traditional best size range", () => {
    expect(sizeRange("pit_fire_traditional")).toBeGreaterThan(sizeRange("portable_setter_field"));
  });
});

describe("setterCost", () => {
  it("hydraulic press modern most expensive", () => {
    expect(setterCost("hydraulic_press_modern")).toBeGreaterThan(setterCost("portable_setter_field"));
  });
});

describe("powered", () => {
  it("hydraulic press modern is powered", () => {
    expect(powered("hydraulic_press_modern")).toBe(true);
  });
  it("platform setter standard not powered", () => {
    expect(powered("platform_setter_standard")).toBe(false);
  });
});

describe("portable", () => {
  it("portable setter field is portable", () => {
    expect(portable("portable_setter_field")).toBe(true);
  });
  it("platform setter standard not portable", () => {
    expect(portable("platform_setter_standard")).toBe(false);
  });
});

describe("heatMethod", () => {
  it("electric heat ring uses electric coil ring", () => {
    expect(heatMethod("electric_heat_ring")).toBe("electric_coil_ring");
  });
});

describe("bestUse", () => {
  it("platform setter standard best for general tire set", () => {
    expect(bestUse("platform_setter_standard")).toBe("general_tire_set");
  });
});

describe("tireSetterWheels", () => {
  it("returns 5 types", () => {
    expect(tireSetterWheels()).toHaveLength(5);
  });
});
