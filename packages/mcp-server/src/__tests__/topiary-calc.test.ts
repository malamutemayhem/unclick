import { describe, it, expect } from "vitest";
import {
  growthRate, trimFrequency, frameSize, maturityYears,
  wateringLiters, fertilizerGrams, clippingsVolume, shearBlade,
  frostProtection, sunlightHours, difficulty, topiaryShapes,
} from "../topiary-calc.js";

describe("growthRate", () => {
  it("privet fastest", () => {
    expect(growthRate("privet")).toBeGreaterThan(growthRate("boxwood"));
  });
});

describe("trimFrequency", () => {
  it("privet needs most trims", () => {
    expect(trimFrequency("privet")).toBeGreaterThan(trimFrequency("yew"));
  });
});

describe("frameSize", () => {
  it("larger than plant height", () => {
    expect(frameSize("sphere", 100)).toBeGreaterThan(100);
  });
});

describe("maturityYears", () => {
  it("animal takes longest", () => {
    expect(maturityYears("animal", "boxwood")).toBeGreaterThan(maturityYears("cone", "boxwood"));
  });
});

describe("wateringLiters", () => {
  it("positive liters", () => {
    expect(wateringLiters(100)).toBeGreaterThan(0);
  });
});

describe("fertilizerGrams", () => {
  it("spring needs most", () => {
    expect(fertilizerGrams(100, "spring")).toBeGreaterThan(fertilizerGrams(100, "fall"));
  });
});

describe("clippingsVolume", () => {
  it("positive liters", () => {
    expect(clippingsVolume(5000, 2)).toBeGreaterThan(0);
  });
});

describe("shearBlade", () => {
  it("fine = topiary scissors", () => {
    expect(shearBlade("fine")).toContain("scissors");
  });
});

describe("frostProtection", () => {
  it("myrtle needs protection", () => {
    expect(frostProtection("myrtle")).toBe(true);
  });
  it("boxwood does not", () => {
    expect(frostProtection("boxwood")).toBe(false);
  });
});

describe("sunlightHours", () => {
  it("rosemary needs most sun", () => {
    expect(sunlightHours("rosemary")).toBeGreaterThan(sunlightHours("boxwood"));
  });
});

describe("difficulty", () => {
  it("animal hardest", () => {
    expect(difficulty("animal")).toBeGreaterThan(difficulty("cone"));
  });
});

describe("topiaryShapes", () => {
  it("returns 6 shapes", () => {
    expect(topiaryShapes()).toHaveLength(6);
  });
});
