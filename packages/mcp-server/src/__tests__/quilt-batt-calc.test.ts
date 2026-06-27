import { describe, it, expect } from "vitest";
import {
  warmth, drape, loft, shrinkResist,
  battCost, natural, needlePunch, battFiber,
  bestUse, quiltBatts,
} from "../quilt-batt-calc.js";

describe("warmth", () => {
  it("wool warm breathe warmest", () => {
    expect(warmth("wool_warm_breathe")).toBeGreaterThan(warmth("silk_luxury_thin"));
  });
});

describe("drape", () => {
  it("bamboo blend drape best drape", () => {
    expect(drape("bamboo_blend_drape")).toBeGreaterThan(drape("polyester_puff_loft"));
  });
});

describe("loft", () => {
  it("polyester puff loft highest loft", () => {
    expect(loft("polyester_puff_loft")).toBeGreaterThan(loft("silk_luxury_thin"));
  });
});

describe("shrinkResist", () => {
  it("polyester puff loft best shrink resistance", () => {
    expect(shrinkResist("polyester_puff_loft")).toBeGreaterThan(shrinkResist("cotton_natural_flat"));
  });
});

describe("battCost", () => {
  it("silk luxury thin most expensive", () => {
    expect(battCost("silk_luxury_thin")).toBeGreaterThan(battCost("cotton_natural_flat"));
  });
});

describe("natural", () => {
  it("cotton natural flat is natural", () => {
    expect(natural("cotton_natural_flat")).toBe(true);
  });
  it("polyester puff loft is not natural", () => {
    expect(natural("polyester_puff_loft")).toBe(false);
  });
});

describe("needlePunch", () => {
  it("wool warm breathe is needle punch", () => {
    expect(needlePunch("wool_warm_breathe")).toBe(true);
  });
  it("bamboo blend drape is not needle punch", () => {
    expect(needlePunch("bamboo_blend_drape")).toBe(false);
  });
});

describe("battFiber", () => {
  it("silk luxury thin uses mulberry silk sheet", () => {
    expect(battFiber("silk_luxury_thin")).toBe("mulberry_silk_sheet");
  });
});

describe("bestUse", () => {
  it("polyester puff loft best for puffy comforter warm", () => {
    expect(bestUse("polyester_puff_loft")).toBe("puffy_comforter_warm");
  });
});

describe("quiltBatts", () => {
  it("returns 5 types", () => {
    expect(quiltBatts()).toHaveLength(5);
  });
});
