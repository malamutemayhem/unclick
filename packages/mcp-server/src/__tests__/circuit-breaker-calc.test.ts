import { describe, it, expect } from "vitest";
import {
  interruptCapacity, arcQuenching, operatingLife, compactness,
  cbCost, motorized, forHighVoltage, medium,
  bestUse, circuitBreakerTypes,
} from "../circuit-breaker-calc.js";

describe("interruptCapacity", () => {
  it("sf6 gas highest interrupt capacity", () => {
    expect(interruptCapacity("sf6_gas_breaker")).toBeGreaterThan(interruptCapacity("miniature_mcb"));
  });
});

describe("arcQuenching", () => {
  it("vacuum best arc quenching", () => {
    expect(arcQuenching("vacuum_circuit_breaker")).toBeGreaterThanOrEqual(arcQuenching("sf6_gas_breaker"));
  });
});

describe("operatingLife", () => {
  it("vacuum longest operating life", () => {
    expect(operatingLife("vacuum_circuit_breaker")).toBeGreaterThan(operatingLife("miniature_mcb"));
  });
});

describe("compactness", () => {
  it("miniature mcb most compact", () => {
    expect(compactness("miniature_mcb")).toBeGreaterThan(compactness("air_circuit_breaker"));
  });
});

describe("cbCost", () => {
  it("sf6 most expensive", () => {
    expect(cbCost("sf6_gas_breaker")).toBeGreaterThan(cbCost("miniature_mcb"));
  });
});

describe("motorized", () => {
  it("vacuum is motorized", () => {
    expect(motorized("vacuum_circuit_breaker")).toBe(true);
  });
  it("miniature not motorized", () => {
    expect(motorized("miniature_mcb")).toBe(false);
  });
});

describe("forHighVoltage", () => {
  it("sf6 for high voltage", () => {
    expect(forHighVoltage("sf6_gas_breaker")).toBe(true);
  });
  it("mccb not for high voltage", () => {
    expect(forHighVoltage("molded_case_mccb")).toBe(false);
  });
});

describe("medium", () => {
  it("miniature uses din rail thermal magnetic", () => {
    expect(medium("miniature_mcb")).toBe("din_rail_thermal_magnetic_miniature_module");
  });
});

describe("bestUse", () => {
  it("mccb for branch circuit protection", () => {
    expect(bestUse("molded_case_mccb")).toBe("branch_circuit_motor_feeder_panel_protection");
  });
});

describe("circuitBreakerTypes", () => {
  it("returns 5 types", () => {
    expect(circuitBreakerTypes()).toHaveLength(5);
  });
});
