import { describe, it, expect } from "vitest";
import {
  tubeLengthCmForC4, toneBrightness, warmth,
  breathResponse, durability, moistureSensitive,
  weightGrams, tuningStability, costEstimate, panFluteMaterials,
} from "../pan-flute-calc.js";

describe("tubeLengthCmForC4", () => {
  it("wood is longest", () => {
    expect(tubeLengthCmForC4("wood")).toBeGreaterThan(
      tubeLengthCmForC4("metal")
    );
  });
});

describe("toneBrightness", () => {
  it("glass is brightest", () => {
    expect(toneBrightness("glass")).toBeGreaterThan(
      toneBrightness("wood")
    );
  });
});

describe("warmth", () => {
  it("cane is warmest", () => {
    expect(warmth("cane")).toBeGreaterThan(warmth("glass"));
  });
});

describe("breathResponse", () => {
  it("metal responds best", () => {
    expect(breathResponse("metal")).toBeGreaterThan(
      breathResponse("wood")
    );
  });
});

describe("durability", () => {
  it("metal is most durable", () => {
    expect(durability("metal")).toBeGreaterThan(
      durability("glass")
    );
  });
});

describe("moistureSensitive", () => {
  it("bamboo is moisture sensitive", () => {
    expect(moistureSensitive("bamboo")).toBe(true);
  });
  it("glass is not", () => {
    expect(moistureSensitive("glass")).toBe(false);
  });
});

describe("weightGrams", () => {
  it("metal is heaviest", () => {
    expect(weightGrams("metal")).toBeGreaterThan(
      weightGrams("bamboo")
    );
  });
});

describe("tuningStability", () => {
  it("metal is most stable", () => {
    expect(tuningStability("metal")).toBeGreaterThan(
      tuningStability("cane")
    );
  });
});

describe("costEstimate", () => {
  it("glass is most expensive", () => {
    expect(costEstimate("glass")).toBeGreaterThan(
      costEstimate("bamboo")
    );
  });
});

describe("panFluteMaterials", () => {
  it("returns 5 materials", () => {
    expect(panFluteMaterials()).toHaveLength(5);
  });
});
