import { describe, it, expect } from "vitest";
import {
  cutPrecision, chipClean, comfortGrip, edgeHold,
  knifeCost, forGeometric, isSet, bladeProfile,
  bestUse, chipCarvingKnives,
} from "../chip-carving-calc.js";

describe("cutPrecision", () => {
  it("detail knife small most precise cut", () => {
    expect(cutPrecision("detail_knife_small")).toBeGreaterThan(cutPrecision("chip_set_three"));
  });
});

describe("chipClean", () => {
  it("cutting knife skew cleanest chip", () => {
    expect(chipClean("cutting_knife_skew")).toBeGreaterThan(chipClean("detail_knife_small"));
  });
});

describe("comfortGrip", () => {
  it("palm handle short most comfortable grip", () => {
    expect(comfortGrip("palm_handle_short")).toBeGreaterThan(comfortGrip("detail_knife_small"));
  });
});

describe("edgeHold", () => {
  it("cutting knife skew best edge hold", () => {
    expect(edgeHold("cutting_knife_skew")).toBeGreaterThan(edgeHold("detail_knife_small"));
  });
});

describe("knifeCost", () => {
  it("chip set three most expensive", () => {
    expect(knifeCost("chip_set_three")).toBeGreaterThan(knifeCost("stab_knife_straight"));
  });
});

describe("forGeometric", () => {
  it("stab knife straight is for geometric", () => {
    expect(forGeometric("stab_knife_straight")).toBe(true);
  });
  it("detail knife small not for geometric", () => {
    expect(forGeometric("detail_knife_small")).toBe(false);
  });
});

describe("isSet", () => {
  it("chip set three is a set", () => {
    expect(isSet("chip_set_three")).toBe(true);
  });
  it("stab knife straight not a set", () => {
    expect(isSet("stab_knife_straight")).toBe(false);
  });
});

describe("bladeProfile", () => {
  it("cutting knife skew uses skew angle edge", () => {
    expect(bladeProfile("cutting_knife_skew")).toBe("skew_angle_edge");
  });
});

describe("bestUse", () => {
  it("cutting knife skew best for chip removal cut", () => {
    expect(bestUse("cutting_knife_skew")).toBe("chip_removal_cut");
  });
});

describe("chipCarvingKnives", () => {
  it("returns 5 types", () => {
    expect(chipCarvingKnives()).toHaveLength(5);
  });
});
