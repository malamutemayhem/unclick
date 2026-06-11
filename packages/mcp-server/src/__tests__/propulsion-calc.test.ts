import { describe, it, expect } from "vitest";
import {
  thrust, specificImpulse, efficiency, reliability,
  prCost, throttleable, forDeepSpace, propellant,
  bestUse, propulsions,
} from "../propulsion-calc.js";

describe("thrust", () => {
  it("chemical bipropellant highest thrust", () => {
    expect(thrust("chemical_bipropellant")).toBeGreaterThan(thrust("solar_sail_photon"));
  });
});

describe("specificImpulse", () => {
  it("ion gridded highest specific impulse", () => {
    expect(specificImpulse("ion_gridded_electrostatic")).toBeGreaterThan(specificImpulse("chemical_bipropellant"));
  });
});

describe("efficiency", () => {
  it("solar sail most efficient", () => {
    expect(efficiency("solar_sail_photon")).toBeGreaterThan(efficiency("chemical_bipropellant"));
  });
});

describe("reliability", () => {
  it("cold gas most reliable", () => {
    expect(reliability("cold_gas_thruster")).toBeGreaterThan(reliability("solar_sail_photon"));
  });
});

describe("prCost", () => {
  it("ion gridded most expensive", () => {
    expect(prCost("ion_gridded_electrostatic")).toBeGreaterThan(prCost("cold_gas_thruster"));
  });
});

describe("throttleable", () => {
  it("chemical is throttleable", () => {
    expect(throttleable("chemical_bipropellant")).toBe(true);
  });
  it("solar sail not throttleable", () => {
    expect(throttleable("solar_sail_photon")).toBe(false);
  });
});

describe("forDeepSpace", () => {
  it("ion gridded for deep space", () => {
    expect(forDeepSpace("ion_gridded_electrostatic")).toBe(true);
  });
  it("cold gas not for deep space", () => {
    expect(forDeepSpace("cold_gas_thruster")).toBe(false);
  });
});

describe("propellant", () => {
  it("hall effect uses xenon ionized plasma", () => {
    expect(propellant("hall_effect_electric")).toBe("xenon_ionized_plasma");
  });
});

describe("bestUse", () => {
  it("solar sail best for solar system escape", () => {
    expect(bestUse("solar_sail_photon")).toBe("solar_system_escape_trajectory");
  });
});

describe("propulsions", () => {
  it("returns 5 types", () => {
    expect(propulsions()).toHaveLength(5);
  });
});
