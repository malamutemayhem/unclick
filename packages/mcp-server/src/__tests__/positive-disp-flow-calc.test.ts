import { describe, it, expect } from "vitest";
import {
  accuracy, viscosityRange, pressureDrop, repeatability,
  pdCost, selfPriming, forViscous, meter,
  bestUse, positiveDispFlowTypes,
} from "../positive-disp-flow-calc.js";

describe("accuracy", () => {
  it("oval gear most accurate", () => {
    expect(accuracy("oval_gear_precision")).toBeGreaterThan(accuracy("nutating_disc_water"));
  });
});

describe("viscosityRange", () => {
  it("rotary piston widest viscosity range", () => {
    expect(viscosityRange("rotary_piston_viscous")).toBeGreaterThan(viscosityRange("nutating_disc_water"));
  });
});

describe("pressureDrop", () => {
  it("nutating disc highest pressure drop", () => {
    expect(pressureDrop("nutating_disc_water")).toBeGreaterThan(pressureDrop("rotary_piston_viscous"));
  });
});

describe("repeatability", () => {
  it("oval gear best repeatability", () => {
    expect(repeatability("oval_gear_precision")).toBeGreaterThan(repeatability("nutating_disc_water"));
  });
});

describe("pdCost", () => {
  it("tri rotor most expensive", () => {
    expect(pdCost("tri_rotor_high_press")).toBeGreaterThan(pdCost("nutating_disc_water"));
  });
});

describe("selfPriming", () => {
  it("rotary piston is self priming", () => {
    expect(selfPriming("rotary_piston_viscous")).toBe(true);
  });
  it("nutating disc not self priming", () => {
    expect(selfPriming("nutating_disc_water")).toBe(false);
  });
});

describe("forViscous", () => {
  it("oval gear for viscous fluids", () => {
    expect(forViscous("oval_gear_precision")).toBe(true);
  });
  it("nutating disc not for viscous", () => {
    expect(forViscous("nutating_disc_water")).toBe(false);
  });
});

describe("meter", () => {
  it("nutating disc uses wobble plate", () => {
    expect(meter("nutating_disc_water")).toBe("nutating_disc_wobble_plate_chamber");
  });
});

describe("bestUse", () => {
  it("oval gear for oil chemical custody", () => {
    expect(bestUse("oval_gear_precision")).toBe("oil_chemical_batch_custody_transfer");
  });
});

describe("positiveDispFlowTypes", () => {
  it("returns 5 types", () => {
    expect(positiveDispFlowTypes()).toHaveLength(5);
  });
});
