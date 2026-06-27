import { describe, it, expect } from "vitest";
import {
  complexityScore, fieldApplications, instrumentationCost,
  dataPointsGenerated, courtRelevance, requiresLabFacility,
  usedInCriminalCases, primaryFocus, keyMeasurement, ballisticsTypes,
} from "../ballistics-type-calc.js";

describe("complexityScore", () => {
  it("forensic most complex", () => {
    expect(complexityScore("forensic")).toBeGreaterThan(
      complexityScore("transitional")
    );
  });
});

describe("fieldApplications", () => {
  it("forensic most field applications", () => {
    expect(fieldApplications("forensic")).toBeGreaterThan(
      fieldApplications("transitional")
    );
  });
});

describe("instrumentationCost", () => {
  it("forensic highest instrumentation cost", () => {
    expect(instrumentationCost("forensic")).toBeGreaterThan(
      instrumentationCost("terminal")
    );
  });
});

describe("dataPointsGenerated", () => {
  it("external most data points", () => {
    expect(dataPointsGenerated("external")).toBeGreaterThan(
      dataPointsGenerated("transitional")
    );
  });
});

describe("courtRelevance", () => {
  it("forensic most court relevant", () => {
    expect(courtRelevance("forensic")).toBeGreaterThan(
      courtRelevance("internal")
    );
  });
});

describe("requiresLabFacility", () => {
  it("forensic requires lab", () => {
    expect(requiresLabFacility("forensic")).toBe(true);
  });
  it("external does not", () => {
    expect(requiresLabFacility("external")).toBe(false);
  });
});

describe("usedInCriminalCases", () => {
  it("forensic used in criminal cases", () => {
    expect(usedInCriminalCases("forensic")).toBe(true);
  });
  it("internal is not", () => {
    expect(usedInCriminalCases("internal")).toBe(false);
  });
});

describe("primaryFocus", () => {
  it("forensic focuses on firearm identification", () => {
    expect(primaryFocus("forensic")).toBe("firearm_identification");
  });
});

describe("keyMeasurement", () => {
  it("external measures velocity drop angle", () => {
    expect(keyMeasurement("external")).toBe("velocity_drop_angle");
  });
});

describe("ballisticsTypes", () => {
  it("returns 5 types", () => {
    expect(ballisticsTypes()).toHaveLength(5);
  });
});
