import { describe, it, expect } from "vitest";
import {
  power, torque, smoothness, efficiency,
  peCost, turbo, forTruck, layout,
  bestUse, pistonEngineTypes,
} from "../piston-engine-type-calc.js";

describe("power", () => {
  it("v8 highest power", () => {
    expect(power("v8_crossplane_petrol")).toBeGreaterThan(power("inline_four_petrol"));
  });
});

describe("torque", () => {
  it("inline six diesel highest torque", () => {
    expect(torque("inline_six_diesel")).toBeGreaterThan(torque("rotary_wankel_epitrochoid"));
  });
});

describe("smoothness", () => {
  it("inline six diesel smoothest", () => {
    expect(smoothness("inline_six_diesel")).toBeGreaterThan(smoothness("inline_four_petrol"));
  });
});

describe("efficiency", () => {
  it("inline six diesel most efficient", () => {
    expect(efficiency("inline_six_diesel")).toBeGreaterThan(efficiency("rotary_wankel_epitrochoid"));
  });
});

describe("peCost", () => {
  it("v8 most expensive", () => {
    expect(peCost("v8_crossplane_petrol")).toBeGreaterThan(peCost("inline_four_petrol"));
  });
});

describe("turbo", () => {
  it("inline four is turbo", () => {
    expect(turbo("inline_four_petrol")).toBe(true);
  });
  it("v8 not turbo", () => {
    expect(turbo("v8_crossplane_petrol")).toBe(false);
  });
});

describe("forTruck", () => {
  it("v8 for truck", () => {
    expect(forTruck("v8_crossplane_petrol")).toBe(true);
  });
  it("inline four not for truck", () => {
    expect(forTruck("inline_four_petrol")).toBe(false);
  });
});

describe("layout", () => {
  it("rotary uses triangular rotor", () => {
    expect(layout("rotary_wankel_epitrochoid")).toBe("triangular_rotor_epitrochoid_housing");
  });
});

describe("bestUse", () => {
  it("flat boxer for low cg sports car", () => {
    expect(bestUse("flat_boxer_opposed")).toBe("low_cg_sports_car_aircraft");
  });
});

describe("pistonEngineTypes", () => {
  it("returns 5 types", () => {
    expect(pistonEngineTypes()).toHaveLength(5);
  });
});
