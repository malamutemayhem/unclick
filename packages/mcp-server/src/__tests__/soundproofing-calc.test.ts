import { describe, it, expect } from "vitest";
import {
  noiseReduction, lowFrequencyEffectiveness, installDifficulty,
  costPerSqFt, spaceRequired, fireRated, diyFriendly,
  application, stcRating, soundproofingMethods,
} from "../soundproofing-calc.js";

describe("noiseReduction", () => {
  it("decoupling best noise reduction", () => {
    expect(noiseReduction("decoupling")).toBeGreaterThan(noiseReduction("acoustic_foam"));
  });
});

describe("lowFrequencyEffectiveness", () => {
  it("decoupling best low frequency", () => {
    expect(lowFrequencyEffectiveness("decoupling")).toBeGreaterThan(
      lowFrequencyEffectiveness("acoustic_foam")
    );
  });
});

describe("installDifficulty", () => {
  it("decoupling hardest to install", () => {
    expect(installDifficulty("decoupling")).toBeGreaterThan(
      installDifficulty("acoustic_foam")
    );
  });
});

describe("costPerSqFt", () => {
  it("decoupling most expensive", () => {
    expect(costPerSqFt("decoupling")).toBeGreaterThan(costPerSqFt("acoustic_foam"));
  });
});

describe("spaceRequired", () => {
  it("decoupling needs most space", () => {
    expect(spaceRequired("decoupling")).toBeGreaterThan(spaceRequired("green_glue"));
  });
});

describe("fireRated", () => {
  it("fiberglass is fire rated", () => {
    expect(fireRated("fiberglass")).toBe(true);
  });
  it("acoustic foam is not", () => {
    expect(fireRated("acoustic_foam")).toBe(false);
  });
});

describe("diyFriendly", () => {
  it("acoustic foam is diy friendly", () => {
    expect(diyFriendly("acoustic_foam")).toBe(true);
  });
  it("decoupling is not", () => {
    expect(diyFriendly("decoupling")).toBe(false);
  });
});

describe("application", () => {
  it("green glue between drywall layers", () => {
    expect(application("green_glue")).toBe("between_drywall_layers");
  });
});

describe("stcRating", () => {
  it("decoupling has stc 50 plus", () => {
    expect(stcRating("decoupling")).toBe("stc_50_plus");
  });
});

describe("soundproofingMethods", () => {
  it("returns 5 methods", () => {
    expect(soundproofingMethods()).toHaveLength(5);
  });
});
