import { describe, it, expect } from "vitest";
import {
  gatherWeightG, workingTemperatureCelsius, annealingTemperatureCelsius,
  annealingHours, blowpipeLengthCm, marveredThicknessMm, colorantPercent,
  reheatingCycles, thermalShockResistance, materialCostPerKg, glassTypes,
} from "../glassblowing-calc.js";

describe("gatherWeightG", () => {
  it("larger diameter = heavier gather", () => {
    expect(gatherWeightG(20)).toBeGreaterThan(gatherWeightG(10));
  });
  it("cubic relationship", () => {
    expect(gatherWeightG(10)).toBeCloseTo(12, 0);
  });
});

describe("workingTemperatureCelsius", () => {
  it("borosilicate hottest", () => {
    expect(workingTemperatureCelsius("borosilicate")).toBeGreaterThan(
      workingTemperatureCelsius("lead")
    );
  });
});

describe("annealingTemperatureCelsius", () => {
  it("borosilicate highest annealing", () => {
    expect(annealingTemperatureCelsius("borosilicate")).toBeGreaterThan(
      annealingTemperatureCelsius("lead")
    );
  });
});

describe("annealingHours", () => {
  it("thicker = longer annealing", () => {
    expect(annealingHours(10)).toBeGreaterThan(annealingHours(5));
  });
  it("minimum baseline of 2 hours", () => {
    expect(annealingHours(0)).toBe(2);
  });
});

describe("blowpipeLengthCm", () => {
  it("heavier gather = longer pipe", () => {
    expect(blowpipeLengthCm(500)).toBeGreaterThan(blowpipeLengthCm(100));
  });
  it("baseline 100cm", () => {
    expect(blowpipeLengthCm(0)).toBe(100);
  });
});

describe("marveredThicknessMm", () => {
  it("positive for valid inputs", () => {
    expect(marveredThicknessMm(200, 10)).toBeGreaterThan(0);
  });
  it("zero diameter returns zero", () => {
    expect(marveredThicknessMm(200, 0)).toBe(0);
  });
});

describe("colorantPercent", () => {
  it("forest glass has most colorant", () => {
    expect(colorantPercent("forest")).toBeGreaterThan(colorantPercent("borosilicate"));
  });
});

describe("reheatingCycles", () => {
  it("complex needs most reheats", () => {
    expect(reheatingCycles("complex")).toBeGreaterThan(reheatingCycles("simple"));
  });
});

describe("thermalShockResistance", () => {
  it("borosilicate best resistance", () => {
    expect(thermalShockResistance("borosilicate")).toBeGreaterThan(
      thermalShockResistance("lead")
    );
  });
});

describe("materialCostPerKg", () => {
  it("lead most expensive", () => {
    expect(materialCostPerKg("lead", 10)).toBeGreaterThan(
      materialCostPerKg("soda_lime", 10)
    );
  });
});

describe("glassTypes", () => {
  it("returns 5 types", () => {
    expect(glassTypes()).toHaveLength(5);
  });
});
