import { describe, it, expect } from "vitest";
import {
  loadCapacity, movement, seismic, maintenance,
  bbCost, allowsMovement, forSeismic, element,
  bestUse, bridgeBearingTypes,
} from "../bridge-bearing-calc.js";

describe("loadCapacity", () => {
  it("seismic isolation highest load", () => {
    expect(loadCapacity("seismic_isolation_lead_rubber")).toBeGreaterThan(loadCapacity("guided_sliding_ptfe_rail"));
  });
});

describe("movement", () => {
  it("free sliding best movement", () => {
    expect(movement("free_sliding_stainless_ptfe")).toBeGreaterThan(movement("fixed_pin_steel_rocker"));
  });
});

describe("seismic", () => {
  it("seismic isolation best seismic", () => {
    expect(seismic("seismic_isolation_lead_rubber")).toBeGreaterThan(seismic("rocker_roller_steel_nest"));
  });
});

describe("maintenance", () => {
  it("seismic isolation lowest maintenance", () => {
    expect(maintenance("seismic_isolation_lead_rubber")).toBeGreaterThan(maintenance("rocker_roller_steel_nest"));
  });
});

describe("bbCost", () => {
  it("seismic isolation most expensive", () => {
    expect(bbCost("seismic_isolation_lead_rubber")).toBeGreaterThan(bbCost("fixed_pin_steel_rocker"));
  });
});

describe("allowsMovement", () => {
  it("free sliding allows movement", () => {
    expect(allowsMovement("free_sliding_stainless_ptfe")).toBe(true);
  });
  it("fixed pin does not allow movement", () => {
    expect(allowsMovement("fixed_pin_steel_rocker")).toBe(false);
  });
});

describe("forSeismic", () => {
  it("seismic isolation for seismic", () => {
    expect(forSeismic("seismic_isolation_lead_rubber")).toBe(true);
  });
  it("rocker roller not for seismic", () => {
    expect(forSeismic("rocker_roller_steel_nest")).toBe(false);
  });
});

describe("element", () => {
  it("seismic isolation uses lead core rubber", () => {
    expect(element("seismic_isolation_lead_rubber")).toBe("lead_core_rubber_laminate_isolator");
  });
});

describe("bestUse", () => {
  it("fixed pin for short span", () => {
    expect(bestUse("fixed_pin_steel_rocker")).toBe("short_span_fixed_pier_anchor");
  });
});

describe("bridgeBearingTypes", () => {
  it("returns 5 types", () => {
    expect(bridgeBearingTypes()).toHaveLength(5);
  });
});
