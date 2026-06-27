import { describe, it, expect } from "vitest";
import {
  wheelSpeedRpm, headWeightKg, maxClayKg, centeringTimeSeconds,
  throwingTimeMinutes, trimTimeMinutes, batSizeCm, splashPanDiameterCm,
  powerConsumptionWatts, costEstimate, wheelTypes,
} from "../potters-wheel-calc.js";

describe("wheelSpeedRpm", () => {
  it("electric is fastest", () => {
    expect(wheelSpeedRpm("electric")).toBeGreaterThan(wheelSpeedRpm("kick"));
  });
});

describe("headWeightKg", () => {
  it("momentum wheel is heaviest", () => {
    expect(headWeightKg("momentum")).toBeGreaterThan(headWeightKg("electric"));
  });
});

describe("maxClayKg", () => {
  it("electric handles most clay", () => {
    expect(maxClayKg("electric")).toBeGreaterThan(maxClayKg("hand_crank"));
  });
});

describe("centeringTimeSeconds", () => {
  it("beginner takes longest", () => {
    expect(centeringTimeSeconds(2, "beginner")).toBeGreaterThan(
      centeringTimeSeconds(2, "expert")
    );
  });
});

describe("throwingTimeMinutes", () => {
  it("taller vessel = more time", () => {
    expect(throwingTimeMinutes(30, 15)).toBeGreaterThan(throwingTimeMinutes(15, 15));
  });
});

describe("trimTimeMinutes", () => {
  it("taller = longer trim", () => {
    expect(trimTimeMinutes(20)).toBeGreaterThan(trimTimeMinutes(10));
  });
});

describe("batSizeCm", () => {
  it("larger capacity = bigger bat", () => {
    expect(batSizeCm(25)).toBeGreaterThan(batSizeCm(10));
  });
});

describe("splashPanDiameterCm", () => {
  it("15cm wider than head", () => {
    expect(splashPanDiameterCm(30)).toBe(45);
  });
});

describe("powerConsumptionWatts", () => {
  it("only electric uses power", () => {
    expect(powerConsumptionWatts("electric")).toBeGreaterThan(0);
    expect(powerConsumptionWatts("kick")).toBe(0);
  });
});

describe("costEstimate", () => {
  it("electric most expensive", () => {
    expect(costEstimate("electric", 200)).toBeGreaterThan(costEstimate("hand_crank", 200));
  });
});

describe("wheelTypes", () => {
  it("returns 5 types", () => {
    expect(wheelTypes()).toHaveLength(5);
  });
});
