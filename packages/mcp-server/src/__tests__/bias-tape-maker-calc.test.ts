import { describe, it, expect } from "vitest";
import {
  foldPrecision, speedOutput, sizeRange, easeOfUse,
  makerCost, doubleFold, needsIron, feedMechanism,
  bestProject, biasTapeMakers,
} from "../bias-tape-maker-calc.js";

describe("foldPrecision", () => {
  it("tape gun automatic most fold precision", () => {
    expect(foldPrecision("tape_gun_automatic")).toBeGreaterThan(foldPrecision("ruler_guide_manual"));
  });
});

describe("speedOutput", () => {
  it("tape gun automatic fastest speed", () => {
    expect(speedOutput("tape_gun_automatic")).toBeGreaterThan(speedOutput("ruler_guide_manual"));
  });
});

describe("sizeRange", () => {
  it("adjustable multi size widest size range", () => {
    expect(sizeRange("adjustable_multi_size")).toBeGreaterThan(sizeRange("single_fold_metal"));
  });
});

describe("easeOfUse", () => {
  it("tape gun automatic easiest to use", () => {
    expect(easeOfUse("tape_gun_automatic")).toBeGreaterThan(easeOfUse("ruler_guide_manual"));
  });
});

describe("makerCost", () => {
  it("tape gun automatic most expensive", () => {
    expect(makerCost("tape_gun_automatic")).toBeGreaterThan(makerCost("single_fold_metal"));
  });
});

describe("doubleFold", () => {
  it("double fold wide does double fold", () => {
    expect(doubleFold("double_fold_wide")).toBe(true);
  });
  it("single fold metal does not double fold", () => {
    expect(doubleFold("single_fold_metal")).toBe(false);
  });
});

describe("needsIron", () => {
  it("single fold metal needs iron", () => {
    expect(needsIron("single_fold_metal")).toBe(true);
  });
  it("tape gun automatic does not need iron", () => {
    expect(needsIron("tape_gun_automatic")).toBe(false);
  });
});

describe("feedMechanism", () => {
  it("tape gun automatic uses motor roller feed", () => {
    expect(feedMechanism("tape_gun_automatic")).toBe("motor_roller_feed");
  });
});

describe("bestProject", () => {
  it("double fold wide best for quilt binding edge", () => {
    expect(bestProject("double_fold_wide")).toBe("quilt_binding_edge");
  });
});

describe("biasTapeMakers", () => {
  it("returns 5 types", () => {
    expect(biasTapeMakers()).toHaveLength(5);
  });
});
