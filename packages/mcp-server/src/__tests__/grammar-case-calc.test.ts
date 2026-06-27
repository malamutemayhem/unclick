import { describe, it, expect } from "vitest";
import {
  usageFrequency, learningDifficulty, languagesWithCase,
  semanticSpecificity, morphologicalDistinctness, subjectCase,
  survivesInEnglish, syntacticRole, exampleLanguage, grammarCases,
} from "../grammar-case-calc.js";

describe("usageFrequency", () => {
  it("nominative used most", () => {
    expect(usageFrequency("nominative")).toBeGreaterThan(
      usageFrequency("ablative")
    );
  });
});

describe("learningDifficulty", () => {
  it("ablative hardest to learn", () => {
    expect(learningDifficulty("ablative")).toBeGreaterThan(
      learningDifficulty("nominative")
    );
  });
});

describe("languagesWithCase", () => {
  it("nominative in most languages", () => {
    expect(languagesWithCase("nominative")).toBeGreaterThan(
      languagesWithCase("ablative")
    );
  });
});

describe("semanticSpecificity", () => {
  it("ablative most specific", () => {
    expect(semanticSpecificity("ablative")).toBeGreaterThan(
      semanticSpecificity("nominative")
    );
  });
});

describe("morphologicalDistinctness", () => {
  it("ablative most distinct", () => {
    expect(morphologicalDistinctness("ablative")).toBeGreaterThan(
      morphologicalDistinctness("nominative")
    );
  });
});

describe("subjectCase", () => {
  it("nominative is subject case", () => {
    expect(subjectCase("nominative")).toBe(true);
  });
  it("accusative is not", () => {
    expect(subjectCase("accusative")).toBe(false);
  });
});

describe("survivesInEnglish", () => {
  it("genitive survives", () => {
    expect(survivesInEnglish("genitive")).toBe(true);
  });
  it("ablative does not", () => {
    expect(survivesInEnglish("ablative")).toBe(false);
  });
});

describe("syntacticRole", () => {
  it("nominative is subject", () => {
    expect(syntacticRole("nominative")).toBe("subject");
  });
});

describe("exampleLanguage", () => {
  it("ablative in latin", () => {
    expect(exampleLanguage("ablative")).toBe("latin");
  });
});

describe("grammarCases", () => {
  it("returns 5 cases", () => {
    expect(grammarCases()).toHaveLength(5);
  });
});
