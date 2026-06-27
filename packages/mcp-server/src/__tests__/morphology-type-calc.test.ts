import { describe, it, expect } from "vitest";
import {
  morphemesPerWord, transparencyScore, learningDifficulty,
  wordOrderImportance, inflectionalComplexity, toneUsed,
  affixesStackable, exampleLanguage, grammarStrategy, morphologyTypes,
} from "../morphology-type-calc.js";

describe("morphemesPerWord", () => {
  it("polysynthetic most morphemes", () => {
    expect(morphemesPerWord("polysynthetic")).toBeGreaterThan(
      morphemesPerWord("isolating")
    );
  });
});

describe("transparencyScore", () => {
  it("isolating most transparent", () => {
    expect(transparencyScore("isolating")).toBeGreaterThan(
      transparencyScore("introflexive")
    );
  });
});

describe("learningDifficulty", () => {
  it("polysynthetic hardest to learn", () => {
    expect(learningDifficulty("polysynthetic")).toBeGreaterThan(
      learningDifficulty("isolating")
    );
  });
});

describe("wordOrderImportance", () => {
  it("isolating relies most on word order", () => {
    expect(wordOrderImportance("isolating")).toBeGreaterThan(
      wordOrderImportance("polysynthetic")
    );
  });
});

describe("inflectionalComplexity", () => {
  it("introflexive most inflectionally complex", () => {
    expect(inflectionalComplexity("introflexive")).toBeGreaterThan(
      inflectionalComplexity("isolating")
    );
  });
});

describe("toneUsed", () => {
  it("isolating uses tone", () => {
    expect(toneUsed("isolating")).toBe(true);
  });
  it("fusional does not", () => {
    expect(toneUsed("fusional")).toBe(false);
  });
});

describe("affixesStackable", () => {
  it("agglutinative stacks affixes", () => {
    expect(affixesStackable("agglutinative")).toBe(true);
  });
  it("isolating does not", () => {
    expect(affixesStackable("isolating")).toBe(false);
  });
});

describe("exampleLanguage", () => {
  it("agglutinative includes turkish", () => {
    expect(exampleLanguage("agglutinative")).toBe("turkish_finnish");
  });
});

describe("grammarStrategy", () => {
  it("introflexive uses root vowel pattern", () => {
    expect(grammarStrategy("introflexive")).toBe("root_vowel_pattern");
  });
});

describe("morphologyTypes", () => {
  it("returns 5 types", () => {
    expect(morphologyTypes()).toHaveLength(5);
  });
});
