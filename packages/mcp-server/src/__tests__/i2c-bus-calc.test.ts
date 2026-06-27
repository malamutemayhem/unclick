import { describe, it, expect } from "vitest";
import {
  speed, deviceCount, pullupReq, distance,
  busCost, bidirectional, forSensor, busMode,
  bestUse, i2cBuses,
} from "../i2c-bus-calc.js";

describe("speed", () => {
  it("ultra fast 5m highest speed", () => {
    expect(speed("ultra_fast_5m")).toBeGreaterThan(speed("standard_100k"));
  });
});

describe("deviceCount", () => {
  it("standard 100k most devices", () => {
    expect(deviceCount("standard_100k")).toBeGreaterThan(deviceCount("ultra_fast_5m"));
  });
});

describe("pullupReq", () => {
  it("ultra fast 5m highest pullup requirement", () => {
    expect(pullupReq("ultra_fast_5m")).toBeGreaterThan(pullupReq("standard_100k"));
  });
});

describe("distance", () => {
  it("standard 100k longest distance", () => {
    expect(distance("standard_100k")).toBeGreaterThan(distance("ultra_fast_5m"));
  });
});

describe("busCost", () => {
  it("ultra fast 5m most expensive", () => {
    expect(busCost("ultra_fast_5m")).toBeGreaterThan(busCost("standard_100k"));
  });
});

describe("bidirectional", () => {
  it("standard 100k is bidirectional", () => {
    expect(bidirectional("standard_100k")).toBe(true);
  });
  it("ultra fast 5m not bidirectional", () => {
    expect(bidirectional("ultra_fast_5m")).toBe(false);
  });
});

describe("forSensor", () => {
  it("fast 400k is for sensor", () => {
    expect(forSensor("fast_400k")).toBe(true);
  });
  it("high speed 3m4 not for sensor", () => {
    expect(forSensor("high_speed_3m4")).toBe(false);
  });
});

describe("busMode", () => {
  it("standard 100k uses open drain 100khz", () => {
    expect(busMode("standard_100k")).toBe("open_drain_100khz");
  });
});

describe("bestUse", () => {
  it("fast 400k best for imu adc fast sensor", () => {
    expect(bestUse("fast_400k")).toBe("imu_adc_fast_sensor");
  });
});

describe("i2cBuses", () => {
  it("returns 5 types", () => {
    expect(i2cBuses()).toHaveLength(5);
  });
});
