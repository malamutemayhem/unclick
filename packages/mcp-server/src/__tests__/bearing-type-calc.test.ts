import { describe, it, expect } from "vitest";
import {
  loadCapacity, speedLimit, precision, friction,
  brCost, contactless, forSpindle, element,
  bestUse, bearingTypes,
} from "../bearing-type-calc.js";

describe("loadCapacity", () => {
  it("roller tapered highest load capacity", () => {
    expect(loadCapacity("roller_tapered")).toBeGreaterThan(loadCapacity("air_bearing_porous"));
  });
});

describe("speedLimit", () => {
  it("air bearing porous highest speed limit", () => {
    expect(speedLimit("air_bearing_porous")).toBeGreaterThan(speedLimit("roller_tapered"));
  });
});

describe("precision", () => {
  it("air bearing porous highest precision", () => {
    expect(precision("air_bearing_porous")).toBeGreaterThan(precision("ball_deep_groove"));
  });
});

describe("friction", () => {
  it("air bearing porous lowest friction", () => {
    expect(friction("air_bearing_porous")).toBeGreaterThan(friction("roller_tapered"));
  });
});

describe("brCost", () => {
  it("magnetic active most expensive", () => {
    expect(brCost("magnetic_active")).toBeGreaterThan(brCost("ball_deep_groove"));
  });
});

describe("contactless", () => {
  it("air bearing porous is contactless", () => {
    expect(contactless("air_bearing_porous")).toBe(true);
  });
  it("ball deep groove not contactless", () => {
    expect(contactless("ball_deep_groove")).toBe(false);
  });
});

describe("forSpindle", () => {
  it("air bearing porous for spindle", () => {
    expect(forSpindle("air_bearing_porous")).toBe(true);
  });
  it("ball deep groove not for spindle", () => {
    expect(forSpindle("ball_deep_groove")).toBe(false);
  });
});

describe("element", () => {
  it("magnetic active uses electromagnet feedback", () => {
    expect(element("magnetic_active")).toBe("electromagnet_feedback");
  });
});

describe("bestUse", () => {
  it("roller tapered best for wheel hub axle load", () => {
    expect(bestUse("roller_tapered")).toBe("wheel_hub_axle_load");
  });
});

describe("bearingTypes", () => {
  it("returns 5 types", () => {
    expect(bearingTypes()).toHaveLength(5);
  });
});
