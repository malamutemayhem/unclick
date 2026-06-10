import { describe, it, expect } from "vitest";
import {
  openingWidth, openingHeight, sillHeight, fieldOfFireDeg,
  ventilationArea, coverPercent, defenseRating, shutterArea,
  weatheringDepthMm, repairStonesNeeded, crenelProfiles,
} from "../crenel-calc.js";

describe("openingWidth", () => {
  it("40% of wall", () => {
    expect(openingWidth(100)).toBe(40);
  });
});

describe("openingHeight", () => {
  it("70% of merlon", () => {
    expect(openingHeight(100)).toBe(70);
  });
});

describe("sillHeight", () => {
  it("65% of wall", () => {
    expect(sillHeight(200)).toBe(130);
  });
});

describe("fieldOfFireDeg", () => {
  it("positive degrees", () => {
    expect(fieldOfFireDeg(40, 100)).toBeGreaterThan(0);
  });
  it("zero wall = 0", () => {
    expect(fieldOfFireDeg(40, 0)).toBe(0);
  });
});

describe("ventilationArea", () => {
  it("positive area", () => {
    expect(ventilationArea(40, 70, 10)).toBeGreaterThan(0);
  });
});

describe("coverPercent", () => {
  it("between 0 and 100", () => {
    const pct = coverPercent(60, 40);
    expect(pct).toBeGreaterThan(0);
    expect(pct).toBeLessThan(100);
  });
});

describe("defenseRating", () => {
  it("loophole strongest", () => {
    expect(defenseRating(100, "loophole")).toBeGreaterThan(defenseRating(100, "rectangular"));
  });
});

describe("shutterArea", () => {
  it("positive area", () => {
    expect(shutterArea(40, 70)).toBeGreaterThan(0);
  });
});

describe("weatheringDepthMm", () => {
  it("positive depth", () => {
    expect(weatheringDepthMm(100, 2)).toBeGreaterThan(0);
  });
});

describe("repairStonesNeeded", () => {
  it("more than damaged", () => {
    expect(repairStonesNeeded(10, 5000)).toBeGreaterThan(10);
  });
});

describe("crenelProfiles", () => {
  it("returns 5 profiles", () => {
    expect(crenelProfiles()).toHaveLength(5);
  });
});
