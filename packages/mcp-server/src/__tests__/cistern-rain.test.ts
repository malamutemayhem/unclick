import { describe, it, expect } from "vitest";
import {
  catchmentAreaM2, annualYieldLiters, runoffCoefficient,
  firstFlushLiters, gutterSizeMm, downpipeCount, filterMeshMm,
  tankSizeLiters, pumpWatts, paybackYears, roofMaterials,
} from "../cistern-rain.js";

describe("catchmentAreaM2", () => {
  it("positive area", () => {
    expect(catchmentAreaM2(10, 8)).toBe(80);
  });
});

describe("annualYieldLiters", () => {
  it("positive liters", () => {
    expect(annualYieldLiters(100, 800, 0.9)).toBeGreaterThan(0);
  });
});

describe("runoffCoefficient", () => {
  it("metal highest", () => {
    expect(runoffCoefficient("metal")).toBeGreaterThan(runoffCoefficient("thatch"));
  });
});

describe("firstFlushLiters", () => {
  it("positive liters", () => {
    expect(firstFlushLiters(100)).toBeGreaterThan(0);
  });
});

describe("gutterSizeMm", () => {
  it("positive mm", () => {
    expect(gutterSizeMm(100, 50)).toBeGreaterThan(75);
  });
});

describe("downpipeCount", () => {
  it("at least 1", () => {
    expect(downpipeCount(10)).toBeGreaterThanOrEqual(1);
  });
});

describe("filterMeshMm", () => {
  it("drinking finest", () => {
    expect(filterMeshMm("drinking")).toBeLessThan(filterMeshMm("irrigation"));
  });
});

describe("tankSizeLiters", () => {
  it("positive liters", () => {
    expect(tankSizeLiters(200, 30)).toBeGreaterThan(0);
  });
});

describe("pumpWatts", () => {
  it("positive watts", () => {
    expect(pumpWatts(5, 10)).toBeGreaterThan(0);
  });
});

describe("paybackYears", () => {
  it("positive years", () => {
    expect(paybackYears(5000, 50000, 0.003)).toBeGreaterThan(0);
  });
  it("zero savings = 0", () => {
    expect(paybackYears(5000, 0, 0.003)).toBe(0);
  });
});

describe("roofMaterials", () => {
  it("returns 5 materials", () => {
    expect(roofMaterials()).toHaveLength(5);
  });
});
