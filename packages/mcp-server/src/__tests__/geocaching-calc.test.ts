import { describe, it, expect } from "vitest";
import {
  containerVolume, hikeDistance, estimatedTime, gpsAccuracy,
  bearingDeg, distanceKm, projectedCoord, ftfProbability,
  swagItems, logbookPages, maintenanceVisits, favoritePoints,
  streakDays, cacheTypes, containerSizes,
} from "../geocaching-calc.js";

describe("containerVolume", () => {
  it("nano is 5ml", () => {
    expect(containerVolume("nano")).toBe(5);
  });

  it("regular is 2000ml", () => {
    expect(containerVolume("regular")).toBe(2000);
  });
});

describe("hikeDistance", () => {
  it("harder = longer hike", () => {
    expect(hikeDistance(4, 4)).toBeGreaterThan(hikeDistance(1, 1));
  });
});

describe("estimatedTime", () => {
  it("positive hours", () => {
    expect(estimatedTime(3, 3)).toBeGreaterThan(0);
  });
});

describe("gpsAccuracy", () => {
  it("WAAS is more accurate", () => {
    expect(gpsAccuracy(true)).toBeLessThan(gpsAccuracy(false));
  });
});

describe("bearingDeg", () => {
  it("returns 0-360", () => {
    const b = bearingDeg(0, 0, 1, 0);
    expect(b).toBeGreaterThanOrEqual(0);
    expect(b).toBeLessThan(360);
  });
});

describe("distanceKm", () => {
  it("same point is 0", () => {
    expect(distanceKm(0, 0, 0, 0)).toBe(0);
  });

  it("positive for different points", () => {
    expect(distanceKm(0, 0, 1, 1)).toBeGreaterThan(0);
  });
});

describe("projectedCoord", () => {
  it("returns lat/lon", () => {
    const result = projectedCoord(0, 0, 90, 1000);
    expect(result.lat).toBeCloseTo(0, 2);
    expect(result.lon).toBeGreaterThan(0);
  });
});

describe("ftfProbability", () => {
  it("high for fresh cache", () => {
    expect(ftfProbability(1, 0)).toBeGreaterThan(50);
  });

  it("0 for zero hours", () => {
    expect(ftfProbability(0, 0)).toBe(0);
  });
});

describe("swagItems", () => {
  it("nano has 0", () => {
    expect(swagItems("nano")).toBe(0);
  });

  it("regular has items", () => {
    expect(swagItems("regular")).toBeGreaterThan(0);
  });
});

describe("logbookPages", () => {
  it("micro has 1 page", () => {
    expect(logbookPages("micro")).toBe(1);
  });
});

describe("maintenanceVisits", () => {
  it("easy terrain = more visits", () => {
    expect(maintenanceVisits(1)).toBeGreaterThan(maintenanceVisits(5));
  });
});

describe("favoritePoints", () => {
  it("calculates from finds and hides", () => {
    expect(favoritePoints(100, 5)).toBe(15);
  });
});

describe("streakDays", () => {
  it("empty is 0", () => {
    expect(streakDays([])).toBe(0);
  });

  it("consecutive days", () => {
    expect(streakDays(["2024-01-01", "2024-01-02", "2024-01-03"])).toBe(3);
  });
});

describe("cacheTypes", () => {
  it("returns 6 types", () => {
    expect(cacheTypes()).toHaveLength(6);
  });
});

describe("containerSizes", () => {
  it("returns 5 sizes", () => {
    expect(containerSizes()).toHaveLength(5);
  });
});
