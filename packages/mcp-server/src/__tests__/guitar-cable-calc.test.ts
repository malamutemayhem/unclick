import { describe, it, expect } from "vitest";
import {
  signalClarity, durability, flexibility, noiseReject,
  cableCost, needsBattery, lowProfile, conductorType,
  bestSetup, guitarCables,
} from "../guitar-cable-calc.js";

describe("signalClarity", () => {
  it("wireless digital system best signal clarity", () => {
    expect(signalClarity("wireless_digital_system")).toBeGreaterThan(signalClarity("coiled_curly_retro"));
  });
});

describe("durability", () => {
  it("braided cloth vintage most durable", () => {
    expect(durability("braided_cloth_vintage")).toBeGreaterThan(durability("wireless_digital_system"));
  });
});

describe("flexibility", () => {
  it("wireless digital system most flexible", () => {
    expect(flexibility("wireless_digital_system")).toBeGreaterThan(flexibility("coiled_curly_retro"));
  });
});

describe("noiseReject", () => {
  it("wireless digital system best noise reject", () => {
    expect(noiseReject("wireless_digital_system")).toBeGreaterThan(noiseReject("standard_nickel_straight"));
  });
});

describe("cableCost", () => {
  it("wireless digital system most expensive", () => {
    expect(cableCost("wireless_digital_system")).toBeGreaterThan(cableCost("standard_nickel_straight"));
  });
});

describe("needsBattery", () => {
  it("wireless digital system needs battery", () => {
    expect(needsBattery("wireless_digital_system")).toBe(true);
  });
  it("standard nickel straight does not need battery", () => {
    expect(needsBattery("standard_nickel_straight")).toBe(false);
  });
});

describe("lowProfile", () => {
  it("right angle low profile is low profile", () => {
    expect(lowProfile("right_angle_low_profile")).toBe(true);
  });
  it("standard nickel straight is not low profile", () => {
    expect(lowProfile("standard_nickel_straight")).toBe(false);
  });
});

describe("conductorType", () => {
  it("braided cloth vintage uses ofc cloth braid", () => {
    expect(conductorType("braided_cloth_vintage")).toBe("ofc_cloth_braid");
  });
});

describe("bestSetup", () => {
  it("wireless digital system best for live stage freedom", () => {
    expect(bestSetup("wireless_digital_system")).toBe("live_stage_freedom");
  });
});

describe("guitarCables", () => {
  it("returns 5 types", () => {
    expect(guitarCables()).toHaveLength(5);
  });
});
