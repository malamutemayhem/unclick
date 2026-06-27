import { describe, it, expect } from "vitest";
import {
  freqRange, throughput, dynamicRange, channelCount,
  vaCost, continuous, forPredictive, analyzerConfig,
  bestUse, vibrationAnalyzerTypes,
} from "../vibration-analyzer-calc.js";

describe("freqRange", () => {
  it("laser vibrometer best freq range", () => {
    expect(freqRange("laser_vibrometer")).toBeGreaterThan(freqRange("portable_collector"));
  });
});

describe("throughput", () => {
  it("online monitor highest throughput", () => {
    expect(throughput("online_monitor")).toBeGreaterThan(throughput("modal_analyzer"));
  });
});

describe("dynamicRange", () => {
  it("laser vibrometer best dynamic range", () => {
    expect(dynamicRange("laser_vibrometer")).toBeGreaterThan(dynamicRange("balancing_analyzer"));
  });
});

describe("channelCount", () => {
  it("modal analyzer most channels", () => {
    expect(channelCount("modal_analyzer")).toBeGreaterThan(channelCount("portable_collector"));
  });
});

describe("vaCost", () => {
  it("laser vibrometer most expensive", () => {
    expect(vaCost("laser_vibrometer")).toBeGreaterThan(vaCost("portable_collector"));
  });
});

describe("continuous", () => {
  it("online monitor is continuous", () => {
    expect(continuous("online_monitor")).toBe(true);
  });
  it("portable collector not continuous", () => {
    expect(continuous("portable_collector")).toBe(false);
  });
});

describe("forPredictive", () => {
  it("portable collector for predictive", () => {
    expect(forPredictive("portable_collector")).toBe(true);
  });
  it("modal analyzer not for predictive", () => {
    expect(forPredictive("modal_analyzer")).toBe(false);
  });
});

describe("analyzerConfig", () => {
  it("modal uses multi channel frf mode shape animate", () => {
    expect(analyzerConfig("modal_analyzer")).toBe("modal_vibration_analyzer_multi_channel_frf_mode_shape_animate");
  });
});

describe("bestUse", () => {
  it("online monitor for critical machine 24 7 protect alert", () => {
    expect(bestUse("online_monitor")).toBe("critical_machine_online_vibration_monitor_24_7_protect_alert");
  });
});

describe("vibrationAnalyzerTypes", () => {
  it("returns 5 types", () => {
    expect(vibrationAnalyzerTypes()).toHaveLength(5);
  });
});
