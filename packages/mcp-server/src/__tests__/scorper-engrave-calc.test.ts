import { describe, it, expect } from "vitest";
import {
  clearSpeed, surfaceSmooth, depthControl, areaRange,
  scorperCost, multiLine, forBackground, cutProfile,
  bestUse, scorperEngraves,
} from "../scorper-engrave-calc.js";

describe("clearSpeed", () => {
  it("flat scorper wide fastest clear", () => {
    expect(clearSpeed("flat_scorper_wide")).toBeGreaterThan(clearSpeed("dotter_stipple_point"));
  });
});

describe("surfaceSmooth", () => {
  it("round scorper scoop smoothest surface", () => {
    expect(surfaceSmooth("round_scorper_scoop")).toBeGreaterThan(surfaceSmooth("dotter_stipple_point"));
  });
});

describe("depthControl", () => {
  it("bull stick push best depth control", () => {
    expect(depthControl("bull_stick_push")).toBeGreaterThan(depthControl("flat_scorper_wide"));
  });
});

describe("areaRange", () => {
  it("flat scorper wide widest area range", () => {
    expect(areaRange("flat_scorper_wide")).toBeGreaterThan(areaRange("bull_stick_push"));
  });
});

describe("scorperCost", () => {
  it("liner parallel multi most expensive", () => {
    expect(scorperCost("liner_parallel_multi")).toBeGreaterThan(scorperCost("flat_scorper_wide"));
  });
});

describe("multiLine", () => {
  it("liner parallel multi is multi line", () => {
    expect(multiLine("liner_parallel_multi")).toBe(true);
  });
  it("flat scorper wide not multi line", () => {
    expect(multiLine("flat_scorper_wide")).toBe(false);
  });
});

describe("forBackground", () => {
  it("flat scorper wide is for background", () => {
    expect(forBackground("flat_scorper_wide")).toBe(true);
  });
  it("bull stick push not for background", () => {
    expect(forBackground("bull_stick_push")).toBe(false);
  });
});

describe("cutProfile", () => {
  it("dotter stipple point uses point stipple dot", () => {
    expect(cutProfile("dotter_stipple_point")).toBe("point_stipple_dot");
  });
});

describe("bestUse", () => {
  it("liner parallel multi best for parallel line shade", () => {
    expect(bestUse("liner_parallel_multi")).toBe("parallel_line_shade");
  });
});

describe("scorperEngraves", () => {
  it("returns 5 types", () => {
    expect(scorperEngraves()).toHaveLength(5);
  });
});
