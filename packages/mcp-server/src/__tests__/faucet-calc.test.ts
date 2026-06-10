import { describe, it, expect } from "vitest";
import {
  flowRate, tempControl, hygieneScore, durability,
  faucetCost, touchFree, sprayMode, valveType,
  bestSink, faucets,
} from "../faucet-calc.js";

describe("flowRate", () => {
  it("wall mount pot highest flow", () => {
    expect(flowRate("wall_mount_pot")).toBeGreaterThan(flowRate("touchless_sensor"));
  });
});

describe("tempControl", () => {
  it("two handle cartridge best temp control", () => {
    expect(tempControl("two_handle_cartridge")).toBeGreaterThan(tempControl("touchless_sensor"));
  });
});

describe("hygieneScore", () => {
  it("touchless sensor best hygiene", () => {
    expect(hygieneScore("touchless_sensor")).toBeGreaterThan(hygieneScore("two_handle_cartridge"));
  });
});

describe("durability", () => {
  it("two handle cartridge most durable", () => {
    expect(durability("two_handle_cartridge")).toBeGreaterThan(durability("touchless_sensor"));
  });
});

describe("faucetCost", () => {
  it("touchless sensor most expensive", () => {
    expect(faucetCost("touchless_sensor")).toBeGreaterThan(faucetCost("single_handle_ball"));
  });
});

describe("touchFree", () => {
  it("touchless sensor is touch free", () => {
    expect(touchFree("touchless_sensor")).toBe(true);
  });
  it("single handle ball is not", () => {
    expect(touchFree("single_handle_ball")).toBe(false);
  });
});

describe("sprayMode", () => {
  it("pull down spray has spray mode", () => {
    expect(sprayMode("pull_down_spray")).toBe(true);
  });
  it("touchless sensor does not", () => {
    expect(sprayMode("touchless_sensor")).toBe(false);
  });
});

describe("valveType", () => {
  it("touchless sensor uses solenoid infrared valve", () => {
    expect(valveType("touchless_sensor")).toBe("solenoid_infrared_valve");
  });
});

describe("bestSink", () => {
  it("wall mount pot for stove top pot filler", () => {
    expect(bestSink("wall_mount_pot")).toBe("stove_top_pot_filler");
  });
});

describe("faucets", () => {
  it("returns 5 types", () => {
    expect(faucets()).toHaveLength(5);
  });
});
