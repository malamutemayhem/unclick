import { describe, it, expect } from "vitest";
import {
  accuracy, turndown, lowFlowSens, gasHandle,
  tfCost, directMass, forGas, sensor,
  bestUse, thermalMassFlowTypes,
} from "../thermal-mass-flow-calc.js";

describe("accuracy", () => {
  it("capillary tube most accurate", () => {
    expect(accuracy("capillary_tube_bypass")).toBeGreaterThan(accuracy("constant_temperature_diff"));
  });
});

describe("turndown", () => {
  it("capillary tube best turndown", () => {
    expect(turndown("capillary_tube_bypass")).toBeGreaterThan(turndown("constant_temperature_diff"));
  });
});

describe("lowFlowSens", () => {
  it("capillary tube best low flow sensitivity", () => {
    expect(lowFlowSens("capillary_tube_bypass")).toBeGreaterThan(lowFlowSens("constant_temperature_diff"));
  });
});

describe("gasHandle", () => {
  it("inline full bore best gas handling", () => {
    expect(gasHandle("inline_full_bore")).toBeGreaterThan(gasHandle("constant_temperature_diff"));
  });
});

describe("tfCost", () => {
  it("inline full bore most expensive", () => {
    expect(tfCost("inline_full_bore")).toBeGreaterThan(tfCost("constant_temperature_diff"));
  });
});

describe("directMass", () => {
  it("all thermal mass flow are direct mass", () => {
    expect(directMass("capillary_tube_bypass")).toBe(true);
    expect(directMass("constant_temperature_diff")).toBe(true);
  });
});

describe("forGas", () => {
  it("capillary tube for gas", () => {
    expect(forGas("capillary_tube_bypass")).toBe(true);
  });
  it("constant temperature not for gas", () => {
    expect(forGas("constant_temperature_diff")).toBe(false);
  });
});

describe("sensor", () => {
  it("micro flow uses mems chip", () => {
    expect(sensor("micro_flow_sensor")).toBe("mems_silicon_chip_micro_heater_therm");
  });
});

describe("bestUse", () => {
  it("immersible probe for duct stack", () => {
    expect(bestUse("immersible_probe_insert")).toBe("duct_stack_combustion_air_natural_gas");
  });
});

describe("thermalMassFlowTypes", () => {
  it("returns 5 types", () => {
    expect(thermalMassFlowTypes()).toHaveLength(5);
  });
});
