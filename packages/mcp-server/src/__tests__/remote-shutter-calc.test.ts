import { describe, it, expect } from "vitest";
import {
  range, reliability, features, easeOfUse,
  remoteCost, needsBattery, timelapse, connectMethod,
  bestShoot, remoteShutters,
} from "../remote-shutter-calc.js";

describe("range", () => {
  it("radio frequency long longest range", () => {
    expect(range("radio_frequency_long")).toBeGreaterThan(range("wired_cable_release"));
  });
});

describe("reliability", () => {
  it("wired cable release most reliable", () => {
    expect(reliability("wired_cable_release")).toBeGreaterThan(reliability("infrared_line_sight"));
  });
});

describe("features", () => {
  it("intervalometer timer most features", () => {
    expect(features("intervalometer_timer")).toBeGreaterThan(features("infrared_line_sight"));
  });
});

describe("easeOfUse", () => {
  it("wired cable release easiest to use", () => {
    expect(easeOfUse("wired_cable_release")).toBeGreaterThan(easeOfUse("intervalometer_timer"));
  });
});

describe("remoteCost", () => {
  it("radio frequency long most expensive", () => {
    expect(remoteCost("radio_frequency_long")).toBeGreaterThan(remoteCost("infrared_line_sight"));
  });
});

describe("needsBattery", () => {
  it("infrared line sight needs battery", () => {
    expect(needsBattery("infrared_line_sight")).toBe(true);
  });
  it("wired cable release does not need battery", () => {
    expect(needsBattery("wired_cable_release")).toBe(false);
  });
});

describe("timelapse", () => {
  it("intervalometer timer supports timelapse", () => {
    expect(timelapse("intervalometer_timer")).toBe(true);
  });
  it("bluetooth phone pair does not support timelapse", () => {
    expect(timelapse("bluetooth_phone_pair")).toBe(false);
  });
});

describe("connectMethod", () => {
  it("radio frequency long uses rf 24ghz transceiver", () => {
    expect(connectMethod("radio_frequency_long")).toBe("rf_24ghz_transceiver");
  });
});

describe("bestShoot", () => {
  it("intervalometer timer best for timelapse astro bulb", () => {
    expect(bestShoot("intervalometer_timer")).toBe("timelapse_astro_bulb");
  });
});

describe("remoteShutters", () => {
  it("returns 5 types", () => {
    expect(remoteShutters()).toHaveLength(5);
  });
});
