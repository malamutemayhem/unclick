import { describe, it, expect } from "vitest";
import {
  density, hardness, adhesion, porosity,
  hvCost, lowOxide, forCarbide, fuel,
  bestUse, hvofCoatingTypes,
} from "../hvof-coating-calc.js";

describe("density", () => {
  it("gas fuel kerosene densest", () => {
    expect(density("gas_fuel_kerosene")).toBeGreaterThan(density("high_velocity_air_fuel"));
  });
});

describe("hardness", () => {
  it("gas fuel kerosene hardest", () => {
    expect(hardness("gas_fuel_kerosene")).toBeGreaterThan(hardness("high_velocity_air_fuel"));
  });
});

describe("adhesion", () => {
  it("gas fuel kerosene best adhesion", () => {
    expect(adhesion("gas_fuel_kerosene")).toBeGreaterThan(adhesion("high_velocity_air_fuel"));
  });
});

describe("porosity", () => {
  it("gas fuel kerosene lowest porosity", () => {
    expect(porosity("gas_fuel_kerosene")).toBeGreaterThan(porosity("high_velocity_air_fuel"));
  });
});

describe("hvCost", () => {
  it("warm spray most expensive", () => {
    expect(hvCost("warm_spray_nitrogen")).toBeGreaterThan(hvCost("high_velocity_air_fuel"));
  });
});

describe("lowOxide", () => {
  it("gas fuel kerosene is low oxide", () => {
    expect(lowOxide("gas_fuel_kerosene")).toBe(true);
  });
  it("high velocity air fuel not low oxide", () => {
    expect(lowOxide("high_velocity_air_fuel")).toBe(false);
  });
});

describe("forCarbide", () => {
  it("gas fuel kerosene for carbide", () => {
    expect(forCarbide("gas_fuel_kerosene")).toBe(true);
  });
  it("warm spray not for carbide", () => {
    expect(forCarbide("warm_spray_nitrogen")).toBe(false);
  });
});

describe("fuel", () => {
  it("warm spray uses kerosene nitrogen", () => {
    expect(fuel("warm_spray_nitrogen")).toBe("kerosene_nitrogen_mixing_lower_temp");
  });
});

describe("bestUse", () => {
  it("gas fuel kerosene for landing gear carbide", () => {
    expect(bestUse("gas_fuel_kerosene")).toBe("landing_gear_hydraulic_rod_wc_co_carbide");
  });
});

describe("hvofCoatingTypes", () => {
  it("returns 5 types", () => {
    expect(hvofCoatingTypes()).toHaveLength(5);
  });
});
