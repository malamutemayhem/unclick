import { describe, it, expect } from "vitest";
import {
  freqRange, waveformCount, outputAccuracy, portability,
  genCost, programmable, forRf, outputType,
  bestUse, signalGenerators,
} from "../signal-generator-calc.js";

describe("freqRange", () => {
  it("rf signal gen high widest freq range", () => {
    expect(freqRange("rf_signal_gen_high")).toBeGreaterThan(freqRange("audio_gen_test"));
  });
});

describe("waveformCount", () => {
  it("arbitrary waveform adv most waveforms", () => {
    expect(waveformCount("arbitrary_waveform_adv")).toBeGreaterThan(waveformCount("pulse_gen_digital"));
  });
});

describe("outputAccuracy", () => {
  it("rf signal gen high most accurate output", () => {
    expect(outputAccuracy("rf_signal_gen_high")).toBeGreaterThan(outputAccuracy("function_gen_basic"));
  });
});

describe("portability", () => {
  it("audio gen test most portable", () => {
    expect(portability("audio_gen_test")).toBeGreaterThan(portability("rf_signal_gen_high"));
  });
});

describe("genCost", () => {
  it("rf signal gen high most expensive", () => {
    expect(genCost("rf_signal_gen_high")).toBeGreaterThan(genCost("audio_gen_test"));
  });
});

describe("programmable", () => {
  it("arbitrary waveform adv is programmable", () => {
    expect(programmable("arbitrary_waveform_adv")).toBe(true);
  });
  it("function gen basic not programmable", () => {
    expect(programmable("function_gen_basic")).toBe(false);
  });
});

describe("forRf", () => {
  it("rf signal gen high is for rf", () => {
    expect(forRf("rf_signal_gen_high")).toBe(true);
  });
  it("function gen basic not for rf", () => {
    expect(forRf("function_gen_basic")).toBe(false);
  });
});

describe("outputType", () => {
  it("pulse gen digital uses precise digital pulse", () => {
    expect(outputType("pulse_gen_digital")).toBe("precise_digital_pulse");
  });
});

describe("bestUse", () => {
  it("audio gen test best for audio circuit test", () => {
    expect(bestUse("audio_gen_test")).toBe("audio_circuit_test");
  });
});

describe("signalGenerators", () => {
  it("returns 5 types", () => {
    expect(signalGenerators()).toHaveLength(5);
  });
});
