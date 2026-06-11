import { describe, it, expect } from "vitest";
import {
  freqRange, throughput, accuracy, measureSpeed,
  iaCost, autoBalance, forMaterial, analyzerConfig,
  bestUse, impedanceAnalyzerTypes,
} from "../impedance-analyzer-calc.js";

describe("freqRange", () => {
  it("gain phase best freq range", () => {
    expect(freqRange("gain_phase")).toBeGreaterThan(freqRange("impedance_bridge"));
  });
});

describe("throughput", () => {
  it("lcr meter highest throughput", () => {
    expect(throughput("lcr_meter")).toBeGreaterThan(throughput("impedance_bridge"));
  });
});

describe("accuracy", () => {
  it("impedance bridge best accuracy", () => {
    expect(accuracy("impedance_bridge")).toBeGreaterThan(accuracy("gain_phase"));
  });
});

describe("measureSpeed", () => {
  it("lcr meter fastest measure speed", () => {
    expect(measureSpeed("lcr_meter")).toBeGreaterThan(measureSpeed("impedance_bridge"));
  });
});

describe("iaCost", () => {
  it("dielectric analyzer most expensive", () => {
    expect(iaCost("dielectric_analyzer")).toBeGreaterThan(iaCost("lcr_meter"));
  });
});

describe("autoBalance", () => {
  it("lcr meter has auto balance", () => {
    expect(autoBalance("lcr_meter")).toBe(true);
  });
  it("impedance bridge not auto balance", () => {
    expect(autoBalance("impedance_bridge")).toBe(false);
  });
});

describe("forMaterial", () => {
  it("dielectric analyzer for material", () => {
    expect(forMaterial("dielectric_analyzer")).toBe(true);
  });
  it("lcr meter not for material", () => {
    expect(forMaterial("lcr_meter")).toBe(false);
  });
});

describe("analyzerConfig", () => {
  it("electrochemical uses eis nyquist corrosion", () => {
    expect(analyzerConfig("electrochemical_imp")).toBe("electrochemical_impedance_spectroscopy_eis_nyquist_corrosion");
  });
});

describe("bestUse", () => {
  it("gain phase for control loop bode plot stability margin", () => {
    expect(bestUse("gain_phase")).toBe("control_loop_gain_phase_analyzer_bode_plot_stability_margin");
  });
});

describe("impedanceAnalyzerTypes", () => {
  it("returns 5 types", () => {
    expect(impedanceAnalyzerTypes()).toHaveLength(5);
  });
});
