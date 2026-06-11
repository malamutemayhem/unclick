import { describe, it, expect } from "vitest";
import {
  windSmooth, tensionControl, speedWind, capacity,
  reelCost, powered, collapsible, frameStyle,
  bestUse, yarnReels,
} from "../yarn-reel-calc.js";

describe("windSmooth", () => {
  it("tensioned reel brake smoothest wind", () => {
    expect(windSmooth("tensioned_reel_brake")).toBeGreaterThan(windSmooth("hand_reel_standard"));
  });
});

describe("tensionControl", () => {
  it("tensioned reel brake best tension control", () => {
    expect(tensionControl("tensioned_reel_brake")).toBeGreaterThan(tensionControl("swift_umbrella_expand"));
  });
});

describe("speedWind", () => {
  it("motorized reel power fastest wind", () => {
    expect(speedWind("motorized_reel_power")).toBeGreaterThan(speedWind("hand_reel_standard"));
  });
});

describe("capacity", () => {
  it("floor stand large best capacity", () => {
    expect(capacity("floor_stand_large")).toBeGreaterThan(capacity("hand_reel_standard"));
  });
});

describe("reelCost", () => {
  it("motorized reel power most expensive", () => {
    expect(reelCost("motorized_reel_power")).toBeGreaterThan(reelCost("hand_reel_standard"));
  });
});

describe("powered", () => {
  it("motorized reel power is powered", () => {
    expect(powered("motorized_reel_power")).toBe(true);
  });
  it("hand reel standard not powered", () => {
    expect(powered("hand_reel_standard")).toBe(false);
  });
});

describe("collapsible", () => {
  it("swift umbrella expand is collapsible", () => {
    expect(collapsible("swift_umbrella_expand")).toBe(true);
  });
  it("floor stand large not collapsible", () => {
    expect(collapsible("floor_stand_large")).toBe(false);
  });
});

describe("frameStyle", () => {
  it("tensioned reel brake uses brake tension drum", () => {
    expect(frameStyle("tensioned_reel_brake")).toBe("brake_tension_drum");
  });
});

describe("bestUse", () => {
  it("hand reel standard best for general yarn wind", () => {
    expect(bestUse("hand_reel_standard")).toBe("general_yarn_wind");
  });
});

describe("yarnReels", () => {
  it("returns 5 types", () => {
    expect(yarnReels()).toHaveLength(5);
  });
});
