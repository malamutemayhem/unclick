import { describe, it, expect } from "vitest";
import {
  periodSeconds, lengthForPeriodM, beatsPerHour, bobWeightKg,
  temperatureCompensation, arcDegrees, drivingWeightKg,
  accuracySecondsPerDay, costEstimate, pendulumTypes,
} from "../pendulum-clock-calc.js";

describe("periodSeconds", () => {
  it("1m pendulum close to 2 seconds", () => {
    expect(periodSeconds(1)).toBeCloseTo(2.006, 1);
  });
});

describe("lengthForPeriodM", () => {
  it("2 second period close to 1m", () => {
    expect(lengthForPeriodM(2)).toBeCloseTo(0.994, 1);
  });
});

describe("beatsPerHour", () => {
  it("1 second period = 3600 bph", () => {
    expect(beatsPerHour(1)).toBe(3600);
  });
  it("zero period returns 0", () => {
    expect(beatsPerHour(0)).toBe(0);
  });
});

describe("bobWeightKg", () => {
  it("royal is heaviest", () => {
    expect(bobWeightKg("royal")).toBeGreaterThan(bobWeightKg("seconds"));
  });
});

describe("temperatureCompensation", () => {
  it("gridiron is compensated", () => {
    expect(temperatureCompensation("gridiron")).toBe(true);
  });
  it("seconds is not compensated", () => {
    expect(temperatureCompensation("seconds")).toBe(false);
  });
});

describe("arcDegrees", () => {
  it("half seconds has widest arc", () => {
    expect(arcDegrees("half_seconds")).toBeGreaterThan(arcDegrees("royal"));
  });
});

describe("drivingWeightKg", () => {
  it("royal needs heaviest weight", () => {
    expect(drivingWeightKg("royal")).toBeGreaterThan(drivingWeightKg("half_seconds"));
  });
});

describe("accuracySecondsPerDay", () => {
  it("mercury is most accurate", () => {
    expect(accuracySecondsPerDay("mercury")).toBeLessThan(
      accuracySecondsPerDay("seconds")
    );
  });
});

describe("costEstimate", () => {
  it("royal is most expensive", () => {
    expect(costEstimate("royal")).toBeGreaterThan(costEstimate("half_seconds"));
  });
});

describe("pendulumTypes", () => {
  it("returns 5 types", () => {
    expect(pendulumTypes()).toHaveLength(5);
  });
});
