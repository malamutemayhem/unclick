import { describe, it, expect } from "vitest";
import {
  mixing, viscosity, shear, power,
  agCost, sealed, forViscous, impeller,
  bestUse, agitatorTypes,
} from "../agitator-type-calc.js";

describe("mixing", () => {
  it("turbine best mixing", () => {
    expect(mixing("turbine_radial_rushton")).toBeGreaterThan(mixing("anchor_gate_close_clearance"));
  });
});

describe("viscosity", () => {
  it("helical ribbon handles highest viscosity", () => {
    expect(viscosity("helical_ribbon_viscous")).toBeGreaterThan(viscosity("propeller_axial_flow"));
  });
});

describe("shear", () => {
  it("turbine highest shear", () => {
    expect(shear("turbine_radial_rushton")).toBeGreaterThan(shear("helical_ribbon_viscous"));
  });
});

describe("power", () => {
  it("helical ribbon most power", () => {
    expect(power("helical_ribbon_viscous")).toBeGreaterThan(power("propeller_axial_flow"));
  });
});

describe("agCost", () => {
  it("magnetic drive most expensive", () => {
    expect(agCost("magnetic_drive_sealed")).toBeGreaterThan(agCost("propeller_axial_flow"));
  });
});

describe("sealed", () => {
  it("magnetic drive is sealed", () => {
    expect(sealed("magnetic_drive_sealed")).toBe(true);
  });
  it("propeller not sealed", () => {
    expect(sealed("propeller_axial_flow")).toBe(false);
  });
});

describe("forViscous", () => {
  it("helical for viscous", () => {
    expect(forViscous("helical_ribbon_viscous")).toBe(true);
  });
  it("propeller not for viscous", () => {
    expect(forViscous("propeller_axial_flow")).toBe(false);
  });
});

describe("impeller", () => {
  it("magnetic uses coupled no seal", () => {
    expect(impeller("magnetic_drive_sealed")).toBe("magnetic_coupled_no_shaft_seal");
  });
});

describe("bestUse", () => {
  it("propeller for blending suspension", () => {
    expect(bestUse("propeller_axial_flow")).toBe("blending_suspension_low_viscosity");
  });
});

describe("agitatorTypes", () => {
  it("returns 5 types", () => {
    expect(agitatorTypes()).toHaveLength(5);
  });
});
