import { describe, it, expect } from "vitest";
import {
  solubility, solutionAmount, growthDays, seedCrystalSize,
  temperatureDrop, supersaturation, containerVolume, dyeAmount,
  safetyLevel, preserveMethod, expectedYield, crystalTypes,
} from "../crystal-grow.js";

describe("solubility", () => {
  it("sugar most soluble", () => {
    expect(solubility("sugar", 20)).toBeGreaterThan(solubility("salt", 20));
  });
  it("higher temp = more soluble", () => {
    expect(solubility("salt", 80)).toBeGreaterThan(solubility("salt", 20));
  });
});

describe("solutionAmount", () => {
  it("positive grams", () => {
    expect(solutionAmount(500, 36)).toBeGreaterThan(0);
  });
});

describe("growthDays", () => {
  it("cooling fastest", () => {
    expect(growthDays("salt", "cooling")).toBeLessThan(growthDays("salt", "gel"));
  });
});

describe("seedCrystalSize", () => {
  it("10% of target", () => {
    expect(seedCrystalSize(5)).toBe(0.5);
  });
});

describe("temperatureDrop", () => {
  it("positive degrees per hour", () => {
    expect(temperatureDrop(80, 20, 10)).toBeGreaterThan(0);
  });
  it("zero hours returns 0", () => {
    expect(temperatureDrop(80, 20, 0)).toBe(0);
  });
});

describe("supersaturation", () => {
  it("positive when dissolved > solubility", () => {
    expect(supersaturation(50, 36)).toBeGreaterThan(0);
  });
  it("zero solubility returns 0", () => {
    expect(supersaturation(50, 0)).toBe(0);
  });
});

describe("containerVolume", () => {
  it("positive ml", () => {
    expect(containerVolume(3)).toBeGreaterThan(0);
  });
});

describe("dyeAmount", () => {
  it("positive ml", () => {
    expect(dyeAmount(500)).toBeGreaterThan(0);
  });
});

describe("safetyLevel", () => {
  it("copper sulfate is toxic", () => {
    expect(safetyLevel("copper_sulfate")).toContain("toxic");
  });
  it("sugar is food safe", () => {
    expect(safetyLevel("sugar")).toBe("food safe");
  });
});

describe("preserveMethod", () => {
  it("returns method string", () => {
    expect(typeof preserveMethod("alum")).toBe("string");
  });
});

describe("expectedYield", () => {
  it("positive grams", () => {
    expect(expectedYield(500, 10)).toBeGreaterThan(0);
  });
});

describe("crystalTypes", () => {
  it("returns 6 types", () => {
    expect(crystalTypes()).toHaveLength(6);
  });
});
