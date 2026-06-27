import { describe, it, expect } from "vitest";
import {
  magnification, maxUsefulMag, minUsefulMag, focalRatio,
  exitPupil, trueFov, dawesLimit, limitingMagnitude,
  lightGatheringPower, contrastFactor, cooldownMinutes,
  eyepieceForMag, barlowMag, filterFactor, weightEstimate,
  telescopeTypes,
} from "../telescope-calc.js";

describe("magnification", () => {
  it("focal / eyepiece", () => {
    expect(magnification(1200, 25)).toBe(48);
  });
});

describe("maxUsefulMag", () => {
  it("2x aperture", () => {
    expect(maxUsefulMag(200)).toBe(400);
  });
});

describe("minUsefulMag", () => {
  it("aperture / 7", () => {
    expect(minUsefulMag(70)).toBeCloseTo(10, 0);
  });
});

describe("focalRatio", () => {
  it("focal / aperture", () => {
    expect(focalRatio(1200, 200)).toBe(6);
  });
});

describe("exitPupil", () => {
  it("aperture / mag", () => {
    expect(exitPupil(200, 50)).toBe(4);
  });
});

describe("trueFov", () => {
  it("apparent / mag", () => {
    expect(trueFov(68, 100)).toBe(0.68);
  });
});

describe("dawesLimit", () => {
  it("positive arcsec", () => {
    expect(dawesLimit(200)).toBeCloseTo(0.58, 1);
  });
});

describe("limitingMagnitude", () => {
  it("bigger scope sees fainter", () => {
    expect(limitingMagnitude(200)).toBeGreaterThan(limitingMagnitude(100));
  });
});

describe("lightGatheringPower", () => {
  it("scales with area", () => {
    expect(lightGatheringPower(200)).toBeGreaterThan(lightGatheringPower(100));
  });
});

describe("contrastFactor", () => {
  it("1 with no obstruction", () => {
    expect(contrastFactor(200, 0)).toBe(1);
  });

  it("less with obstruction", () => {
    expect(contrastFactor(200, 70)).toBeLessThan(1);
  });
});

describe("cooldownMinutes", () => {
  it("positive for large scope", () => {
    expect(cooldownMinutes(300, 15)).toBeGreaterThan(0);
  });
});

describe("eyepieceForMag", () => {
  it("returns mm", () => {
    expect(eyepieceForMag(1200, 100)).toBe(12);
  });
});

describe("barlowMag", () => {
  it("doubles with 2x barlow", () => {
    expect(barlowMag(50, 2)).toBe(100);
  });
});

describe("filterFactor", () => {
  it("solar is very low", () => {
    expect(filterFactor("solar")).toBeLessThan(0.001);
  });
});

describe("weightEstimate", () => {
  it("positive kg", () => {
    expect(weightEstimate(200, "reflector")).toBeGreaterThan(0);
  });
});

describe("telescopeTypes", () => {
  it("returns 4 types", () => {
    expect(telescopeTypes()).toHaveLength(4);
  });
});
