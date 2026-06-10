import { describe, it, expect } from "vitest";
import {
  avgTempCelsius, permafrostDepthMeters, growingSeasonDays,
  plantDiversity, windSpeedKmh, hasContinuousPermafrost,
  coastalInfluence, dominantVegetation, carbonStoreRating, tundraTypes,
} from "../tundra-type-calc.js";

describe("avgTempCelsius", () => {
  it("antarctic is coldest", () => {
    expect(avgTempCelsius("antarctic")).toBeLessThan(
      avgTempCelsius("maritime")
    );
  });
});

describe("permafrostDepthMeters", () => {
  it("antarctic has deepest permafrost", () => {
    expect(permafrostDepthMeters("antarctic")).toBeGreaterThan(
      permafrostDepthMeters("alpine")
    );
  });
});

describe("growingSeasonDays", () => {
  it("maritime has longest growing season", () => {
    expect(growingSeasonDays("maritime")).toBeGreaterThan(
      growingSeasonDays("antarctic")
    );
  });
});

describe("plantDiversity", () => {
  it("alpine has most plant diversity", () => {
    expect(plantDiversity("alpine")).toBeGreaterThan(
      plantDiversity("antarctic")
    );
  });
});

describe("windSpeedKmh", () => {
  it("antarctic has strongest wind", () => {
    expect(windSpeedKmh("antarctic")).toBeGreaterThan(
      windSpeedKmh("continental")
    );
  });
});

describe("hasContinuousPermafrost", () => {
  it("arctic has continuous permafrost", () => {
    expect(hasContinuousPermafrost("arctic")).toBe(true);
  });
  it("alpine does not", () => {
    expect(hasContinuousPermafrost("alpine")).toBe(false);
  });
});

describe("coastalInfluence", () => {
  it("maritime has coastal influence", () => {
    expect(coastalInfluence("maritime")).toBe(true);
  });
  it("continental does not", () => {
    expect(coastalInfluence("continental")).toBe(false);
  });
});

describe("dominantVegetation", () => {
  it("arctic has lichen moss", () => {
    expect(dominantVegetation("arctic")).toBe("lichen_moss");
  });
});

describe("carbonStoreRating", () => {
  it("arctic stores most carbon", () => {
    expect(carbonStoreRating("arctic")).toBeGreaterThan(
      carbonStoreRating("antarctic")
    );
  });
});

describe("tundraTypes", () => {
  it("returns 5 types", () => {
    expect(tundraTypes()).toHaveLength(5);
  });
});
