import { describe, it, expect } from "vitest";
import {
  noiseFigure, gain, efficiency, linearity,
  ampCost, broadband, forTransmit, topology,
  bestUse, rfAmplifiers,
} from "../rf-amplifier-calc.js";

describe("noiseFigure", () => {
  it("lna low noise best noise figure", () => {
    expect(noiseFigure("lna_low_noise")).toBeGreaterThan(noiseFigure("pa_power_amp"));
  });
});

describe("gain", () => {
  it("mmic integrated highest gain", () => {
    expect(gain("mmic_integrated")).toBeGreaterThan(gain("lna_low_noise"));
  });
});

describe("efficiency", () => {
  it("doherty efficient best efficiency", () => {
    expect(efficiency("doherty_efficient")).toBeGreaterThan(efficiency("lna_low_noise"));
  });
});

describe("linearity", () => {
  it("doherty efficient best linearity", () => {
    expect(linearity("doherty_efficient")).toBeGreaterThan(linearity("pa_power_amp"));
  });
});

describe("ampCost", () => {
  it("doherty efficient most expensive", () => {
    expect(ampCost("doherty_efficient")).toBeGreaterThan(ampCost("lna_low_noise"));
  });
});

describe("broadband", () => {
  it("lna low noise is broadband", () => {
    expect(broadband("lna_low_noise")).toBe(true);
  });
  it("pa power amp not broadband", () => {
    expect(broadband("pa_power_amp")).toBe(false);
  });
});

describe("forTransmit", () => {
  it("pa power amp is for transmit", () => {
    expect(forTransmit("pa_power_amp")).toBe(true);
  });
  it("lna low noise not for transmit", () => {
    expect(forTransmit("lna_low_noise")).toBe(false);
  });
});

describe("topology", () => {
  it("lna low noise uses cascode degenerate", () => {
    expect(topology("lna_low_noise")).toBe("cascode_degenerate");
  });
});

describe("bestUse", () => {
  it("doherty efficient best for 5g macro base station", () => {
    expect(bestUse("doherty_efficient")).toBe("5g_macro_base_station");
  });
});

describe("rfAmplifiers", () => {
  it("returns 5 types", () => {
    expect(rfAmplifiers()).toHaveLength(5);
  });
});
