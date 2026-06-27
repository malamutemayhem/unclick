import { describe, it, expect } from "vitest";
import {
  mixIntensity, pumping, shear, powerNumber,
  imCost, axialFlow, forViscous, blade,
  bestUse, impellerMixerTypes,
} from "../impeller-mixer-calc.js";

describe("mixIntensity", () => {
  it("rushton turbine highest mix intensity", () => {
    expect(mixIntensity("rushton_turbine_radial")).toBeGreaterThan(mixIntensity("marine_propeller_low"));
  });
});

describe("pumping", () => {
  it("hydrofoil highest pumping", () => {
    expect(pumping("hydrofoil_high_eff")).toBeGreaterThan(pumping("rushton_turbine_radial"));
  });
});

describe("shear", () => {
  it("rushton turbine highest shear", () => {
    expect(shear("rushton_turbine_radial")).toBeGreaterThan(shear("hydrofoil_high_eff"));
  });
});

describe("powerNumber", () => {
  it("rushton turbine highest power number", () => {
    expect(powerNumber("rushton_turbine_radial")).toBeGreaterThan(powerNumber("marine_propeller_low"));
  });
});

describe("imCost", () => {
  it("hydrofoil more expensive than rushton", () => {
    expect(imCost("hydrofoil_high_eff")).toBeGreaterThan(imCost("rushton_turbine_radial"));
  });
});

describe("axialFlow", () => {
  it("pitched blade is axial flow", () => {
    expect(axialFlow("pitched_blade_axial")).toBe(true);
  });
  it("rushton turbine not axial flow", () => {
    expect(axialFlow("rushton_turbine_radial")).toBe(false);
  });
});

describe("forViscous", () => {
  it("anchor gate for viscous", () => {
    expect(forViscous("anchor_gate_viscous")).toBe(true);
  });
  it("marine propeller not for viscous", () => {
    expect(forViscous("marine_propeller_low")).toBe(false);
  });
});

describe("blade", () => {
  it("hydrofoil uses profiled blade", () => {
    expect(blade("hydrofoil_high_eff")).toBe("profiled_hydrofoil_blade_low_power_high_flow");
  });
});

describe("bestUse", () => {
  it("rushton turbine for gas dispersion", () => {
    expect(bestUse("rushton_turbine_radial")).toBe("gas_dispersion_emulsification_fermentation");
  });
});

describe("impellerMixerTypes", () => {
  it("returns 5 types", () => {
    expect(impellerMixerTypes()).toHaveLength(5);
  });
});
