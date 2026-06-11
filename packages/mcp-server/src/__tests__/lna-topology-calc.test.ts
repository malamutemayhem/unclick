import { describe, it, expect } from "vitest";
import {
  noiseFigure, gain, bandwidth, linearity,
  lnaCost, differential, forMmwave, technique,
  bestUse, lnaTopologies,
} from "../lna-topology-calc.js";

describe("noiseFigure", () => {
  it("noise cancelling best noise figure", () => {
    expect(noiseFigure("noise_cancelling")).toBeGreaterThan(noiseFigure("common_gate_wideband"));
  });
});

describe("gain", () => {
  it("cascode gain boost highest gain", () => {
    expect(gain("cascode_gain_boost")).toBeGreaterThan(gain("common_gate_wideband"));
  });
});

describe("bandwidth", () => {
  it("common gate wideband widest bandwidth", () => {
    expect(bandwidth("common_gate_wideband")).toBeGreaterThan(bandwidth("common_source_inductive"));
  });
});

describe("linearity", () => {
  it("common gate wideband best linearity", () => {
    expect(linearity("common_gate_wideband")).toBeGreaterThan(linearity("common_source_inductive"));
  });
});

describe("lnaCost", () => {
  it("balun lna mixer most expensive", () => {
    expect(lnaCost("balun_lna_mixer")).toBeGreaterThan(lnaCost("common_gate_wideband"));
  });
});

describe("differential", () => {
  it("noise cancelling is differential", () => {
    expect(differential("noise_cancelling")).toBe(true);
  });
  it("cascode gain boost not differential", () => {
    expect(differential("cascode_gain_boost")).toBe(false);
  });
});

describe("forMmwave", () => {
  it("balun lna mixer for mmwave", () => {
    expect(forMmwave("balun_lna_mixer")).toBe(true);
  });
  it("noise cancelling not for mmwave", () => {
    expect(forMmwave("noise_cancelling")).toBe(false);
  });
});

describe("technique", () => {
  it("noise cancelling uses feedforward noise subtract", () => {
    expect(technique("noise_cancelling")).toBe("feedforward_noise_subtract");
  });
});

describe("bestUse", () => {
  it("common gate wideband best for uwb impulse radio", () => {
    expect(bestUse("common_gate_wideband")).toBe("uwb_impulse_radio");
  });
});

describe("lnaTopologies", () => {
  it("returns 5 types", () => {
    expect(lnaTopologies()).toHaveLength(5);
  });
});
