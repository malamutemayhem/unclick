import { describe, it, expect } from "vitest";
import {
  growthBoostPercent, pestReduction, spacingCm,
  nitrogenFixing, pollinatorAttraction, soilImprovement,
  traditionalOrigin, seasonOverlap, difficultyRating, companionPairs,
} from "../companion-plant-calc.js";

describe("growthBoostPercent", () => {
  it("corn beans has highest growth boost", () => {
    expect(growthBoostPercent("corn_beans")).toBeGreaterThan(
      growthBoostPercent("rose_garlic")
    );
  });
});

describe("pestReduction", () => {
  it("squash nasturtium reduces pests most", () => {
    expect(pestReduction("squash_nasturtium")).toBeGreaterThan(
      pestReduction("corn_beans")
    );
  });
});

describe("spacingCm", () => {
  it("squash nasturtium needs most spacing", () => {
    expect(spacingCm("squash_nasturtium")).toBeGreaterThan(
      spacingCm("carrot_onion")
    );
  });
});

describe("nitrogenFixing", () => {
  it("corn beans fixes nitrogen", () => {
    expect(nitrogenFixing("corn_beans")).toBe(true);
  });
  it("tomato basil does not", () => {
    expect(nitrogenFixing("tomato_basil")).toBe(false);
  });
});

describe("pollinatorAttraction", () => {
  it("squash nasturtium attracts most pollinators", () => {
    expect(pollinatorAttraction("squash_nasturtium")).toBeGreaterThan(
      pollinatorAttraction("corn_beans")
    );
  });
});

describe("soilImprovement", () => {
  it("corn beans improves soil most", () => {
    expect(soilImprovement("corn_beans")).toBeGreaterThan(
      soilImprovement("rose_garlic")
    );
  });
});

describe("traditionalOrigin", () => {
  it("corn beans is mesoamerican", () => {
    expect(traditionalOrigin("corn_beans")).toBe("mesoamerican");
  });
});

describe("seasonOverlap", () => {
  it("rose garlic has best overlap", () => {
    expect(seasonOverlap("rose_garlic")).toBeGreaterThan(
      seasonOverlap("carrot_onion")
    );
  });
});

describe("difficultyRating", () => {
  it("corn beans is hardest", () => {
    expect(difficultyRating("corn_beans")).toBeGreaterThan(
      difficultyRating("squash_nasturtium")
    );
  });
});

describe("companionPairs", () => {
  it("returns 5 pairs", () => {
    expect(companionPairs()).toHaveLength(5);
  });
});
