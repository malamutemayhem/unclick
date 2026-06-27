import { describe, it, expect } from "vitest";
import {
  searchRange, pinpointSpeed, multipleVictim, batteryLife,
  beaconCost, autoRevert, needsBattery, signalType,
  bestUser, avalancheBeacons,
} from "../avalanche-beacon-calc.js";

describe("searchRange", () => {
  it("triple antenna longest search range", () => {
    expect(searchRange("triple_antenna")).toBeGreaterThan(searchRange("single_antenna"));
  });
});

describe("pinpointSpeed", () => {
  it("triple antenna fastest pinpoint", () => {
    expect(pinpointSpeed("triple_antenna")).toBeGreaterThan(pinpointSpeed("dual_antenna"));
  });
});

describe("multipleVictim", () => {
  it("triple antenna best multiple victim", () => {
    expect(multipleVictim("triple_antenna")).toBeGreaterThan(multipleVictim("single_antenna"));
  });
});

describe("batteryLife", () => {
  it("recco passive longest battery life", () => {
    expect(batteryLife("recco_passive")).toBeGreaterThan(batteryLife("digital_advanced"));
  });
});

describe("beaconCost", () => {
  it("digital advanced most expensive", () => {
    expect(beaconCost("digital_advanced")).toBeGreaterThan(beaconCost("single_antenna"));
  });
});

describe("autoRevert", () => {
  it("triple antenna has auto revert", () => {
    expect(autoRevert("triple_antenna")).toBe(true);
  });
  it("single antenna does not", () => {
    expect(autoRevert("single_antenna")).toBe(false);
  });
});

describe("needsBattery", () => {
  it("triple antenna needs battery", () => {
    expect(needsBattery("triple_antenna")).toBe(true);
  });
  it("recco passive does not", () => {
    expect(needsBattery("recco_passive")).toBe(false);
  });
});

describe("signalType", () => {
  it("recco passive uses harmonic radar reflector", () => {
    expect(signalType("recco_passive")).toBe("harmonic_radar_reflector");
  });
});

describe("bestUser", () => {
  it("triple antenna for backcountry guide pro", () => {
    expect(bestUser("triple_antenna")).toBe("backcountry_guide_pro");
  });
});

describe("avalancheBeacons", () => {
  it("returns 5 types", () => {
    expect(avalancheBeacons()).toHaveLength(5);
  });
});
