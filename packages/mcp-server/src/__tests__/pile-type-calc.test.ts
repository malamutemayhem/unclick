import { describe, it, expect } from "vitest";
import {
  loadCapacity, installationSpeed, vibrationLevel, depthRange,
  materialCost, requiresCuring, removable, installMethod,
  bestApplication, pileTypes,
} from "../pile-type-calc.js";

describe("loadCapacity", () => {
  it("bored cast highest load capacity", () => {
    expect(loadCapacity("bored_cast")).toBeGreaterThan(loadCapacity("micropile"));
  });
});

describe("installationSpeed", () => {
  it("helical fastest installation", () => {
    expect(installationSpeed("helical")).toBeGreaterThan(installationSpeed("bored_cast"));
  });
});

describe("vibrationLevel", () => {
  it("driven concrete highest vibration", () => {
    expect(vibrationLevel("driven_concrete")).toBeGreaterThan(vibrationLevel("helical"));
  });
});

describe("depthRange", () => {
  it("bored cast deepest range", () => {
    expect(depthRange("bored_cast")).toBeGreaterThan(depthRange("helical"));
  });
});

describe("materialCost", () => {
  it("micropile most expensive", () => {
    expect(materialCost("micropile")).toBeGreaterThan(materialCost("driven_concrete"));
  });
});

describe("requiresCuring", () => {
  it("bored cast requires curing", () => {
    expect(requiresCuring("bored_cast")).toBe(true);
  });
  it("driven steel does not", () => {
    expect(requiresCuring("driven_steel")).toBe(false);
  });
});

describe("removable", () => {
  it("helical is removable", () => {
    expect(removable("helical")).toBe(true);
  });
  it("driven steel is not", () => {
    expect(removable("driven_steel")).toBe(false);
  });
});

describe("installMethod", () => {
  it("helical uses torque motor screw in", () => {
    expect(installMethod("helical")).toBe("torque_motor_screw_in");
  });
});

describe("bestApplication", () => {
  it("bored cast for high rise deep bedrock", () => {
    expect(bestApplication("bored_cast")).toBe("high_rise_deep_bedrock");
  });
});

describe("pileTypes", () => {
  it("returns 5 types", () => {
    expect(pileTypes()).toHaveLength(5);
  });
});
