import { describe, it, expect } from "vitest";
import {
  accuracy, range, visibility, versatility,
  llCost, selfLeveling, forExterior, beam,
  bestUse, laserLevelTypes,
} from "../laser-level-calc.js";

describe("accuracy", () => {
  it("pipe laser most accurate", () => {
    expect(accuracy("pipe_laser_grade_align")).toBeGreaterThan(accuracy("cross_line_interior"));
  });
});

describe("range", () => {
  it("rotary red longest range", () => {
    expect(range("rotary_red_self_level")).toBeGreaterThan(range("cross_line_interior"));
  });
});

describe("visibility", () => {
  it("rotary green best visibility", () => {
    expect(visibility("rotary_green_high_vis")).toBeGreaterThan(visibility("rotary_red_self_level"));
  });
});

describe("versatility", () => {
  it("rotary red most versatile", () => {
    expect(versatility("rotary_red_self_level")).toBeGreaterThan(versatility("pipe_laser_grade_align"));
  });
});

describe("llCost", () => {
  it("rotary green most expensive", () => {
    expect(llCost("rotary_green_high_vis")).toBeGreaterThan(llCost("dot_plumb_point"));
  });
});

describe("selfLeveling", () => {
  it("rotary red self leveling", () => {
    expect(selfLeveling("rotary_red_self_level")).toBe(true);
  });
  it("pipe laser not self leveling", () => {
    expect(selfLeveling("pipe_laser_grade_align")).toBe(false);
  });
});

describe("forExterior", () => {
  it("rotary red for exterior", () => {
    expect(forExterior("rotary_red_self_level")).toBe(true);
  });
  it("cross line not for exterior", () => {
    expect(forExterior("cross_line_interior")).toBe(false);
  });
});

describe("beam", () => {
  it("dot plumb uses single dot", () => {
    expect(beam("dot_plumb_point")).toBe("single_dot_plumb_up_down_forward");
  });
});

describe("bestUse", () => {
  it("rotary red for site grade", () => {
    expect(bestUse("rotary_red_self_level")).toBe("site_grade_foundation_excavation");
  });
});

describe("laserLevelTypes", () => {
  it("returns 5 types", () => {
    expect(laserLevelTypes()).toHaveLength(5);
  });
});
