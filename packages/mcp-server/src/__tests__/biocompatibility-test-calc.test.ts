import { describe, it, expect } from "vitest";
import {
  regulatoryImportance, testDuration, costLevel, sampleSize,
  dataComplexity, inVitro, requiredForAllDevices, isoStandard,
  measurementEndpoint, biocompatibilityTests,
} from "../biocompatibility-test-calc.js";

describe("regulatoryImportance", () => {
  it("cytotoxicity most important", () => {
    expect(regulatoryImportance("cytotoxicity")).toBeGreaterThan(regulatoryImportance("irritation"));
  });
});

describe("testDuration", () => {
  it("systemic toxicity longest", () => {
    expect(testDuration("systemic_toxicity")).toBeGreaterThan(testDuration("cytotoxicity"));
  });
});

describe("costLevel", () => {
  it("systemic toxicity most expensive", () => {
    expect(costLevel("systemic_toxicity")).toBeGreaterThan(costLevel("cytotoxicity"));
  });
});

describe("sampleSize", () => {
  it("systemic toxicity largest sample", () => {
    expect(sampleSize("systemic_toxicity")).toBeGreaterThan(sampleSize("cytotoxicity"));
  });
});

describe("dataComplexity", () => {
  it("systemic toxicity most complex data", () => {
    expect(dataComplexity("systemic_toxicity")).toBeGreaterThan(dataComplexity("cytotoxicity"));
  });
});

describe("inVitro", () => {
  it("cytotoxicity is in vitro", () => {
    expect(inVitro("cytotoxicity")).toBe(true);
  });
  it("sensitization is not", () => {
    expect(inVitro("sensitization")).toBe(false);
  });
});

describe("requiredForAllDevices", () => {
  it("cytotoxicity required for all", () => {
    expect(requiredForAllDevices("cytotoxicity")).toBe(true);
  });
  it("hemocompatibility is not", () => {
    expect(requiredForAllDevices("hemocompatibility")).toBe(false);
  });
});

describe("isoStandard", () => {
  it("cytotoxicity is iso 10993 5", () => {
    expect(isoStandard("cytotoxicity")).toBe("iso_10993_5");
  });
});

describe("measurementEndpoint", () => {
  it("cytotoxicity measures cell viability percent", () => {
    expect(measurementEndpoint("cytotoxicity")).toBe("cell_viability_percent");
  });
});

describe("biocompatibilityTests", () => {
  it("returns 5 tests", () => {
    expect(biocompatibilityTests()).toHaveLength(5);
  });
});
