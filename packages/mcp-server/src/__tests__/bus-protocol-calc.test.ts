import { describe, it, expect } from "vitest";
import {
  throughput, pinCount, multiDevice, latency,
  busCost, hotJoin, forSensor, signaling,
  bestUse, busProtocols,
} from "../bus-protocol-calc.js";

describe("throughput", () => {
  it("qspi quad highest throughput", () => {
    expect(throughput("qspi_quad")).toBeGreaterThan(throughput("uart_async"));
  });
});

describe("pinCount", () => {
  it("i2c two wire fewest pins", () => {
    expect(pinCount("i2c_two_wire")).toBeGreaterThan(pinCount("spi_full_duplex"));
  });
});

describe("multiDevice", () => {
  it("i3c mipi best multi device", () => {
    expect(multiDevice("i3c_mipi")).toBeGreaterThan(multiDevice("uart_async"));
  });
});

describe("latency", () => {
  it("spi full duplex lowest latency", () => {
    expect(latency("spi_full_duplex")).toBeGreaterThan(latency("i2c_two_wire"));
  });
});

describe("busCost", () => {
  it("i3c mipi most expensive", () => {
    expect(busCost("i3c_mipi")).toBeGreaterThan(busCost("uart_async"));
  });
});

describe("hotJoin", () => {
  it("i3c mipi supports hot join", () => {
    expect(hotJoin("i3c_mipi")).toBe(true);
  });
  it("spi full duplex no hot join", () => {
    expect(hotJoin("spi_full_duplex")).toBe(false);
  });
});

describe("forSensor", () => {
  it("i2c two wire is for sensor", () => {
    expect(forSensor("i2c_two_wire")).toBe(true);
  });
  it("uart async not for sensor", () => {
    expect(forSensor("uart_async")).toBe(false);
  });
});

describe("signaling", () => {
  it("i3c mipi uses sda scl push pull", () => {
    expect(signaling("i3c_mipi")).toBe("sda_scl_push_pull");
  });
});

describe("bestUse", () => {
  it("qspi quad best for nor flash execute", () => {
    expect(bestUse("qspi_quad")).toBe("nor_flash_execute");
  });
});

describe("busProtocols", () => {
  it("returns 5 types", () => {
    expect(busProtocols()).toHaveLength(5);
  });
});
