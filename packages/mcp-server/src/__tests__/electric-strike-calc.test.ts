import { describe, it, expect } from "vitest";
import {
  security, durability, loadRating, installEase,
  esCost, failSecure, forFireDoor, voltage,
  bestUse, electricStrikeTypes,
} from "../electric-strike-calc.js";

describe("security", () => {
  it("fail secure most secure", () => {
    expect(security("fail_secure_locked_no_power")).toBeGreaterThan(security("fail_safe_unlock_no_power"));
  });
});

describe("durability", () => {
  it("heavy duty most durable", () => {
    expect(durability("heavy_duty_high_traffic")).toBeGreaterThan(durability("fail_secure_locked_no_power"));
  });
});

describe("loadRating", () => {
  it("heavy duty highest load", () => {
    expect(loadRating("heavy_duty_high_traffic")).toBeGreaterThan(loadRating("fail_safe_unlock_no_power"));
  });
});

describe("installEase", () => {
  it("basic easier than monitored", () => {
    expect(installEase("fail_secure_locked_no_power")).toBeGreaterThan(installEase("monitored_status_feedback"));
  });
});

describe("esCost", () => {
  it("fire rated most expensive", () => {
    expect(esCost("fire_rated_3_hour_listed")).toBeGreaterThan(esCost("fail_secure_locked_no_power"));
  });
});

describe("failSecure", () => {
  it("fail secure is fail secure", () => {
    expect(failSecure("fail_secure_locked_no_power")).toBe(true);
  });
  it("fail safe not fail secure", () => {
    expect(failSecure("fail_safe_unlock_no_power")).toBe(false);
  });
});

describe("forFireDoor", () => {
  it("fire rated for fire door", () => {
    expect(forFireDoor("fire_rated_3_hour_listed")).toBe(true);
  });
  it("heavy duty not for fire door", () => {
    expect(forFireDoor("heavy_duty_high_traffic")).toBe(false);
  });
});

describe("voltage", () => {
  it("fire rated uses 24vdc", () => {
    expect(voltage("fire_rated_3_hour_listed")).toBe("24_vdc_fire_alarm_release");
  });
});

describe("bestUse", () => {
  it("heavy duty for main entrance", () => {
    expect(bestUse("heavy_duty_high_traffic")).toBe("main_entrance_high_cycle");
  });
});

describe("electricStrikeTypes", () => {
  it("returns 5 types", () => {
    expect(electricStrikeTypes()).toHaveLength(5);
  });
});
