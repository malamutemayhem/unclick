import { describe, it, expect } from "vitest";
import {
  mixingIntensity, viscosityRange, heatTransfer, scaleUp,
  avCost, sealless, forHighVisc, impeller,
  bestUse, agitatedVesselTypes,
} from "../agitated-vessel-calc.js";

describe("mixingIntensity", () => {
  it("rushton turbine highest mixing intensity", () => {
    expect(mixingIntensity("rushton_turbine_high")).toBeGreaterThan(mixingIntensity("anchor_paddle_slow"));
  });
});

describe("viscosityRange", () => {
  it("helical ribbon widest viscosity range", () => {
    expect(viscosityRange("helical_ribbon_visc")).toBeGreaterThan(viscosityRange("rushton_turbine_high"));
  });
});

describe("heatTransfer", () => {
  it("helical ribbon best heat transfer", () => {
    expect(heatTransfer("helical_ribbon_visc")).toBeGreaterThan(heatTransfer("magnetic_drive_seal"));
  });
});

describe("scaleUp", () => {
  it("rushton turbine best scale up", () => {
    expect(scaleUp("rushton_turbine_high")).toBeGreaterThan(scaleUp("magnetic_drive_seal"));
  });
});

describe("avCost", () => {
  it("magnetic drive most expensive", () => {
    expect(avCost("magnetic_drive_seal")).toBeGreaterThan(avCost("anchor_paddle_slow"));
  });
});

describe("sealless", () => {
  it("magnetic drive is sealless", () => {
    expect(sealless("magnetic_drive_seal")).toBe(true);
  });
  it("rushton turbine not sealless", () => {
    expect(sealless("rushton_turbine_high")).toBe(false);
  });
});

describe("forHighVisc", () => {
  it("helical ribbon for high viscosity", () => {
    expect(forHighVisc("helical_ribbon_visc")).toBe(true);
  });
  it("rushton turbine not for high viscosity", () => {
    expect(forHighVisc("rushton_turbine_high")).toBe(false);
  });
});

describe("impeller", () => {
  it("magnetic drive uses zero leak sealed", () => {
    expect(impeller("magnetic_drive_seal")).toBe("magnetic_coupled_impeller_zero_leak_sealed");
  });
});

describe("bestUse", () => {
  it("pitched blade for solids suspension", () => {
    expect(bestUse("pitched_blade_axial")).toBe("solids_suspension_blending_general_purpose");
  });
});

describe("agitatedVesselTypes", () => {
  it("returns 5 types", () => {
    expect(agitatedVesselTypes()).toHaveLength(5);
  });
});
