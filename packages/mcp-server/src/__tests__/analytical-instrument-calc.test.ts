import { describe, it, expect } from "vitest";
import {
  sensitivity, selectivity, sampleThroughput, easeOfUse,
  aiCost, portable, forFieldUse, detector,
  bestUse, analyticalInstrumentTypes,
} from "../analytical-instrument-calc.js";

describe("sensitivity", () => {
  it("mass spectrometer most sensitive", () => {
    expect(sensitivity("mass_spectrometer_ms")).toBeGreaterThan(sensitivity("uv_vis_spectrophoto"));
  });
});

describe("selectivity", () => {
  it("mass spectrometer most selective", () => {
    expect(selectivity("mass_spectrometer_ms")).toBeGreaterThan(selectivity("uv_vis_spectrophoto"));
  });
});

describe("sampleThroughput", () => {
  it("uv vis spectrophotometer highest throughput", () => {
    expect(sampleThroughput("uv_vis_spectrophoto")).toBeGreaterThan(sampleThroughput("mass_spectrometer_ms"));
  });
});

describe("easeOfUse", () => {
  it("uv vis easiest to use", () => {
    expect(easeOfUse("uv_vis_spectrophoto")).toBeGreaterThan(easeOfUse("mass_spectrometer_ms"));
  });
});

describe("aiCost", () => {
  it("mass spectrometer most expensive", () => {
    expect(aiCost("mass_spectrometer_ms")).toBeGreaterThan(aiCost("uv_vis_spectrophoto"));
  });
});

describe("portable", () => {
  it("xrf is portable", () => {
    expect(portable("x_ray_fluorescence")).toBe(true);
  });
  it("mass spectrometer not portable", () => {
    expect(portable("mass_spectrometer_ms")).toBe(false);
  });
});

describe("forFieldUse", () => {
  it("ftir for field use", () => {
    expect(forFieldUse("ftir_spectrometer")).toBe(true);
  });
  it("gas chromatograph not for field use", () => {
    expect(forFieldUse("gas_chromatograph_gc")).toBe(false);
  });
});

describe("detector", () => {
  it("xrf uses silicon drift detector", () => {
    expect(detector("x_ray_fluorescence")).toBe("x_ray_tube_excitation_silicon_drift_detector_energy");
  });
});

describe("bestUse", () => {
  it("gc for petrochemical environmental", () => {
    expect(bestUse("gas_chromatograph_gc")).toBe("petrochemical_environmental_volatile_compound_analysis");
  });
});

describe("analyticalInstrumentTypes", () => {
  it("returns 5 types", () => {
    expect(analyticalInstrumentTypes()).toHaveLength(5);
  });
});
