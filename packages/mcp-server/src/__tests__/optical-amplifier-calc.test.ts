import { describe, it, expect } from "vitest";
import {
  gain, noiseFigure, bandwidth, saturationPower,
  ampCost, integrated, forLongHaul, medium,
  bestUse, opticalAmplifiers,
} from "../optical-amplifier-calc.js";

describe("gain", () => {
  it("edfa erbium highest gain", () => {
    expect(gain("edfa_erbium")).toBeGreaterThan(gain("soa_semiconductor"));
  });
});

describe("noiseFigure", () => {
  it("parametric opa best noise figure", () => {
    expect(noiseFigure("parametric_opa")).toBeGreaterThan(noiseFigure("soa_semiconductor"));
  });
});

describe("bandwidth", () => {
  it("raman distributed widest bandwidth", () => {
    expect(bandwidth("raman_distributed")).toBeGreaterThan(bandwidth("parametric_opa"));
  });
});

describe("saturationPower", () => {
  it("edfa erbium highest saturation power", () => {
    expect(saturationPower("edfa_erbium")).toBeGreaterThan(saturationPower("soa_semiconductor"));
  });
});

describe("ampCost", () => {
  it("parametric opa most expensive", () => {
    expect(ampCost("parametric_opa")).toBeGreaterThan(ampCost("soa_semiconductor"));
  });
});

describe("integrated", () => {
  it("soa semiconductor is integrated", () => {
    expect(integrated("soa_semiconductor")).toBe(true);
  });
  it("edfa erbium not integrated", () => {
    expect(integrated("edfa_erbium")).toBe(false);
  });
});

describe("forLongHaul", () => {
  it("edfa erbium is for long haul", () => {
    expect(forLongHaul("edfa_erbium")).toBe(true);
  });
  it("soa semiconductor not for long haul", () => {
    expect(forLongHaul("soa_semiconductor")).toBe(false);
  });
});

describe("medium", () => {
  it("raman distributed uses silica fiber itself", () => {
    expect(medium("raman_distributed")).toBe("silica_fiber_itself");
  });
});

describe("bestUse", () => {
  it("tdfa thulium best for s band expansion", () => {
    expect(bestUse("tdfa_thulium")).toBe("s_band_expansion");
  });
});

describe("opticalAmplifiers", () => {
  it("returns 5 types", () => {
    expect(opticalAmplifiers()).toHaveLength(5);
  });
});
