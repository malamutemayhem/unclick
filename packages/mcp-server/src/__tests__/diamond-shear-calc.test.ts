import { describe, it, expect } from "vitest";
import {
  cutClean, heatResist, controlGrip, bladeLife,
  shearCost, springReturn, forThick, bladeAngle,
  bestUse, diamondShears,
} from "../diamond-shear-calc.js";

describe("cutClean", () => {
  it("curved trim bowl cleanest cut", () => {
    expect(cutClean("curved_trim_bowl")).toBeGreaterThan(cutClean("heavy_duty_thick"));
  });
});

describe("heatResist", () => {
  it("heavy duty thick best heat resist", () => {
    expect(heatResist("heavy_duty_thick")).toBeGreaterThan(heatResist("spring_return_fast"));
  });
});

describe("controlGrip", () => {
  it("spring return fast best control grip", () => {
    expect(controlGrip("spring_return_fast")).toBeGreaterThan(controlGrip("heavy_duty_thick"));
  });
});

describe("bladeLife", () => {
  it("heavy duty thick longest blade life", () => {
    expect(bladeLife("heavy_duty_thick")).toBeGreaterThan(bladeLife("spring_return_fast"));
  });
});

describe("shearCost", () => {
  it("heavy duty thick most expensive", () => {
    expect(shearCost("heavy_duty_thick")).toBeGreaterThan(shearCost("straight_cut_standard"));
  });
});

describe("springReturn", () => {
  it("spring return fast has spring return", () => {
    expect(springReturn("spring_return_fast")).toBe(true);
  });
  it("straight cut standard no spring return", () => {
    expect(springReturn("straight_cut_standard")).toBe(false);
  });
});

describe("forThick", () => {
  it("heavy duty thick is for thick", () => {
    expect(forThick("heavy_duty_thick")).toBe(true);
  });
  it("curved trim bowl not for thick", () => {
    expect(forThick("curved_trim_bowl")).toBe(false);
  });
});

describe("bladeAngle", () => {
  it("offset handle reach uses offset reach edge", () => {
    expect(bladeAngle("offset_handle_reach")).toBe("offset_reach_edge");
  });
});

describe("bestUse", () => {
  it("curved trim bowl best for bowl rim trim", () => {
    expect(bestUse("curved_trim_bowl")).toBe("bowl_rim_trim");
  });
});

describe("diamondShears", () => {
  it("returns 5 types", () => {
    expect(diamondShears()).toHaveLength(5);
  });
});
