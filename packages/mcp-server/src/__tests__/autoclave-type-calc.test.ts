import { describe, it, expect } from "vitest";
import {
  penetration, speed, materialSafe, validation,
  acCost, steam, forSurgical, cycle,
  bestUse, autoclaveTypes,
} from "../autoclave-type-calc.js";

describe("penetration", () => {
  it("pre vacuum best penetration", () => {
    expect(penetration("pre_vacuum_pulsing")).toBeGreaterThan(penetration("gravity_displacement_downward"));
  });
});

describe("speed", () => {
  it("pre vacuum fastest", () => {
    expect(speed("pre_vacuum_pulsing")).toBeGreaterThan(speed("ethylene_oxide_gas_eto"));
  });
});

describe("materialSafe", () => {
  it("eto most material safe", () => {
    expect(materialSafe("ethylene_oxide_gas_eto")).toBeGreaterThan(materialSafe("pre_vacuum_pulsing"));
  });
});

describe("validation", () => {
  it("eto best validation", () => {
    expect(validation("ethylene_oxide_gas_eto")).toBeGreaterThan(validation("gravity_displacement_downward"));
  });
});

describe("acCost", () => {
  it("eto most expensive", () => {
    expect(acCost("ethylene_oxide_gas_eto")).toBeGreaterThan(acCost("gravity_displacement_downward"));
  });
});

describe("steam", () => {
  it("gravity uses steam", () => {
    expect(steam("gravity_displacement_downward")).toBe(true);
  });
  it("eto not steam", () => {
    expect(steam("ethylene_oxide_gas_eto")).toBe(false);
  });
});

describe("forSurgical", () => {
  it("pre vacuum for surgical", () => {
    expect(forSurgical("pre_vacuum_pulsing")).toBe(true);
  });
  it("superheated water not for surgical", () => {
    expect(forSurgical("superheated_water_cascade")).toBe(false);
  });
});

describe("cycle", () => {
  it("eto uses gas diffusion", () => {
    expect(cycle("ethylene_oxide_gas_eto")).toBe("gas_diffusion_low_temp_long");
  });
});

describe("bestUse", () => {
  it("gravity for unwrapped instrument", () => {
    expect(bestUse("gravity_displacement_downward")).toBe("unwrapped_instrument_liquid_waste");
  });
});

describe("autoclaveTypes", () => {
  it("returns 5 types", () => {
    expect(autoclaveTypes()).toHaveLength(5);
  });
});
