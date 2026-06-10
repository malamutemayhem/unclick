import { describe, it, expect } from "vitest";
import {
  soundQuality, waterproofRating, batteryLife, mountEase,
  speakerCost, hasLedLight, floats, connectType,
  bestSpot, showerSpeakers,
} from "../shower-speaker-calc.js";

describe("soundQuality", () => {
  it("floating pool dual best sound quality", () => {
    expect(soundQuality("floating_pool_dual")).toBeGreaterThan(soundQuality("suction_cup_bluetooth"));
  });
});

describe("waterproofRating", () => {
  it("floating pool dual best waterproof rating", () => {
    expect(waterproofRating("floating_pool_dual")).toBeGreaterThan(waterproofRating("hanging_hook_portable"));
  });
});

describe("batteryLife", () => {
  it("floating pool dual best battery life", () => {
    expect(batteryLife("floating_pool_dual")).toBeGreaterThan(batteryLife("built_in_led_light"));
  });
});

describe("mountEase", () => {
  it("suction cup bluetooth easiest to mount", () => {
    expect(mountEase("suction_cup_bluetooth")).toBeGreaterThan(mountEase("built_in_led_light"));
  });
});

describe("speakerCost", () => {
  it("built in led light most expensive", () => {
    expect(speakerCost("built_in_led_light")).toBeGreaterThan(speakerCost("suction_cup_bluetooth"));
  });
});

describe("hasLedLight", () => {
  it("built in led light has led light", () => {
    expect(hasLedLight("built_in_led_light")).toBe(true);
  });
  it("suction cup bluetooth has no led light", () => {
    expect(hasLedLight("suction_cup_bluetooth")).toBe(false);
  });
});

describe("floats", () => {
  it("floating pool dual floats", () => {
    expect(floats("floating_pool_dual")).toBe(true);
  });
  it("suction cup bluetooth does not float", () => {
    expect(floats("suction_cup_bluetooth")).toBe(false);
  });
});

describe("connectType", () => {
  it("floating pool dual uses bluetooth tws stereo", () => {
    expect(connectType("floating_pool_dual")).toBe("bluetooth_tws_stereo");
  });
});

describe("bestSpot", () => {
  it("floating pool dual best for pool hot tub float", () => {
    expect(bestSpot("floating_pool_dual")).toBe("pool_hot_tub_float");
  });
});

describe("showerSpeakers", () => {
  it("returns 5 types", () => {
    expect(showerSpeakers()).toHaveLength(5);
  });
});
