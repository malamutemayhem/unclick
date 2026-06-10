import { describe, it, expect } from "vitest";
import {
  plasticityRating, firingTempCelsius, shrinkagePercent,
  strengthFired, colorFired, translucent,
  waterproof, bestTechnique, costPerKg, throwingClays,
} from "../throwing-clay-calc.js";

describe("plasticityRating", () => {
  it("stoneware is most plastic", () => {
    expect(plasticityRating("stoneware")).toBeGreaterThan(
      plasticityRating("porcelain")
    );
  });
});

describe("firingTempCelsius", () => {
  it("porcelain fires highest", () => {
    expect(firingTempCelsius("porcelain")).toBeGreaterThan(
      firingTempCelsius("terracotta")
    );
  });
});

describe("shrinkagePercent", () => {
  it("porcelain shrinks most", () => {
    expect(shrinkagePercent("porcelain")).toBeGreaterThan(
      shrinkagePercent("terracotta")
    );
  });
});

describe("strengthFired", () => {
  it("porcelain is strongest fired", () => {
    expect(strengthFired("porcelain")).toBeGreaterThan(
      strengthFired("terracotta")
    );
  });
});

describe("colorFired", () => {
  it("porcelain fires white", () => {
    expect(colorFired("porcelain")).toBe("white");
  });
});

describe("translucent", () => {
  it("porcelain is translucent", () => {
    expect(translucent("porcelain")).toBe(true);
  });
  it("stoneware is not", () => {
    expect(translucent("stoneware")).toBe(false);
  });
});

describe("waterproof", () => {
  it("stoneware is waterproof", () => {
    expect(waterproof("stoneware")).toBe(true);
  });
  it("earthenware is not", () => {
    expect(waterproof("earthenware")).toBe(false);
  });
});

describe("bestTechnique", () => {
  it("stoneware best for wheel throwing", () => {
    expect(bestTechnique("stoneware")).toBe("wheel_throwing");
  });
});

describe("costPerKg", () => {
  it("porcelain costs most", () => {
    expect(costPerKg("porcelain")).toBeGreaterThan(
      costPerKg("terracotta")
    );
  });
});

describe("throwingClays", () => {
  it("returns 5 clays", () => {
    expect(throwingClays()).toHaveLength(5);
  });
});
