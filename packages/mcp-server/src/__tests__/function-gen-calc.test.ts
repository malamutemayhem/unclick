import { describe, it, expect } from "vitest";
import {
  freqRange, waveformCount, accuracy, outputChannels,
  genCost, arbitrary, portable, outputType,
  bestUse, functionGens,
} from "../function-gen-calc.js";

describe("freqRange", () => {
  it("rf signal source widest freq range", () => {
    expect(freqRange("rf_signal_source")).toBeGreaterThan(freqRange("usb_compact_module"));
  });
});

describe("waveformCount", () => {
  it("arbitrary waveform most waveforms", () => {
    expect(waveformCount("arbitrary_waveform")).toBeGreaterThan(waveformCount("rf_signal_source"));
  });
});

describe("accuracy", () => {
  it("pulse pattern gen best accuracy", () => {
    expect(accuracy("pulse_pattern_gen")).toBeGreaterThan(accuracy("usb_compact_module"));
  });
});

describe("outputChannels", () => {
  it("pulse pattern gen most channels", () => {
    expect(outputChannels("pulse_pattern_gen")).toBeGreaterThan(outputChannels("rf_signal_source"));
  });
});

describe("genCost", () => {
  it("rf signal source most expensive", () => {
    expect(genCost("rf_signal_source")).toBeGreaterThan(genCost("usb_compact_module"));
  });
});

describe("arbitrary", () => {
  it("arbitrary waveform is arbitrary", () => {
    expect(arbitrary("arbitrary_waveform")).toBe(true);
  });
  it("dds benchtop basic not arbitrary", () => {
    expect(arbitrary("dds_benchtop_basic")).toBe(false);
  });
});

describe("portable", () => {
  it("usb compact module is portable", () => {
    expect(portable("usb_compact_module")).toBe(true);
  });
  it("arbitrary waveform not portable", () => {
    expect(portable("arbitrary_waveform")).toBe(false);
  });
});

describe("outputType", () => {
  it("pulse pattern gen uses digital pulse pattern", () => {
    expect(outputType("pulse_pattern_gen")).toBe("digital_pulse_pattern");
  });
});

describe("bestUse", () => {
  it("rf signal source best for rf receiver test", () => {
    expect(bestUse("rf_signal_source")).toBe("rf_receiver_test");
  });
});

describe("functionGens", () => {
  it("returns 5 types", () => {
    expect(functionGens()).toHaveLength(5);
  });
});
