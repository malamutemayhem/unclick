import { describe, it, expect } from "vitest";
import {
  resolution, sampleRate, accuracy, powerDraw,
  adcCost, differential, forAudio, architecture,
  bestUse, adcConverters,
} from "../adc-converter-calc.js";

describe("resolution", () => {
  it("sigma delta highest resolution", () => {
    expect(resolution("sigma_delta_precision")).toBeGreaterThan(resolution("flash_high_speed"));
  });
});

describe("sampleRate", () => {
  it("flash highest sample rate", () => {
    expect(sampleRate("flash_high_speed")).toBeGreaterThan(sampleRate("dual_slope_meter"));
  });
});

describe("accuracy", () => {
  it("sigma delta most accurate", () => {
    expect(accuracy("sigma_delta_precision")).toBeGreaterThan(accuracy("flash_high_speed"));
  });
});

describe("powerDraw", () => {
  it("dual slope lowest power draw", () => {
    expect(powerDraw("dual_slope_meter")).toBeGreaterThan(powerDraw("flash_high_speed"));
  });
});

describe("adcCost", () => {
  it("flash most expensive", () => {
    expect(adcCost("flash_high_speed")).toBeGreaterThan(adcCost("dual_slope_meter"));
  });
});

describe("differential", () => {
  it("sigma delta is differential", () => {
    expect(differential("sigma_delta_precision")).toBe(true);
  });
  it("sar not differential", () => {
    expect(differential("sar_general_purpose")).toBe(false);
  });
});

describe("forAudio", () => {
  it("sigma delta is for audio", () => {
    expect(forAudio("sigma_delta_precision")).toBe(true);
  });
  it("flash not for audio", () => {
    expect(forAudio("flash_high_speed")).toBe(false);
  });
});

describe("architecture", () => {
  it("flash uses parallel comparator bank", () => {
    expect(architecture("flash_high_speed")).toBe("parallel_comparator_bank");
  });
});

describe("bestUse", () => {
  it("dual slope best for digital multimeter", () => {
    expect(bestUse("dual_slope_meter")).toBe("digital_multimeter");
  });
});

describe("adcConverters", () => {
  it("returns 5 types", () => {
    expect(adcConverters()).toHaveLength(5);
  });
});
