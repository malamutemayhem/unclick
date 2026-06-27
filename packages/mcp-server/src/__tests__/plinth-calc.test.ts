import { describe, it, expect } from "vitest";
import {
  heightCm, widthCm, volumeCm3, weightKg,
  bearingPressureKpa, moldingSteps, carvingHours, shimThicknessMm,
  moistureBarrierLayers, repairCost, plinthStyles,
} from "../plinth-calc.js";

describe("heightCm", () => {
  it("10% of column", () => {
    expect(heightCm(300)).toBe(30);
  });
});

describe("widthCm", () => {
  it("1.5x column diameter", () => {
    expect(widthCm(40)).toBe(60);
  });
});

describe("volumeCm3", () => {
  it("positive volume", () => {
    expect(volumeCm3(60, 60, 30)).toBeGreaterThan(0);
  });
});

describe("weightKg", () => {
  it("positive weight", () => {
    expect(weightKg(108000, 2.7)).toBeGreaterThan(0);
  });
});

describe("bearingPressureKpa", () => {
  it("positive pressure", () => {
    expect(bearingPressureKpa(5000, 0.36)).toBeGreaterThan(0);
  });
  it("zero area = 0", () => {
    expect(bearingPressureKpa(5000, 0)).toBe(0);
  });
});

describe("moldingSteps", () => {
  it("composite most steps", () => {
    expect(moldingSteps("composite")).toBeGreaterThan(moldingSteps("modern"));
  });
});

describe("carvingHours", () => {
  it("positive hours", () => {
    expect(carvingHours(5000, 3)).toBeGreaterThan(0);
  });
});

describe("shimThicknessMm", () => {
  it("positive thickness", () => {
    expect(shimThicknessMm(5, 1.5)).toBe(7.5);
  });
});

describe("moistureBarrierLayers", () => {
  it("no contact = 0", () => {
    expect(moistureBarrierLayers(false, 80)).toBe(0);
  });
  it("high humidity = 3", () => {
    expect(moistureBarrierLayers(true, 80)).toBe(3);
  });
});

describe("repairCost", () => {
  it("positive cost", () => {
    expect(repairCost(20, 500)).toBeGreaterThan(0);
  });
});

describe("plinthStyles", () => {
  it("returns 5 styles", () => {
    expect(plinthStyles()).toHaveLength(5);
  });
});
