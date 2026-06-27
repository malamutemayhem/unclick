import { describe, it, expect } from "vitest";
import {
  cookSpeed, capacity, easeOfUse, safetyFeatures,
  cookerCost, needsStove, multiFunction, sealType,
  bestMeal, pressureCookers,
} from "../pressure-cooker-calc.js";

describe("cookSpeed", () => {
  it("stovetop stainless classic fastest", () => {
    expect(cookSpeed("stovetop_stainless_classic")).toBeGreaterThan(cookSpeed("micro_rice_pressure"));
  });
});

describe("capacity", () => {
  it("canning large gauge biggest capacity", () => {
    expect(capacity("canning_large_gauge")).toBeGreaterThan(capacity("micro_rice_pressure"));
  });
});

describe("easeOfUse", () => {
  it("electric digital multi easiest to use", () => {
    expect(easeOfUse("electric_digital_multi")).toBeGreaterThan(easeOfUse("stovetop_stainless_classic"));
  });
});

describe("safetyFeatures", () => {
  it("electric digital multi safest", () => {
    expect(safetyFeatures("electric_digital_multi")).toBeGreaterThan(safetyFeatures("stovetop_stainless_classic"));
  });
});

describe("cookerCost", () => {
  it("commercial tilting kettle most expensive", () => {
    expect(cookerCost("commercial_tilting_kettle")).toBeGreaterThan(cookerCost("micro_rice_pressure"));
  });
});

describe("needsStove", () => {
  it("stovetop stainless classic needs stove", () => {
    expect(needsStove("stovetop_stainless_classic")).toBe(true);
  });
  it("electric digital multi does not", () => {
    expect(needsStove("electric_digital_multi")).toBe(false);
  });
});

describe("multiFunction", () => {
  it("electric digital multi is multi function", () => {
    expect(multiFunction("electric_digital_multi")).toBe(true);
  });
  it("stovetop stainless classic is not", () => {
    expect(multiFunction("stovetop_stainless_classic")).toBe(false);
  });
});

describe("sealType", () => {
  it("canning large gauge uses weighted gauge jiggler", () => {
    expect(sealType("canning_large_gauge")).toBe("weighted_gauge_jiggler");
  });
});

describe("bestMeal", () => {
  it("electric digital multi best for weeknight set and forget", () => {
    expect(bestMeal("electric_digital_multi")).toBe("weeknight_set_and_forget");
  });
});

describe("pressureCookers", () => {
  it("returns 5 types", () => {
    expect(pressureCookers()).toHaveLength(5);
  });
});
