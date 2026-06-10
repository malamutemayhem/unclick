import { describe, it, expect } from "vitest";
import {
  crashProtection, comfortPadding, installEase, longevityYears,
  seatCost, latchSystem, removableCarrier, harnessType,
  bestAge, carSeats,
} from "../car-seat-calc.js";

describe("crashProtection", () => {
  it("infant rear facing highest crash protection", () => {
    expect(crashProtection("infant_rear_facing")).toBeGreaterThan(crashProtection("backless_booster"));
  });
});

describe("comfortPadding", () => {
  it("infant rear facing most comfort padding", () => {
    expect(comfortPadding("infant_rear_facing")).toBeGreaterThan(comfortPadding("backless_booster"));
  });
});

describe("installEase", () => {
  it("backless booster easiest install", () => {
    expect(installEase("backless_booster")).toBeGreaterThan(installEase("all_in_one"));
  });
});

describe("longevityYears", () => {
  it("all in one longest longevity", () => {
    expect(longevityYears("all_in_one")).toBeGreaterThan(longevityYears("infant_rear_facing"));
  });
});

describe("seatCost", () => {
  it("all in one most expensive", () => {
    expect(seatCost("all_in_one")).toBeGreaterThan(seatCost("backless_booster"));
  });
});

describe("latchSystem", () => {
  it("infant rear facing has latch system", () => {
    expect(latchSystem("infant_rear_facing")).toBe(true);
  });
  it("backless booster does not", () => {
    expect(latchSystem("backless_booster")).toBe(false);
  });
});

describe("removableCarrier", () => {
  it("infant rear facing is removable carrier", () => {
    expect(removableCarrier("infant_rear_facing")).toBe(true);
  });
  it("convertible both is not", () => {
    expect(removableCarrier("convertible_both")).toBe(false);
  });
});

describe("harnessType", () => {
  it("infant rear facing uses five point rear only", () => {
    expect(harnessType("infant_rear_facing")).toBe("five_point_rear_only");
  });
});

describe("bestAge", () => {
  it("all in one for birth to twelve years", () => {
    expect(bestAge("all_in_one")).toBe("birth_to_twelve_years");
  });
});

describe("carSeats", () => {
  it("returns 5 types", () => {
    expect(carSeats()).toHaveLength(5);
  });
});
