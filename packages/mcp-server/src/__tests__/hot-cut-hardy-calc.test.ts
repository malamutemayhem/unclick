import { describe, it, expect } from "vitest";
import {
  cutClean, edgeLife, speedCut, thicknessRange,
  cutCost, hardyFit, springAction, edgeProfile,
  bestUse, hotCutHardys,
} from "../hot-cut-hardy-calc.js";

describe("cutClean", () => {
  it("guillotine hot set cleanest cut", () => {
    expect(cutClean("guillotine_hot_set")).toBeGreaterThan(cutClean("slitting_chisel_narrow"));
  });
});

describe("edgeLife", () => {
  it("guillotine hot set longest edge life", () => {
    expect(edgeLife("guillotine_hot_set")).toBeGreaterThan(edgeLife("standard_hot_cut"));
  });
});

describe("speedCut", () => {
  it("spring hot cut fastest cut", () => {
    expect(speedCut("spring_hot_cut")).toBeGreaterThan(speedCut("handled_hot_chisel"));
  });
});

describe("thicknessRange", () => {
  it("handled hot chisel best thickness range", () => {
    expect(thicknessRange("handled_hot_chisel")).toBeGreaterThan(thicknessRange("slitting_chisel_narrow"));
  });
});

describe("cutCost", () => {
  it("guillotine hot set most expensive", () => {
    expect(cutCost("guillotine_hot_set")).toBeGreaterThan(cutCost("standard_hot_cut"));
  });
});

describe("hardyFit", () => {
  it("standard hot cut fits hardy hole", () => {
    expect(hardyFit("standard_hot_cut")).toBe(true);
  });
  it("spring hot cut does not fit hardy", () => {
    expect(hardyFit("spring_hot_cut")).toBe(false);
  });
});

describe("springAction", () => {
  it("spring hot cut has spring action", () => {
    expect(springAction("spring_hot_cut")).toBe(true);
  });
  it("standard hot cut no spring action", () => {
    expect(springAction("standard_hot_cut")).toBe(false);
  });
});

describe("edgeProfile", () => {
  it("guillotine hot set uses guided shear edge", () => {
    expect(edgeProfile("guillotine_hot_set")).toBe("guided_shear_edge");
  });
});

describe("bestUse", () => {
  it("guillotine hot set best for production clean cut", () => {
    expect(bestUse("guillotine_hot_set")).toBe("production_clean_cut");
  });
});

describe("hotCutHardys", () => {
  it("returns 5 types", () => {
    expect(hotCutHardys()).toHaveLength(5);
  });
});
