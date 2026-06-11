import { describe, it, expect } from "vitest";
import {
  insertionLoss, pressureDrop, selfNoise, lowFreqPerf,
  dsCost, dissipative, forHvac, design,
  bestUse, ductSilencerTypes,
} from "../duct-silencer-calc.js";

describe("insertionLoss", () => {
  it("rectangular splitter best insertion loss", () => {
    expect(insertionLoss("rectangular_splitter")).toBeGreaterThan(insertionLoss("elbow_lined_turn"));
  });
});

describe("pressureDrop", () => {
  it("circular pod highest pressure drop", () => {
    expect(pressureDrop("circular_pod_inline")).toBeGreaterThan(pressureDrop("elbow_lined_turn"));
  });
});

describe("selfNoise", () => {
  it("reactive chamber best self noise", () => {
    expect(selfNoise("reactive_chamber")).toBeGreaterThan(selfNoise("rectangular_splitter"));
  });
});

describe("lowFreqPerf", () => {
  it("reactive chamber best low frequency", () => {
    expect(lowFreqPerf("reactive_chamber")).toBeGreaterThan(lowFreqPerf("circular_pod_inline"));
  });
});

describe("dsCost", () => {
  it("reactive chamber most expensive", () => {
    expect(dsCost("reactive_chamber")).toBeGreaterThan(dsCost("elbow_lined_turn"));
  });
});

describe("dissipative", () => {
  it("rectangular splitter is dissipative", () => {
    expect(dissipative("rectangular_splitter")).toBe(true);
  });
  it("reactive chamber not dissipative", () => {
    expect(dissipative("reactive_chamber")).toBe(false);
  });
});

describe("forHvac", () => {
  it("elbow lined for hvac", () => {
    expect(forHvac("elbow_lined_turn")).toBe(true);
  });
  it("reactive chamber not for hvac", () => {
    expect(forHvac("reactive_chamber")).toBe(false);
  });
});

describe("design", () => {
  it("acoustic louver uses weather blade combo", () => {
    expect(design("acoustic_louver_intake")).toBe("weather_louver_acoustic_blade_rain_screen_combo");
  });
});

describe("bestUse", () => {
  it("reactive chamber for engine exhaust", () => {
    expect(bestUse("reactive_chamber")).toBe("engine_exhaust_compressor_low_frequency_tonal");
  });
});

describe("ductSilencerTypes", () => {
  it("returns 5 types", () => {
    expect(ductSilencerTypes()).toHaveLength(5);
  });
});
