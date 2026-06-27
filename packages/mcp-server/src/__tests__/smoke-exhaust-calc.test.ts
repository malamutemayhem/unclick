import { describe, it, expect } from "vitest";
import {
  extractionRate, coverage, reliability, noiseLevel,
  seCost, powered, forHighRise, mechanism,
  bestUse, smokeExhaustTypes,
} from "../smoke-exhaust-calc.js";

describe("extractionRate", () => {
  it("mechanical axial highest extraction rate", () => {
    expect(extractionRate("mechanical_axial")).toBeGreaterThan(extractionRate("natural_ventilator"));
  });
});

describe("coverage", () => {
  it("jet fan impulse widest coverage", () => {
    expect(coverage("jet_fan_impulse")).toBeGreaterThan(coverage("natural_ventilator"));
  });
});

describe("reliability", () => {
  it("natural ventilator and smoke curtain most reliable", () => {
    expect(reliability("natural_ventilator")).toBeGreaterThan(reliability("mechanical_axial"));
    expect(reliability("smoke_curtain_barrier")).toBeGreaterThan(reliability("mechanical_axial"));
  });
});

describe("noiseLevel", () => {
  it("natural ventilator quietest", () => {
    expect(noiseLevel("natural_ventilator")).toBeGreaterThan(noiseLevel("jet_fan_impulse"));
  });
});

describe("seCost", () => {
  it("pressurization stairwell most expensive", () => {
    expect(seCost("pressurization_stairwell")).toBeGreaterThan(seCost("natural_ventilator"));
  });
});

describe("powered", () => {
  it("mechanical axial is powered", () => {
    expect(powered("mechanical_axial")).toBe(true);
  });
  it("natural ventilator not powered", () => {
    expect(powered("natural_ventilator")).toBe(false);
  });
});

describe("forHighRise", () => {
  it("pressurization stairwell for high rise", () => {
    expect(forHighRise("pressurization_stairwell")).toBe(true);
  });
  it("natural ventilator not for high rise", () => {
    expect(forHighRise("natural_ventilator")).toBe(false);
  });
});

describe("mechanism", () => {
  it("jet fan uses ceiling impulse fan", () => {
    expect(mechanism("jet_fan_impulse")).toBe("ceiling_jet_fan_impulse_air_movement_ductless_push_to_exit");
  });
});

describe("bestUse", () => {
  it("pressurization stairwell for high rise building", () => {
    expect(bestUse("pressurization_stairwell")).toBe("high_rise_building_stairwell_lobby_elevator_shaft_protect");
  });
});

describe("smokeExhaustTypes", () => {
  it("returns 5 types", () => {
    expect(smokeExhaustTypes()).toHaveLength(5);
  });
});
