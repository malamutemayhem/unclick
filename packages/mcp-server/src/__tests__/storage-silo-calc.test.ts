import { describe, it, expect } from "vitest";
import {
  capacity, flowReliability, weatherResist, installSpeed,
  ssCost, massFlow, forGrain, structure,
  bestUse, storageSiloTypes,
} from "../storage-silo-calc.js";

describe("capacity", () => {
  it("concrete slip form highest capacity", () => {
    expect(capacity("concrete_slip_form")).toBeGreaterThan(capacity("fabric_flexible_bag"));
  });
});

describe("flowReliability", () => {
  it("hopper bottom best flow reliability", () => {
    expect(flowReliability("steel_hopper_bottom")).toBeGreaterThan(flowReliability("welded_steel_flat"));
  });
});

describe("weatherResist", () => {
  it("concrete best weather resistance", () => {
    expect(weatherResist("concrete_slip_form")).toBeGreaterThan(weatherResist("fabric_flexible_bag"));
  });
});

describe("installSpeed", () => {
  it("fabric bag fastest install", () => {
    expect(installSpeed("fabric_flexible_bag")).toBeGreaterThan(installSpeed("concrete_slip_form"));
  });
});

describe("ssCost", () => {
  it("concrete most expensive", () => {
    expect(ssCost("concrete_slip_form")).toBeGreaterThan(ssCost("fabric_flexible_bag"));
  });
});

describe("massFlow", () => {
  it("hopper bottom has mass flow", () => {
    expect(massFlow("steel_hopper_bottom")).toBe(true);
  });
  it("bolted steel no mass flow", () => {
    expect(massFlow("bolted_steel_panel")).toBe(false);
  });
});

describe("forGrain", () => {
  it("bolted steel for grain", () => {
    expect(forGrain("bolted_steel_panel")).toBe(true);
  });
  it("fabric bag not for grain", () => {
    expect(forGrain("fabric_flexible_bag")).toBe(false);
  });
});

describe("structure", () => {
  it("hopper bottom uses cone mass flow design", () => {
    expect(structure("steel_hopper_bottom")).toBe("welded_steel_cone_hopper_mass_flow_design");
  });
});

describe("bestUse", () => {
  it("bolted steel for farm grain", () => {
    expect(bestUse("bolted_steel_panel")).toBe("farm_grain_storage_rapid_erect_modular_bin");
  });
});

describe("storageSiloTypes", () => {
  it("returns 5 types", () => {
    expect(storageSiloTypes()).toHaveLength(5);
  });
});
