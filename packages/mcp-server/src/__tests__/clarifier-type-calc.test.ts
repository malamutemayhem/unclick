import { describe, it, expect } from "vitest";
import {
  removal, footprint, flowRate, sludge,
  clCost, gravity, forPrimary, mechanism,
  bestUse, clarifierTypes,
} from "../clarifier-type-calc.js";

describe("removal", () => {
  it("daf best removal", () => {
    expect(removal("dissolved_air_flotation")).toBeGreaterThan(removal("circular_center_feed"));
  });
});

describe("footprint", () => {
  it("lamella smallest footprint", () => {
    expect(footprint("lamella_inclined_plate")).toBeGreaterThan(footprint("circular_center_feed"));
  });
});

describe("flowRate", () => {
  it("ballasted highest flow rate", () => {
    expect(flowRate("ballasted_floc_micro_sand")).toBeGreaterThan(flowRate("lamella_inclined_plate"));
  });
});

describe("sludge", () => {
  it("daf best sludge handling", () => {
    expect(sludge("dissolved_air_flotation")).toBeGreaterThan(sludge("lamella_inclined_plate"));
  });
});

describe("clCost", () => {
  it("ballasted most expensive", () => {
    expect(clCost("ballasted_floc_micro_sand")).toBeGreaterThan(clCost("rectangular_chain_flight"));
  });
});

describe("gravity", () => {
  it("circular is gravity", () => {
    expect(gravity("circular_center_feed")).toBe(true);
  });
  it("daf not gravity", () => {
    expect(gravity("dissolved_air_flotation")).toBe(false);
  });
});

describe("forPrimary", () => {
  it("circular for primary", () => {
    expect(forPrimary("circular_center_feed")).toBe(true);
  });
  it("lamella not for primary", () => {
    expect(forPrimary("lamella_inclined_plate")).toBe(false);
  });
});

describe("mechanism", () => {
  it("daf uses micro bubble", () => {
    expect(mechanism("dissolved_air_flotation")).toBe("micro_bubble_float_skim_surface");
  });
});

describe("bestUse", () => {
  it("circular for municipal settle", () => {
    expect(bestUse("circular_center_feed")).toBe("municipal_primary_secondary_settle");
  });
});

describe("clarifierTypes", () => {
  it("returns 5 types", () => {
    expect(clarifierTypes()).toHaveLength(5);
  });
});
