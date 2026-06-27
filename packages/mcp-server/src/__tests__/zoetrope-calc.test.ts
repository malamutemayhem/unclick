import { describe, it, expect } from "vitest";
import {
  frameCount, slitCount, drumDiameter, drumHeight, slitWidth,
  rotationSpeed, optimalFps, persistenceOfVision, stripLength,
  frameSpacing, viewingAngle, buildDifficulty, animationTypes,
} from "../zoetrope-calc.js";

describe("frameCount", () => {
  it("walk cycle = 12", () => {
    expect(frameCount("walk_cycle")).toBe(12);
  });
  it("run cycle = 8", () => {
    expect(frameCount("run_cycle")).toBe(8);
  });
});

describe("slitCount", () => {
  it("matches frame count", () => {
    expect(slitCount(12)).toBe(12);
  });
});

describe("drumDiameter", () => {
  it("positive cm", () => {
    expect(drumDiameter(12, 3)).toBeGreaterThan(0);
  });
});

describe("drumHeight", () => {
  it("1.5x frame height", () => {
    expect(drumHeight(5)).toBe(7.5);
  });
});

describe("slitWidth", () => {
  it("10% of frame width", () => {
    expect(slitWidth(3)).toBe(0.3);
  });
});

describe("rotationSpeed", () => {
  it("positive rpm", () => {
    expect(rotationSpeed(12, 12)).toBeGreaterThan(0);
  });
  it("zero frames returns 0", () => {
    expect(rotationSpeed(12, 0)).toBe(0);
  });
});

describe("optimalFps", () => {
  it("is 12", () => {
    expect(optimalFps()).toBe(12);
  });
});

describe("persistenceOfVision", () => {
  it("is 0.04 seconds", () => {
    expect(persistenceOfVision()).toBe(0.04);
  });
});

describe("stripLength", () => {
  it("pi x diameter", () => {
    expect(stripLength(10)).toBeCloseTo(31.4, 0);
  });
});

describe("frameSpacing", () => {
  it("positive spacing", () => {
    expect(frameSpacing(31.4, 12)).toBeGreaterThan(0);
  });
});

describe("viewingAngle", () => {
  it("positive degrees", () => {
    expect(viewingAngle(0.3, 10)).toBeGreaterThan(0);
  });
});

describe("buildDifficulty", () => {
  it("8 frames = easy", () => {
    expect(buildDifficulty(8)).toBe("easy");
  });
  it("16 frames = challenging", () => {
    expect(buildDifficulty(16)).toBe("challenging");
  });
});

describe("animationTypes", () => {
  it("returns 6 types", () => {
    expect(animationTypes()).toHaveLength(6);
  });
});
