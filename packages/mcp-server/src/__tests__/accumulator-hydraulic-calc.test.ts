import { describe, it, expect } from "vitest";
import {
  energyStorage, responseSpeed, flowDelivery, cycleLife,
  ahCost, gasCharged, forEmergency, design,
  bestUse, accumulatorHydraulicTypes,
} from "../accumulator-hydraulic-calc.js";

describe("energyStorage", () => {
  it("piston gas highest energy storage", () => {
    expect(energyStorage("piston_gas")).toBeGreaterThan(energyStorage("spring_loaded"));
  });
});

describe("responseSpeed", () => {
  it("bladder and diaphragm fastest response", () => {
    expect(responseSpeed("bladder")).toBeGreaterThan(responseSpeed("weight_loaded"));
    expect(responseSpeed("diaphragm")).toBeGreaterThan(responseSpeed("weight_loaded"));
  });
});

describe("flowDelivery", () => {
  it("piston gas highest flow delivery", () => {
    expect(flowDelivery("piston_gas")).toBeGreaterThan(flowDelivery("spring_loaded"));
  });
});

describe("cycleLife", () => {
  it("spring loaded and weight loaded longest cycle life", () => {
    expect(cycleLife("spring_loaded")).toBeGreaterThan(cycleLife("bladder"));
    expect(cycleLife("weight_loaded")).toBeGreaterThan(cycleLife("bladder"));
  });
});

describe("ahCost", () => {
  it("piston gas most expensive", () => {
    expect(ahCost("piston_gas")).toBeGreaterThan(ahCost("spring_loaded"));
  });
});

describe("gasCharged", () => {
  it("bladder is gas charged", () => {
    expect(gasCharged("bladder")).toBe(true);
  });
  it("spring loaded not gas charged", () => {
    expect(gasCharged("spring_loaded")).toBe(false);
  });
});

describe("forEmergency", () => {
  it("bladder for emergency use", () => {
    expect(forEmergency("bladder")).toBe(true);
  });
  it("diaphragm not for emergency", () => {
    expect(forEmergency("diaphragm")).toBe(false);
  });
});

describe("design", () => {
  it("weight loaded uses dead weight gravity", () => {
    expect(design("weight_loaded")).toBe("dead_weight_on_piston_gravity_constant_pressure_any_volume");
  });
});

describe("bestUse", () => {
  it("spring loaded for lubrication circuit", () => {
    expect(bestUse("spring_loaded")).toBe("lubrication_circuit_low_pressure_constant_force_simple");
  });
});

describe("accumulatorHydraulicTypes", () => {
  it("returns 5 types", () => {
    expect(accumulatorHydraulicTypes()).toHaveLength(5);
  });
});
