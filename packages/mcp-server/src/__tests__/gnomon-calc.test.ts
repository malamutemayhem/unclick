import { describe, it, expect } from "vitest";
import {
  shadowLengthRatio, gnomonHeightCm, hourLineAngle, accuracyMinutes,
  seasonalCorrection, equationOfTimeMinutes, materialRecommendation,
  portability, costEstimate, gnomonStyles,
} from "../gnomon-calc.js";

describe("shadowLengthRatio", () => {
  it("lower altitude gives longer shadow", () => {
    expect(shadowLengthRatio(30)).toBeGreaterThan(shadowLengthRatio(60));
  });
});

describe("gnomonHeightCm", () => {
  it("vertical is tallest", () => {
    expect(gnomonHeightCm("vertical")).toBeGreaterThan(
      gnomonHeightCm("equatorial")
    );
  });
});

describe("hourLineAngle", () => {
  it("noon returns 0", () => {
    expect(hourLineAngle(0, 45)).toBe(0);
  });
});

describe("accuracyMinutes", () => {
  it("polar is most accurate", () => {
    expect(accuracyMinutes("polar")).toBeLessThan(
      accuracyMinutes("analemmatic")
    );
  });
});

describe("seasonalCorrection", () => {
  it("returns true", () => {
    expect(seasonalCorrection()).toBe(true);
  });
});

describe("equationOfTimeMinutes", () => {
  it("varies through year", () => {
    expect(equationOfTimeMinutes(1)).not.toBe(equationOfTimeMinutes(180));
  });
});

describe("materialRecommendation", () => {
  it("vertical uses stone", () => {
    expect(materialRecommendation("vertical")).toBe("stone");
  });
});

describe("portability", () => {
  it("equatorial is portable", () => {
    expect(portability("equatorial")).toBe(true);
  });
  it("vertical is not portable", () => {
    expect(portability("vertical")).toBe(false);
  });
});

describe("costEstimate", () => {
  it("analemmatic is most expensive", () => {
    expect(costEstimate("analemmatic")).toBeGreaterThan(
      costEstimate("horizontal")
    );
  });
});

describe("gnomonStyles", () => {
  it("returns 5 styles", () => {
    expect(gnomonStyles()).toHaveLength(5);
  });
});
