import { describe, it, expect } from "vitest";
import {
  evidenceEmphasis, reasonEmphasis, scientificRelevance,
  accessibilityScore, modernInfluence, trustsSenses,
  innateKnowledge, keyThinker, knowledgeSource, epistemologySchools,
} from "../epistemology-school-calc.js";

describe("evidenceEmphasis", () => {
  it("empiricism most evidence focused", () => {
    expect(evidenceEmphasis("empiricism")).toBeGreaterThan(
      evidenceEmphasis("rationalism")
    );
  });
});

describe("reasonEmphasis", () => {
  it("rationalism most reason focused", () => {
    expect(reasonEmphasis("rationalism")).toBeGreaterThan(
      reasonEmphasis("empiricism")
    );
  });
});

describe("scientificRelevance", () => {
  it("empiricism most scientifically relevant", () => {
    expect(scientificRelevance("empiricism")).toBeGreaterThan(
      scientificRelevance("constructivism")
    );
  });
});

describe("accessibilityScore", () => {
  it("pragmatism most accessible", () => {
    expect(accessibilityScore("pragmatism")).toBeGreaterThan(
      accessibilityScore("constructivism")
    );
  });
});

describe("modernInfluence", () => {
  it("empiricism most modern influence", () => {
    expect(modernInfluence("empiricism")).toBeGreaterThan(
      modernInfluence("skepticism")
    );
  });
});

describe("trustsSenses", () => {
  it("empiricism trusts senses", () => {
    expect(trustsSenses("empiricism")).toBe(true);
  });
  it("rationalism does not", () => {
    expect(trustsSenses("rationalism")).toBe(false);
  });
});

describe("innateKnowledge", () => {
  it("rationalism believes in innate knowledge", () => {
    expect(innateKnowledge("rationalism")).toBe(true);
  });
  it("empiricism does not", () => {
    expect(innateKnowledge("empiricism")).toBe(false);
  });
});

describe("keyThinker", () => {
  it("empiricism key thinker is locke", () => {
    expect(keyThinker("empiricism")).toBe("locke");
  });
});

describe("knowledgeSource", () => {
  it("pragmatism based on practical consequences", () => {
    expect(knowledgeSource("pragmatism")).toBe("practical_consequences");
  });
});

describe("epistemologySchools", () => {
  it("returns 5 schools", () => {
    expect(epistemologySchools()).toHaveLength(5);
  });
});
