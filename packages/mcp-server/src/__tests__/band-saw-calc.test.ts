import { describe, it, expect } from "vitest";
import {
  cutDepth, throatCapacity, curveAbility, bladeSpeed,
  sawCost, resawCapable, foodGrade, bladeWidth,
  bestCut, bandSaws,
} from "../band-saw-calc.js";

describe("cutDepth", () => {
  it("resaw 17 inch deepest cut", () => {
    expect(cutDepth("resaw_17_inch")).toBeGreaterThan(cutDepth("benchtop_9_inch"));
  });
});

describe("throatCapacity", () => {
  it("resaw 17 inch largest throat", () => {
    expect(throatCapacity("resaw_17_inch")).toBeGreaterThan(throatCapacity("portable_metal"));
  });
});

describe("curveAbility", () => {
  it("benchtop 9 inch best curve ability", () => {
    expect(curveAbility("benchtop_9_inch")).toBeGreaterThan(curveAbility("meat_bone_food"));
  });
});

describe("bladeSpeed", () => {
  it("floor 14 inch fastest blade", () => {
    expect(bladeSpeed("floor_14_inch")).toBeGreaterThan(bladeSpeed("portable_metal"));
  });
});

describe("sawCost", () => {
  it("resaw 17 inch most expensive", () => {
    expect(sawCost("resaw_17_inch")).toBeGreaterThan(sawCost("benchtop_9_inch"));
  });
});

describe("resawCapable", () => {
  it("resaw 17 inch is resaw capable", () => {
    expect(resawCapable("resaw_17_inch")).toBe(true);
  });
  it("benchtop 9 inch is not", () => {
    expect(resawCapable("benchtop_9_inch")).toBe(false);
  });
});

describe("foodGrade", () => {
  it("meat bone food is food grade", () => {
    expect(foodGrade("meat_bone_food")).toBe(true);
  });
  it("floor 14 inch is not", () => {
    expect(foodGrade("floor_14_inch")).toBe(false);
  });
});

describe("bladeWidth", () => {
  it("resaw 17 inch uses one inch wide resaw", () => {
    expect(bladeWidth("resaw_17_inch")).toBe("one_inch_wide_resaw");
  });
});

describe("bestCut", () => {
  it("portable metal for pipe bar stock metal", () => {
    expect(bestCut("portable_metal")).toBe("pipe_bar_stock_metal");
  });
});

describe("bandSaws", () => {
  it("returns 5 types", () => {
    expect(bandSaws()).toHaveLength(5);
  });
});
