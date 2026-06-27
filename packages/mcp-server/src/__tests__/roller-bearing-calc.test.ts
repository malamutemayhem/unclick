import { describe, it, expect } from "vitest";
import {
  radialLoad, axialLoad, misalignment, speedLimit,
  rbCost, selfAligning, forHeavyLoad, roller,
  bestUse, rollerBearingTypes,
} from "../roller-bearing-calc.js";

describe("radialLoad", () => {
  it("cylindrical roller highest radial load", () => {
    expect(radialLoad("cylindrical_roller")).toBeGreaterThan(radialLoad("needle_roller"));
  });
});

describe("axialLoad", () => {
  it("tapered roller highest axial load", () => {
    expect(axialLoad("tapered_roller")).toBeGreaterThan(axialLoad("cylindrical_roller"));
  });
});

describe("misalignment", () => {
  it("spherical roller best misalignment", () => {
    expect(misalignment("spherical_roller")).toBeGreaterThan(misalignment("cylindrical_roller"));
  });
});

describe("speedLimit", () => {
  it("needle roller highest speed limit", () => {
    expect(speedLimit("needle_roller")).toBeGreaterThan(speedLimit("spherical_roller"));
  });
});

describe("rbCost", () => {
  it("toroidal roller most expensive", () => {
    expect(rbCost("toroidal_roller")).toBeGreaterThan(rbCost("needle_roller"));
  });
});

describe("selfAligning", () => {
  it("spherical roller is self aligning", () => {
    expect(selfAligning("spherical_roller")).toBe(true);
  });
  it("cylindrical roller not self aligning", () => {
    expect(selfAligning("cylindrical_roller")).toBe(false);
  });
});

describe("forHeavyLoad", () => {
  it("spherical roller for heavy load", () => {
    expect(forHeavyLoad("spherical_roller")).toBe(true);
  });
  it("needle roller not for heavy load", () => {
    expect(forHeavyLoad("needle_roller")).toBe(false);
  });
});

describe("roller", () => {
  it("needle uses long thin roller", () => {
    expect(roller("needle_roller")).toBe("long_thin_needle_roller_compact_radial_section");
  });
});

describe("bestUse", () => {
  it("spherical roller for paper mill mining", () => {
    expect(bestUse("spherical_roller")).toBe("paper_mill_mining_crusher_heavy_shock_misalign");
  });
});

describe("rollerBearingTypes", () => {
  it("returns 5 types", () => {
    expect(rollerBearingTypes()).toHaveLength(5);
  });
});
