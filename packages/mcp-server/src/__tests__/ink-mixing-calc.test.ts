import { describe, it, expect } from "vitest";
import {
  viscosityPoise, dryingTimeMinutes, tackRating, colorDensity,
  fadeResistance, foodSafe, vocLevel, cleanupSolvent,
  costPerKg, inkBases,
} from "../ink-mixing-calc.js";

describe("viscosityPoise", () => {
  it("uv cure is most viscous", () => {
    expect(viscosityPoise("uv_cure")).toBeGreaterThan(
      viscosityPoise("water")
    );
  });
});

describe("dryingTimeMinutes", () => {
  it("uv cure dries fastest", () => {
    expect(dryingTimeMinutes("uv_cure")).toBeLessThan(
      dryingTimeMinutes("oil")
    );
  });
});

describe("tackRating", () => {
  it("uv cure is tackiest", () => {
    expect(tackRating("uv_cure")).toBeGreaterThan(tackRating("water"));
  });
});

describe("colorDensity", () => {
  it("uv cure has highest density", () => {
    expect(colorDensity("uv_cure")).toBeGreaterThan(colorDensity("water"));
  });
});

describe("fadeResistance", () => {
  it("uv cure resists fading best", () => {
    expect(fadeResistance("uv_cure")).toBeGreaterThan(
      fadeResistance("water")
    );
  });
});

describe("foodSafe", () => {
  it("soy is food safe", () => {
    expect(foodSafe("soy")).toBe(true);
  });
  it("oil is not food safe", () => {
    expect(foodSafe("oil")).toBe(false);
  });
});

describe("vocLevel", () => {
  it("water has lowest voc", () => {
    expect(vocLevel("water")).toBeLessThan(vocLevel("oil"));
  });
});

describe("cleanupSolvent", () => {
  it("water ink cleans with water", () => {
    expect(cleanupSolvent("water")).toBe("water");
  });
});

describe("costPerKg", () => {
  it("uv cure is most expensive", () => {
    expect(costPerKg("uv_cure")).toBeGreaterThan(costPerKg("water"));
  });
});

describe("inkBases", () => {
  it("returns 5 bases", () => {
    expect(inkBases()).toHaveLength(5);
  });
});
