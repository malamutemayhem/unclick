import { describe, it, expect } from "vitest";
import {
  baseDiameterCm, heightCm, windowCount, ventilationCfm,
  lightTransmissionPercent, weathervaneHeight, roofAreaCm2,
  copperSheetingKg, structuralLoadKn, maintenanceIntervalYears, cupolaShapes,
} from "../cupola-calc.js";

describe("baseDiameterCm", () => {
  it("15% of roof span", () => {
    expect(baseDiameterCm(10)).toBe(150);
  });
});

describe("heightCm", () => {
  it("onion tallest", () => {
    expect(heightCm(150, "onion")).toBeGreaterThan(heightCm(150, "square"));
  });
});

describe("windowCount", () => {
  it("round has 8", () => {
    expect(windowCount("round")).toBe(8);
  });
  it("square has 4", () => {
    expect(windowCount("square")).toBe(4);
  });
});

describe("ventilationCfm", () => {
  it("positive cfm", () => {
    expect(ventilationCfm(8, 2000)).toBeGreaterThan(0);
  });
});

describe("lightTransmissionPercent", () => {
  it("positive percent", () => {
    expect(lightTransmissionPercent(16000, 200000)).toBeGreaterThan(0);
  });
  it("zero floor = 0", () => {
    expect(lightTransmissionPercent(16000, 0)).toBe(0);
  });
});

describe("weathervaneHeight", () => {
  it("40% of cupola", () => {
    expect(weathervaneHeight(100)).toBe(40);
  });
});

describe("roofAreaCm2", () => {
  it("onion largest", () => {
    expect(roofAreaCm2(150, "onion")).toBeGreaterThan(roofAreaCm2(150, "square"));
  });
});

describe("copperSheetingKg", () => {
  it("positive kg", () => {
    expect(copperSheetingKg(50000, 0.6)).toBeGreaterThan(0);
  });
});

describe("structuralLoadKn", () => {
  it("positive kn", () => {
    expect(structuralLoadKn(500)).toBeGreaterThan(0);
  });
});

describe("maintenanceIntervalYears", () => {
  it("round longest", () => {
    expect(maintenanceIntervalYears("round")).toBeGreaterThan(maintenanceIntervalYears("onion"));
  });
});

describe("cupolaShapes", () => {
  it("returns 5 shapes", () => {
    expect(cupolaShapes()).toHaveLength(5);
  });
});
