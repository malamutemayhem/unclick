import { describe, it, expect } from "vitest";
import {
  efficiency, capacity, startupSpeed, durability,
  fcpCost, highTemp, forMobile, electrolyte,
  bestUse, fuelCellPowerTypes,
} from "../fuel-cell-power-calc.js";

describe("efficiency", () => {
  it("sofc solid oxide most efficient", () => {
    expect(efficiency("sofc_solid_oxide")).toBeGreaterThan(efficiency("dmfc_direct_methanol"));
  });
});

describe("capacity", () => {
  it("mcfc molten carbonate highest capacity", () => {
    expect(capacity("mcfc_molten_carbonate")).toBeGreaterThan(capacity("dmfc_direct_methanol"));
  });
});

describe("startupSpeed", () => {
  it("pem hydrogen fastest startup", () => {
    expect(startupSpeed("pem_hydrogen")).toBeGreaterThan(startupSpeed("mcfc_molten_carbonate"));
  });
});

describe("durability", () => {
  it("pafc phosphoric most durable", () => {
    expect(durability("pafc_phosphoric")).toBeGreaterThan(durability("dmfc_direct_methanol"));
  });
});

describe("fcpCost", () => {
  it("sofc solid oxide most expensive", () => {
    expect(fcpCost("sofc_solid_oxide")).toBeGreaterThan(fcpCost("dmfc_direct_methanol"));
  });
});

describe("highTemp", () => {
  it("sofc solid oxide is high temp", () => {
    expect(highTemp("sofc_solid_oxide")).toBe(true);
  });
  it("pem hydrogen not high temp", () => {
    expect(highTemp("pem_hydrogen")).toBe(false);
  });
});

describe("forMobile", () => {
  it("pem hydrogen for mobile", () => {
    expect(forMobile("pem_hydrogen")).toBe(true);
  });
  it("sofc solid oxide not for mobile", () => {
    expect(forMobile("sofc_solid_oxide")).toBe(false);
  });
});

describe("electrolyte", () => {
  it("dmfc uses nafion membrane methanol feed", () => {
    expect(electrolyte("dmfc_direct_methanol")).toBe("nafion_membrane_methanol_feed_direct_no_reformer_60_90c");
  });
});

describe("bestUse", () => {
  it("sofc for combined heat power data center", () => {
    expect(bestUse("sofc_solid_oxide")).toBe("combined_heat_power_data_center_base_load_natural_gas_chp");
  });
});

describe("fuelCellPowerTypes", () => {
  it("returns 5 types", () => {
    expect(fuelCellPowerTypes()).toHaveLength(5);
  });
});
