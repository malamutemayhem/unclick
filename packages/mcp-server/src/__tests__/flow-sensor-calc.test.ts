import { describe, it, expect } from "vitest";
import {
  accuracy, rangeability, pressureDrop, reliability,
  flowCost, noMovingParts, forGas, measurement,
  bestUse, flowSensors,
} from "../flow-sensor-calc.js";

describe("accuracy", () => {
  it("coriolis mass most accurate", () => {
    expect(accuracy("coriolis_mass")).toBeGreaterThan(accuracy("thermal_dispersion"));
  });
});

describe("rangeability", () => {
  it("ultrasonic transit best rangeability", () => {
    expect(rangeability("ultrasonic_transit")).toBeGreaterThan(rangeability("vortex_shedding"));
  });
});

describe("pressureDrop", () => {
  it("ultrasonic transit lowest pressure drop", () => {
    expect(pressureDrop("ultrasonic_transit")).toBeGreaterThan(pressureDrop("coriolis_mass"));
  });
});

describe("reliability", () => {
  it("ultrasonic transit most reliable", () => {
    expect(reliability("ultrasonic_transit")).toBeGreaterThan(reliability("thermal_dispersion"));
  });
});

describe("flowCost", () => {
  it("coriolis mass most expensive", () => {
    expect(flowCost("coriolis_mass")).toBeGreaterThan(flowCost("thermal_dispersion"));
  });
});

describe("noMovingParts", () => {
  it("all flow sensors have no moving parts", () => {
    expect(noMovingParts("coriolis_mass")).toBe(true);
    expect(noMovingParts("electromagnetic_mag")).toBe(true);
  });
});

describe("forGas", () => {
  it("coriolis mass is for gas", () => {
    expect(forGas("coriolis_mass")).toBe(true);
  });
  it("electromagnetic mag not for gas", () => {
    expect(forGas("electromagnetic_mag")).toBe(false);
  });
});

describe("measurement", () => {
  it("coriolis mass uses tube oscillation freq", () => {
    expect(measurement("coriolis_mass")).toBe("tube_oscillation_freq");
  });
});

describe("bestUse", () => {
  it("coriolis mass best for custody transfer oil", () => {
    expect(bestUse("coriolis_mass")).toBe("custody_transfer_oil");
  });
});

describe("flowSensors", () => {
  it("returns 5 types", () => {
    expect(flowSensors()).toHaveLength(5);
  });
});
