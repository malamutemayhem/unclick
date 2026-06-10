import { describe, it, expect } from "vitest";
import {
  visibilityRange, productionDifficulty, chemicalStability,
  intensityRating, costFactor, environmentallySafe, traditionalUse,
  metalSalt, culturalMeaning, fireworkColors,
} from "../firework-color-calc.js";

describe("visibilityRange", () => {
  it("white most visible", () => {
    expect(visibilityRange("white")).toBeGreaterThan(visibilityRange("blue"));
  });
});

describe("productionDifficulty", () => {
  it("blue hardest to produce", () => {
    expect(productionDifficulty("blue")).toBeGreaterThan(productionDifficulty("red"));
  });
});

describe("chemicalStability", () => {
  it("white most stable", () => {
    expect(chemicalStability("white")).toBeGreaterThan(chemicalStability("blue"));
  });
});

describe("intensityRating", () => {
  it("white most intense", () => {
    expect(intensityRating("white")).toBeGreaterThan(intensityRating("blue"));
  });
});

describe("costFactor", () => {
  it("blue most expensive", () => {
    expect(costFactor("blue")).toBeGreaterThan(costFactor("white"));
  });
});

describe("environmentallySafe", () => {
  it("red is environmentally safe", () => {
    expect(environmentallySafe("red")).toBe(true);
  });
  it("green is not", () => {
    expect(environmentallySafe("green")).toBe(false);
  });
});

describe("traditionalUse", () => {
  it("all colors are traditional", () => {
    for (const c of fireworkColors()) {
      expect(traditionalUse(c)).toBe(true);
    }
  });
});

describe("metalSalt", () => {
  it("blue uses copper chloride", () => {
    expect(metalSalt("blue")).toBe("copper_chloride");
  });
});

describe("culturalMeaning", () => {
  it("gold means wealth prosperity", () => {
    expect(culturalMeaning("gold")).toBe("wealth_prosperity");
  });
});

describe("fireworkColors", () => {
  it("returns 5 colors", () => {
    expect(fireworkColors()).toHaveLength(5);
  });
});
