import { describe, it, expect } from "vitest";
import {
  windowCount, windowHeight, windowArea, lightGainPercent,
  glazingWeight, heatLossWatts, structuralLoadKn, ventilationCfm,
  rainProtectionAngle, maintenanceCostPerYear, glazingTypes,
} from "../clerestory-calc.js";

describe("windowCount", () => {
  it("positive count", () => {
    expect(windowCount(20, 2.5)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(windowCount(20, 0)).toBe(0);
  });
});

describe("windowHeight", () => {
  it("positive height", () => {
    expect(windowHeight(4, 0.7)).toBeGreaterThan(0);
  });
});

describe("windowArea", () => {
  it("positive area", () => {
    expect(windowArea(1.5, 1.2, 8)).toBeGreaterThan(0);
  });
});

describe("lightGainPercent", () => {
  it("positive percent", () => {
    expect(lightGainPercent(14.4, 200)).toBeGreaterThan(0);
  });
  it("zero floor = 0", () => {
    expect(lightGainPercent(14.4, 0)).toBe(0);
  });
});

describe("glazingWeight", () => {
  it("tracery heaviest", () => {
    expect(glazingWeight(10, "tracery")).toBeGreaterThan(glazingWeight(10, "plain"));
  });
});

describe("heatLossWatts", () => {
  it("positive watts", () => {
    expect(heatLossWatts(14.4, 5.5, 20)).toBeGreaterThan(0);
  });
});

describe("structuralLoadKn", () => {
  it("positive kn", () => {
    expect(structuralLoadKn(1.5, 300)).toBeGreaterThan(0);
  });
});

describe("ventilationCfm", () => {
  it("positive cfm", () => {
    expect(ventilationCfm(2, 3)).toBeGreaterThan(0);
  });
});

describe("rainProtectionAngle", () => {
  it("positive angle", () => {
    expect(rainProtectionAngle(30, 120)).toBeGreaterThan(0);
  });
  it("zero height = 0", () => {
    expect(rainProtectionAngle(30, 0)).toBe(0);
  });
});

describe("maintenanceCostPerYear", () => {
  it("tracery most expensive", () => {
    expect(maintenanceCostPerYear(8, "tracery")).toBeGreaterThan(maintenanceCostPerYear(8, "plain"));
  });
});

describe("glazingTypes", () => {
  it("returns 5 types", () => {
    expect(glazingTypes()).toHaveLength(5);
  });
});
