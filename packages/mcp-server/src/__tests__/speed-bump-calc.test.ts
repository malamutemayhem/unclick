import { describe, it, expect } from "vitest";
import {
  speedReduction, driverComfort, emergencyVehicleImpact, installCost,
  pedestrianBenefit, suitableForBusRoute, requiresSignage, typicalHeight,
  bestLocation, speedBumps,
} from "../speed-bump-calc.js";

describe("speedReduction", () => {
  it("speed bump greatest speed reduction", () => {
    expect(speedReduction("speed_bump")).toBeGreaterThan(speedReduction("raised_crosswalk"));
  });
});

describe("driverComfort", () => {
  it("raised crosswalk most comfortable", () => {
    expect(driverComfort("raised_crosswalk")).toBeGreaterThan(driverComfort("speed_bump"));
  });
});

describe("emergencyVehicleImpact", () => {
  it("speed bump worst for emergency vehicles", () => {
    expect(emergencyVehicleImpact("speed_bump")).toBeGreaterThan(emergencyVehicleImpact("raised_crosswalk"));
  });
});

describe("installCost", () => {
  it("chicane most expensive", () => {
    expect(installCost("chicane")).toBeGreaterThan(installCost("speed_bump"));
  });
});

describe("pedestrianBenefit", () => {
  it("raised crosswalk best for pedestrians", () => {
    expect(pedestrianBenefit("raised_crosswalk")).toBeGreaterThan(pedestrianBenefit("speed_bump"));
  });
});

describe("suitableForBusRoute", () => {
  it("speed table suitable for bus route", () => {
    expect(suitableForBusRoute("speed_table")).toBe(true);
  });
  it("speed bump not suitable", () => {
    expect(suitableForBusRoute("speed_bump")).toBe(false);
  });
});

describe("requiresSignage", () => {
  it("speed bump requires signage", () => {
    expect(requiresSignage("speed_bump")).toBe(true);
  });
  it("chicane does not", () => {
    expect(requiresSignage("chicane")).toBe(false);
  });
});

describe("typicalHeight", () => {
  it("speed bump is 75mm to 100mm", () => {
    expect(typicalHeight("speed_bump")).toBe("75mm_to_100mm");
  });
});

describe("bestLocation", () => {
  it("raised crosswalk for school zone downtown", () => {
    expect(bestLocation("raised_crosswalk")).toBe("school_zone_downtown");
  });
});

describe("speedBumps", () => {
  it("returns 5 types", () => {
    expect(speedBumps()).toHaveLength(5);
  });
});
