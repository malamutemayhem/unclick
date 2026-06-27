import { describe, it, expect } from "vitest";
import {
  loadCapacity, mobility, fitAdjust, breathability,
  vestCost, removablePlates, lowProfile, weightType,
  bestActivity, weightVests,
} from "../weight-vest-calc.js";

describe("loadCapacity", () => {
  it("plate carrier tactical most load capacity", () => {
    expect(loadCapacity("plate_carrier_tactical")).toBeGreaterThan(loadCapacity("slim_profile_running"));
  });
});

describe("mobility", () => {
  it("slim profile running most mobility", () => {
    expect(mobility("slim_profile_running")).toBeGreaterThan(mobility("plate_carrier_tactical"));
  });
});

describe("fitAdjust", () => {
  it("plate carrier tactical best fit adjust", () => {
    expect(fitAdjust("plate_carrier_tactical")).toBeGreaterThan(fitAdjust("weighted_shirt_concealed"));
  });
});

describe("breathability", () => {
  it("slim profile running most breathable", () => {
    expect(breathability("slim_profile_running")).toBeGreaterThan(breathability("heavy_duty_crossfit"));
  });
});

describe("vestCost", () => {
  it("plate carrier tactical most expensive", () => {
    expect(vestCost("plate_carrier_tactical")).toBeGreaterThan(vestCost("slim_profile_running"));
  });
});

describe("removablePlates", () => {
  it("plate carrier tactical has removable plates", () => {
    expect(removablePlates("plate_carrier_tactical")).toBe(true);
  });
  it("slim profile running has no removable plates", () => {
    expect(removablePlates("slim_profile_running")).toBe(false);
  });
});

describe("lowProfile", () => {
  it("weighted shirt concealed is low profile", () => {
    expect(lowProfile("weighted_shirt_concealed")).toBe(true);
  });
  it("plate carrier tactical is not low profile", () => {
    expect(lowProfile("plate_carrier_tactical")).toBe(false);
  });
});

describe("weightType", () => {
  it("plate carrier tactical uses steel cast plate", () => {
    expect(weightType("plate_carrier_tactical")).toBe("steel_cast_plate");
  });
});

describe("bestActivity", () => {
  it("heavy duty crossfit best for murph wod competition", () => {
    expect(bestActivity("heavy_duty_crossfit")).toBe("murph_wod_competition");
  });
});

describe("weightVests", () => {
  it("returns 5 types", () => {
    expect(weightVests()).toHaveLength(5);
  });
});
