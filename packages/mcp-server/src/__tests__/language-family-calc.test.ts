import { describe, it, expect } from "vitest";
import {
  speakersBillions, languageCount, geographicSpread,
  morphologicalComplexity, tonalLanguageRatio, usesAlphabet,
  hasGenderSystem, exampleLanguage, originRegion, languageFamilies,
} from "../language-family-calc.js";

describe("speakersBillions", () => {
  it("indo european has most speakers", () => {
    expect(speakersBillions("indo_european")).toBeGreaterThan(
      speakersBillions("austronesian")
    );
  });
});

describe("languageCount", () => {
  it("niger congo has most languages", () => {
    expect(languageCount("niger_congo")).toBeGreaterThan(
      languageCount("afro_asiatic")
    );
  });
});

describe("geographicSpread", () => {
  it("indo european most spread", () => {
    expect(geographicSpread("indo_european")).toBeGreaterThan(
      geographicSpread("niger_congo")
    );
  });
});

describe("morphologicalComplexity", () => {
  it("afro asiatic most complex", () => {
    expect(morphologicalComplexity("afro_asiatic")).toBeGreaterThan(
      morphologicalComplexity("sino_tibetan")
    );
  });
});

describe("tonalLanguageRatio", () => {
  it("sino tibetan most tonal", () => {
    expect(tonalLanguageRatio("sino_tibetan")).toBeGreaterThan(
      tonalLanguageRatio("indo_european")
    );
  });
});

describe("usesAlphabet", () => {
  it("indo european uses alphabet", () => {
    expect(usesAlphabet("indo_european")).toBe(true);
  });
  it("sino tibetan does not", () => {
    expect(usesAlphabet("sino_tibetan")).toBe(false);
  });
});

describe("hasGenderSystem", () => {
  it("afro asiatic has gender", () => {
    expect(hasGenderSystem("afro_asiatic")).toBe(true);
  });
  it("austronesian does not", () => {
    expect(hasGenderSystem("austronesian")).toBe(false);
  });
});

describe("exampleLanguage", () => {
  it("sino tibetan example is mandarin", () => {
    expect(exampleLanguage("sino_tibetan")).toBe("mandarin");
  });
});

describe("originRegion", () => {
  it("austronesian from taiwan", () => {
    expect(originRegion("austronesian")).toBe("taiwan");
  });
});

describe("languageFamilies", () => {
  it("returns 5 families", () => {
    expect(languageFamilies()).toHaveLength(5);
  });
});
