import { describe, it, expect } from "vitest";
import {
  lengthM, sectionSizeCm, weightKg, jointCount,
  jointStrengthPercent, rafterBirdsmouthDepthCm, sagMm,
  camberMm, purglinCount, installCrewSize, ridgeJoints,
} from "../ridgepole-calc.js";

describe("lengthM", () => {
  it("longer than building", () => {
    expect(lengthM(12, 0.5)).toBeGreaterThan(12);
  });
});

describe("sectionSizeCm", () => {
  it("positive cm", () => {
    expect(sectionSizeCm(8, 50)).toBeGreaterThan(0);
  });
});

describe("weightKg", () => {
  it("positive weight", () => {
    expect(weightKg(13, 20, 500)).toBeGreaterThan(0);
  });
});

describe("jointCount", () => {
  it("positive count for long ridge", () => {
    expect(jointCount(13, 4)).toBeGreaterThan(0);
  });
  it("zero timber length = 0", () => {
    expect(jointCount(13, 0)).toBe(0);
  });
});

describe("jointStrengthPercent", () => {
  it("bolted strongest", () => {
    expect(jointStrengthPercent("bolted")).toBeGreaterThan(jointStrengthPercent("butt"));
  });
});

describe("rafterBirdsmouthDepthCm", () => {
  it("30% of rafter", () => {
    expect(rafterBirdsmouthDepthCm(20)).toBe(6);
  });
});

describe("sagMm", () => {
  it("positive sag", () => {
    expect(sagMm(13, 50, 100000)).toBeGreaterThan(0);
  });
  it("zero EI = 0", () => {
    expect(sagMm(13, 50, 0)).toBe(0);
  });
});

describe("camberMm", () => {
  it("positive camber", () => {
    expect(camberMm(13)).toBeGreaterThan(0);
  });
});

describe("purglinCount", () => {
  it("positive count", () => {
    expect(purglinCount(8, 2)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(purglinCount(8, 0)).toBe(0);
  });
});

describe("installCrewSize", () => {
  it("light = 2", () => {
    expect(installCrewSize(5, 40)).toBe(2);
  });
  it("heavy needs more", () => {
    expect(installCrewSize(13, 300)).toBeGreaterThan(4);
  });
});

describe("ridgeJoints", () => {
  it("returns 5 joints", () => {
    expect(ridgeJoints()).toHaveLength(5);
  });
});
