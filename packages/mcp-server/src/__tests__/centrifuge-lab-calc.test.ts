import { describe, it, expect } from "vitest";
import {
  maxSpeed, capacity, temperatureControl, versatility,
  clCost, refrigerated, forResearch, rotor,
  bestUse, centrifugeLabTypes,
} from "../centrifuge-lab-calc.js";

describe("maxSpeed", () => {
  it("ultracentrifuge highest speed", () => {
    expect(maxSpeed("ultracentrifuge")).toBeGreaterThan(maxSpeed("clinical_swing_bucket"));
  });
});

describe("capacity", () => {
  it("continuous flow highest capacity", () => {
    expect(capacity("continuous_flow")).toBeGreaterThan(capacity("benchtop_micro"));
  });
});

describe("temperatureControl", () => {
  it("ultracentrifuge best temperature control", () => {
    expect(temperatureControl("ultracentrifuge")).toBeGreaterThan(temperatureControl("benchtop_micro"));
  });
});

describe("versatility", () => {
  it("floor high speed most versatile", () => {
    expect(versatility("floor_high_speed")).toBeGreaterThan(versatility("continuous_flow"));
  });
});

describe("clCost", () => {
  it("ultracentrifuge most expensive", () => {
    expect(clCost("ultracentrifuge")).toBeGreaterThan(clCost("benchtop_micro"));
  });
});

describe("refrigerated", () => {
  it("floor high speed is refrigerated", () => {
    expect(refrigerated("floor_high_speed")).toBe(true);
  });
  it("benchtop micro not refrigerated", () => {
    expect(refrigerated("benchtop_micro")).toBe(false);
  });
});

describe("forResearch", () => {
  it("ultracentrifuge for research", () => {
    expect(forResearch("ultracentrifuge")).toBe(true);
  });
  it("clinical swing bucket not for research", () => {
    expect(forResearch("clinical_swing_bucket")).toBe(false);
  });
});

describe("rotor", () => {
  it("ultracentrifuge uses titanium rotor", () => {
    expect(rotor("ultracentrifuge")).toBe("titanium_fixed_angle_swinging_bucket_vacuum_chamber_drive");
  });
});

describe("bestUse", () => {
  it("continuous flow for bioprocess cell harvest", () => {
    expect(bestUse("continuous_flow")).toBe("bioprocess_cell_harvest_large_volume_continuous_separation");
  });
});

describe("centrifugeLabTypes", () => {
  it("returns 5 types", () => {
    expect(centrifugeLabTypes()).toHaveLength(5);
  });
});
