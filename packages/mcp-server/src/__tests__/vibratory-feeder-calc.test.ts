import { describe, it, expect } from "vitest";
import {
  feedRate, controlPrecision, durability, noiseLevel,
  vfCost, variableSpeed, forFineParticle, driveType,
  bestUse, vibratoryFeederTypes,
} from "../vibratory-feeder-calc.js";

describe("feedRate", () => {
  it("grizzly scalping highest feed rate", () => {
    expect(feedRate("grizzly_scalping")).toBeGreaterThan(feedRate("bowl_feeder"));
  });
});

describe("controlPrecision", () => {
  it("electromagnetic and bowl feeder best precision", () => {
    expect(controlPrecision("electromagnetic")).toBeGreaterThan(controlPrecision("grizzly_scalping"));
    expect(controlPrecision("bowl_feeder")).toBeGreaterThan(controlPrecision("grizzly_scalping"));
  });
});

describe("durability", () => {
  it("grizzly scalping most durable", () => {
    expect(durability("grizzly_scalping")).toBeGreaterThan(durability("electromechanical"));
  });
});

describe("noiseLevel", () => {
  it("electromagnetic quietest operation", () => {
    expect(noiseLevel("electromagnetic")).toBeGreaterThan(noiseLevel("grizzly_scalping"));
  });
});

describe("vfCost", () => {
  it("bowl feeder most expensive", () => {
    expect(vfCost("bowl_feeder")).toBeGreaterThan(vfCost("electromechanical"));
  });
});

describe("variableSpeed", () => {
  it("electromagnetic has variable speed", () => {
    expect(variableSpeed("electromagnetic")).toBe(true);
  });
  it("grizzly scalping no variable speed", () => {
    expect(variableSpeed("grizzly_scalping")).toBe(false);
  });
});

describe("forFineParticle", () => {
  it("bowl feeder for fine particles", () => {
    expect(forFineParticle("bowl_feeder")).toBe(true);
  });
  it("electromechanical not for fine particles", () => {
    expect(forFineParticle("electromechanical")).toBe(false);
  });
});

describe("driveType", () => {
  it("bowl feeder uses base mounted electromagnet", () => {
    expect(driveType("bowl_feeder")).toBe("base_mounted_electromagnet_spiral_bowl_orient_parts_inline");
  });
});

describe("bestUse", () => {
  it("grizzly scalping for quarry primary screen", () => {
    expect(bestUse("grizzly_scalping")).toBe("quarry_primary_screen_rom_ore_scalp_fines_before_crusher");
  });
});

describe("vibratoryFeederTypes", () => {
  it("returns 5 types", () => {
    expect(vibratoryFeederTypes()).toHaveLength(5);
  });
});
