import { describe, it, expect } from "vitest";
import {
  cornerClean, depthReach, controlHit, edgeKeep,
  chiselCost, adjustable, forHeavy, angleType,
  bestUse, cornerChiselTimbers,
} from "../corner-chisel-timber-calc.js";

describe("cornerClean", () => {
  it("heavy timber large cleanest corner", () => {
    expect(cornerClean("heavy_timber_large")).toBeGreaterThan(cornerClean("adjustable_angle_set"));
  });
});

describe("depthReach", () => {
  it("heavy timber large deepest reach", () => {
    expect(depthReach("heavy_timber_large")).toBeGreaterThan(depthReach("acute_angle_tight"));
  });
});

describe("controlHit", () => {
  it("right angle standard best control hit", () => {
    expect(controlHit("right_angle_standard")).toBeGreaterThan(controlHit("obtuse_angle_wide"));
  });
});

describe("edgeKeep", () => {
  it("heavy timber large best edge keep", () => {
    expect(edgeKeep("heavy_timber_large")).toBeGreaterThan(edgeKeep("adjustable_angle_set"));
  });
});

describe("chiselCost", () => {
  it("adjustable angle set most expensive", () => {
    expect(chiselCost("adjustable_angle_set")).toBeGreaterThan(chiselCost("right_angle_standard"));
  });
});

describe("adjustable", () => {
  it("adjustable angle set is adjustable", () => {
    expect(adjustable("adjustable_angle_set")).toBe(true);
  });
  it("right angle standard not adjustable", () => {
    expect(adjustable("right_angle_standard")).toBe(false);
  });
});

describe("forHeavy", () => {
  it("heavy timber large is for heavy", () => {
    expect(forHeavy("heavy_timber_large")).toBe(true);
  });
  it("right angle standard not for heavy", () => {
    expect(forHeavy("right_angle_standard")).toBe(false);
  });
});

describe("angleType", () => {
  it("obtuse angle wide uses fixed 120 degree", () => {
    expect(angleType("obtuse_angle_wide")).toBe("fixed_120_degree");
  });
});

describe("bestUse", () => {
  it("heavy timber large best for heavy timber mortise", () => {
    expect(bestUse("heavy_timber_large")).toBe("heavy_timber_mortise");
  });
});

describe("cornerChiselTimbers", () => {
  it("returns 5 types", () => {
    expect(cornerChiselTimbers()).toHaveLength(5);
  });
});
