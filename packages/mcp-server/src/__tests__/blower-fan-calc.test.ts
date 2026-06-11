import { describe, it, expect } from "vitest";
import {
  airVolume, staticPressure, efficiency, noiseLevel,
  bfCost, variableSpeed, forHighPressure, impellerType,
  bestUse, blowerFanTypes,
} from "../blower-fan-calc.js";

describe("airVolume", () => {
  it("axial tube highest air volume", () => {
    expect(airVolume("axial_tube")).toBeGreaterThan(airVolume("regenerative_side_channel"));
  });
});

describe("staticPressure", () => {
  it("positive displacement roots highest static pressure", () => {
    expect(staticPressure("positive_displacement_roots")).toBeGreaterThan(staticPressure("axial_tube"));
  });
});

describe("efficiency", () => {
  it("centrifugal backward best efficiency", () => {
    expect(efficiency("centrifugal_backward")).toBeGreaterThan(efficiency("regenerative_side_channel"));
  });
});

describe("noiseLevel", () => {
  it("centrifugal backward quietest", () => {
    expect(noiseLevel("centrifugal_backward")).toBeGreaterThan(noiseLevel("positive_displacement_roots"));
  });
});

describe("bfCost", () => {
  it("positive displacement roots most expensive", () => {
    expect(bfCost("positive_displacement_roots")).toBeGreaterThan(bfCost("axial_tube"));
  });
});

describe("variableSpeed", () => {
  it("centrifugal backward has variable speed", () => {
    expect(variableSpeed("centrifugal_backward")).toBe(true);
  });
  it("positive displacement roots no variable speed", () => {
    expect(variableSpeed("positive_displacement_roots")).toBe(false);
  });
});

describe("forHighPressure", () => {
  it("positive displacement roots for high pressure", () => {
    expect(forHighPressure("positive_displacement_roots")).toBe(true);
  });
  it("axial tube not for high pressure", () => {
    expect(forHighPressure("axial_tube")).toBe(false);
  });
});

describe("impellerType", () => {
  it("positive displacement roots uses twin lobe rotor", () => {
    expect(impellerType("positive_displacement_roots")).toBe("twin_lobe_tri_lobe_rotor_positive_displacement_oil_free");
  });
});

describe("bestUse", () => {
  it("axial tube for tunnel ventilation", () => {
    expect(bestUse("axial_tube")).toBe("tunnel_ventilation_cooling_tower_condenser_exhaust_stack");
  });
});

describe("blowerFanTypes", () => {
  it("returns 5 types", () => {
    expect(blowerFanTypes()).toHaveLength(5);
  });
});
