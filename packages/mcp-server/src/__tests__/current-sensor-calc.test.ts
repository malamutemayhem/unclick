import { describe, it, expect } from "vitest";
import {
  accuracy, bandwidth, isolation, sizeCompact,
  sensorCost, nonInvasive, forAc, sensingMethod,
  bestUse, currentSensors,
} from "../current-sensor-calc.js";

describe("accuracy", () => {
  it("shunt resistor most accurate", () => {
    expect(accuracy("shunt_resistor_inline")).toBeGreaterThan(accuracy("hall_effect_clamp"));
  });
});

describe("bandwidth", () => {
  it("rogowski coil widest bandwidth", () => {
    expect(bandwidth("rogowski_coil_flex")).toBeGreaterThan(bandwidth("current_transformer_ct"));
  });
});

describe("isolation", () => {
  it("current transformer best isolation", () => {
    expect(isolation("current_transformer_ct")).toBeGreaterThan(isolation("shunt_resistor_inline"));
  });
});

describe("sizeCompact", () => {
  it("shunt resistor most compact", () => {
    expect(sizeCompact("shunt_resistor_inline")).toBeGreaterThan(sizeCompact("current_transformer_ct"));
  });
});

describe("sensorCost", () => {
  it("rogowski coil most expensive", () => {
    expect(sensorCost("rogowski_coil_flex")).toBeGreaterThan(sensorCost("shunt_resistor_inline"));
  });
});

describe("nonInvasive", () => {
  it("hall effect clamp is non invasive", () => {
    expect(nonInvasive("hall_effect_clamp")).toBe(true);
  });
  it("shunt resistor not non invasive", () => {
    expect(nonInvasive("shunt_resistor_inline")).toBe(false);
  });
});

describe("forAc", () => {
  it("rogowski coil is for ac", () => {
    expect(forAc("rogowski_coil_flex")).toBe(true);
  });
  it("shunt resistor not for ac", () => {
    expect(forAc("shunt_resistor_inline")).toBe(false);
  });
});

describe("sensingMethod", () => {
  it("acs712 uses integrated hall ic", () => {
    expect(sensingMethod("acs712_module_ic")).toBe("integrated_hall_ic");
  });
});

describe("bestUse", () => {
  it("current transformer best for energy meter panel", () => {
    expect(bestUse("current_transformer_ct")).toBe("energy_meter_panel");
  });
});

describe("currentSensors", () => {
  it("returns 5 types", () => {
    expect(currentSensors()).toHaveLength(5);
  });
});
