import { describe, it, expect } from "vitest";
import {
  weldSpeed, jointConsistency, materialThickness, energyEfficiency,
  rwCost, automated, forSheet, welderConfig,
  bestUse, resistanceWelderTypes,
} from "../resistance-welder-calc.js";

describe("weldSpeed", () => {
  it("spot weld fastest weld speed", () => {
    expect(weldSpeed("spot_weld")).toBeGreaterThan(weldSpeed("flash_butt"));
  });
});

describe("jointConsistency", () => {
  it("projection weld best joint consistency", () => {
    expect(jointConsistency("projection_weld")).toBeGreaterThan(jointConsistency("flash_butt"));
  });
});

describe("materialThickness", () => {
  it("flash butt handles thickest material", () => {
    expect(materialThickness("flash_butt")).toBeGreaterThan(materialThickness("spot_weld"));
  });
});

describe("energyEfficiency", () => {
  it("projection weld best energy efficiency", () => {
    expect(energyEfficiency("projection_weld")).toBeGreaterThan(energyEfficiency("seam_weld"));
  });
});

describe("rwCost", () => {
  it("flash butt most expensive", () => {
    expect(rwCost("flash_butt")).toBeGreaterThan(rwCost("spot_weld"));
  });
});

describe("automated", () => {
  it("all resistance welders are automated", () => {
    expect(automated("spot_weld")).toBe(true);
    expect(automated("flash_butt")).toBe(true);
  });
});

describe("forSheet", () => {
  it("spot weld for sheet", () => {
    expect(forSheet("spot_weld")).toBe(true);
  });
  it("projection weld not for sheet", () => {
    expect(forSheet("projection_weld")).toBe(false);
  });
});

describe("welderConfig", () => {
  it("upset butt uses clamp pressure current", () => {
    expect(welderConfig("upset_butt")).toBe("upset_butt_weld_clamp_pressure_current_bar_rod_wire_end_join");
  });
});

describe("bestUse", () => {
  it("seam weld for tank barrel fuel tank", () => {
    expect(bestUse("seam_weld")).toBe("tank_barrel_fuel_tank_seam_weld_roller_electrode_leak_proof_seal");
  });
});

describe("resistanceWelderTypes", () => {
  it("returns 5 types", () => {
    expect(resistanceWelderTypes()).toHaveLength(5);
  });
});
