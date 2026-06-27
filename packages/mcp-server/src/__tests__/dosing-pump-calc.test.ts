import { describe, it, expect } from "vitest";
import {
  accuracy, throughput, pressureRange, chemicalResist,
  dpCost, pulseFree, forCorrosive, pumpConfig,
  bestUse, dosingPumpTypes,
} from "../dosing-pump-calc.js";

describe("accuracy", () => {
  it("syringe dose best accuracy", () => {
    expect(accuracy("syringe_dose")).toBeGreaterThan(accuracy("peristaltic_dose"));
  });
});

describe("throughput", () => {
  it("gear dose highest throughput", () => {
    expect(throughput("gear_dose")).toBeGreaterThan(throughput("syringe_dose"));
  });
});

describe("pressureRange", () => {
  it("piston dose best pressure range", () => {
    expect(pressureRange("piston_dose")).toBeGreaterThan(pressureRange("syringe_dose"));
  });
});

describe("chemicalResist", () => {
  it("peristaltic best chemical resistance", () => {
    expect(chemicalResist("peristaltic_dose")).toBeGreaterThan(chemicalResist("gear_dose"));
  });
});

describe("dpCost", () => {
  it("piston dose most expensive", () => {
    expect(dpCost("piston_dose")).toBeGreaterThan(dpCost("peristaltic_dose"));
  });
});

describe("pulseFree", () => {
  it("gear dose is pulse free", () => {
    expect(pulseFree("gear_dose")).toBe(true);
  });
  it("diaphragm dose not pulse free", () => {
    expect(pulseFree("diaphragm_dose")).toBe(false);
  });
});

describe("forCorrosive", () => {
  it("peristaltic for corrosive", () => {
    expect(forCorrosive("peristaltic_dose")).toBe(true);
  });
  it("piston not for corrosive", () => {
    expect(forCorrosive("piston_dose")).toBe(false);
  });
});

describe("pumpConfig", () => {
  it("syringe dose uses stepper drive barrel plunger micro volume", () => {
    expect(pumpConfig("syringe_dose")).toBe("syringe_dosing_pump_stepper_drive_barrel_plunger_micro_volume");
  });
});

describe("bestUse", () => {
  it("gear dose for adhesive dispense smooth continuous viscous flow", () => {
    expect(bestUse("gear_dose")).toBe("adhesive_dispense_gear_dosing_pump_smooth_continuous_viscous_flow");
  });
});

describe("dosingPumpTypes", () => {
  it("returns 5 types", () => {
    expect(dosingPumpTypes()).toHaveLength(5);
  });
});
