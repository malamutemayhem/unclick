import { describe, it, expect } from "vitest";
import {
  signalStrengthDbm, bearingError, huntDuration, transmitterCount,
  antennaElements, wavelengthM, attenuatorSteps, searchRadius,
  scorePoints, huntTypes,
} from "../foxhunt-calc.js";

describe("signalStrengthDbm", () => {
  it("negative dBm at distance", () => {
    expect(signalStrengthDbm(1, 1, 144)).toBeLessThan(0);
  });
  it("zero distance = 0", () => {
    expect(signalStrengthDbm(1, 0, 144)).toBe(0);
  });
});

describe("bearingError", () => {
  it("lower error at high SNR", () => {
    expect(bearingError(20)).toBeLessThan(bearingError(5));
  });
  it("90 deg at 0 SNR", () => {
    expect(bearingError(0)).toBe(90);
  });
});

describe("huntDuration", () => {
  it("classic = 120 min", () => {
    expect(huntDuration("classic")).toBe(120);
  });
});

describe("transmitterCount", () => {
  it("foxoring = 15", () => {
    expect(transmitterCount("foxoring")).toBe(15);
  });
});

describe("antennaElements", () => {
  it("440 MHz = 5 elements", () => {
    expect(antennaElements(440)).toBe(5);
  });
});

describe("wavelengthM", () => {
  it("144 MHz approx 2m", () => {
    expect(wavelengthM(144)).toBeCloseTo(2.08, 1);
  });
});

describe("attenuatorSteps", () => {
  it("is 6", () => {
    expect(attenuatorSteps()).toBe(6);
  });
});

describe("searchRadius", () => {
  it("positive meters", () => {
    expect(searchRadius(1, 144)).toBeGreaterThan(0);
  });
});

describe("scorePoints", () => {
  it("positive score", () => {
    expect(scorePoints(3, 60, 120)).toBeGreaterThan(0);
  });
  it("zero foxes = 0", () => {
    expect(scorePoints(0, 60, 120)).toBe(0);
  });
});

describe("huntTypes", () => {
  it("returns 5 types", () => {
    expect(huntTypes()).toHaveLength(5);
  });
});
