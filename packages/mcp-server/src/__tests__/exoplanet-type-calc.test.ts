import { describe, it, expect } from "vitest";
import {
  massEarthMultiple, orbitalPeriodDays, surfaceTempKelvin,
  habitabilityScore, detectionEase, hasAtmosphere,
  orbitsAStar, dominantComposition, discoveryCount, exoplanetTypes,
} from "../exoplanet-type-calc.js";

describe("massEarthMultiple", () => {
  it("hot jupiter is most massive", () => {
    expect(massEarthMultiple("hot_jupiter")).toBeGreaterThan(
      massEarthMultiple("super_earth")
    );
  });
});

describe("orbitalPeriodDays", () => {
  it("hot jupiter has shortest orbit", () => {
    expect(orbitalPeriodDays("hot_jupiter")).toBeLessThan(
      orbitalPeriodDays("super_earth")
    );
  });
});

describe("surfaceTempKelvin", () => {
  it("hot jupiter is hottest", () => {
    expect(surfaceTempKelvin("hot_jupiter")).toBeGreaterThan(
      surfaceTempKelvin("rogue")
    );
  });
});

describe("habitabilityScore", () => {
  it("ocean world is most habitable", () => {
    expect(habitabilityScore("ocean_world")).toBeGreaterThan(
      habitabilityScore("hot_jupiter")
    );
  });
});

describe("detectionEase", () => {
  it("hot jupiter is easiest to detect", () => {
    expect(detectionEase("hot_jupiter")).toBeGreaterThan(
      detectionEase("rogue")
    );
  });
});

describe("hasAtmosphere", () => {
  it("super earth has atmosphere", () => {
    expect(hasAtmosphere("super_earth")).toBe(true);
  });
  it("rogue does not", () => {
    expect(hasAtmosphere("rogue")).toBe(false);
  });
});

describe("orbitsAStar", () => {
  it("super earth orbits a star", () => {
    expect(orbitsAStar("super_earth")).toBe(true);
  });
  it("rogue does not", () => {
    expect(orbitsAStar("rogue")).toBe(false);
  });
});

describe("dominantComposition", () => {
  it("ocean world is water ice", () => {
    expect(dominantComposition("ocean_world")).toBe("water_ice");
  });
});

describe("discoveryCount", () => {
  it("super earth most discovered", () => {
    expect(discoveryCount("super_earth")).toBeGreaterThan(
      discoveryCount("rogue")
    );
  });
});

describe("exoplanetTypes", () => {
  it("returns 5 types", () => {
    expect(exoplanetTypes()).toHaveLength(5);
  });
});
