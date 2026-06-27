import { describe, it, expect } from "vitest";
import {
  accuracy, throughput, harmonicRange, channelCount,
  paCost, networkComm, forAudit, analyzerConfig,
  bestUse, powerAnalyzerTypes,
} from "../power-analyzer-calc.js";

describe("accuracy", () => {
  it("power quality best accuracy", () => {
    expect(accuracy("power_quality")).toBeGreaterThan(accuracy("portable_meter"));
  });
});

describe("throughput", () => {
  it("network analyzer highest throughput", () => {
    expect(throughput("network_analyzer")).toBeGreaterThan(throughput("portable_meter"));
  });
});

describe("harmonicRange", () => {
  it("power quality best harmonic range", () => {
    expect(harmonicRange("power_quality")).toBeGreaterThan(harmonicRange("portable_meter"));
  });
});

describe("channelCount", () => {
  it("network analyzer best channel count", () => {
    expect(channelCount("network_analyzer")).toBeGreaterThan(channelCount("portable_meter"));
  });
});

describe("paCost", () => {
  it("power quality most expensive", () => {
    expect(paCost("power_quality")).toBeGreaterThan(paCost("portable_meter"));
  });
});

describe("networkComm", () => {
  it("panel mount has network comm", () => {
    expect(networkComm("panel_mount")).toBe(true);
  });
  it("portable meter no network comm", () => {
    expect(networkComm("portable_meter")).toBe(false);
  });
});

describe("forAudit", () => {
  it("portable meter for audit", () => {
    expect(forAudit("portable_meter")).toBe(true);
  });
  it("panel mount not for audit", () => {
    expect(forAudit("panel_mount")).toBe(false);
  });
});

describe("analyzerConfig", () => {
  it("energy logger uses long term record trend demand peak", () => {
    expect(analyzerConfig("energy_logger")).toBe("energy_logger_power_analyzer_long_term_record_trend_demand_peak");
  });
});

describe("bestUse", () => {
  it("network analyzer for plant wide multi circuit scada", () => {
    expect(bestUse("network_analyzer")).toBe("plant_wide_network_analyzer_power_analyzer_multi_circuit_scada");
  });
});

describe("powerAnalyzerTypes", () => {
  it("returns 5 types", () => {
    expect(powerAnalyzerTypes()).toHaveLength(5);
  });
});
