import { describe, it, expect } from "vitest";
import {
  transferPersistence, collectionDifficulty, analysisMethods,
  individualizationPotential, environmentalStability, microscopeRequired,
  dnaExtractable, primaryInstrument, evidenceClass, traceEvidenceTypes,
} from "../trace-evidence-calc.js";

describe("transferPersistence", () => {
  it("glass fragment most persistent", () => {
    expect(transferPersistence("glass_fragment")).toBeGreaterThan(
      transferPersistence("fiber")
    );
  });
});

describe("collectionDifficulty", () => {
  it("gunshot residue hardest to collect", () => {
    expect(collectionDifficulty("gunshot_residue")).toBeGreaterThan(
      collectionDifficulty("paint_chip")
    );
  });
});

describe("analysisMethods", () => {
  it("paint chip most analysis methods", () => {
    expect(analysisMethods("paint_chip")).toBeGreaterThan(
      analysisMethods("gunshot_residue")
    );
  });
});

describe("individualizationPotential", () => {
  it("hair highest individualization", () => {
    expect(individualizationPotential("hair")).toBeGreaterThan(
      individualizationPotential("fiber")
    );
  });
});

describe("environmentalStability", () => {
  it("glass fragment most stable", () => {
    expect(environmentalStability("glass_fragment")).toBeGreaterThan(
      environmentalStability("gunshot_residue")
    );
  });
});

describe("microscopeRequired", () => {
  it("fiber needs microscope", () => {
    expect(microscopeRequired("fiber")).toBe(true);
  });
  it("gunshot residue also needs microscope", () => {
    expect(microscopeRequired("gunshot_residue")).toBe(true);
  });
});

describe("dnaExtractable", () => {
  it("hair is dna extractable", () => {
    expect(dnaExtractable("hair")).toBe(true);
  });
  it("glass fragment is not", () => {
    expect(dnaExtractable("glass_fragment")).toBe(false);
  });
});

describe("primaryInstrument", () => {
  it("gunshot residue uses sem eds", () => {
    expect(primaryInstrument("gunshot_residue")).toBe("sem_eds");
  });
});

describe("evidenceClass", () => {
  it("hair can be individual or class", () => {
    expect(evidenceClass("hair")).toBe("individual_or_class");
  });
});

describe("traceEvidenceTypes", () => {
  it("returns 5 types", () => {
    expect(traceEvidenceTypes()).toHaveLength(5);
  });
});
