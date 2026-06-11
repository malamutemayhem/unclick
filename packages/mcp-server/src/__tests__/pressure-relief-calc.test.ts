import { describe, it, expect } from "vitest";
import {
  setAccuracy, flowCapacity, reseatability, backpressureTolerance,
  prCost, reclosing, forCorrosive, actuationMethod,
  bestUse, pressureReliefTypes,
} from "../pressure-relief-calc.js";

describe("setAccuracy", () => {
  it("pilot operated and buckling pin highest set accuracy", () => {
    expect(setAccuracy("pilot_operated_prv")).toBeGreaterThan(setAccuracy("vacuum_breaker"));
    expect(setAccuracy("buckling_pin")).toBeGreaterThan(setAccuracy("vacuum_breaker"));
  });
});

describe("flowCapacity", () => {
  it("pilot operated prv highest flow capacity", () => {
    expect(flowCapacity("pilot_operated_prv")).toBeGreaterThan(flowCapacity("vacuum_breaker"));
  });
});

describe("reseatability", () => {
  it("pilot operated prv best reseatability", () => {
    expect(reseatability("pilot_operated_prv")).toBeGreaterThan(reseatability("buckling_pin"));
  });
});

describe("backpressureTolerance", () => {
  it("balanced bellows and buckling pin best backpressure tolerance", () => {
    expect(backpressureTolerance("balanced_bellows")).toBeGreaterThan(backpressureTolerance("spring_loaded_prv"));
    expect(backpressureTolerance("buckling_pin")).toBeGreaterThan(backpressureTolerance("spring_loaded_prv"));
  });
});

describe("prCost", () => {
  it("pilot operated prv most expensive", () => {
    expect(prCost("pilot_operated_prv")).toBeGreaterThan(prCost("vacuum_breaker"));
  });
});

describe("reclosing", () => {
  it("spring loaded prv is reclosing", () => {
    expect(reclosing("spring_loaded_prv")).toBe(true);
  });
  it("buckling pin not reclosing", () => {
    expect(reclosing("buckling_pin")).toBe(false);
  });
});

describe("forCorrosive", () => {
  it("balanced bellows for corrosive service", () => {
    expect(forCorrosive("balanced_bellows")).toBe(true);
  });
  it("spring loaded prv not for corrosive", () => {
    expect(forCorrosive("spring_loaded_prv")).toBe(false);
  });
});

describe("actuationMethod", () => {
  it("buckling pin uses calibrated pin", () => {
    expect(actuationMethod("buckling_pin")).toBe("calibrated_pin_buckle_at_set_pressure_full_bore_open_once");
  });
});

describe("bestUse", () => {
  it("vacuum breaker for storage tank", () => {
    expect(bestUse("vacuum_breaker")).toBe("storage_tank_condenser_vessel_vacuum_collapse_prevent_inbreath");
  });
});

describe("pressureReliefTypes", () => {
  it("returns 5 types", () => {
    expect(pressureReliefTypes()).toHaveLength(5);
  });
});
