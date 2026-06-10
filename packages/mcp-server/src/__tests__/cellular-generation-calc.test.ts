import { describe, it, expect } from "vitest";
import {
  peakSpeed, latencyScore, coverageArea, deviceDensity,
  infrastructureCost, voiceNative, iotOptimized, accessTechnology,
  primaryUseCase, cellularGenerations,
} from "../cellular-generation-calc.js";

describe("peakSpeed", () => {
  it("5g mmwave fastest", () => {
    expect(peakSpeed("5g_mmwave")).toBeGreaterThan(peakSpeed("2g"));
  });
});

describe("latencyScore", () => {
  it("5g mmwave lowest latency", () => {
    expect(latencyScore("5g_mmwave")).toBeGreaterThan(latencyScore("2g"));
  });
});

describe("coverageArea", () => {
  it("2g best coverage", () => {
    expect(coverageArea("2g")).toBeGreaterThan(coverageArea("5g_mmwave"));
  });
});

describe("deviceDensity", () => {
  it("5g mmwave highest density", () => {
    expect(deviceDensity("5g_mmwave")).toBeGreaterThan(deviceDensity("2g"));
  });
});

describe("infrastructureCost", () => {
  it("5g mmwave most expensive", () => {
    expect(infrastructureCost("5g_mmwave")).toBeGreaterThan(infrastructureCost("2g"));
  });
});

describe("voiceNative", () => {
  it("2g has native voice", () => {
    expect(voiceNative("2g")).toBe(true);
  });
  it("4g lte does not", () => {
    expect(voiceNative("4g_lte")).toBe(false);
  });
});

describe("iotOptimized", () => {
  it("5g nr is iot optimized", () => {
    expect(iotOptimized("5g_nr")).toBe(true);
  });
  it("3g is not", () => {
    expect(iotOptimized("3g")).toBe(false);
  });
});

describe("accessTechnology", () => {
  it("2g uses gsm tdma", () => {
    expect(accessTechnology("2g")).toBe("gsm_tdma");
  });
});

describe("primaryUseCase", () => {
  it("5g mmwave for fixed wireless ar vr", () => {
    expect(primaryUseCase("5g_mmwave")).toBe("fixed_wireless_ar_vr");
  });
});

describe("cellularGenerations", () => {
  it("returns 5 generations", () => {
    expect(cellularGenerations()).toHaveLength(5);
  });
});
