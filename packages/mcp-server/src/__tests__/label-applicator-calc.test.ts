import { describe, it, expect } from "vitest";
import {
  speed, accuracy, versatility, labelCost,
  laCost, fullWrap, forContour, adhesion,
  bestUse, labelApplicatorTypes,
} from "../label-applicator-calc.js";

describe("speed", () => {
  it("hot melt rotary fastest", () => {
    expect(speed("hot_melt_rotary")).toBeGreaterThan(speed("print_and_apply_thermal"));
  });
});

describe("accuracy", () => {
  it("print and apply most accurate", () => {
    expect(accuracy("print_and_apply_thermal")).toBeGreaterThan(accuracy("glue_applied_cold"));
  });
});

describe("versatility", () => {
  it("print and apply most versatile", () => {
    expect(versatility("print_and_apply_thermal")).toBeGreaterThan(versatility("glue_applied_cold"));
  });
});

describe("labelCost", () => {
  it("cold glue cheapest label", () => {
    expect(labelCost("print_and_apply_thermal")).toBeGreaterThan(labelCost("glue_applied_cold"));
  });
});

describe("laCost", () => {
  it("print and apply most expensive machine", () => {
    expect(laCost("print_and_apply_thermal")).toBeGreaterThan(laCost("glue_applied_cold"));
  });
});

describe("fullWrap", () => {
  it("shrink sleeve is full wrap", () => {
    expect(fullWrap("shrink_sleeve_steam")).toBe(true);
  });
  it("pressure sensitive not full wrap", () => {
    expect(fullWrap("pressure_sensitive_wipe")).toBe(false);
  });
});

describe("forContour", () => {
  it("shrink sleeve for contour", () => {
    expect(forContour("shrink_sleeve_steam")).toBe(true);
  });
  it("glue applied not for contour", () => {
    expect(forContour("glue_applied_cold")).toBe(false);
  });
});

describe("adhesion", () => {
  it("hot melt uses opp film wrap", () => {
    expect(adhesion("hot_melt_rotary")).toBe("hot_melt_opp_film_wrap");
  });
});

describe("bestUse", () => {
  it("cold glue for beer wine bottle", () => {
    expect(bestUse("glue_applied_cold")).toBe("beer_wine_glass_bottle_paper");
  });
});

describe("labelApplicatorTypes", () => {
  it("returns 5 types", () => {
    expect(labelApplicatorTypes()).toHaveLength(5);
  });
});
