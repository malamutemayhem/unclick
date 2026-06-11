import { describe, it, expect } from "vitest";
import {
  density, adhesion, thickness, deposition,
  psCost, inert, forCeramics, feedstock,
  bestUse, plasmaSprayTypes,
} from "../plasma-spray-calc.js";

describe("density", () => {
  it("vacuum plasma densest coating", () => {
    expect(density("vacuum_plasma_vps")).toBeGreaterThan(density("wire_arc_plasma"));
  });
});

describe("adhesion", () => {
  it("vacuum plasma best adhesion", () => {
    expect(adhesion("vacuum_plasma_vps")).toBeGreaterThan(adhesion("wire_arc_plasma"));
  });
});

describe("thickness", () => {
  it("wire arc plasma thickest coating", () => {
    expect(thickness("wire_arc_plasma")).toBeGreaterThan(thickness("solution_precursor_spps"));
  });
});

describe("deposition", () => {
  it("wire arc plasma highest deposition", () => {
    expect(deposition("wire_arc_plasma")).toBeGreaterThan(deposition("solution_precursor_spps"));
  });
});

describe("psCost", () => {
  it("vacuum plasma most expensive", () => {
    expect(psCost("vacuum_plasma_vps")).toBeGreaterThan(psCost("wire_arc_plasma"));
  });
});

describe("inert", () => {
  it("vacuum plasma is inert atmosphere", () => {
    expect(inert("vacuum_plasma_vps")).toBe(true);
  });
  it("atmospheric plasma not inert", () => {
    expect(inert("atmospheric_plasma_aps")).toBe(false);
  });
});

describe("forCeramics", () => {
  it("atmospheric plasma for ceramics", () => {
    expect(forCeramics("atmospheric_plasma_aps")).toBe(true);
  });
  it("wire arc plasma not for ceramics", () => {
    expect(forCeramics("wire_arc_plasma")).toBe(false);
  });
});

describe("feedstock", () => {
  it("suspension plasma uses nano particle", () => {
    expect(feedstock("suspension_plasma_sps")).toBe("nano_particle_liquid_suspension_inject");
  });
});

describe("bestUse", () => {
  it("atmospheric plasma for turbine blade tbc", () => {
    expect(bestUse("atmospheric_plasma_aps")).toBe("thermal_barrier_coating_turbine_blade");
  });
});

describe("plasmaSprayTypes", () => {
  it("returns 5 types", () => {
    expect(plasmaSprayTypes()).toHaveLength(5);
  });
});
