import { describe, it, expect } from "vitest";
import {
  castDistance, actionRealism, depthRange, durability,
  lureCost, weedless, needsTrailer, lureMaterial,
  bestTarget, fishingLures,
} from "../fishing-lure-calc.js";

describe("castDistance", () => {
  it("spinnerbait blade skirt longest cast", () => {
    expect(castDistance("spinnerbait_blade_skirt")).toBeGreaterThan(castDistance("soft_plastic_worm"));
  });
});

describe("actionRealism", () => {
  it("soft plastic worm most realistic", () => {
    expect(actionRealism("soft_plastic_worm")).toBeGreaterThan(actionRealism("spinnerbait_blade_skirt"));
  });
});

describe("depthRange", () => {
  it("crankbait diving lip deepest range", () => {
    expect(depthRange("crankbait_diving_lip")).toBeGreaterThan(depthRange("topwater_popper"));
  });
});

describe("durability", () => {
  it("jig head bucktail most durable", () => {
    expect(durability("jig_head_bucktail")).toBeGreaterThan(durability("soft_plastic_worm"));
  });
});

describe("lureCost", () => {
  it("topwater popper most expensive", () => {
    expect(lureCost("topwater_popper")).toBeGreaterThan(lureCost("soft_plastic_worm"));
  });
});

describe("weedless", () => {
  it("soft plastic worm is weedless", () => {
    expect(weedless("soft_plastic_worm")).toBe(true);
  });
  it("crankbait diving lip is not", () => {
    expect(weedless("crankbait_diving_lip")).toBe(false);
  });
});

describe("needsTrailer", () => {
  it("jig head bucktail needs trailer", () => {
    expect(needsTrailer("jig_head_bucktail")).toBe(true);
  });
  it("crankbait diving lip does not", () => {
    expect(needsTrailer("crankbait_diving_lip")).toBe(false);
  });
});

describe("lureMaterial", () => {
  it("soft plastic worm uses pvc plastisol scented", () => {
    expect(lureMaterial("soft_plastic_worm")).toBe("pvc_plastisol_scented");
  });
});

describe("bestTarget", () => {
  it("topwater popper best for bass surface dawn dusk", () => {
    expect(bestTarget("topwater_popper")).toBe("bass_surface_dawn_dusk");
  });
});

describe("fishingLures", () => {
  it("returns 5 types", () => {
    expect(fishingLures()).toHaveLength(5);
  });
});
