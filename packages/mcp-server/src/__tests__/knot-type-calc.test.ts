import { describe, it, expect } from "vitest";
import {
  strengthPercent, tyingSpeed, untieEase,
  slipResistance, mechanicalAdvantage, joinsTwoRopes,
  bestUse, learningDifficulty, historicalAge, knotTypes,
} from "../knot-type-calc.js";

describe("strengthPercent", () => {
  it("figure eight is strongest", () => {
    expect(strengthPercent("figure_eight")).toBeGreaterThan(
      strengthPercent("sheet_bend")
    );
  });
});

describe("tyingSpeed", () => {
  it("clove hitch is fastest to tie", () => {
    expect(tyingSpeed("clove_hitch")).toBeGreaterThan(
      tyingSpeed("trucker_hitch")
    );
  });
});

describe("untieEase", () => {
  it("bowline is easiest to untie", () => {
    expect(untieEase("bowline")).toBeGreaterThan(
      untieEase("trucker_hitch")
    );
  });
});

describe("slipResistance", () => {
  it("figure eight resists slipping best", () => {
    expect(slipResistance("figure_eight")).toBeGreaterThan(
      slipResistance("clove_hitch")
    );
  });
});

describe("mechanicalAdvantage", () => {
  it("trucker hitch has mechanical advantage", () => {
    expect(mechanicalAdvantage("trucker_hitch")).toBe(true);
  });
  it("bowline does not", () => {
    expect(mechanicalAdvantage("bowline")).toBe(false);
  });
});

describe("joinsTwoRopes", () => {
  it("sheet bend joins two ropes", () => {
    expect(joinsTwoRopes("sheet_bend")).toBe(true);
  });
  it("bowline does not", () => {
    expect(joinsTwoRopes("bowline")).toBe(false);
  });
});

describe("bestUse", () => {
  it("figure eight best for climbing", () => {
    expect(bestUse("figure_eight")).toBe("climbing");
  });
});

describe("learningDifficulty", () => {
  it("trucker hitch is hardest to learn", () => {
    expect(learningDifficulty("trucker_hitch")).toBeGreaterThan(
      learningDifficulty("clove_hitch")
    );
  });
});

describe("historicalAge", () => {
  it("figure eight is among oldest", () => {
    expect(historicalAge("figure_eight")).toBeGreaterThan(
      historicalAge("trucker_hitch")
    );
  });
});

describe("knotTypes", () => {
  it("returns 5 types", () => {
    expect(knotTypes()).toHaveLength(5);
  });
});
