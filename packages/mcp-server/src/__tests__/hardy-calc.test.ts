import { describe, it, expect } from "vitest";
import {
  shankSizeMm, shankLengthMm, cuttingEdgeAngleDeg, toolSteelGrade,
  hardeningTemperatureCelsius, temperingTemperatureCelsius,
  expectedLifeCuts, forgingTimeMinutes, weightG, hardyTools,
} from "../hardy-calc.js";

describe("shankSizeMm", () => {
  it("slightly smaller than hardy hole", () => {
    expect(shankSizeMm(25)).toBe(24.5);
  });
});

describe("shankLengthMm", () => {
  it("1.5x hardy hole size", () => {
    expect(shankLengthMm(20)).toBe(30);
  });
});

describe("cuttingEdgeAngleDeg", () => {
  it("cold cut has steeper angle", () => {
    expect(cuttingEdgeAngleDeg("cold_cut")).toBeGreaterThan(
      cuttingEdgeAngleDeg("hot_cut")
    );
  });
  it("fuller has no cutting edge", () => {
    expect(cuttingEdgeAngleDeg("fuller")).toBe(0);
  });
});

describe("toolSteelGrade", () => {
  it("hot cut uses H13", () => {
    expect(toolSteelGrade("hot_cut")).toBe("H13");
  });
  it("cold cut uses S7", () => {
    expect(toolSteelGrade("cold_cut")).toBe("S7");
  });
});

describe("hardeningTemperatureCelsius", () => {
  it("hot cut needs highest temp", () => {
    expect(hardeningTemperatureCelsius("hot_cut")).toBeGreaterThan(
      hardeningTemperatureCelsius("cold_cut")
    );
  });
});

describe("temperingTemperatureCelsius", () => {
  it("hot cut tempered highest", () => {
    expect(temperingTemperatureCelsius("hot_cut")).toBeGreaterThan(
      temperingTemperatureCelsius("cold_cut")
    );
  });
});

describe("expectedLifeCuts", () => {
  it("fuller lasts longest", () => {
    expect(expectedLifeCuts("fuller")).toBeGreaterThan(expectedLifeCuts("cold_cut"));
  });
});

describe("forgingTimeMinutes", () => {
  it("cold cut takes longest", () => {
    expect(forgingTimeMinutes("cold_cut")).toBeGreaterThan(
      forgingTimeMinutes("flatter")
    );
  });
});

describe("weightG", () => {
  it("flatter is heaviest", () => {
    expect(weightG("flatter")).toBeGreaterThan(weightG("fuller"));
  });
});

describe("hardyTools", () => {
  it("returns 5 tools", () => {
    expect(hardyTools()).toHaveLength(5);
  });
});
