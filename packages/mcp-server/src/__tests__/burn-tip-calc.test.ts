import { describe, it, expect } from "vitest";
import {
  lineDetail, shadeCover, versatility, heatControl,
  tipCost, forShading, forLines, tipShape,
  bestUse, burnTips,
} from "../burn-tip-calc.js";

describe("lineDetail", () => {
  it("knife edge line most line detail", () => {
    expect(lineDetail("knife_edge_line")).toBeGreaterThan(lineDetail("flat_shader_wide"));
  });
});

describe("shadeCover", () => {
  it("ball tip shade best shade cover", () => {
    expect(shadeCover("ball_tip_shade")).toBeGreaterThan(shadeCover("knife_edge_line"));
  });
});

describe("versatility", () => {
  it("universal point basic most versatile", () => {
    expect(versatility("universal_point_basic")).toBeGreaterThan(versatility("knife_edge_line"));
  });
});

describe("heatControl", () => {
  it("flat shader wide best heat control", () => {
    expect(heatControl("flat_shader_wide")).toBeGreaterThan(heatControl("knife_edge_line"));
  });
});

describe("tipCost", () => {
  it("ball tip shade more expensive", () => {
    expect(tipCost("ball_tip_shade")).toBeGreaterThan(tipCost("universal_point_basic"));
  });
});

describe("forShading", () => {
  it("ball tip shade is for shading", () => {
    expect(forShading("ball_tip_shade")).toBe(true);
  });
  it("universal point basic not for shading", () => {
    expect(forShading("universal_point_basic")).toBe(false);
  });
});

describe("forLines", () => {
  it("knife edge line is for lines", () => {
    expect(forLines("knife_edge_line")).toBe(true);
  });
  it("ball tip shade not for lines", () => {
    expect(forLines("ball_tip_shade")).toBe(false);
  });
});

describe("tipShape", () => {
  it("universal point basic uses conical point brass", () => {
    expect(tipShape("universal_point_basic")).toBe("conical_point_brass");
  });
});

describe("bestUse", () => {
  it("ball tip shade best for smooth tone gradient", () => {
    expect(bestUse("ball_tip_shade")).toBe("smooth_tone_gradient");
  });
});

describe("burnTips", () => {
  it("returns 5 types", () => {
    expect(burnTips()).toHaveLength(5);
  });
});
