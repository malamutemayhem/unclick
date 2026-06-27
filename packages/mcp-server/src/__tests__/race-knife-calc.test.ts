import { describe, it, expect } from "vitest";
import {
  hollowDepth, controlCut, finishSmooth, radiusRange,
  knifeCost, adjustable, forBowls, curveProfile,
  bestUse, raceKnives,
} from "../race-knife-calc.js";

describe("hollowDepth", () => {
  it("spoon bowl deep deepest hollow", () => {
    expect(hollowDepth("spoon_bowl_deep")).toBeGreaterThan(hollowDepth("flat_inshave_wide"));
  });
});

describe("controlCut", () => {
  it("flat inshave wide best control", () => {
    expect(controlCut("flat_inshave_wide")).toBeGreaterThan(controlCut("spoon_bowl_deep"));
  });
});

describe("finishSmooth", () => {
  it("flat inshave wide smoothest finish", () => {
    expect(finishSmooth("flat_inshave_wide")).toBeGreaterThan(finishSmooth("closed_hook_tight"));
  });
});

describe("radiusRange", () => {
  it("adjustable radius set widest range", () => {
    expect(radiusRange("adjustable_radius_set")).toBeGreaterThan(radiusRange("closed_hook_tight"));
  });
});

describe("knifeCost", () => {
  it("adjustable radius set most expensive", () => {
    expect(knifeCost("adjustable_radius_set")).toBeGreaterThan(knifeCost("open_curve_scoop"));
  });
});

describe("adjustable", () => {
  it("adjustable radius set is adjustable", () => {
    expect(adjustable("adjustable_radius_set")).toBe(true);
  });
  it("open curve scoop not adjustable", () => {
    expect(adjustable("open_curve_scoop")).toBe(false);
  });
});

describe("forBowls", () => {
  it("spoon bowl deep is for bowls", () => {
    expect(forBowls("spoon_bowl_deep")).toBe(true);
  });
  it("open curve scoop not for bowls", () => {
    expect(forBowls("open_curve_scoop")).toBe(false);
  });
});

describe("curveProfile", () => {
  it("closed hook tight uses tight hook loop", () => {
    expect(curveProfile("closed_hook_tight")).toBe("tight_hook_loop");
  });
});

describe("bestUse", () => {
  it("adjustable radius set best for variable curve work", () => {
    expect(bestUse("adjustable_radius_set")).toBe("variable_curve_work");
  });
});

describe("raceKnives", () => {
  it("returns 5 types", () => {
    expect(raceKnives()).toHaveLength(5);
  });
});
