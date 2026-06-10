import { describe, it, expect } from "vitest";
import {
  coveragePower, detailControl, easeOfUse, colorRange,
  paintCost, needsPrimer, airbrushReady, finishType,
  bestUse, miniaturePaints,
} from "../miniature-paint-calc.js";

describe("coveragePower", () => {
  it("acrylic water based best coverage", () => {
    expect(coveragePower("acrylic_water_based")).toBeGreaterThan(coveragePower("wash_shade_recess"));
  });
});

describe("detailControl", () => {
  it("acrylic water based best detail control", () => {
    expect(detailControl("acrylic_water_based")).toBeGreaterThan(detailControl("speed_paint_quick"));
  });
});

describe("easeOfUse", () => {
  it("contrast one coat easiest to use", () => {
    expect(easeOfUse("contrast_one_coat")).toBeGreaterThan(easeOfUse("metallic_shimmer_effect"));
  });
});

describe("colorRange", () => {
  it("acrylic water based widest color range", () => {
    expect(colorRange("acrylic_water_based")).toBeGreaterThan(colorRange("metallic_shimmer_effect"));
  });
});

describe("paintCost", () => {
  it("contrast one coat more expensive than acrylic", () => {
    expect(paintCost("contrast_one_coat")).toBeGreaterThan(paintCost("acrylic_water_based"));
  });
});

describe("needsPrimer", () => {
  it("acrylic water based needs primer", () => {
    expect(needsPrimer("acrylic_water_based")).toBe(true);
  });
  it("wash shade recess does not need primer", () => {
    expect(needsPrimer("wash_shade_recess")).toBe(false);
  });
});

describe("airbrushReady", () => {
  it("acrylic water based is airbrush ready", () => {
    expect(airbrushReady("acrylic_water_based")).toBe(true);
  });
  it("contrast one coat is not airbrush ready", () => {
    expect(airbrushReady("contrast_one_coat")).toBe(false);
  });
});

describe("finishType", () => {
  it("metallic shimmer effect uses metallic pearl shimmer", () => {
    expect(finishType("metallic_shimmer_effect")).toBe("metallic_pearl_shimmer");
  });
});

describe("bestUse", () => {
  it("contrast one coat best for batch paint army fast", () => {
    expect(bestUse("contrast_one_coat")).toBe("batch_paint_army_fast");
  });
});

describe("miniaturePaints", () => {
  it("returns 5 types", () => {
    expect(miniaturePaints()).toHaveLength(5);
  });
});
