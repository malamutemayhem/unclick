import { describe, it, expect } from "vitest";
import {
  cutClean, heatResist, edgeLife, controlAngle,
  chiselCost, hardiHole, handled, edgeShape,
  bestUse, hotChisels,
} from "../hot-chisel-calc.js";

describe("cutClean", () => {
  it("hot set wide flat cleanest cut", () => {
    expect(cutClean("hot_set_wide_flat")).toBeGreaterThan(cutClean("slitting_narrow_deep"));
  });
});

describe("heatResist", () => {
  it("hardy bottom cut best heat resist", () => {
    expect(heatResist("hardy_bottom_cut")).toBeGreaterThan(heatResist("slitting_narrow_deep"));
  });
});

describe("edgeLife", () => {
  it("hardy bottom cut longest edge life", () => {
    expect(edgeLife("hardy_bottom_cut")).toBeGreaterThan(edgeLife("slitting_narrow_deep"));
  });
});

describe("controlAngle", () => {
  it("slitting narrow deep best angle control", () => {
    expect(controlAngle("slitting_narrow_deep")).toBeGreaterThan(controlAngle("hardy_bottom_cut"));
  });
});

describe("chiselCost", () => {
  it("hot set wide flat more expensive", () => {
    expect(chiselCost("hot_set_wide_flat")).toBeGreaterThan(chiselCost("handled_top_cut"));
  });
});

describe("hardiHole", () => {
  it("hardy bottom cut fits hardy hole", () => {
    expect(hardiHole("hardy_bottom_cut")).toBe(true);
  });
  it("handled top cut no hardy hole", () => {
    expect(hardiHole("handled_top_cut")).toBe(false);
  });
});

describe("handled", () => {
  it("handled top cut is handled", () => {
    expect(handled("handled_top_cut")).toBe(true);
  });
  it("hardy bottom cut not handled", () => {
    expect(handled("hardy_bottom_cut")).toBe(false);
  });
});

describe("edgeShape", () => {
  it("slitting narrow deep uses narrow point blade", () => {
    expect(edgeShape("slitting_narrow_deep")).toBe("narrow_point_blade");
  });
});

describe("bestUse", () => {
  it("handled top cut best for general hot cut", () => {
    expect(bestUse("handled_top_cut")).toBe("general_hot_cut");
  });
});

describe("hotChisels", () => {
  it("returns 5 types", () => {
    expect(hotChisels()).toHaveLength(5);
  });
});
