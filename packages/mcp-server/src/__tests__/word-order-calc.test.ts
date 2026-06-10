import { describe, it, expect } from "vitest";
import {
  languagePercentage, processingEase, ambiguityLevel,
  headDirection, morphologyDependence, prepositionUsing,
  verbInitial, exampleLanguage, typologicalCorrelation, wordOrders,
} from "../word-order-calc.js";

describe("languagePercentage", () => {
  it("sov is most common", () => {
    expect(languagePercentage("sov")).toBeGreaterThan(
      languagePercentage("ovs")
    );
  });
});

describe("processingEase", () => {
  it("svo easiest to process", () => {
    expect(processingEase("svo")).toBeGreaterThan(
      processingEase("ovs")
    );
  });
});

describe("ambiguityLevel", () => {
  it("ovs most ambiguous", () => {
    expect(ambiguityLevel("ovs")).toBeGreaterThan(
      ambiguityLevel("sov")
    );
  });
});

describe("headDirection", () => {
  it("vso most head initial", () => {
    expect(headDirection("vso")).toBeGreaterThan(
      headDirection("sov")
    );
  });
});

describe("morphologyDependence", () => {
  it("ovs most dependent on morphology", () => {
    expect(morphologyDependence("ovs")).toBeGreaterThan(
      morphologyDependence("svo")
    );
  });
});

describe("prepositionUsing", () => {
  it("svo uses prepositions", () => {
    expect(prepositionUsing("svo")).toBe(true);
  });
  it("sov does not", () => {
    expect(prepositionUsing("sov")).toBe(false);
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

describe("exampleLanguage", () => {
  it("sov example is japanese", () => {
    expect(exampleLanguage("sov")).toBe("japanese");
  });
});

describe("typologicalCorrelation", () => {
  it("svo is head initial", () => {
    expect(typologicalCorrelation("svo")).toBe("head_initial");
  });
});

describe("wordOrders", () => {
  it("returns 5 orders", () => {
    expect(wordOrders()).toHaveLength(5);
  });
});
