import { describe, it, expect } from "vitest";
import {
  underflowDensity, overflowClarity, footprint, flocculant,
  tcCost, highDensity, forTailings, mechanism,
  bestUse, thickenerClarifTypes,
} from "../thickener-clarif-calc.js";

describe("underflowDensity", () => {
  it("deep cone highest underflow density", () => {
    expect(underflowDensity("deep_cone_ultra_high")).toBeGreaterThan(underflowDensity("lamella_inclined_plate"));
  });
});

describe("overflowClarity", () => {
  it("lamella best overflow clarity", () => {
    expect(overflowClarity("lamella_inclined_plate")).toBeGreaterThan(overflowClarity("deep_cone_ultra_high"));
  });
});

describe("footprint", () => {
  it("lamella smallest footprint", () => {
    expect(footprint("lamella_inclined_plate")).toBeGreaterThan(footprint("conventional_gravity_rake"));
  });
});

describe("flocculant", () => {
  it("deep cone highest flocculant use", () => {
    expect(flocculant("deep_cone_ultra_high")).toBeGreaterThan(flocculant("lamella_inclined_plate"));
  });
});

describe("tcCost", () => {
  it("deep cone most expensive", () => {
    expect(tcCost("deep_cone_ultra_high")).toBeGreaterThan(tcCost("lamella_inclined_plate"));
  });
});

describe("highDensity", () => {
  it("paste thickener is high density", () => {
    expect(highDensity("paste_thickener_deep")).toBe(true);
  });
  it("conventional not high density", () => {
    expect(highDensity("conventional_gravity_rake")).toBe(false);
  });
});

describe("forTailings", () => {
  it("deep cone for tailings", () => {
    expect(forTailings("deep_cone_ultra_high")).toBe(true);
  });
  it("lamella not for tailings", () => {
    expect(forTailings("lamella_inclined_plate")).toBe(false);
  });
});

describe("mechanism", () => {
  it("high rate uses dilution feedwell", () => {
    expect(mechanism("high_rate_feedwell")).toBe("dilution_feedwell_floc_aggregate_fast");
  });
});

describe("bestUse", () => {
  it("deep cone for dry stack tailings", () => {
    expect(bestUse("deep_cone_ultra_high")).toBe("dry_stack_tailings_zero_discharge_mine");
  });
});

describe("thickenerClarifTypes", () => {
  it("returns 5 types", () => {
    expect(thickenerClarifTypes()).toHaveLength(5);
  });
});
