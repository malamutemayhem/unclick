import { describe, it, expect } from "vitest";
import {
  beadDiameterMm, reelSpacingMm, patternRepeatMm, beadCount,
  carvingDepthMm, carvingTimeHours, moldingLengthM, gildingAreaCm2,
  paintVolumeMl, weatheringResistance, astragalProfiles,
} from "../astragal-calc.js";

describe("beadDiameterMm", () => {
  it("0.8x column diameter", () => {
    expect(beadDiameterMm(50)).toBe(40);
  });
});

describe("reelSpacingMm", () => {
  it("0.6x bead", () => {
    expect(reelSpacingMm(40)).toBe(24);
  });
});

describe("patternRepeatMm", () => {
  it("sum of bead and reel", () => {
    expect(patternRepeatMm(40, 24)).toBe(64);
  });
});

describe("beadCount", () => {
  it("positive count", () => {
    expect(beadCount(157, 64)).toBeGreaterThan(0);
  });
  it("zero repeat = 0", () => {
    expect(beadCount(157, 0)).toBe(0);
  });
});

describe("carvingDepthMm", () => {
  it("torus deepest", () => {
    expect(carvingDepthMm("torus")).toBeGreaterThan(carvingDepthMm("fillet"));
  });
});

describe("carvingTimeHours", () => {
  it("bead-and-reel slowest", () => {
    expect(carvingTimeHours(20, "bead-and-reel")).toBeGreaterThan(carvingTimeHours(20, "reel"));
  });
});

describe("moldingLengthM", () => {
  it("positive length", () => {
    expect(moldingLengthM(157, 3)).toBeGreaterThan(0);
  });
});

describe("gildingAreaCm2", () => {
  it("positive area", () => {
    expect(gildingAreaCm2(40, 24)).toBeGreaterThan(0);
  });
});

describe("paintVolumeMl", () => {
  it("positive volume", () => {
    expect(paintVolumeMl(5000, 2)).toBeGreaterThan(0);
  });
});

describe("weatheringResistance", () => {
  it("sheltered better", () => {
    expect(weatheringResistance("bead", true)).toBeGreaterThan(weatheringResistance("bead", false));
  });
});

describe("astragalProfiles", () => {
  it("returns 5 profiles", () => {
    expect(astragalProfiles()).toHaveLength(5);
  });
});
