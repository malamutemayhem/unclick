import { describe, it, expect } from "vitest";
import {
  threadRange, detailFineness, easeOfUse, stitchSpeed,
  needleCost, forFine, flexible, needleMaterial,
  bestUse, tatNeedles,
} from "../tat-needle-calc.js";

describe("threadRange", () => {
  it("flexible soft bend widest thread range", () => {
    expect(threadRange("flexible_soft_bend")).toBeGreaterThan(threadRange("size_1_bulky"));
  });
});

describe("detailFineness", () => {
  it("size 7 fine most detail fineness", () => {
    expect(detailFineness("size_7_fine")).toBeGreaterThan(detailFineness("size_1_bulky"));
  });
});

describe("easeOfUse", () => {
  it("size 1 bulky easiest to use", () => {
    expect(easeOfUse("size_1_bulky")).toBeGreaterThan(easeOfUse("size_7_fine"));
  });
});

describe("stitchSpeed", () => {
  it("size 1 bulky fastest stitch speed", () => {
    expect(stitchSpeed("size_1_bulky")).toBeGreaterThan(stitchSpeed("size_7_fine"));
  });
});

describe("needleCost", () => {
  it("flexible soft bend most expensive", () => {
    expect(needleCost("flexible_soft_bend")).toBeGreaterThan(needleCost("size_5_standard"));
  });
});

describe("forFine", () => {
  it("size 7 fine is for fine work", () => {
    expect(forFine("size_7_fine")).toBe(true);
  });
  it("size 5 standard not for fine work", () => {
    expect(forFine("size_5_standard")).toBe(false);
  });
});

describe("flexible", () => {
  it("flexible soft bend is flexible", () => {
    expect(flexible("flexible_soft_bend")).toBe(true);
  });
  it("size 3 heavy not flexible", () => {
    expect(flexible("size_3_heavy")).toBe(false);
  });
});

describe("needleMaterial", () => {
  it("size 5 standard uses steel blunt tip", () => {
    expect(needleMaterial("size_5_standard")).toBe("steel_blunt_tip");
  });
});

describe("bestUse", () => {
  it("size 7 fine best for fine lace thread", () => {
    expect(bestUse("size_7_fine")).toBe("fine_lace_thread");
  });
});

describe("tatNeedles", () => {
  it("returns 5 types", () => {
    expect(tatNeedles()).toHaveLength(5);
  });
});
