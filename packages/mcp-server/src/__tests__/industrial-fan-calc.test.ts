import { describe, it, expect } from "vitest";
import {
  pressure, efficiency, noiseLevel, flowRange,
  ifCost, highPressure, forDustyAir, wheel,
  bestUse, industrialFanTypes,
} from "../industrial-fan-calc.js";

describe("pressure", () => {
  it("regenerative blower highest pressure", () => {
    expect(pressure("regenerative_blower")).toBeGreaterThan(pressure("axial_vane_tube"));
  });
});

describe("efficiency", () => {
  it("centrifugal backward highest efficiency", () => {
    expect(efficiency("centrifugal_backward")).toBeGreaterThan(efficiency("regenerative_blower"));
  });
});

describe("noiseLevel", () => {
  it("elbow lined turn better noise than regen", () => {
    expect(noiseLevel("centrifugal_backward")).toBeGreaterThan(noiseLevel("regenerative_blower"));
  });
});

describe("flowRange", () => {
  it("axial vane tube widest flow range", () => {
    expect(flowRange("axial_vane_tube")).toBeGreaterThan(flowRange("regenerative_blower"));
  });
});

describe("ifCost", () => {
  it("centrifugal backward and mixed flow more than forward", () => {
    expect(ifCost("centrifugal_backward")).toBeGreaterThan(ifCost("centrifugal_forward"));
  });
});

describe("highPressure", () => {
  it("regenerative blower is high pressure", () => {
    expect(highPressure("regenerative_blower")).toBe(true);
  });
  it("axial vane tube not high pressure", () => {
    expect(highPressure("axial_vane_tube")).toBe(false);
  });
});

describe("forDustyAir", () => {
  it("no fan type specifically for dusty air", () => {
    expect(forDustyAir("centrifugal_backward")).toBe(false);
  });
});

describe("wheel", () => {
  it("axial uses aerofoil blade", () => {
    expect(wheel("axial_vane_tube")).toBe("aerofoil_blade_hub_mounted_axial_propeller");
  });
});

describe("bestUse", () => {
  it("mixed flow for duct booster", () => {
    expect(bestUse("mixed_flow_inline")).toBe("duct_booster_inline_exhaust_compact_install");
  });
});

describe("industrialFanTypes", () => {
  it("returns 5 types", () => {
    expect(industrialFanTypes()).toHaveLength(5);
  });
});
