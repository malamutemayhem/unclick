import { describe, it, expect } from "vitest";
import {
  emissionControl, capacity, windResist, maintenance,
  frCost, weatherProtected, forVolatile, roof,
  bestUse, floatingRoofTankTypes,
} from "../floating-roof-tank-calc.js";

describe("emissionControl", () => {
  it("geodesic dome best emission control", () => {
    expect(emissionControl("geodesic_dome_float")).toBeGreaterThan(emissionControl("external_floating_roof"));
  });
});

describe("capacity", () => {
  it("external floating highest capacity", () => {
    expect(capacity("external_floating_roof")).toBeGreaterThanOrEqual(capacity("double_deck_pontoon"));
  });
});

describe("windResist", () => {
  it("geodesic dome best wind resist", () => {
    expect(windResist("geodesic_dome_float")).toBeGreaterThan(windResist("external_floating_roof"));
  });
});

describe("maintenance", () => {
  it("geodesic dome lowest maintenance", () => {
    expect(maintenance("geodesic_dome_float")).toBeGreaterThan(maintenance("external_floating_roof"));
  });
});

describe("frCost", () => {
  it("geodesic dome most expensive", () => {
    expect(frCost("geodesic_dome_float")).toBeGreaterThan(frCost("external_floating_roof"));
  });
});

describe("weatherProtected", () => {
  it("internal floating is weather protected", () => {
    expect(weatherProtected("internal_floating_roof")).toBe(true);
  });
  it("external floating not weather protected", () => {
    expect(weatherProtected("external_floating_roof")).toBe(false);
  });
});

describe("forVolatile", () => {
  it("all floating roof types for volatile", () => {
    expect(forVolatile("external_floating_roof")).toBe(true);
  });
});

describe("roof", () => {
  it("double deck uses pontoon compartment", () => {
    expect(roof("double_deck_pontoon")).toBe("double_deck_steel_pontoon_buoyancy_compartment");
  });
});

describe("bestUse", () => {
  it("full contact aluminum for water treatment", () => {
    expect(bestUse("full_contact_aluminum")).toBe("water_treatment_potable_reservoir_cover");
  });
});

describe("floatingRoofTankTypes", () => {
  it("returns 5 types", () => {
    expect(floatingRoofTankTypes()).toHaveLength(5);
  });
});
