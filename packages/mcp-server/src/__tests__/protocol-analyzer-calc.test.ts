import { describe, it, expect } from "vitest";
import {
  dataRate, throughput, captureDepth, decodeCount,
  paCost, realTime, forDebug, analyzerConfig,
  bestUse, protocolAnalyzerTypes,
} from "../protocol-analyzer-calc.js";

describe("dataRate", () => {
  it("pcie analyzer best data rate", () => {
    expect(dataRate("pcie_analyzer")).toBeGreaterThan(dataRate("can_bus_analyzer"));
  });
});

describe("throughput", () => {
  it("can bus highest throughput", () => {
    expect(throughput("can_bus_analyzer")).toBeGreaterThan(throughput("pcie_analyzer"));
  });
});

describe("captureDepth", () => {
  it("ethernet analyzer best capture depth", () => {
    expect(captureDepth("ethernet_analyzer")).toBeGreaterThan(captureDepth("spi_i2c_analyzer"));
  });
});

describe("decodeCount", () => {
  it("ethernet analyzer most decode count", () => {
    expect(decodeCount("ethernet_analyzer")).toBeGreaterThan(decodeCount("pcie_analyzer"));
  });
});

describe("paCost", () => {
  it("pcie analyzer most expensive", () => {
    expect(paCost("pcie_analyzer")).toBeGreaterThan(paCost("spi_i2c_analyzer"));
  });
});

describe("realTime", () => {
  it("usb analyzer is real time", () => {
    expect(realTime("usb_analyzer")).toBe(true);
  });
  it("spi i2c analyzer not real time", () => {
    expect(realTime("spi_i2c_analyzer")).toBe(false);
  });
});

describe("forDebug", () => {
  it("can bus analyzer for debug", () => {
    expect(forDebug("can_bus_analyzer")).toBe(true);
  });
  it("ethernet analyzer not for debug", () => {
    expect(forDebug("ethernet_analyzer")).toBe(false);
  });
});

describe("analyzerConfig", () => {
  it("can bus uses obd j1939 decode error frame detect", () => {
    expect(analyzerConfig("can_bus_analyzer")).toBe("can_bus_protocol_analyzer_obd_j1939_decode_error_frame_detect");
  });
});

describe("bestUse", () => {
  it("spi i2c for embedded logic decode sensor eeprom", () => {
    expect(bestUse("spi_i2c_analyzer")).toBe("embedded_spi_i2c_protocol_analyzer_logic_decode_sensor_eeprom");
  });
});

describe("protocolAnalyzerTypes", () => {
  it("returns 5 types", () => {
    expect(protocolAnalyzerTypes()).toHaveLength(5);
  });
});
