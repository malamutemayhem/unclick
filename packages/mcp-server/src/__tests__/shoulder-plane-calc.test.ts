import { describe, it, expect } from "vitest";
import {
  shoulderFit, tightAccess, materialRemoval, crossGrainCut,
  planeCost, hasNicker, fullWidthBlade, bodyMaterial,
  bestJoint, shoulderPlanes,
} from "../shoulder-plane-calc.js";

describe("shoulderFit", () => {
  it("skew angle clean best shoulder fit", () => {
    expect(shoulderFit("skew_angle_clean")).toBeGreaterThan(shoulderFit("wide_rebate_large"));
  });
});

describe("tightAccess", () => {
  it("narrow bullnose tight best tight access", () => {
    expect(tightAccess("narrow_bullnose_tight")).toBeGreaterThan(tightAccess("wide_rebate_large"));
  });
});

describe("materialRemoval", () => {
  it("wide rebate large most material removal", () => {
    expect(materialRemoval("wide_rebate_large")).toBeGreaterThan(materialRemoval("narrow_bullnose_tight"));
  });
});

describe("crossGrainCut", () => {
  it("skew angle clean best cross grain cut", () => {
    expect(crossGrainCut("skew_angle_clean")).toBeGreaterThan(crossGrainCut("medium_width_general"));
  });
});

describe("planeCost", () => {
  it("skew angle clean most expensive", () => {
    expect(planeCost("skew_angle_clean")).toBeGreaterThan(planeCost("medium_width_general"));
  });
});

describe("hasNicker", () => {
  it("adjustable nicker cross has nicker", () => {
    expect(hasNicker("adjustable_nicker_cross")).toBe(true);
  });
  it("medium width general has no nicker", () => {
    expect(hasNicker("medium_width_general")).toBe(false);
  });
});

describe("fullWidthBlade", () => {
  it("medium width general has full width blade", () => {
    expect(fullWidthBlade("medium_width_general")).toBe(true);
  });
});

describe("bodyMaterial", () => {
  it("narrow bullnose tight uses bronze precision cast", () => {
    expect(bodyMaterial("narrow_bullnose_tight")).toBe("bronze_precision_cast");
  });
});

describe("bestJoint", () => {
  it("skew angle clean best for cross grain rabbet", () => {
    expect(bestJoint("skew_angle_clean")).toBe("cross_grain_rabbet");
  });
});

describe("shoulderPlanes", () => {
  it("returns 5 types", () => {
    expect(shoulderPlanes()).toHaveLength(5);
  });
});
