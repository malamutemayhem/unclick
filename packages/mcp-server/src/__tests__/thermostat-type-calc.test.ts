import { describe, it, expect } from "vitest";
import {
  energySavings, installComplexity, userConvenience, purchaseCost,
  diagnosticCapability, wifiConnected, learningCapable, compatibleSystem,
  controlMethod, thermostatTypes,
} from "../thermostat-type-calc.js";

describe("energySavings", () => {
  it("smart best energy savings", () => {
    expect(energySavings("smart")).toBeGreaterThan(energySavings("manual"));
  });
});

describe("installComplexity", () => {
  it("communicating most complex install", () => {
    expect(installComplexity("communicating")).toBeGreaterThan(installComplexity("manual"));
  });
});

describe("userConvenience", () => {
  it("smart most convenient", () => {
    expect(userConvenience("smart")).toBeGreaterThan(userConvenience("line_voltage"));
  });
});

describe("purchaseCost", () => {
  it("communicating most expensive", () => {
    expect(purchaseCost("communicating")).toBeGreaterThan(purchaseCost("manual"));
  });
});

describe("diagnosticCapability", () => {
  it("communicating best diagnostics", () => {
    expect(diagnosticCapability("communicating")).toBeGreaterThan(diagnosticCapability("manual"));
  });
});

describe("wifiConnected", () => {
  it("smart is wifi connected", () => {
    expect(wifiConnected("smart")).toBe(true);
  });
  it("manual is not", () => {
    expect(wifiConnected("manual")).toBe(false);
  });
});

describe("learningCapable", () => {
  it("smart is learning capable", () => {
    expect(learningCapable("smart")).toBe(true);
  });
  it("programmable is not", () => {
    expect(learningCapable("programmable")).toBe(false);
  });
});

describe("compatibleSystem", () => {
  it("line voltage for baseboard electric", () => {
    expect(compatibleSystem("line_voltage")).toBe("baseboard_electric");
  });
});

describe("controlMethod", () => {
  it("smart uses ai occupancy sensor", () => {
    expect(controlMethod("smart")).toBe("ai_occupancy_sensor");
  });
});

describe("thermostatTypes", () => {
  it("returns 5 types", () => {
    expect(thermostatTypes()).toHaveLength(5);
  });
});
