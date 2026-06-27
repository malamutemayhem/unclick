import { describe, it, expect } from "vitest";
import {
  tidalRangeMeters, frequencyPerMonth, currentStrength,
  ecologicalImpact, floodRisk, lunarAligned,
  requiresPerigee, lunarPhase, navigationHazard, tideTypes,
} from "../tide-type-calc.js";

describe("tidalRangeMeters", () => {
  it("proxigean has highest tidal range", () => {
    expect(tidalRangeMeters("proxigean")).toBeGreaterThan(
      tidalRangeMeters("neap")
    );
  });
});

describe("frequencyPerMonth", () => {
  it("spring tides are most frequent", () => {
    expect(frequencyPerMonth("spring")).toBeGreaterThan(
      frequencyPerMonth("proxigean")
    );
  });
});

describe("currentStrength", () => {
  it("proxigean has strongest currents", () => {
    expect(currentStrength("proxigean")).toBeGreaterThan(
      currentStrength("neap")
    );
  });
});

describe("ecologicalImpact", () => {
  it("proxigean has highest ecological impact", () => {
    expect(ecologicalImpact("proxigean")).toBeGreaterThan(
      ecologicalImpact("neap")
    );
  });
});

describe("floodRisk", () => {
  it("proxigean has highest flood risk", () => {
    expect(floodRisk("proxigean")).toBeGreaterThan(
      floodRisk("neap")
    );
  });
});

describe("lunarAligned", () => {
  it("all tides are lunar aligned", () => {
    expect(lunarAligned("spring")).toBe(true);
    expect(lunarAligned("neap")).toBe(true);
  });
});

describe("requiresPerigee", () => {
  it("perigean requires perigee", () => {
    expect(requiresPerigee("perigean")).toBe(true);
  });
  it("spring does not require perigee", () => {
    expect(requiresPerigee("spring")).toBe(false);
  });
});

describe("lunarPhase", () => {
  it("neap occurs at quarter moon", () => {
    expect(lunarPhase("neap")).toBe("quarter");
  });
});

describe("navigationHazard", () => {
  it("proxigean is most hazardous", () => {
    expect(navigationHazard("proxigean")).toBeGreaterThan(
      navigationHazard("neap")
    );
  });
});

describe("tideTypes", () => {
  it("returns 5 types", () => {
    expect(tideTypes()).toHaveLength(5);
  });
});
