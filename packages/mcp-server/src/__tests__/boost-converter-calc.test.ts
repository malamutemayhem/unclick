import { describe, it, expect } from "vitest";
import {
  efficiency, outputPower, startupVoltage, regulation,
  boostCost, isolated, forBattery, topology,
  bestUse, boostConverters,
} from "../boost-converter-calc.js";

describe("efficiency", () => {
  it("sync boost low vin highest efficiency", () => {
    expect(efficiency("sync_boost_low_vin")).toBeGreaterThan(efficiency("sepic_buckboost"));
  });
});

describe("outputPower", () => {
  it("flyback isolated boost highest output power", () => {
    expect(outputPower("flyback_isolated_boost")).toBeGreaterThan(outputPower("charge_pump_doubler"));
  });
});

describe("startupVoltage", () => {
  it("sync boost low vin lowest startup voltage", () => {
    expect(startupVoltage("sync_boost_low_vin")).toBeGreaterThan(startupVoltage("flyback_isolated_boost"));
  });
});

describe("regulation", () => {
  it("flyback isolated boost best regulation", () => {
    expect(regulation("flyback_isolated_boost")).toBeGreaterThan(regulation("charge_pump_doubler"));
  });
});

describe("boostCost", () => {
  it("flyback isolated boost most expensive", () => {
    expect(boostCost("flyback_isolated_boost")).toBeGreaterThan(boostCost("charge_pump_doubler"));
  });
});

describe("isolated", () => {
  it("flyback isolated boost is isolated", () => {
    expect(isolated("flyback_isolated_boost")).toBe(true);
  });
  it("classic async boost not isolated", () => {
    expect(isolated("classic_async_boost")).toBe(false);
  });
});

describe("forBattery", () => {
  it("sync boost low vin is for battery", () => {
    expect(forBattery("sync_boost_low_vin")).toBe(true);
  });
  it("classic async boost not for battery", () => {
    expect(forBattery("classic_async_boost")).toBe(false);
  });
});

describe("topology", () => {
  it("flyback isolated boost uses transformer flyback", () => {
    expect(topology("flyback_isolated_boost")).toBe("transformer_flyback");
  });
});

describe("bestUse", () => {
  it("sync boost low vin best for energy harvest solar", () => {
    expect(bestUse("sync_boost_low_vin")).toBe("energy_harvest_solar");
  });
});

describe("boostConverters", () => {
  it("returns 5 types", () => {
    expect(boostConverters()).toHaveLength(5);
  });
});
