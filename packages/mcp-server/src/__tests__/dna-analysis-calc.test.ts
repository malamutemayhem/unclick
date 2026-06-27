import { describe, it, expect } from "vitest";
import {
  discriminationPower, processingTimeHours, sampleRequirementNg,
  costPerSample, degradedSampleTolerance, identifiesLineage,
  fieldDeployable, databaseCompatibility, bestApplication, dnaAnalysisMethods,
} from "../dna-analysis-calc.js";

describe("discriminationPower", () => {
  it("str profiling highest discrimination", () => {
    expect(discriminationPower("str_profiling")).toBeGreaterThan(
      discriminationPower("mtdna")
    );
  });
});

describe("processingTimeHours", () => {
  it("rapid dna fastest", () => {
    expect(processingTimeHours("mtdna")).toBeGreaterThan(
      processingTimeHours("rapid_dna")
    );
  });
});

describe("sampleRequirementNg", () => {
  it("mtdna needs least sample", () => {
    expect(sampleRequirementNg("snp_genotyping")).toBeGreaterThan(
      sampleRequirementNg("mtdna")
    );
  });
});

describe("costPerSample", () => {
  it("snp genotyping most expensive", () => {
    expect(costPerSample("snp_genotyping")).toBeGreaterThan(
      costPerSample("rapid_dna")
    );
  });
});

describe("degradedSampleTolerance", () => {
  it("mtdna best with degraded samples", () => {
    expect(degradedSampleTolerance("mtdna")).toBeGreaterThan(
      degradedSampleTolerance("rapid_dna")
    );
  });
});

describe("identifiesLineage", () => {
  it("y str identifies lineage", () => {
    expect(identifiesLineage("y_str")).toBe(true);
  });
  it("str profiling does not", () => {
    expect(identifiesLineage("str_profiling")).toBe(false);
  });
});

describe("fieldDeployable", () => {
  it("rapid dna is field deployable", () => {
    expect(fieldDeployable("rapid_dna")).toBe(true);
  });
  it("str profiling is not", () => {
    expect(fieldDeployable("str_profiling")).toBe(false);
  });
});

describe("databaseCompatibility", () => {
  it("str profiling uses codis", () => {
    expect(databaseCompatibility("str_profiling")).toBe("codis");
  });
});

describe("bestApplication", () => {
  it("mtdna best for ancient samples", () => {
    expect(bestApplication("mtdna")).toBe("ancient_samples");
  });
});

describe("dnaAnalysisMethods", () => {
  it("returns 5 methods", () => {
    expect(dnaAnalysisMethods()).toHaveLength(5);
  });
});
