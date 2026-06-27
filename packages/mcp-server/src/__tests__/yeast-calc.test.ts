import { describe, it, expect } from "vitest";
import {
  pitchRateCellsPerMlPerPlato, cellsNeeded, starterVolumeMl,
  fermentationTempCelsius, attenuationPercent, flocculationRating,
  generationsMax, lagTimeHours, viabilityCurve, yeastTypes,
} from "../yeast-calc.js";

describe("pitchRateCellsPerMlPerPlato", () => {
  it("lager needs highest pitch rate", () => {
    expect(pitchRateCellsPerMlPerPlato("lager")).toBeGreaterThan(
      pitchRateCellsPerMlPerPlato("ale")
    );
  });
});

describe("cellsNeeded", () => {
  it("larger batch = more cells", () => {
    expect(cellsNeeded(400, 12, 1.5)).toBeGreaterThan(cellsNeeded(200, 12, 1.5));
  });
});

describe("starterVolumeMl", () => {
  it("more cells = larger starter", () => {
    expect(starterVolumeMl(200)).toBeGreaterThan(starterVolumeMl(100));
  });
});

describe("fermentationTempCelsius", () => {
  it("lager ferments cooler", () => {
    const lager = fermentationTempCelsius("lager");
    const ale = fermentationTempCelsius("ale");
    expect(lager.max).toBeLessThan(ale.max);
  });
});

describe("attenuationPercent", () => {
  it("wild has highest attenuation", () => {
    expect(attenuationPercent("wild")).toBeGreaterThan(attenuationPercent("wheat"));
  });
});

describe("flocculationRating", () => {
  it("ale has high flocculation", () => {
    expect(flocculationRating("ale")).toBe("high");
  });
  it("wheat has low flocculation", () => {
    expect(flocculationRating("wheat")).toBe("low");
  });
});

describe("generationsMax", () => {
  it("ale can be reused most", () => {
    expect(generationsMax("ale")).toBeGreaterThan(generationsMax("wild"));
  });
});

describe("lagTimeHours", () => {
  it("wild takes longest to start", () => {
    expect(lagTimeHours("wild")).toBeGreaterThan(lagTimeHours("wheat"));
  });
});

describe("viabilityCurve", () => {
  it("fresh yeast is 100% viable", () => {
    expect(viabilityCurve(0)).toBe(100);
  });
  it("old yeast loses viability", () => {
    expect(viabilityCurve(90)).toBeLessThan(viabilityCurve(0));
  });
  it("never goes below zero", () => {
    expect(viabilityCurve(200)).toBe(0);
  });
});

describe("yeastTypes", () => {
  it("returns 5 types", () => {
    expect(yeastTypes()).toHaveLength(5);
  });
});
