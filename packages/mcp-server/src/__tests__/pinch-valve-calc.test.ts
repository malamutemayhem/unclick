import { describe, it, expect } from "vitest";
import {
  slurryCapability, abrasionResist, throttling, maintenance,
  pvCost, fullBore, forAbrasive, sleeve,
  bestUse, pinchValveTypes,
} from "../pinch-valve-calc.js";

describe("slurryCapability", () => {
  it("air operated and enclosed best slurry capability", () => {
    expect(slurryCapability("air_operated_sleeve")).toBeGreaterThan(slurryCapability("open_body_clamp"));
  });
});

describe("abrasionResist", () => {
  it("enclosed body best abrasion resistance", () => {
    expect(abrasionResist("enclosed_body_inline")).toBeGreaterThan(abrasionResist("open_body_clamp"));
  });
});

describe("throttling", () => {
  it("control pinch best throttling", () => {
    expect(throttling("control_pinch_modulate")).toBeGreaterThan(throttling("open_body_clamp"));
  });
});

describe("maintenance", () => {
  it("open body clamp easiest maintenance", () => {
    expect(maintenance("open_body_clamp")).toBeGreaterThan(maintenance("control_pinch_modulate"));
  });
});

describe("pvCost", () => {
  it("control pinch most expensive", () => {
    expect(pvCost("control_pinch_modulate")).toBeGreaterThan(pvCost("open_body_clamp"));
  });
});

describe("fullBore", () => {
  it("all pinch valves are full bore", () => {
    expect(fullBore("air_operated_sleeve")).toBe(true);
    expect(fullBore("open_body_clamp")).toBe(true);
  });
});

describe("forAbrasive", () => {
  it("air operated for abrasive", () => {
    expect(forAbrasive("air_operated_sleeve")).toBe(true);
  });
  it("open body clamp not for abrasive", () => {
    expect(forAbrasive("open_body_clamp")).toBe(false);
  });
});

describe("sleeve", () => {
  it("control pinch uses precision positioner", () => {
    expect(sleeve("control_pinch_modulate")).toBe("precision_sleeve_positioner_4_20ma");
  });
});

describe("bestUse", () => {
  it("enclosed body for cement powder abrasive", () => {
    expect(bestUse("enclosed_body_inline")).toBe("cement_powder_abrasive_bulk_material");
  });
});

describe("pinchValveTypes", () => {
  it("returns 5 types", () => {
    expect(pinchValveTypes()).toHaveLength(5);
  });
});
