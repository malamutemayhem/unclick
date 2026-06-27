import { describe, it, expect } from "vitest";
import {
  courtWeightScore, collectionDifficulty, contaminationRisk,
  storageDifficulty, analysisTime, requiresLabAnalysis,
  chainOfCustodyCritical, exampleItem, primaryExpert, evidenceTypes,
} from "../evidence-type-calc.js";

describe("courtWeightScore", () => {
  it("biological highest court weight", () => {
    expect(courtWeightScore("biological")).toBeGreaterThan(
      courtWeightScore("trace")
    );
  });
});

describe("collectionDifficulty", () => {
  it("trace hardest to collect", () => {
    expect(collectionDifficulty("trace")).toBeGreaterThan(
      collectionDifficulty("documentary")
    );
  });
});

describe("contaminationRisk", () => {
  it("biological highest contamination risk", () => {
    expect(contaminationRisk("biological")).toBeGreaterThan(
      contaminationRisk("digital")
    );
  });
});

describe("storageDifficulty", () => {
  it("biological hardest to store", () => {
    expect(storageDifficulty("biological")).toBeGreaterThan(
      storageDifficulty("documentary")
    );
  });
});

describe("analysisTime", () => {
  it("biological longest analysis", () => {
    expect(analysisTime("biological")).toBeGreaterThan(
      analysisTime("documentary")
    );
  });
});

describe("requiresLabAnalysis", () => {
  it("biological requires lab", () => {
    expect(requiresLabAnalysis("biological")).toBe(true);
  });
  it("physical does not", () => {
    expect(requiresLabAnalysis("physical")).toBe(false);
  });
});

describe("chainOfCustodyCritical", () => {
  it("all evidence types require chain of custody", () => {
    expect(chainOfCustodyCritical("digital")).toBe(true);
  });
});

describe("exampleItem", () => {
  it("trace includes fiber", () => {
    expect(exampleItem("trace")).toBe("fiber_gunshot_residue");
  });
});

describe("primaryExpert", () => {
  it("digital needs forensic analyst", () => {
    expect(primaryExpert("digital")).toBe("digital_forensic_analyst");
  });
});

describe("evidenceTypes", () => {
  it("returns 5 types", () => {
    expect(evidenceTypes()).toHaveLength(5);
  });
});
