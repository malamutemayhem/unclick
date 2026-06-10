import { describe, it, expect } from "vitest";
import {
  coilDiameterMm, coilLengthCm, coilsPerLayer, totalClayWeightKg,
  dryingTimeBetweenLayersMinutes, scoringRequired, slipVolumeMl,
  buildTimeHours, smoothingToolPasses, coilProfiles,
} from "../coil-build-calc.js";

describe("coilDiameterMm", () => {
  it("thicker walls = larger coils", () => {
    expect(coilDiameterMm(10)).toBeGreaterThan(coilDiameterMm(5));
  });
});

describe("coilLengthCm", () => {
  it("includes overlap", () => {
    expect(coilLengthCm(30, 10)).toBeGreaterThan(30);
  });
});

describe("coilsPerLayer", () => {
  it("taller vessel = more coils", () => {
    expect(coilsPerLayer(30, 15)).toBeGreaterThan(coilsPerLayer(15, 15));
  });
  it("zero diameter returns zero", () => {
    expect(coilsPerLayer(30, 0)).toBe(0);
  });
});

describe("totalClayWeightKg", () => {
  it("larger vessel = heavier", () => {
    expect(totalClayWeightKg(30, 20, 8)).toBeGreaterThan(
      totalClayWeightKg(15, 15, 8)
    );
  });
});

describe("dryingTimeBetweenLayersMinutes", () => {
  it("squared takes longest", () => {
    expect(dryingTimeBetweenLayersMinutes("squared")).toBeGreaterThan(
      dryingTimeBetweenLayersMinutes("flat")
    );
  });
});

describe("scoringRequired", () => {
  it("flat does not need scoring", () => {
    expect(scoringRequired("flat")).toBe(false);
  });
  it("round needs scoring", () => {
    expect(scoringRequired("round")).toBe(true);
  });
});

describe("slipVolumeMl", () => {
  it("more coils = more slip", () => {
    expect(slipVolumeMl(20)).toBeGreaterThan(slipVolumeMl(10));
  });
});

describe("buildTimeHours", () => {
  it("beginner takes longest", () => {
    expect(buildTimeHours(20, "beginner")).toBeGreaterThan(
      buildTimeHours(20, "expert")
    );
  });
});

describe("smoothingToolPasses", () => {
  it("burnished needs most passes", () => {
    expect(smoothingToolPasses("burnished")).toBeGreaterThan(
      smoothingToolPasses("smoothed")
    );
  });
  it("textured needs no passes", () => {
    expect(smoothingToolPasses("textured")).toBe(0);
  });
});

describe("coilProfiles", () => {
  it("returns 5 profiles", () => {
    expect(coilProfiles()).toHaveLength(5);
  });
});
