import { describe, it, expect } from "vitest";
import {
  mixIntensity, pumpingRate, shearLevel, scalability,
  atCost, topEntry, forViscous, impeller,
  bestUse, agitatorTankTypes,
} from "../agitator-tank-calc.js";

describe("mixIntensity", () => {
  it("high shear rotor stator highest mix intensity", () => {
    expect(mixIntensity("high_shear_rotor_stator")).toBeGreaterThan(mixIntensity("anchor_paddle_viscous"));
  });
});

describe("pumpingRate", () => {
  it("hydrofoil highest pumping rate", () => {
    expect(pumpingRate("hydrofoil_axial_flow")).toBeGreaterThan(pumpingRate("high_shear_rotor_stator"));
  });
});

describe("shearLevel", () => {
  it("high shear highest shear level", () => {
    expect(shearLevel("high_shear_rotor_stator")).toBeGreaterThan(shearLevel("anchor_paddle_viscous"));
  });
});

describe("scalability", () => {
  it("hydrofoil best scalability", () => {
    expect(scalability("hydrofoil_axial_flow")).toBeGreaterThan(scalability("high_shear_rotor_stator"));
  });
});

describe("atCost", () => {
  it("high shear most expensive", () => {
    expect(atCost("high_shear_rotor_stator")).toBeGreaterThan(atCost("turbine_impeller_radial"));
  });
});

describe("topEntry", () => {
  it("all agitators are top entry", () => {
    expect(topEntry("turbine_impeller_radial")).toBe(true);
    expect(topEntry("anchor_paddle_viscous")).toBe(true);
  });
});

describe("forViscous", () => {
  it("anchor paddle for viscous fluids", () => {
    expect(forViscous("anchor_paddle_viscous")).toBe(true);
  });
  it("turbine not for viscous", () => {
    expect(forViscous("turbine_impeller_radial")).toBe(false);
  });
});

describe("impeller", () => {
  it("gas sparged uses self aspirating hollow shaft", () => {
    expect(impeller("gas_sparged_self_aspir")).toBe("self_aspirating_hollow_shaft_gas_draw");
  });
});

describe("bestUse", () => {
  it("high shear for emulsion disperse", () => {
    expect(bestUse("high_shear_rotor_stator")).toBe("emulsion_disperse_droplet_reduce_cream");
  });
});

describe("agitatorTankTypes", () => {
  it("returns 5 types", () => {
    expect(agitatorTankTypes()).toHaveLength(5);
  });
});
