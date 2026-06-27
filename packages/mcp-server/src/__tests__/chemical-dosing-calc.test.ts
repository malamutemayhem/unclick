import { describe, it, expect } from "vitest";
import {
  accuracy, flowRange, pressure, chemResistance,
  cdCost, pulseFree, forCorrosive, mechanism,
  bestUse, chemicalDosingTypes,
} from "../chemical-dosing-calc.js";

describe("accuracy", () => {
  it("plunger piston best accuracy", () => {
    expect(accuracy("plunger_piston")).toBeGreaterThan(accuracy("gravity_drip_feed"));
  });
});

describe("flowRange", () => {
  it("peristaltic tube widest flow range", () => {
    expect(flowRange("peristaltic_tube")).toBeGreaterThan(flowRange("gravity_drip_feed"));
  });
});

describe("pressure", () => {
  it("plunger piston highest pressure", () => {
    expect(pressure("plunger_piston")).toBeGreaterThan(pressure("gravity_drip_feed"));
  });
});

describe("chemResistance", () => {
  it("peristaltic tube best chemical resistance", () => {
    expect(chemResistance("peristaltic_tube")).toBeGreaterThan(chemResistance("plunger_piston"));
  });
});

describe("cdCost", () => {
  it("plunger piston most expensive", () => {
    expect(cdCost("plunger_piston")).toBeGreaterThan(cdCost("gravity_drip_feed"));
  });
});

describe("pulseFree", () => {
  it("peristaltic tube is pulse free", () => {
    expect(pulseFree("peristaltic_tube")).toBe(true);
  });
  it("diaphragm metering not pulse free", () => {
    expect(pulseFree("diaphragm_metering")).toBe(false);
  });
});

describe("forCorrosive", () => {
  it("diaphragm metering for corrosive", () => {
    expect(forCorrosive("diaphragm_metering")).toBe(true);
  });
  it("plunger piston not for corrosive", () => {
    expect(forCorrosive("plunger_piston")).toBe(false);
  });
});

describe("mechanism", () => {
  it("gravity drip uses float valve drip rate", () => {
    expect(mechanism("gravity_drip_feed")).toBe("gravity_head_float_valve_drip_rate_simple_tank");
  });
});

describe("bestUse", () => {
  it("diaphragm for chlorine acid dosing", () => {
    expect(bestUse("diaphragm_metering")).toBe("chlorine_acid_caustic_dosing_water_treatment_plant");
  });
});

describe("chemicalDosingTypes", () => {
  it("returns 5 types", () => {
    expect(chemicalDosingTypes()).toHaveLength(5);
  });
});
