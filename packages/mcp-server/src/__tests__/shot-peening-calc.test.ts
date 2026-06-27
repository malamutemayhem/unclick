import { describe, it, expect } from "vitest";
import {
  intensity, coverage, depth, surfaceFinish,
  spCost, noMedia, forAerospace, media,
  bestUse, shotPeeningTypes,
} from "../shot-peening-calc.js";

describe("intensity", () => {
  it("laser shock highest intensity", () => {
    expect(intensity("laser_shock_peening")).toBeGreaterThan(intensity("glass_bead_precision"));
  });
});

describe("coverage", () => {
  it("steel shot best coverage", () => {
    expect(coverage("steel_shot_gravity")).toBeGreaterThan(coverage("laser_shock_peening"));
  });
});

describe("depth", () => {
  it("laser shock deepest compressive layer", () => {
    expect(depth("laser_shock_peening")).toBeGreaterThan(depth("glass_bead_precision"));
  });
});

describe("surfaceFinish", () => {
  it("glass bead best surface finish", () => {
    expect(surfaceFinish("glass_bead_precision")).toBeGreaterThan(surfaceFinish("steel_shot_gravity"));
  });
});

describe("spCost", () => {
  it("laser shock most expensive", () => {
    expect(spCost("laser_shock_peening")).toBeGreaterThan(spCost("steel_shot_gravity"));
  });
});

describe("noMedia", () => {
  it("laser shock no media", () => {
    expect(noMedia("laser_shock_peening")).toBe(true);
  });
  it("steel shot uses media", () => {
    expect(noMedia("steel_shot_gravity")).toBe(false);
  });
});

describe("forAerospace", () => {
  it("ceramic bead for aerospace", () => {
    expect(forAerospace("ceramic_bead_high_temp")).toBe(true);
  });
  it("steel shot not for aerospace", () => {
    expect(forAerospace("steel_shot_gravity")).toBe(false);
  });
});

describe("media", () => {
  it("ceramic uses zirconia bead", () => {
    expect(media("ceramic_bead_high_temp")).toBe("zirconia_ceramic_bead_z300");
  });
});

describe("bestUse", () => {
  it("laser for fan blade leading edge", () => {
    expect(bestUse("laser_shock_peening")).toBe("fan_blade_leading_edge_fod");
  });
});

describe("shotPeeningTypes", () => {
  it("returns 5 types", () => {
    expect(shotPeeningTypes()).toHaveLength(5);
  });
});
