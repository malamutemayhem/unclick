import { describe, it, expect } from "vitest";
import {
  colorIntense, detailFine, coverageEven, blendSmooth,
  glazeCost, forDetail, sprayable, applyMethod,
  bestUse, underglazes,
} from "../underglaze-calc.js";

describe("colorIntense", () => {
  it("liquid brush standard most intense color", () => {
    expect(colorIntense("liquid_brush_standard")).toBeGreaterThan(colorIntense("chalk_pastel_blend"));
  });
});

describe("detailFine", () => {
  it("pencil crayon detail finest detail", () => {
    expect(detailFine("pencil_crayon_detail")).toBeGreaterThan(detailFine("spray_airbrush_even"));
  });
});

describe("coverageEven", () => {
  it("spray airbrush even most even coverage", () => {
    expect(coverageEven("spray_airbrush_even")).toBeGreaterThan(coverageEven("pencil_crayon_detail"));
  });
});

describe("blendSmooth", () => {
  it("chalk pastel blend smoothest blend", () => {
    expect(blendSmooth("chalk_pastel_blend")).toBeGreaterThan(blendSmooth("transfer_decal_print"));
  });
});

describe("glazeCost", () => {
  it("transfer decal print most expensive", () => {
    expect(glazeCost("transfer_decal_print")).toBeGreaterThan(glazeCost("pencil_crayon_detail"));
  });
});

describe("forDetail", () => {
  it("pencil crayon detail is for detail", () => {
    expect(forDetail("pencil_crayon_detail")).toBe(true);
  });
  it("liquid brush standard not for detail", () => {
    expect(forDetail("liquid_brush_standard")).toBe(false);
  });
});

describe("sprayable", () => {
  it("spray airbrush even is sprayable", () => {
    expect(sprayable("spray_airbrush_even")).toBe(true);
  });
  it("liquid brush standard not sprayable", () => {
    expect(sprayable("liquid_brush_standard")).toBe(false);
  });
});

describe("applyMethod", () => {
  it("chalk pastel blend uses dry chalk rub", () => {
    expect(applyMethod("chalk_pastel_blend")).toBe("dry_chalk_rub");
  });
});

describe("bestUse", () => {
  it("liquid brush standard best for general underglaze coat", () => {
    expect(bestUse("liquid_brush_standard")).toBe("general_underglaze_coat");
  });
});

describe("underglazes", () => {
  it("returns 5 types", () => {
    expect(underglazes()).toHaveLength(5);
  });
});
