import { describe, it, expect } from "vitest";
import {
  currentCapacity, efficiency, heatManage, controlPrecision,
  driverCost, microstepping, forStepper, bridgeType,
  bestUse, motorDrivers,
} from "../motor-driver-calc.js";

describe("currentCapacity", () => {
  it("bts7960 highest current capacity", () => {
    expect(currentCapacity("bts7960_high_current")).toBeGreaterThan(currentCapacity("a4988_stepper_basic"));
  });
});

describe("efficiency", () => {
  it("tb6612 most efficient", () => {
    expect(efficiency("tb6612_compact_dual")).toBeGreaterThan(efficiency("l298n_dual_hbridge"));
  });
});

describe("heatManage", () => {
  it("tb6612 best heat management", () => {
    expect(heatManage("tb6612_compact_dual")).toBeGreaterThan(heatManage("l298n_dual_hbridge"));
  });
});

describe("controlPrecision", () => {
  it("drv8825 most precise control", () => {
    expect(controlPrecision("drv8825_stepper_micro")).toBeGreaterThan(controlPrecision("l298n_dual_hbridge"));
  });
});

describe("driverCost", () => {
  it("bts7960 most expensive", () => {
    expect(driverCost("bts7960_high_current")).toBeGreaterThan(driverCost("a4988_stepper_basic"));
  });
});

describe("microstepping", () => {
  it("drv8825 has microstepping", () => {
    expect(microstepping("drv8825_stepper_micro")).toBe(true);
  });
  it("l298n no microstepping", () => {
    expect(microstepping("l298n_dual_hbridge")).toBe(false);
  });
});

describe("forStepper", () => {
  it("a4988 is for stepper", () => {
    expect(forStepper("a4988_stepper_basic")).toBe(true);
  });
  it("tb6612 not for stepper", () => {
    expect(forStepper("tb6612_compact_dual")).toBe(false);
  });
});

describe("bridgeType", () => {
  it("l298n uses bipolar bjt hbridge", () => {
    expect(bridgeType("l298n_dual_hbridge")).toBe("bipolar_bjt_hbridge");
  });
});

describe("bestUse", () => {
  it("a4988 best for 3d printer stepper", () => {
    expect(bestUse("a4988_stepper_basic")).toBe("3d_printer_stepper");
  });
});

describe("motorDrivers", () => {
  it("returns 5 types", () => {
    expect(motorDrivers()).toHaveLength(5);
  });
});
