import { describe, it, expect } from "vitest";
import {
  calciumPpm, sulfatePpm, chloridePpm,
  bicarbonatePpm, magnesiumPpm, hardnessRating,
  hopAccentuation, bestBeerStyle, treatmentDifficulty, waterProfiles,
} from "../water-chemistry-calc.js";

describe("calciumPpm", () => {
  it("burton has most calcium", () => {
    expect(calciumPpm("burton")).toBeGreaterThan(
      calciumPpm("pilsen")
    );
  });
});

describe("sulfatePpm", () => {
  it("burton has most sulfate", () => {
    expect(sulfatePpm("burton")).toBeGreaterThan(
      sulfatePpm("munich")
    );
  });
});

describe("chloridePpm", () => {
  it("burton has most chloride", () => {
    expect(chloridePpm("burton")).toBeGreaterThan(
      chloridePpm("munich")
    );
  });
});

describe("bicarbonatePpm", () => {
  it("dublin has most bicarbonate", () => {
    expect(bicarbonatePpm("dublin")).toBeGreaterThan(
      bicarbonatePpm("pilsen")
    );
  });
});

describe("magnesiumPpm", () => {
  it("vienna has most magnesium", () => {
    expect(magnesiumPpm("vienna")).toBeGreaterThan(
      magnesiumPpm("pilsen")
    );
  });
});

describe("hardnessRating", () => {
  it("burton is hardest water", () => {
    expect(hardnessRating("burton")).toBeGreaterThan(
      hardnessRating("pilsen")
    );
  });
});

describe("hopAccentuation", () => {
  it("burton accentuates hops most", () => {
    expect(hopAccentuation("burton")).toBeGreaterThan(
      hopAccentuation("pilsen")
    );
  });
});

describe("bestBeerStyle", () => {
  it("dublin is best for stout", () => {
    expect(bestBeerStyle("dublin")).toBe("stout");
  });
});

describe("treatmentDifficulty", () => {
  it("burton is hardest to treat", () => {
    expect(treatmentDifficulty("burton")).toBeGreaterThan(
      treatmentDifficulty("pilsen")
    );
  });
});

describe("waterProfiles", () => {
  it("returns 5 profiles", () => {
    expect(waterProfiles()).toHaveLength(5);
  });
});
