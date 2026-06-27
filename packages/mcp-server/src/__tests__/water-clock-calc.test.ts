import { describe, it, expect } from "vitest";
import {
  vesselVolumeMl, orificeDiameterMm, headPressurePa,
  flowRateVariationPercent, accuracyMinutesPerDay, markerCount,
  vesselMaterial, temperatureSensitivity, maintenanceIntervalDays,
  constructionCost, clockTypes,
} from "../water-clock-calc.js";

describe("vesselVolumeMl", () => {
  it("longer duration = more volume", () => {
    expect(vesselVolumeMl(60, 5)).toBeGreaterThan(vesselVolumeMl(30, 5));
  });
});

describe("orificeDiameterMm", () => {
  it("higher flow = larger orifice", () => {
    expect(orificeDiameterMm(10)).toBeGreaterThan(orificeDiameterMm(2));
  });
});

describe("headPressurePa", () => {
  it("higher column = more pressure", () => {
    expect(headPressurePa(20)).toBeGreaterThan(headPressurePa(10));
  });
});

describe("flowRateVariationPercent", () => {
  it("feedback has least variation", () => {
    expect(flowRateVariationPercent("feedback")).toBeLessThan(
      flowRateVariationPercent("sinking_bowl")
    );
  });
});

describe("accuracyMinutesPerDay", () => {
  it("feedback most accurate", () => {
    expect(accuracyMinutesPerDay("feedback")).toBeLessThan(
      accuracyMinutesPerDay("sinking_bowl")
    );
  });
});

describe("markerCount", () => {
  it("12 hours = 48 markers", () => {
    expect(markerCount(12)).toBe(48);
  });
});

describe("vesselMaterial", () => {
  it("outflow uses ceramic", () => {
    expect(vesselMaterial("outflow")).toBe("ceramic");
  });
});

describe("temperatureSensitivity", () => {
  it("mercury least sensitive", () => {
    expect(temperatureSensitivity("mercury")).toBeLessThan(
      temperatureSensitivity("sinking_bowl")
    );
  });
});

describe("maintenanceIntervalDays", () => {
  it("mercury least maintenance", () => {
    expect(maintenanceIntervalDays("mercury")).toBeGreaterThan(
      maintenanceIntervalDays("sinking_bowl")
    );
  });
});

describe("constructionCost", () => {
  it("mercury most expensive", () => {
    expect(constructionCost("mercury", 100)).toBeGreaterThan(
      constructionCost("sinking_bowl", 100)
    );
  });
});

describe("clockTypes", () => {
  it("returns 5 types", () => {
    expect(clockTypes()).toHaveLength(5);
  });
});
