import { describe, it, expect } from "vitest";
import {
  globalFrequency, processingEase, ambiguityLevel,
  headDirectionScore, caseMarkingNeed, verbInitial,
  subjectFirst, exampleLanguage, prepositionType, syntaxPatterns,
} from "../syntax-pattern-calc.js";

describe("globalFrequency", () => {
  it("sov most common globally", () => {
    expect(globalFrequency("sov")).toBeGreaterThan(
      globalFrequency("vos")
    );
  });
});

describe("processingEase", () => {
  it("svo easiest processing", () => {
    expect(processingEase("svo")).toBeGreaterThan(
      processingEase("free_order")
    );
  });
});

describe("ambiguityLevel", () => {
  it("free_order most ambiguous", () => {
    expect(ambiguityLevel("free_order")).toBeGreaterThan(
      ambiguityLevel("svo")
    );
  });
});

describe("headDirectionScore", () => {
  it("vso most head-initial", () => {
    expect(headDirectionScore("vso")).toBeGreaterThan(
      headDirectionScore("sov")
    );
  });
});

describe("caseMarkingNeed", () => {
  it("free_order needs most case marking", () => {
    expect(caseMarkingNeed("free_order")).toBeGreaterThan(
      caseMarkingNeed("svo")
    );
  });
});

describe("verbInitial", () => {
  it("vso is verb initial", () => {
    expect(verbInitial("vso")).toBe(true);
  });
  it("svo is not", () => {
    expect(verbInitial("svo")).toBe(false);
  });
});

describe("subjectFirst", () => {
  it("svo is subject first", () => {
    expect(subjectFirst("svo")).toBe(true);
  });
  it("vso is not", () => {
    expect(subjectFirst("vso")).toBe(false);
  });
});

describe("exampleLanguage", () => {
  it("sov includes japanese", () => {
    expect(exampleLanguage("sov")).toBe("japanese_korean");
  });
});

describe("prepositionType", () => {
  it("sov uses postpositions", () => {
    expect(prepositionType("sov")).toBe("postpositions");
  });
});

describe("syntaxPatterns", () => {
  it("returns 5 patterns", () => {
    expect(syntaxPatterns()).toHaveLength(5);
  });
});
