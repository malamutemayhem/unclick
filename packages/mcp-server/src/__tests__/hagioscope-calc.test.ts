import { describe, it, expect } from "vitest";
import {
  openingWidthCm, openingHeightCm, splayAngleDeg, channelLengthCm,
  viewingAreaCm2, sightLineLengthM, stoneRemovalVolumeCm3, carvingHours,
  lightTransmissionPercent, restorationCost, hagioscopeAngles,
} from "../hagioscope-calc.js";

describe("openingWidthCm", () => {
  it("15% of wall thickness", () => {
    expect(openingWidthCm(60)).toBe(9);
  });
});

describe("openingHeightCm", () => {
  it("2.5x width", () => {
    expect(openingHeightCm(9)).toBe(22.5);
  });
});

describe("splayAngleDeg", () => {
  it("wide > narrow", () => {
    expect(splayAngleDeg("wide")).toBeGreaterThan(splayAngleDeg("narrow"));
  });
});

describe("channelLengthCm", () => {
  it("equals wall thickness", () => {
    expect(channelLengthCm(60)).toBe(60);
  });
});

describe("viewingAreaCm2", () => {
  it("positive area", () => {
    expect(viewingAreaCm2(9, 22.5)).toBeGreaterThan(0);
  });
});

describe("sightLineLengthM", () => {
  it("positive length", () => {
    expect(sightLineLengthM(60, 30)).toBeGreaterThan(0);
  });
});

describe("stoneRemovalVolumeCm3", () => {
  it("positive volume", () => {
    expect(stoneRemovalVolumeCm3(9, 22.5, 60)).toBeGreaterThan(0);
  });
});

describe("carvingHours", () => {
  it("double type longest", () => {
    expect(carvingHours(60, "double")).toBeGreaterThan(carvingHours(60, "narrow"));
  });
});

describe("lightTransmissionPercent", () => {
  it("capped at 80", () => {
    expect(lightTransmissionPercent(100, 50)).toBeLessThanOrEqual(80);
  });
  it("positive value", () => {
    expect(lightTransmissionPercent(9, 60)).toBeGreaterThan(0);
  });
});

describe("restorationCost", () => {
  it("positive cost", () => {
    expect(restorationCost(60, 50)).toBeGreaterThan(0);
  });
});

describe("hagioscopeAngles", () => {
  it("returns 5 angles", () => {
    expect(hagioscopeAngles()).toHaveLength(5);
  });
});
