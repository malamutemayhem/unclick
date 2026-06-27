import { describe, it, expect } from "vitest";
import {
  speed, latency, nodeCount, cableLength,
  fbCost, deterministic, forMotion, physical,
  bestUse, fieldbusTypes,
} from "../fieldbus-type-calc.js";

describe("speed", () => {
  it("ethercat fastest", () => {
    expect(speed("ethercat_realtime")).toBeGreaterThan(speed("modbus_rtu_485"));
  });
});

describe("latency", () => {
  it("ethercat lowest latency", () => {
    expect(latency("ethercat_realtime")).toBeGreaterThan(latency("modbus_rtu_485"));
  });
});

describe("nodeCount", () => {
  it("ethercat most nodes", () => {
    expect(nodeCount("ethercat_realtime")).toBeGreaterThan(nodeCount("modbus_rtu_485"));
  });
});

describe("cableLength", () => {
  it("profinet irt longest cable", () => {
    expect(cableLength("profinet_irt")).toBeGreaterThan(cableLength("canopen_cia"));
  });
});

describe("fbCost", () => {
  it("profinet irt most expensive", () => {
    expect(fbCost("profinet_irt")).toBeGreaterThan(fbCost("modbus_rtu_485"));
  });
});

describe("deterministic", () => {
  it("ethercat is deterministic", () => {
    expect(deterministic("ethercat_realtime")).toBe(true);
  });
  it("modbus rtu not deterministic", () => {
    expect(deterministic("modbus_rtu_485")).toBe(false);
  });
});

describe("forMotion", () => {
  it("ethercat for motion", () => {
    expect(forMotion("ethercat_realtime")).toBe(true);
  });
  it("profibus dp not for motion", () => {
    expect(forMotion("profibus_dp")).toBe(false);
  });
});

describe("physical", () => {
  it("canopen uses can differential pair", () => {
    expect(physical("canopen_cia")).toBe("can_differential_pair");
  });
});

describe("bestUse", () => {
  it("ethercat best for cnc servo sync", () => {
    expect(bestUse("ethercat_realtime")).toBe("cnc_servo_multi_axis_sync");
  });
});

describe("fieldbusTypes", () => {
  it("returns 5 types", () => {
    expect(fieldbusTypes()).toHaveLength(5);
  });
});
