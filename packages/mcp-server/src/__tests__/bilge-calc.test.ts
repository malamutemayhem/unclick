import { describe, it, expect } from "vitest";
import {
  volumeLiters, pumpRateLpm, pumpTimeMinutes, leakRateLph,
  strumBoxSizeCm, hoseInternalDiameterCm, limberHoleCount,
  alarmLevelCm, maintenanceIntervalDays, installCost, bilgePumpTypes,
} from "../bilge-calc.js";

describe("volumeLiters", () => {
  it("positive volume", () => {
    expect(volumeLiters(10, 3, 20)).toBeGreaterThan(0);
  });
});

describe("pumpRateLpm", () => {
  it("centrifugal fastest", () => {
    expect(pumpRateLpm("centrifugal")).toBeGreaterThan(pumpRateLpm("hand"));
  });
});

describe("pumpTimeMinutes", () => {
  it("positive time", () => {
    expect(pumpTimeMinutes(100, 30)).toBeGreaterThan(0);
  });
  it("zero rate = 0", () => {
    expect(pumpTimeMinutes(100, 0)).toBe(0);
  });
});

describe("leakRateLph", () => {
  it("poor worst", () => {
    expect(leakRateLph("poor")).toBeGreaterThan(leakRateLph("good"));
  });
});

describe("strumBoxSizeCm", () => {
  it("3x pipe diameter", () => {
    expect(strumBoxSizeCm(5)).toBe(15);
  });
});

describe("hoseInternalDiameterCm", () => {
  it("positive diameter", () => {
    expect(hoseInternalDiameterCm(30)).toBeGreaterThan(2);
  });
});

describe("limberHoleCount", () => {
  it("equals frame count", () => {
    expect(limberHoleCount(20)).toBe(20);
  });
});

describe("alarmLevelCm", () => {
  it("30% of max depth", () => {
    expect(alarmLevelCm(30)).toBe(9);
  });
});

describe("maintenanceIntervalDays", () => {
  it("centrifugal longest interval", () => {
    expect(maintenanceIntervalDays("centrifugal")).toBeGreaterThan(
      maintenanceIntervalDays("windmill")
    );
  });
});

describe("installCost", () => {
  it("centrifugal most expensive", () => {
    expect(installCost("centrifugal", 500)).toBeGreaterThan(installCost("hand", 500));
  });
});

describe("bilgePumpTypes", () => {
  it("returns 5 pump types", () => {
    expect(bilgePumpTypes()).toHaveLength(5);
  });
});
