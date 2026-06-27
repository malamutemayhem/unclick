import { describe, it, expect } from "vitest";
import {
  magnification, focalLength, tubeLength, fieldOfView,
  exitPupil, lightGatheringPower, resolution, chromaticAberration,
  drawLength, weightEstimate, spyglassTypes,
} from "../spyglass-calc.js";

describe("magnification", () => {
  it("500/25 = 20x", () => {
    expect(magnification(500, 25)).toBe(20);
  });
  it("zero eyepiece = 0", () => {
    expect(magnification(500, 0)).toBe(0);
  });
});

describe("focalLength", () => {
  it("positive mm", () => {
    expect(focalLength(200, 1.5)).toBeGreaterThan(0);
  });
  it("index 1 = Infinity", () => {
    expect(focalLength(200, 1)).toBe(Infinity);
  });
});

describe("tubeLength", () => {
  it("galilean = difference", () => {
    expect(tubeLength(500, 25, "galilean")).toBe(475);
  });
  it("keplerian = sum", () => {
    expect(tubeLength(500, 25, "keplerian")).toBe(525);
  });
});

describe("fieldOfView", () => {
  it("narrower at higher mag", () => {
    expect(fieldOfView(50, 20)).toBeLessThan(fieldOfView(50, 10));
  });
});

describe("exitPupil", () => {
  it("positive mm", () => {
    expect(exitPupil(50, 10)).toBe(5);
  });
});

describe("lightGatheringPower", () => {
  it("greater than 1 for large objective", () => {
    expect(lightGatheringPower(50)).toBeGreaterThan(1);
  });
});

describe("resolution", () => {
  it("positive arcsec", () => {
    expect(resolution(50)).toBeGreaterThan(0);
  });
  it("zero diameter = 0", () => {
    expect(resolution(0)).toBe(0);
  });
});

describe("chromaticAberration", () => {
  it("achromat = low", () => {
    expect(chromaticAberration("achromat")).toBe("low");
  });
});

describe("drawLength", () => {
  it("divided by sections", () => {
    expect(drawLength(300, 3)).toBe(100);
  });
});

describe("weightEstimate", () => {
  it("positive grams", () => {
    expect(weightEstimate(50, 500)).toBeGreaterThan(0);
  });
});

describe("spyglassTypes", () => {
  it("returns 4 types", () => {
    expect(spyglassTypes()).toHaveLength(4);
  });
});
