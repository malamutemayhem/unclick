import { describe, it, expect } from "vitest";
import {
  channelCount, throughput, sampleRate, storageCapacity,
  dlCost, remoteAccess, forValidation, loggerConfig,
  bestUse, dataLoggerTypes,
} from "../data-logger-calc.js";

describe("channelCount", () => {
  it("edge gateway best channel count", () => {
    expect(channelCount("edge_gateway")).toBeGreaterThan(channelCount("wireless_logger"));
  });
});

describe("throughput", () => {
  it("high speed daq highest throughput", () => {
    expect(throughput("high_speed_daq")).toBeGreaterThan(throughput("wireless_logger"));
  });
});

describe("sampleRate", () => {
  it("high speed daq best sample rate", () => {
    expect(sampleRate("high_speed_daq")).toBeGreaterThan(sampleRate("wireless_logger"));
  });
});

describe("storageCapacity", () => {
  it("edge gateway best storage capacity", () => {
    expect(storageCapacity("edge_gateway")).toBeGreaterThan(storageCapacity("wireless_logger"));
  });
});

describe("dlCost", () => {
  it("high speed daq most expensive", () => {
    expect(dlCost("high_speed_daq")).toBeGreaterThan(dlCost("wireless_logger"));
  });
});

describe("remoteAccess", () => {
  it("wireless logger has remote access", () => {
    expect(remoteAccess("wireless_logger")).toBe(true);
  });
  it("high speed daq no remote access", () => {
    expect(remoteAccess("high_speed_daq")).toBe(false);
  });
});

describe("forValidation", () => {
  it("paperless recorder for validation", () => {
    expect(forValidation("paperless_recorder")).toBe(true);
  });
  it("wireless logger not for validation", () => {
    expect(forValidation("wireless_logger")).toBe(false);
  });
});

describe("loggerConfig", () => {
  it("edge gateway uses mqtt opcua modbus aggregate edge compute push", () => {
    expect(loggerConfig("edge_gateway")).toBe("edge_gateway_logger_mqtt_opcua_modbus_aggregate_edge_compute_push");
  });
});

describe("bestUse", () => {
  it("paperless recorder for pharma batch fda compliant trend display audit", () => {
    expect(bestUse("paperless_recorder")).toBe("pharma_batch_paperless_recorder_fda_compliant_trend_display_audit");
  });
});

describe("dataLoggerTypes", () => {
  it("returns 5 types", () => {
    expect(dataLoggerTypes()).toHaveLength(5);
  });
});
