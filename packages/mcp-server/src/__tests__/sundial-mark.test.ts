import { describe, it, expect } from "vitest";
import {
  gnomonAngle, gnomonLength, hourLineAngle, dialDiameterCm,
  shadowLengthCm, eotCorrectionMin, longitudeCorrectionMin,
  dialPlateArea, accuracyMinutes, inscriptionCount, dialTypes,
} from "../sundial-mark.js";

describe("gnomonAngle", () => {
  it("equals latitude", () => {
    expect(gnomonAngle(45)).toBe(45);
  });
  it("absolute for south", () => {
    expect(gnomonAngle(-33.8)).toBe(33.8);
  });
});

describe("gnomonLength", () => {
  it("positive length", () => {
    expect(gnomonLength(15, 45)).toBeGreaterThan(15);
  });
});

describe("hourLineAngle", () => {
  it("noon is zero", () => {
    expect(hourLineAngle(0, 45)).toBe(0);
  });
  it("positive for afternoon", () => {
    expect(hourLineAngle(3, 45)).toBeGreaterThan(0);
  });
});

describe("dialDiameterCm", () => {
  it("positive cm", () => {
    expect(dialDiameterCm(5)).toBe(17.5);
  });
});

describe("shadowLengthCm", () => {
  it("positive length", () => {
    expect(shadowLengthCm(10, 45)).toBeGreaterThan(0);
  });
  it("zero altitude = 0", () => {
    expect(shadowLengthCm(10, 0)).toBe(0);
  });
});

describe("eotCorrectionMin", () => {
  it("returns a number", () => {
    const eot = eotCorrectionMin(172);
    expect(typeof eot).toBe("number");
  });
});

describe("longitudeCorrectionMin", () => {
  it("positive correction", () => {
    expect(longitudeCorrectionMin(144, 150)).toBeGreaterThan(0);
  });
});

describe("dialPlateArea", () => {
  it("positive area", () => {
    expect(dialPlateArea(15)).toBeGreaterThan(0);
  });
});

describe("accuracyMinutes", () => {
  it("equatorial most accurate", () => {
    expect(accuracyMinutes("equatorial")).toBeLessThan(accuracyMinutes("horizontal"));
  });
});

describe("inscriptionCount", () => {
  it("sums all marks", () => {
    expect(inscriptionCount(12, 60, 12)).toBe(84);
  });
});

describe("dialTypes", () => {
  it("returns 5 types", () => {
    expect(dialTypes()).toHaveLength(5);
  });
});
