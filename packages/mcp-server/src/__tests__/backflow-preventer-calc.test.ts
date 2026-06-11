import { describe, it, expect } from "vitest";
import {
  protection, pressure, installEase, maintenance,
  bpCost, testable, forHighHazard, mechanism,
  bestUse, backflowPreventerTypes,
} from "../backflow-preventer-calc.js";

describe("protection", () => {
  it("rpz best protection", () => {
    expect(protection("reduced_pressure_zone_rpz")).toBeGreaterThan(protection("atmospheric_vacuum_avb"));
  });
});

describe("pressure", () => {
  it("rpz highest pressure rating", () => {
    expect(pressure("reduced_pressure_zone_rpz")).toBeGreaterThan(pressure("atmospheric_vacuum_avb"));
  });
});

describe("installEase", () => {
  it("avb easiest install", () => {
    expect(installEase("atmospheric_vacuum_avb")).toBeGreaterThan(installEase("reduced_pressure_zone_rpz"));
  });
});

describe("maintenance", () => {
  it("avb lowest maintenance", () => {
    expect(maintenance("atmospheric_vacuum_avb")).toBeGreaterThan(maintenance("reduced_pressure_zone_rpz"));
  });
});

describe("bpCost", () => {
  it("rpz most expensive", () => {
    expect(bpCost("reduced_pressure_zone_rpz")).toBeGreaterThan(bpCost("atmospheric_vacuum_avb"));
  });
});

describe("testable", () => {
  it("rpz is testable", () => {
    expect(testable("reduced_pressure_zone_rpz")).toBe(true);
  });
  it("avb not testable", () => {
    expect(testable("atmospheric_vacuum_avb")).toBe(false);
  });
});

describe("forHighHazard", () => {
  it("rpz for high hazard", () => {
    expect(forHighHazard("reduced_pressure_zone_rpz")).toBe(true);
  });
  it("dcva not for high hazard", () => {
    expect(forHighHazard("double_check_valve_dcva")).toBe(false);
  });
});

describe("mechanism", () => {
  it("avb uses air gap check", () => {
    expect(mechanism("atmospheric_vacuum_avb")).toBe("air_gap_check_atmospheric_vent");
  });
});

describe("bestUse", () => {
  it("rpz for chemical plant", () => {
    expect(bestUse("reduced_pressure_zone_rpz")).toBe("chemical_plant_medical_high_hazard");
  });
});

describe("backflowPreventerTypes", () => {
  it("returns 5 types", () => {
    expect(backflowPreventerTypes()).toHaveLength(5);
  });
});
