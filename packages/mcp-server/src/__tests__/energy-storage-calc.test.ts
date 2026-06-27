import { describe, it, expect } from "vitest";
import {
  energyDensity, powerDensity, roundTrip, life,
  esCost, scalable, forGrid, medium,
  bestUse, energyStorages,
} from "../energy-storage-calc.js";

describe("energyDensity", () => {
  it("lithium ion highest energy density", () => {
    expect(energyDensity("lithium_ion_battery")).toBeGreaterThan(energyDensity("flywheel_kinetic_rotor"));
  });
});

describe("powerDensity", () => {
  it("flywheel highest power density", () => {
    expect(powerDensity("flywheel_kinetic_rotor")).toBeGreaterThan(powerDensity("vanadium_redox_flow"));
  });
});

describe("roundTrip", () => {
  it("lithium ion best round trip", () => {
    expect(roundTrip("lithium_ion_battery")).toBeGreaterThan(roundTrip("compressed_air_cavern"));
  });
});

describe("life", () => {
  it("pumped hydro longest life", () => {
    expect(life("pumped_hydro_reservoir")).toBeGreaterThan(life("lithium_ion_battery"));
  });
});

describe("esCost", () => {
  it("flywheel most expensive", () => {
    expect(esCost("flywheel_kinetic_rotor")).toBeGreaterThan(esCost("pumped_hydro_reservoir"));
  });
});

describe("scalable", () => {
  it("lithium ion is scalable", () => {
    expect(scalable("lithium_ion_battery")).toBe(true);
  });
  it("pumped hydro not scalable", () => {
    expect(scalable("pumped_hydro_reservoir")).toBe(false);
  });
});

describe("forGrid", () => {
  it("pumped hydro for grid", () => {
    expect(forGrid("pumped_hydro_reservoir")).toBe(true);
  });
  it("flywheel not for grid", () => {
    expect(forGrid("flywheel_kinetic_rotor")).toBe(false);
  });
});

describe("medium", () => {
  it("vanadium redox uses vanadium electrolyte tank", () => {
    expect(medium("vanadium_redox_flow")).toBe("vanadium_electrolyte_tank");
  });
});

describe("bestUse", () => {
  it("flywheel best for frequency regulation", () => {
    expect(bestUse("flywheel_kinetic_rotor")).toBe("frequency_regulation_fast_response");
  });
});

describe("energyStorages", () => {
  it("returns 5 types", () => {
    expect(energyStorages()).toHaveLength(5);
  });
});
