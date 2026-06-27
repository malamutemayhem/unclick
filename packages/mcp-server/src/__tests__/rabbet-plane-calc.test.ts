import { describe, it, expect } from "vitest";
import {
  cutClean, depthControl, widthRange, durability,
  planeCost, hasFence, forEndGrain, bladeMount,
  bestUse, rabbetPlanes,
} from "../rabbet-plane-calc.js";

describe("cutClean", () => {
  it("shoulder rabbet fine cleanest cut", () => {
    expect(cutClean("shoulder_rabbet_fine")).toBeGreaterThan(cutClean("wooden_rabbet_classic"));
  });
});

describe("depthControl", () => {
  it("moving fillister fence best depth control", () => {
    expect(depthControl("moving_fillister_fence")).toBeGreaterThan(depthControl("wooden_rabbet_classic"));
  });
});

describe("widthRange", () => {
  it("moving fillister fence widest range", () => {
    expect(widthRange("moving_fillister_fence")).toBeGreaterThan(widthRange("shoulder_rabbet_fine"));
  });
});

describe("durability", () => {
  it("metal rabbet adjustable most durable", () => {
    expect(durability("metal_rabbet_adjustable")).toBeGreaterThan(durability("wooden_rabbet_classic"));
  });
});

describe("planeCost", () => {
  it("moving fillister fence most expensive", () => {
    expect(planeCost("moving_fillister_fence")).toBeGreaterThan(planeCost("wooden_rabbet_classic"));
  });
});

describe("hasFence", () => {
  it("metal rabbet adjustable has fence", () => {
    expect(hasFence("metal_rabbet_adjustable")).toBe(true);
  });
  it("shoulder rabbet fine no fence", () => {
    expect(hasFence("shoulder_rabbet_fine")).toBe(false);
  });
});

describe("forEndGrain", () => {
  it("shoulder rabbet fine is for end grain", () => {
    expect(forEndGrain("shoulder_rabbet_fine")).toBe(true);
  });
  it("wooden rabbet classic not for end grain", () => {
    expect(forEndGrain("wooden_rabbet_classic")).toBe(false);
  });
});

describe("bladeMount", () => {
  it("skewed rabbet cross uses skewed angle iron", () => {
    expect(bladeMount("skewed_rabbet_cross")).toBe("skewed_angle_iron");
  });
});

describe("bestUse", () => {
  it("shoulder rabbet fine best for tenon shoulder trim", () => {
    expect(bestUse("shoulder_rabbet_fine")).toBe("tenon_shoulder_trim");
  });
});

describe("rabbetPlanes", () => {
  it("returns 5 types", () => {
    expect(rabbetPlanes()).toHaveLength(5);
  });
});
