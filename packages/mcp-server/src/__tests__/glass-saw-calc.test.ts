import { describe, it, expect } from "vitest";
import {
  cutPrecision, curveAbility, speedCut, thicknessRange,
  sawCost, wetCut, forCurve, bladeType,
  bestUse, glassSaws,
} from "../glass-saw-calc.js";

describe("cutPrecision", () => {
  it("diamond wire thin most precise cut", () => {
    expect(cutPrecision("diamond_wire_thin")).toBeGreaterThan(cutPrecision("tile_saw_wet"));
  });
});

describe("curveAbility", () => {
  it("ring saw curve best curve ability", () => {
    expect(curveAbility("ring_saw_curve")).toBeGreaterThan(curveAbility("tile_saw_wet"));
  });
});

describe("speedCut", () => {
  it("tile saw wet fastest cut", () => {
    expect(speedCut("tile_saw_wet")).toBeGreaterThan(speedCut("diamond_wire_thin"));
  });
});

describe("thicknessRange", () => {
  it("tile saw wet widest thickness range", () => {
    expect(thicknessRange("tile_saw_wet")).toBeGreaterThan(thicknessRange("diamond_wire_thin"));
  });
});

describe("sawCost", () => {
  it("grinder saw combo most expensive", () => {
    expect(sawCost("grinder_saw_combo")).toBeGreaterThan(sawCost("diamond_wire_thin"));
  });
});

describe("wetCut", () => {
  it("ring saw curve uses wet cut", () => {
    expect(wetCut("ring_saw_curve")).toBe(true);
  });
});

describe("forCurve", () => {
  it("ring saw curve is for curve", () => {
    expect(forCurve("ring_saw_curve")).toBe(true);
  });
  it("band saw straight not for curve", () => {
    expect(forCurve("band_saw_straight")).toBe(false);
  });
});

describe("bladeType", () => {
  it("band saw straight uses continuous band blade", () => {
    expect(bladeType("band_saw_straight")).toBe("continuous_band_blade");
  });
});

describe("bestUse", () => {
  it("ring saw curve best for intricate curve cut", () => {
    expect(bestUse("ring_saw_curve")).toBe("intricate_curve_cut");
  });
});

describe("glassSaws", () => {
  it("returns 5 types", () => {
    expect(glassSaws()).toHaveLength(5);
  });
});
