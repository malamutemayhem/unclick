import { describe, it, expect } from "vitest";
import {
  squareAccuracy, markingEase, versatility, durability,
  squareCost, hasRule, multiFunction, stockMaterial,
  bestUse, trySquares,
} from "../try-square-calc.js";

describe("squareAccuracy", () => {
  it("all steel machinist most accurate", () => {
    expect(squareAccuracy("all_steel_machinist")).toBeGreaterThan(squareAccuracy("saddle_square_wide"));
  });
});

describe("markingEase", () => {
  it("saddle square wide easiest marking", () => {
    expect(markingEase("saddle_square_wide")).toBeGreaterThan(markingEase("double_square_small"));
  });
});

describe("versatility", () => {
  it("combination multi use most versatile", () => {
    expect(versatility("combination_multi_use")).toBeGreaterThan(versatility("saddle_square_wide"));
  });
});

describe("durability", () => {
  it("all steel machinist most durable", () => {
    expect(durability("all_steel_machinist")).toBeGreaterThan(durability("saddle_square_wide"));
  });
});

describe("squareCost", () => {
  it("all steel machinist more expensive", () => {
    expect(squareCost("all_steel_machinist")).toBeGreaterThan(squareCost("steel_blade_wood"));
  });
});

describe("hasRule", () => {
  it("steel blade wood has rule", () => {
    expect(hasRule("steel_blade_wood")).toBe(true);
  });
  it("saddle square wide no rule", () => {
    expect(hasRule("saddle_square_wide")).toBe(false);
  });
});

describe("multiFunction", () => {
  it("combination multi use is multi function", () => {
    expect(multiFunction("combination_multi_use")).toBe(true);
  });
  it("steel blade wood not multi function", () => {
    expect(multiFunction("steel_blade_wood")).toBe(false);
  });
});

describe("stockMaterial", () => {
  it("steel blade wood uses rosewood brass face", () => {
    expect(stockMaterial("steel_blade_wood")).toBe("rosewood_brass_face");
  });
});

describe("bestUse", () => {
  it("all steel machinist best for machine shop check", () => {
    expect(bestUse("all_steel_machinist")).toBe("machine_shop_check");
  });
});

describe("trySquares", () => {
  it("returns 5 types", () => {
    expect(trySquares()).toHaveLength(5);
  });
});
