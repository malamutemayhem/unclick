import { describe, it, expect } from "vitest";
import {
  practicalApplicability, moralClarityScore, contextSensitivity,
  historicalInfluence, policyRelevance, consequenceBased,
  focusesOnCharacter, keyPhilosopher, centralPrinciple, ethicalFrameworks,
} from "../ethical-framework-calc.js";

describe("practicalApplicability", () => {
  it("utilitarianism most practical", () => {
    expect(practicalApplicability("utilitarianism")).toBeGreaterThan(
      practicalApplicability("virtue_ethics")
    );
  });
});

describe("moralClarityScore", () => {
  it("deontology clearest morally", () => {
    expect(moralClarityScore("deontology")).toBeGreaterThan(
      moralClarityScore("virtue_ethics")
    );
  });
});

describe("contextSensitivity", () => {
  it("care ethics most context sensitive", () => {
    expect(contextSensitivity("care_ethics")).toBeGreaterThan(
      contextSensitivity("deontology")
    );
  });
});

describe("historicalInfluence", () => {
  it("virtue ethics highly influential", () => {
    expect(historicalInfluence("virtue_ethics")).toBeGreaterThan(
      historicalInfluence("care_ethics")
    );
  });
});

describe("policyRelevance", () => {
  it("utilitarianism most policy relevant", () => {
    expect(policyRelevance("utilitarianism")).toBeGreaterThan(
      policyRelevance("virtue_ethics")
    );
  });
});

describe("consequenceBased", () => {
  it("utilitarianism is consequence based", () => {
    expect(consequenceBased("utilitarianism")).toBe(true);
  });
  it("deontology is not", () => {
    expect(consequenceBased("deontology")).toBe(false);
  });
});

describe("focusesOnCharacter", () => {
  it("virtue ethics focuses on character", () => {
    expect(focusesOnCharacter("virtue_ethics")).toBe(true);
  });
  it("utilitarianism does not", () => {
    expect(focusesOnCharacter("utilitarianism")).toBe(false);
  });
});

describe("keyPhilosopher", () => {
  it("deontology key philosopher is kant", () => {
    expect(keyPhilosopher("deontology")).toBe("kant");
  });
});

describe("centralPrinciple", () => {
  it("contractualism uses veil of ignorance", () => {
    expect(centralPrinciple("contractualism")).toBe("veil_of_ignorance");
  });
});

describe("ethicalFrameworks", () => {
  it("returns 5 frameworks", () => {
    expect(ethicalFrameworks()).toHaveLength(5);
  });
});
