import { describe, it, expect } from "vitest";
import {
  flow, capacity, debris, maintenance,
  rdCost, siphonic, forLargeRoof, strainer,
  bestUse, roofDrainTypes,
} from "../roof-drain-calc.js";

describe("flow", () => {
  it("siphonic highest flow", () => {
    expect(flow("siphonic_engineered")).toBeGreaterThan(flow("gravity_dome_strainer"));
  });
});

describe("capacity", () => {
  it("siphonic highest capacity", () => {
    expect(capacity("siphonic_engineered")).toBeGreaterThan(capacity("gravity_dome_strainer"));
  });
});

describe("debris", () => {
  it("overflow best debris handling", () => {
    expect(debris("overflow_secondary")).toBeGreaterThan(debris("green_roof_retention"));
  });
});

describe("maintenance", () => {
  it("gravity lowest maintenance", () => {
    expect(maintenance("gravity_dome_strainer")).toBeGreaterThan(maintenance("siphonic_engineered"));
  });
});

describe("rdCost", () => {
  it("siphonic most expensive", () => {
    expect(rdCost("siphonic_engineered")).toBeGreaterThan(rdCost("gravity_dome_strainer"));
  });
});

describe("siphonic", () => {
  it("siphonic is siphonic", () => {
    expect(siphonic("siphonic_engineered")).toBe(true);
  });
  it("gravity not siphonic", () => {
    expect(siphonic("gravity_dome_strainer")).toBe(false);
  });
});

describe("forLargeRoof", () => {
  it("siphonic for large roof", () => {
    expect(forLargeRoof("siphonic_engineered")).toBe(true);
  });
  it("gravity not large roof", () => {
    expect(forLargeRoof("gravity_dome_strainer")).toBe(false);
  });
});

describe("strainer", () => {
  it("green roof uses gravel guard", () => {
    expect(strainer("green_roof_retention")).toBe("gravel_guard_retention_plate");
  });
});

describe("bestUse", () => {
  it("controlled flow for detention", () => {
    expect(bestUse("controlled_flow_weir")).toBe("stormwater_detention_on_roof");
  });
});

describe("roofDrainTypes", () => {
  it("returns 5 types", () => {
    expect(roofDrainTypes()).toHaveLength(5);
  });
});
