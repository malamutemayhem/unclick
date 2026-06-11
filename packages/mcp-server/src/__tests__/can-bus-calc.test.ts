import { describe, it, expect } from "vitest";
import {
  dataRate, payloadSize, nodeCount, faultTolerance,
  busCost, fdCapable, forAutomotive, frameType,
  bestUse, canBuses,
} from "../can-bus-calc.js";

describe("dataRate", () => {
  it("can xl extended highest data rate", () => {
    expect(dataRate("can_xl_extended")).toBeGreaterThan(dataRate("classic_can_2a"));
  });
});

describe("payloadSize", () => {
  it("can xl extended largest payload", () => {
    expect(payloadSize("can_xl_extended")).toBeGreaterThan(payloadSize("classic_can_2a"));
  });
});

describe("nodeCount", () => {
  it("j1939 heavy vehicle most nodes", () => {
    expect(nodeCount("j1939_heavy_vehicle")).toBeGreaterThan(nodeCount("lin_bus_sub"));
  });
});

describe("faultTolerance", () => {
  it("j1939 heavy vehicle best fault tolerance", () => {
    expect(faultTolerance("j1939_heavy_vehicle")).toBeGreaterThan(faultTolerance("lin_bus_sub"));
  });
});

describe("busCost", () => {
  it("can xl extended most expensive", () => {
    expect(busCost("can_xl_extended")).toBeGreaterThan(busCost("lin_bus_sub"));
  });
});

describe("fdCapable", () => {
  it("can fd flexible is fd capable", () => {
    expect(fdCapable("can_fd_flexible")).toBe(true);
  });
  it("classic can 2a not fd capable", () => {
    expect(fdCapable("classic_can_2a")).toBe(false);
  });
});

describe("forAutomotive", () => {
  it("classic can 2a is for automotive", () => {
    expect(forAutomotive("classic_can_2a")).toBe(true);
  });
});

describe("frameType", () => {
  it("classic can 2a uses standard 11bit 8byte", () => {
    expect(frameType("classic_can_2a")).toBe("standard_11bit_8byte");
  });
});

describe("bestUse", () => {
  it("can fd flexible best for adas firmware update", () => {
    expect(bestUse("can_fd_flexible")).toBe("adas_firmware_update");
  });
});

describe("canBuses", () => {
  it("returns 5 types", () => {
    expect(canBuses()).toHaveLength(5);
  });
});
