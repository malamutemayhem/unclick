import { describe, it, expect } from "vitest";
import {
  mirrorArea, maxRangeKm, flashDurationMs, sunAngle,
  reflectedIntensity, morseTimingMs, divergenceAngle,
  spotDiameterM, transmissionRate, sightingAccuracy, mirrorShapes,
} from "../heliograph-calc.js";

describe("mirrorArea", () => {
  it("circular positive", () => {
    expect(mirrorArea("circular", 20, 0)).toBeGreaterThan(0);
  });
  it("rectangular = l x w", () => {
    expect(mirrorArea("rectangular", 10, 20)).toBe(200);
  });
});

describe("maxRangeKm", () => {
  it("positive range", () => {
    expect(maxRangeKm(15, 10)).toBeGreaterThan(0);
  });
});

describe("flashDurationMs", () => {
  it("positive ms", () => {
    expect(flashDurationMs(20)).toBeGreaterThan(0);
  });
  it("zero wpm = 0", () => {
    expect(flashDurationMs(0)).toBe(0);
  });
});

describe("sunAngle", () => {
  it("returns degrees", () => {
    const angle = sunAngle(45, 0);
    expect(angle).toBeGreaterThan(0);
    expect(angle).toBeLessThan(90);
  });
});

describe("reflectedIntensity", () => {
  it("positive watts", () => {
    expect(reflectedIntensity(1000, 0.9, 100)).toBeGreaterThan(0);
  });
});

describe("morseTimingMs", () => {
  it("dash = 3x dot", () => {
    const t = morseTimingMs(100);
    expect(t.dash).toBe(300);
  });
  it("word gap = 7x unit", () => {
    const t = morseTimingMs(50);
    expect(t.wordGap).toBe(350);
  });
});

describe("divergenceAngle", () => {
  it("positive degrees", () => {
    expect(divergenceAngle(15)).toBeGreaterThan(0);
  });
});

describe("spotDiameterM", () => {
  it("positive meters", () => {
    expect(spotDiameterM(10, 0.5)).toBeGreaterThan(0);
  });
});

describe("transmissionRate", () => {
  it("5 chars per word", () => {
    expect(transmissionRate(20)).toBe(100);
  });
});

describe("sightingAccuracy", () => {
  it("100 at zero range", () => {
    expect(sightingAccuracy(0, 0.9)).toBe(100);
  });
  it("decreases with range", () => {
    expect(sightingAccuracy(50, 0.9)).toBeLessThan(100);
  });
});

describe("mirrorShapes", () => {
  it("returns 3 shapes", () => {
    expect(mirrorShapes()).toHaveLength(3);
  });
});
