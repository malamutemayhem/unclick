import { describe, it, expect } from "vitest";
import {
  waterVolumeFactor, timeMinutes, efficiencyPercent, equipmentComplexity,
  tanninRisk, phMonitoringRequired, batchesProduced, clarityRating,
  costEstimate, spargeMethods,
} from "../sparging-calc.js";

describe("waterVolumeFactor", () => {
  it("no sparge needs most water", () => {
    expect(waterVolumeFactor("no_sparge")).toBeGreaterThan(
      waterVolumeFactor("batch")
    );
  });
});

describe("timeMinutes", () => {
  it("fly sparge takes longest", () => {
    expect(timeMinutes("fly")).toBeGreaterThan(timeMinutes("batch"));
  });
});

describe("efficiencyPercent", () => {
  it("fly sparge is most efficient", () => {
    expect(efficiencyPercent("fly")).toBeGreaterThan(
      efficiencyPercent("no_sparge")
    );
  });
});

describe("equipmentComplexity", () => {
  it("fly sparge is most complex", () => {
    expect(equipmentComplexity("fly")).toBeGreaterThan(
      equipmentComplexity("no_sparge")
    );
  });
});

describe("tanninRisk", () => {
  it("fly sparge has highest tannin risk", () => {
    expect(tanninRisk("fly")).toBeGreaterThan(tanninRisk("no_sparge"));
  });
});

describe("phMonitoringRequired", () => {
  it("fly sparge needs pH monitoring", () => {
    expect(phMonitoringRequired("fly")).toBe(true);
  });
  it("batch does not", () => {
    expect(phMonitoringRequired("batch")).toBe(false);
  });
});

describe("batchesProduced", () => {
  it("parti gyle produces two batches", () => {
    expect(batchesProduced("parti_gyle")).toBe(2);
  });
});

describe("clarityRating", () => {
  it("fly sparge gives best clarity", () => {
    expect(clarityRating("fly")).toBeGreaterThan(
      clarityRating("no_sparge")
    );
  });
});

describe("costEstimate", () => {
  it("fly sparge is most expensive", () => {
    expect(costEstimate("fly")).toBeGreaterThan(costEstimate("batch"));
  });
});

describe("spargeMethods", () => {
  it("returns 5 methods", () => {
    expect(spargeMethods()).toHaveLength(5);
  });
});
