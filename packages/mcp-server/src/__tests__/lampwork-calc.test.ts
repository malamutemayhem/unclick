import { describe, it, expect } from "vitest";
import {
  workingTempCelsius, annealingTempCelsius, annealingTimeMinutes,
  mandrelDiameterMm, beadReleaseCoats, gasConsumptionLPerHour,
  ventilationCfm, beadWeightG, costPerHour, flameTypes,
} from "../lampwork-calc.js";

describe("workingTempCelsius", () => {
  it("oxy propane is hottest", () => {
    expect(workingTempCelsius("oxy_propane")).toBeGreaterThan(
      workingTempCelsius("natural_gas")
    );
  });
});

describe("annealingTempCelsius", () => {
  it("oxy flames anneal slightly higher", () => {
    expect(annealingTempCelsius("oxy_propane")).toBeGreaterThanOrEqual(
      annealingTempCelsius("propane")
    );
  });
});

describe("annealingTimeMinutes", () => {
  it("larger beads need longer annealing", () => {
    expect(annealingTimeMinutes(20)).toBeGreaterThan(annealingTimeMinutes(12));
  });
  it("minimum 30 minutes", () => {
    expect(annealingTimeMinutes(5)).toBeGreaterThanOrEqual(30);
  });
});

describe("mandrelDiameterMm", () => {
  it("slightly smaller than bead hole", () => {
    expect(mandrelDiameterMm(3)).toBe(2.5);
  });
});

describe("beadReleaseCoats", () => {
  it("returns 2", () => {
    expect(beadReleaseCoats()).toBe(2);
  });
});

describe("gasConsumptionLPerHour", () => {
  it("oxy flames use more gas", () => {
    expect(gasConsumptionLPerHour("oxy_natural")).toBeGreaterThan(
      gasConsumptionLPerHour("propane")
    );
  });
});

describe("ventilationCfm", () => {
  it("returns 150", () => {
    expect(ventilationCfm()).toBe(150);
  });
});

describe("beadWeightG", () => {
  it("larger bead is heavier", () => {
    expect(beadWeightG(15)).toBeGreaterThan(beadWeightG(10));
  });
});

describe("costPerHour", () => {
  it("oxy propane is most expensive", () => {
    expect(costPerHour("oxy_propane")).toBeGreaterThan(costPerHour("natural_gas"));
  });
});

describe("flameTypes", () => {
  it("returns 5 types", () => {
    expect(flameTypes()).toHaveLength(5);
  });
});
