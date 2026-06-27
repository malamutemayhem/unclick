import { describe, it, expect } from "vitest";
import {
  freqRange, dynamicRange, sensitivity, portability,
  analyzerCost, realTime, portable, displayType,
  bestUse, spectrumAnalyzers,
} from "../spectrum-analyzer-calc.js";

describe("freqRange", () => {
  it("real time wideband widest freq range", () => {
    expect(freqRange("real_time_wideband")).toBeGreaterThan(freqRange("audio_fft_analyzer"));
  });
});

describe("dynamicRange", () => {
  it("benchtop rf best dynamic range", () => {
    expect(dynamicRange("benchtop_rf_full")).toBeGreaterThan(dynamicRange("handheld_field_portable"));
  });
});

describe("sensitivity", () => {
  it("benchtop rf most sensitive", () => {
    expect(sensitivity("benchtop_rf_full")).toBeGreaterThan(sensitivity("handheld_field_portable"));
  });
});

describe("portability", () => {
  it("handheld field most portable", () => {
    expect(portability("handheld_field_portable")).toBeGreaterThan(portability("benchtop_rf_full"));
  });
});

describe("analyzerCost", () => {
  it("real time wideband most expensive", () => {
    expect(analyzerCost("real_time_wideband")).toBeGreaterThan(analyzerCost("usb_pc_based"));
  });
});

describe("realTime", () => {
  it("real time wideband is real time", () => {
    expect(realTime("real_time_wideband")).toBe(true);
  });
  it("benchtop rf not real time", () => {
    expect(realTime("benchtop_rf_full")).toBe(false);
  });
});

describe("portable", () => {
  it("handheld field is portable", () => {
    expect(portable("handheld_field_portable")).toBe(true);
  });
  it("benchtop rf not portable", () => {
    expect(portable("benchtop_rf_full")).toBe(false);
  });
});

describe("displayType", () => {
  it("real time uses spectrogram waterfall", () => {
    expect(displayType("real_time_wideband")).toBe("spectrogram_waterfall");
  });
});

describe("bestUse", () => {
  it("audio fft best for audio speaker response", () => {
    expect(bestUse("audio_fft_analyzer")).toBe("audio_speaker_response");
  });
});

describe("spectrumAnalyzers", () => {
  it("returns 5 types", () => {
    expect(spectrumAnalyzers()).toHaveLength(5);
  });
});
