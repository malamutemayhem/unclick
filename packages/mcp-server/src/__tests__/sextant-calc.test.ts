import { describe, it, expect } from "vitest";
import {
  altitudeCorrection, dipCorrection, refractionCorrection, indexError,
  latitude, noonLatitude, distanceToHorizonKm, arcToTime,
  timeToArc, interceptDistance, accuracy, celestialBodies,
} from "../sextant-calc.js";

describe("altitudeCorrection", () => {
  it("less than observed", () => {
    expect(altitudeCorrection(45, 3)).toBeLessThan(45);
  });
});

describe("dipCorrection", () => {
  it("positive correction", () => {
    expect(dipCorrection(3)).toBeGreaterThan(0);
  });
});

describe("refractionCorrection", () => {
  it("positive correction", () => {
    expect(refractionCorrection(30)).toBeGreaterThan(0);
  });
  it("zero at 0 deg", () => {
    expect(refractionCorrection(0)).toBe(0);
  });
});

describe("indexError", () => {
  it("half of difference", () => {
    expect(indexError(3, 1)).toBe(1);
  });
});

describe("latitude", () => {
  it("equals polaris altitude", () => {
    expect(latitude(45)).toBe(45);
  });
});

describe("noonLatitude", () => {
  it("correct calculation", () => {
    expect(noonLatitude(23.4, 68.4)).toBeCloseTo(45, 0);
  });
});

describe("distanceToHorizonKm", () => {
  it("positive distance", () => {
    expect(distanceToHorizonKm(10)).toBeGreaterThan(0);
  });
});

describe("arcToTime", () => {
  it("1 arcmin = 4 seconds", () => {
    expect(arcToTime(1)).toBe(4);
  });
});

describe("timeToArc", () => {
  it("4 seconds = 1 arcmin", () => {
    expect(timeToArc(4)).toBe(1);
  });
});

describe("interceptDistance", () => {
  it("positive when observed > computed", () => {
    expect(interceptDistance(45, 45.5)).toBeGreaterThan(0);
  });
});

describe("accuracy", () => {
  it("expert = 0.1 arcmin", () => {
    expect(accuracy("expert")).toBe(0.1);
  });
  it("beginner = 2.0 arcmin", () => {
    expect(accuracy("beginner")).toBe(2.0);
  });
});

describe("celestialBodies", () => {
  it("returns 6 bodies", () => {
    expect(celestialBodies()).toHaveLength(6);
  });
});
