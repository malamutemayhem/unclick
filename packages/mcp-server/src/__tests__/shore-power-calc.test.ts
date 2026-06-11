import { describe, it, expect } from "vitest";
import {
  capacity, efficiency, safety, flexibility,
  spCost, autoConnect, forCruise, connection,
  bestUse, shorePowerTypes,
} from "../shore-power-calc.js";

describe("capacity", () => {
  it("high voltage highest capacity", () => {
    expect(capacity("high_voltage_11kv")).toBeGreaterThan(capacity("low_voltage_single_phase"));
  });
});

describe("efficiency", () => {
  it("medium voltage most efficient", () => {
    expect(efficiency("medium_voltage_6_6kv")).toBeGreaterThan(efficiency("low_voltage_single_phase"));
  });
});

describe("safety", () => {
  it("high voltage safest", () => {
    expect(safety("high_voltage_11kv")).toBeGreaterThan(safety("low_voltage_single_phase"));
  });
});

describe("flexibility", () => {
  it("frequency converter most flexible", () => {
    expect(flexibility("frequency_converter_50_60")).toBeGreaterThan(flexibility("high_voltage_11kv"));
  });
});

describe("spCost", () => {
  it("high voltage most expensive", () => {
    expect(spCost("high_voltage_11kv")).toBeGreaterThan(spCost("low_voltage_single_phase"));
  });
});

describe("autoConnect", () => {
  it("medium voltage auto connect", () => {
    expect(autoConnect("medium_voltage_6_6kv")).toBe(true);
  });
  it("low voltage no auto connect", () => {
    expect(autoConnect("low_voltage_single_phase")).toBe(false);
  });
});

describe("forCruise", () => {
  it("high voltage for cruise", () => {
    expect(forCruise("high_voltage_11kv")).toBe(true);
  });
  it("low voltage not cruise", () => {
    expect(forCruise("low_voltage_single_phase")).toBe(false);
  });
});

describe("connection", () => {
  it("frequency converter uses sfc", () => {
    expect(connection("frequency_converter_50_60")).toBe("sfc_50_60hz_universal_converter");
  });
});

describe("bestUse", () => {
  it("high voltage for cruise cold ironing", () => {
    expect(bestUse("high_voltage_11kv")).toBe("cruise_ship_cold_ironing");
  });
});

describe("shorePowerTypes", () => {
  it("returns 5 types", () => {
    expect(shorePowerTypes()).toHaveLength(5);
  });
});
