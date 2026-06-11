import { describe, it, expect } from "vitest";
import {
  dataRate, pullupReq, busCapacity, compatibility,
  i2cCost, bidirectional, forSensor, protocol,
  bestUse, i2cSpeeds,
} from "../i2c-speed-calc.js";

describe("dataRate", () => {
  it("ultra fast 5m highest data rate", () => {
    expect(dataRate("ultra_fast_5m")).toBeGreaterThan(dataRate("standard_100k"));
  });
});

describe("pullupReq", () => {
  it("ultra fast 5m strictest pullup requirement", () => {
    expect(pullupReq("ultra_fast_5m")).toBeGreaterThan(pullupReq("standard_100k"));
  });
});

describe("busCapacity", () => {
  it("standard 100k highest bus capacity", () => {
    expect(busCapacity("standard_100k")).toBeGreaterThan(busCapacity("ultra_fast_5m"));
  });
});

describe("compatibility", () => {
  it("standard 100k most compatible", () => {
    expect(compatibility("standard_100k")).toBeGreaterThan(compatibility("ultra_fast_5m"));
  });
});

describe("i2cCost", () => {
  it("ultra fast 5m most expensive", () => {
    expect(i2cCost("ultra_fast_5m")).toBeGreaterThan(i2cCost("standard_100k"));
  });
});

describe("bidirectional", () => {
  it("fast 400k is bidirectional", () => {
    expect(bidirectional("fast_400k")).toBe(true);
  });
  it("ultra fast 5m not bidirectional", () => {
    expect(bidirectional("ultra_fast_5m")).toBe(false);
  });
});

describe("forSensor", () => {
  it("fast plus 1m for sensor", () => {
    expect(forSensor("fast_plus_1m")).toBe(true);
  });
  it("high speed 3m4 not for sensor", () => {
    expect(forSensor("high_speed_3m4")).toBe(false);
  });
});

describe("protocol", () => {
  it("ultra fast 5m uses push pull write only", () => {
    expect(protocol("ultra_fast_5m")).toBe("push_pull_write_only");
  });
});

describe("bestUse", () => {
  it("standard 100k best for eeprom config storage", () => {
    expect(bestUse("standard_100k")).toBe("eeprom_config_storage");
  });
});

describe("i2cSpeeds", () => {
  it("returns 5 types", () => {
    expect(i2cSpeeds()).toHaveLength(5);
  });
});
