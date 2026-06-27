import { describe, it, expect } from "vitest";
import {
  burstDiameter, hangTime, brightnessLevel, colorVariety,
  spectacleRating, starTrail, usedAsFinale, shellConstruction,
  bestViewDistance, fireworkEffects,
} from "../firework-effect-calc.js";

describe("burstDiameter", () => {
  it("willow largest burst", () => {
    expect(burstDiameter("willow")).toBeGreaterThan(burstDiameter("comet"));
  });
});

describe("hangTime", () => {
  it("willow longest hang time", () => {
    expect(hangTime("willow")).toBeGreaterThan(hangTime("comet"));
  });
});

describe("brightnessLevel", () => {
  it("brocade brightest", () => {
    expect(brightnessLevel("brocade")).toBeGreaterThan(brightnessLevel("willow"));
  });
});

describe("colorVariety", () => {
  it("peony most color variety", () => {
    expect(colorVariety("peony")).toBeGreaterThan(colorVariety("willow"));
  });
});

describe("spectacleRating", () => {
  it("brocade most spectacular", () => {
    expect(spectacleRating("brocade")).toBeGreaterThan(spectacleRating("comet"));
  });
});

describe("starTrail", () => {
  it("chrysanthemum has star trail", () => {
    expect(starTrail("chrysanthemum")).toBe(true);
  });
  it("peony does not", () => {
    expect(starTrail("peony")).toBe(false);
  });
});

describe("usedAsFinale", () => {
  it("willow used as finale", () => {
    expect(usedAsFinale("willow")).toBe(true);
  });
  it("comet not used as finale", () => {
    expect(usedAsFinale("comet")).toBe(false);
  });
});

describe("shellConstruction", () => {
  it("comet is single large star", () => {
    expect(shellConstruction("comet")).toBe("single_large_star");
  });
});

describe("bestViewDistance", () => {
  it("willow best from long range", () => {
    expect(bestViewDistance("willow")).toBe("long_range");
  });
});

describe("fireworkEffects", () => {
  it("returns 5 effects", () => {
    expect(fireworkEffects()).toHaveLength(5);
  });
});
