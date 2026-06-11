import { describe, it, expect } from "vitest";
import {
  speed, pinCount, multiDrop, duplex,
  ebCost, clocked, forSensor, protocol,
  bestUse, embeddedBuses,
} from "../embedded-bus-calc.js";

describe("speed", () => {
  it("qspi fastest", () => {
    expect(speed("qspi_quad_flash")).toBeGreaterThan(speed("uart_async_serial"));
  });
});

describe("pinCount", () => {
  it("i2c fewest pins", () => {
    expect(pinCount("i2c_two_wire")).toBeGreaterThan(pinCount("spi_full_duplex"));
  });
});

describe("multiDrop", () => {
  it("i2c best multi drop", () => {
    expect(multiDrop("i2c_two_wire")).toBeGreaterThan(multiDrop("qspi_quad_flash"));
  });
});

describe("duplex", () => {
  it("spi best duplex", () => {
    expect(duplex("spi_full_duplex")).toBeGreaterThan(duplex("i2c_two_wire"));
  });
});

describe("ebCost", () => {
  it("qspi most expensive", () => {
    expect(ebCost("qspi_quad_flash")).toBeGreaterThan(ebCost("i2c_two_wire"));
  });
});

describe("clocked", () => {
  it("spi is clocked", () => {
    expect(clocked("spi_full_duplex")).toBe(true);
  });
  it("uart not clocked", () => {
    expect(clocked("uart_async_serial")).toBe(false);
  });
});

describe("forSensor", () => {
  it("i2c for sensor", () => {
    expect(forSensor("i2c_two_wire")).toBe(true);
  });
  it("qspi not for sensor", () => {
    expect(forSensor("qspi_quad_flash")).toBe(false);
  });
});

describe("protocol", () => {
  it("i2c uses 7bit addr ack nack bus", () => {
    expect(protocol("i2c_two_wire")).toBe("7bit_addr_ack_nack_bus");
  });
});

describe("bestUse", () => {
  it("qspi best for execute in place", () => {
    expect(bestUse("qspi_quad_flash")).toBe("execute_in_place_nor_flash");
  });
});

describe("embeddedBuses", () => {
  it("returns 5 types", () => {
    expect(embeddedBuses()).toHaveLength(5);
  });
});
