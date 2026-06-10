import { describe, it, expect } from "vitest";
import {
  cutDepth, lineWidth, controlFeel, metalClear,
  scorperCost, forBackground, curved, faceProfile,
  bestUse, scorperTools,
} from "../scorper-tool-calc.js";

describe("cutDepth", () => {
  it("round scorper deep deepest cut", () => {
    expect(cutDepth("round_scorper_deep")).toBeGreaterThan(cutDepth("dotter_stipple_point"));
  });
});

describe("lineWidth", () => {
  it("flat scorper wide widest line", () => {
    expect(lineWidth("flat_scorper_wide")).toBeGreaterThan(lineWidth("dotter_stipple_point"));
  });
});

describe("controlFeel", () => {
  it("knife edge line best control", () => {
    expect(controlFeel("knife_edge_line")).toBeGreaterThan(controlFeel("round_scorper_deep"));
  });
});

describe("metalClear", () => {
  it("round scorper deep best metal clear", () => {
    expect(metalClear("round_scorper_deep")).toBeGreaterThan(metalClear("dotter_stipple_point"));
  });
});

describe("scorperCost", () => {
  it("bullstick round cut more expensive", () => {
    expect(scorperCost("bullstick_round_cut")).toBeGreaterThan(scorperCost("knife_edge_line"));
  });
});

describe("forBackground", () => {
  it("round scorper deep is for background", () => {
    expect(forBackground("round_scorper_deep")).toBe(true);
  });
  it("knife edge line not for background", () => {
    expect(forBackground("knife_edge_line")).toBe(false);
  });
});

describe("curved", () => {
  it("round scorper deep is curved", () => {
    expect(curved("round_scorper_deep")).toBe(true);
  });
  it("flat scorper wide not curved", () => {
    expect(curved("flat_scorper_wide")).toBe(false);
  });
});

describe("faceProfile", () => {
  it("dotter stipple point uses blunt round tip", () => {
    expect(faceProfile("dotter_stipple_point")).toBe("blunt_round_tip");
  });
});

describe("bestUse", () => {
  it("round scorper deep best for background remove", () => {
    expect(bestUse("round_scorper_deep")).toBe("background_remove");
  });
});

describe("scorperTools", () => {
  it("returns 5 types", () => {
    expect(scorperTools()).toHaveLength(5);
  });
});
