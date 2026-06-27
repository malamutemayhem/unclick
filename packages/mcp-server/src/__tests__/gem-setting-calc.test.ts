import { describe, it, expect } from "vitest";
import {
  stoneSecurityRating, lightExposure, difficultyLevel,
  metalUsageGrams, resizeability, activeLifestyleSafe,
  bestGemShape, repairEase, laborCost, gemSettings,
} from "../gem-setting-calc.js";

describe("stoneSecurityRating", () => {
  it("bezel is most secure", () => {
    expect(stoneSecurityRating("bezel")).toBeGreaterThan(
      stoneSecurityRating("tension")
    );
  });
});

describe("lightExposure", () => {
  it("prong exposes most light", () => {
    expect(lightExposure("prong")).toBeGreaterThan(
      lightExposure("bezel")
    );
  });
});

describe("difficultyLevel", () => {
  it("tension is most difficult", () => {
    expect(difficultyLevel("tension")).toBeGreaterThan(
      difficultyLevel("prong")
    );
  });
});

describe("metalUsageGrams", () => {
  it("tension uses most metal", () => {
    expect(metalUsageGrams("tension")).toBeGreaterThan(
      metalUsageGrams("prong")
    );
  });
});

describe("resizeability", () => {
  it("prong is most resizeable", () => {
    expect(resizeability("prong")).toBeGreaterThan(
      resizeability("tension")
    );
  });
});

describe("activeLifestyleSafe", () => {
  it("bezel is active lifestyle safe", () => {
    expect(activeLifestyleSafe("bezel")).toBe(true);
  });
  it("prong is not", () => {
    expect(activeLifestyleSafe("prong")).toBe(false);
  });
});

describe("bestGemShape", () => {
  it("channel best for baguette", () => {
    expect(bestGemShape("channel")).toBe("baguette");
  });
});

describe("repairEase", () => {
  it("prong is easiest to repair", () => {
    expect(repairEase("prong")).toBeGreaterThan(
      repairEase("tension")
    );
  });
});

describe("laborCost", () => {
  it("tension costs most labor", () => {
    expect(laborCost("tension")).toBeGreaterThan(
      laborCost("prong")
    );
  });
});

describe("gemSettings", () => {
  it("returns 5 settings", () => {
    expect(gemSettings()).toHaveLength(5);
  });
});
