import { describe, it, expect } from "vitest";
import {
  cutDepth, lineDetail, brightCut, controlEase,
  graverCost, forStoneSeat, forLettering, steelType,
  bestUse, onglettes,
} from "../onglette-calc.js";

describe("cutDepth", () => {
  it("square graver deep deepest cut", () => {
    expect(cutDepth("square_graver_deep")).toBeGreaterThan(cutDepth("knife_edge_fine"));
  });
});

describe("lineDetail", () => {
  it("knife edge fine most line detail", () => {
    expect(lineDetail("knife_edge_fine")).toBeGreaterThan(lineDetail("flat_bottom_wide"));
  });
});

describe("brightCut", () => {
  it("round heel smooth best bright cut", () => {
    expect(brightCut("round_heel_smooth")).toBeGreaterThan(brightCut("square_graver_deep"));
  });
});

describe("controlEase", () => {
  it("round heel smooth easiest control", () => {
    expect(controlEase("round_heel_smooth")).toBeGreaterThan(controlEase("square_graver_deep"));
  });
});

describe("graverCost", () => {
  it("knife edge fine most expensive", () => {
    expect(graverCost("knife_edge_fine")).toBeGreaterThan(graverCost("sharp_point_standard"));
  });
});

describe("forStoneSeat", () => {
  it("sharp point standard is for stone seat", () => {
    expect(forStoneSeat("sharp_point_standard")).toBe(true);
  });
  it("round heel smooth not for stone seat", () => {
    expect(forStoneSeat("round_heel_smooth")).toBe(false);
  });
});

describe("forLettering", () => {
  it("sharp point standard is for lettering", () => {
    expect(forLettering("sharp_point_standard")).toBe(true);
  });
  it("flat bottom wide not for lettering", () => {
    expect(forLettering("flat_bottom_wide")).toBe(false);
  });
});

describe("steelType", () => {
  it("sharp point standard uses high speed steel", () => {
    expect(steelType("sharp_point_standard")).toBe("high_speed_steel");
  });
});

describe("bestUse", () => {
  it("round heel smooth best for scroll bright cut", () => {
    expect(bestUse("round_heel_smooth")).toBe("scroll_bright_cut");
  });
});

describe("onglettes", () => {
  it("returns 5 types", () => {
    expect(onglettes()).toHaveLength(5);
  });
});
