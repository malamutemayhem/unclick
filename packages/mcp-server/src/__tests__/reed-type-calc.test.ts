import { describe, it, expect } from "vitest";
import {
  responseSpeed, toneRichness, durabilityWeeks,
  consistencyRating, moistureSensitivity, handmade,
  weatherProof, bestInstrument, costPerReed, reedTypes,
} from "../reed-type-calc.js";

describe("responseSpeed", () => {
  it("metal free responds fastest", () => {
    expect(responseSpeed("metal_free")).toBeGreaterThan(
      responseSpeed("plastic_beginner")
    );
  });
});

describe("toneRichness", () => {
  it("double cane has richest tone", () => {
    expect(toneRichness("double_cane")).toBeGreaterThan(
      toneRichness("plastic_beginner")
    );
  });
});

describe("durabilityWeeks", () => {
  it("metal free lasts longest", () => {
    expect(durabilityWeeks("metal_free")).toBeGreaterThan(
      durabilityWeeks("double_cane")
    );
  });
});

describe("consistencyRating", () => {
  it("synthetic single is most consistent", () => {
    expect(consistencyRating("synthetic_single")).toBeGreaterThan(
      consistencyRating("double_cane")
    );
  });
});

describe("moistureSensitivity", () => {
  it("double cane is most moisture sensitive", () => {
    expect(moistureSensitivity("double_cane")).toBeGreaterThan(
      moistureSensitivity("synthetic_single")
    );
  });
});

describe("handmade", () => {
  it("double cane is handmade", () => {
    expect(handmade("double_cane")).toBe(true);
  });
  it("single cane is not", () => {
    expect(handmade("single_cane")).toBe(false);
  });
});

describe("weatherProof", () => {
  it("synthetic single is weatherproof", () => {
    expect(weatherProof("synthetic_single")).toBe(true);
  });
  it("single cane is not", () => {
    expect(weatherProof("single_cane")).toBe(false);
  });
});

describe("bestInstrument", () => {
  it("double cane best for oboe", () => {
    expect(bestInstrument("double_cane")).toBe("oboe");
  });
});

describe("costPerReed", () => {
  it("double cane costs most", () => {
    expect(costPerReed("double_cane")).toBeGreaterThan(
      costPerReed("plastic_beginner")
    );
  });
});

describe("reedTypes", () => {
  it("returns 5 types", () => {
    expect(reedTypes()).toHaveLength(5);
  });
});
