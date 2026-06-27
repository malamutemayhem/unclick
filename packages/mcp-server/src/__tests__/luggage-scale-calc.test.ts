import { describe, it, expect } from "vitest";
import {
  accuracy, maxWeight, portability, readability,
  scaleCost, needsBattery, unitToggle, displayType,
  bestTrip, luggageScales,
} from "../luggage-scale-calc.js";

describe("accuracy", () => {
  it("smart bluetooth most accurate", () => {
    expect(accuracy("smart_bluetooth")).toBeGreaterThan(accuracy("analog_spring"));
  });
});

describe("maxWeight", () => {
  it("portable fish hook highest max weight", () => {
    expect(maxWeight("portable_fish_hook")).toBeGreaterThan(maxWeight("built_in_suitcase"));
  });
});

describe("portability", () => {
  it("built in suitcase most portable", () => {
    expect(portability("built_in_suitcase")).toBeGreaterThan(portability("analog_spring"));
  });
});

describe("readability", () => {
  it("smart bluetooth best readability", () => {
    expect(readability("smart_bluetooth")).toBeGreaterThan(readability("analog_spring"));
  });
});

describe("scaleCost", () => {
  it("built in suitcase most expensive", () => {
    expect(scaleCost("built_in_suitcase")).toBeGreaterThan(scaleCost("analog_spring"));
  });
});

describe("needsBattery", () => {
  it("digital hanging needs battery", () => {
    expect(needsBattery("digital_hanging")).toBe(true);
  });
  it("analog spring does not", () => {
    expect(needsBattery("analog_spring")).toBe(false);
  });
});

describe("unitToggle", () => {
  it("digital hanging has unit toggle", () => {
    expect(unitToggle("digital_hanging")).toBe(true);
  });
  it("analog spring does not", () => {
    expect(unitToggle("analog_spring")).toBe(false);
  });
});

describe("displayType", () => {
  it("smart bluetooth uses app phone display", () => {
    expect(displayType("smart_bluetooth")).toBe("app_phone_display");
  });
});

describe("bestTrip", () => {
  it("digital hanging for airline travel checkin", () => {
    expect(bestTrip("digital_hanging")).toBe("airline_travel_checkin");
  });
});

describe("luggageScales", () => {
  it("returns 5 types", () => {
    expect(luggageScales()).toHaveLength(5);
  });
});
