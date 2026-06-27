import { describe, it, expect } from "vitest";
import {
  capacity, spectralEff, latency, complexity,
  mxCost, optical, forFiber, technique,
  bestUse, multiplexingTypes,
} from "../multiplexing-type-calc.js";

describe("capacity", () => {
  it("wdm highest capacity", () => {
    expect(capacity("wdm_wavelength_division")).toBeGreaterThan(capacity("fdm_frequency_division"));
  });
});

describe("spectralEff", () => {
  it("ofdm best spectral efficiency", () => {
    expect(spectralEff("ofdm_orthogonal_freq")).toBeGreaterThan(spectralEff("tdm_time_division"));
  });
});

describe("latency", () => {
  it("tdm lowest latency", () => {
    expect(latency("tdm_time_division")).toBeGreaterThan(latency("ofdm_orthogonal_freq"));
  });
});

describe("complexity", () => {
  it("ofdm most complex", () => {
    expect(complexity("ofdm_orthogonal_freq")).toBeGreaterThan(complexity("fdm_frequency_division"));
  });
});

describe("mxCost", () => {
  it("wdm most expensive", () => {
    expect(mxCost("wdm_wavelength_division")).toBeGreaterThan(mxCost("fdm_frequency_division"));
  });
});

describe("optical", () => {
  it("wdm is optical", () => {
    expect(optical("wdm_wavelength_division")).toBe(true);
  });
  it("tdm not optical", () => {
    expect(optical("tdm_time_division")).toBe(false);
  });
});

describe("forFiber", () => {
  it("wdm for fiber", () => {
    expect(forFiber("wdm_wavelength_division")).toBe(true);
  });
  it("cdm not for fiber", () => {
    expect(forFiber("cdm_code_division")).toBe(false);
  });
});

describe("technique", () => {
  it("cdm uses spreading code orthogonal", () => {
    expect(technique("cdm_code_division")).toBe("spreading_code_orthogonal");
  });
});

describe("bestUse", () => {
  it("ofdm best for 4g 5g wifi broadband", () => {
    expect(bestUse("ofdm_orthogonal_freq")).toBe("4g_5g_wifi_broadband_wireless");
  });
});

describe("multiplexingTypes", () => {
  it("returns 5 types", () => {
    expect(multiplexingTypes()).toHaveLength(5);
  });
});
