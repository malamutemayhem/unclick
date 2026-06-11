import { describe, it, expect } from "vitest";
import {
  dressSmooth, tuckForce, controlFeel, coverWidth,
  eavesCost, toothed, forDressing, bladeWidth,
  bestUse, eavesKnives,
} from "../eaves-knife-calc.js";

describe("dressSmooth", () => {
  it("flat blade dress smoothest dress", () => {
    expect(dressSmooth("flat_blade_dress")).toBeGreaterThan(dressSmooth("toothed_comb_rake"));
  });
});

describe("tuckForce", () => {
  it("angled tip tuck strongest tuck", () => {
    expect(tuckForce("angled_tip_tuck")).toBeGreaterThan(tuckForce("toothed_comb_rake"));
  });
});

describe("controlFeel", () => {
  it("angled tip tuck best control", () => {
    expect(controlFeel("angled_tip_tuck")).toBeGreaterThan(controlFeel("wide_paddle_press"));
  });
});

describe("coverWidth", () => {
  it("wide paddle press widest cover", () => {
    expect(coverWidth("wide_paddle_press")).toBeGreaterThan(coverWidth("angled_tip_tuck"));
  });
});

describe("eavesCost", () => {
  it("curved blade scoop and angled tip tuck cost more than flat blade dress", () => {
    expect(eavesCost("curved_blade_scoop")).toBeGreaterThan(eavesCost("flat_blade_dress"));
  });
});

describe("toothed", () => {
  it("toothed comb rake is toothed", () => {
    expect(toothed("toothed_comb_rake")).toBe(true);
  });
  it("flat blade dress not toothed", () => {
    expect(toothed("flat_blade_dress")).toBe(false);
  });
});

describe("forDressing", () => {
  it("flat blade dress is for dressing", () => {
    expect(forDressing("flat_blade_dress")).toBe(true);
  });
  it("curved blade scoop not for dressing", () => {
    expect(forDressing("curved_blade_scoop")).toBe(false);
  });
});

describe("bladeWidth", () => {
  it("wide paddle press uses eight inch paddle", () => {
    expect(bladeWidth("wide_paddle_press")).toBe("eight_inch_paddle");
  });
});

describe("bestUse", () => {
  it("angled tip tuck best for tight corner tuck", () => {
    expect(bestUse("angled_tip_tuck")).toBe("tight_corner_tuck");
  });
});

describe("eavesKnives", () => {
  it("returns 5 types", () => {
    expect(eavesKnives()).toHaveLength(5);
  });
});
