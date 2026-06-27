import { describe, it, expect } from "vitest";
import {
  scopeCountries, updateCycleYears, seismicProvisions,
  fireProtectionDepth, accessibilityRequirements, performanceBased,
  mandatoryAdoption, publishingBody, primaryFocus, buildingCodes,
} from "../building-code-calc.js";

describe("scopeCountries", () => {
  it("ibc widest scope", () => {
    expect(scopeCountries("ibc")).toBeGreaterThan(
      scopeCountries("ncc_australia")
    );
  });
});

describe("updateCycleYears", () => {
  it("eurocode longer cycle", () => {
    expect(updateCycleYears("eurocode")).toBeGreaterThan(
      updateCycleYears("ibc")
    );
  });
});

describe("seismicProvisions", () => {
  it("ibc strong seismic provisions", () => {
    expect(seismicProvisions("ibc")).toBeGreaterThan(
      seismicProvisions("ncc_australia")
    );
  });
});

describe("fireProtectionDepth", () => {
  it("nfpa best fire protection", () => {
    expect(fireProtectionDepth("nfpa")).toBeGreaterThan(
      fireProtectionDepth("eurocode")
    );
  });
});

describe("accessibilityRequirements", () => {
  it("ibc strongest accessibility", () => {
    expect(accessibilityRequirements("ibc")).toBeGreaterThan(
      accessibilityRequirements("nfpa")
    );
  });
});

describe("performanceBased", () => {
  it("ncc australia is performance based", () => {
    expect(performanceBased("ncc_australia")).toBe(true);
  });
  it("ibc is not", () => {
    expect(performanceBased("ibc")).toBe(false);
  });
});

describe("mandatoryAdoption", () => {
  it("eurocode is mandatory", () => {
    expect(mandatoryAdoption("eurocode")).toBe(true);
  });
  it("ibc is not", () => {
    expect(mandatoryAdoption("ibc")).toBe(false);
  });
});

describe("publishingBody", () => {
  it("ibc published by icc", () => {
    expect(publishingBody("ibc")).toBe("icc");
  });
});

describe("primaryFocus", () => {
  it("nfpa focuses on fire safety", () => {
    expect(primaryFocus("nfpa")).toBe("fire_safety");
  });
});

describe("buildingCodes", () => {
  it("returns 5 codes", () => {
    expect(buildingCodes()).toHaveLength(5);
  });
});
