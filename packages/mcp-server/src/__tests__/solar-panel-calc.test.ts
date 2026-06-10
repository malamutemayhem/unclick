import { describe, it, expect } from "vitest";
import {
  efficiencyPercent, costPerWatt, lifespanYears,
  weightPerM2, temperatureTolerance, flexible,
  trackingRequired, bestApplication, degradationRatePerYear, solarPanelTypes,
} from "../solar-panel-calc.js";

describe("efficiencyPercent", () => {
  it("concentrated is most efficient", () => {
    expect(efficiencyPercent("concentrated")).toBeGreaterThan(
      efficiencyPercent("thin_film")
    );
  });
});

describe("costPerWatt", () => {
  it("thin film costs least", () => {
    expect(costPerWatt("thin_film")).toBeLessThan(
      costPerWatt("concentrated")
    );
  });
});

describe("lifespanYears", () => {
  it("monocrystalline lasts 30 years", () => {
    expect(lifespanYears("monocrystalline")).toBe(30);
  });
});

describe("weightPerM2", () => {
  it("thin film is lightest", () => {
    expect(weightPerM2("thin_film")).toBeLessThan(
      weightPerM2("concentrated")
    );
  });
});

describe("temperatureTolerance", () => {
  it("thin film handles heat best", () => {
    expect(temperatureTolerance("thin_film")).toBeGreaterThan(
      temperatureTolerance("concentrated")
    );
  });
});

describe("flexible", () => {
  it("thin film is flexible", () => {
    expect(flexible("thin_film")).toBe(true);
  });
  it("monocrystalline is not", () => {
    expect(flexible("monocrystalline")).toBe(false);
  });
});

describe("trackingRequired", () => {
  it("concentrated requires tracking", () => {
    expect(trackingRequired("concentrated")).toBe(true);
  });
  it("monocrystalline does not", () => {
    expect(trackingRequired("monocrystalline")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("thin film for portable", () => {
    expect(bestApplication("thin_film")).toBe("portable");
  });
});

describe("degradationRatePerYear", () => {
  it("bifacial degrades slowest", () => {
    expect(degradationRatePerYear("bifacial")).toBeLessThan(
      degradationRatePerYear("thin_film")
    );
  });
});

describe("solarPanelTypes", () => {
  it("returns 5 types", () => {
    expect(solarPanelTypes()).toHaveLength(5);
  });
});
