import { describe, it, expect } from "vitest";
import {
  snr, bandwidth, stability, complexity,
  nsCost, highOrder, forAudio, topology,
  bestUse, noiseShapes,
} from "../noise-shape-calc.js";

describe("snr", () => {
  it("multi bit quantize highest snr", () => {
    expect(snr("multi_bit_quantize")).toBeGreaterThan(snr("first_order_delta"));
  });
});

describe("bandwidth", () => {
  it("multi bit quantize widest bandwidth", () => {
    expect(bandwidth("multi_bit_quantize")).toBeGreaterThan(bandwidth("bandpass_centered"));
  });
});

describe("stability", () => {
  it("first order delta most stable", () => {
    expect(stability("first_order_delta")).toBeGreaterThan(stability("bandpass_centered"));
  });
});

describe("complexity", () => {
  it("first order delta least complex", () => {
    expect(complexity("first_order_delta")).toBeGreaterThan(complexity("multi_bit_quantize"));
  });
});

describe("nsCost", () => {
  it("multi bit quantize most expensive", () => {
    expect(nsCost("multi_bit_quantize")).toBeGreaterThan(nsCost("first_order_delta"));
  });
});

describe("highOrder", () => {
  it("third order crfb is high order", () => {
    expect(highOrder("third_order_crfb")).toBe(true);
  });
  it("first order delta not high order", () => {
    expect(highOrder("first_order_delta")).toBe(false);
  });
});

describe("forAudio", () => {
  it("third order crfb for audio", () => {
    expect(forAudio("third_order_crfb")).toBe(true);
  });
  it("bandpass centered not for audio", () => {
    expect(forAudio("bandpass_centered")).toBe(false);
  });
});

describe("topology", () => {
  it("second order mash uses cascaded 1bit stages", () => {
    expect(topology("second_order_mash")).toBe("cascaded_1bit_stages");
  });
});

describe("bestUse", () => {
  it("third order crfb best for hi fi audio dac", () => {
    expect(bestUse("third_order_crfb")).toBe("hi_fi_audio_dac");
  });
});

describe("noiseShapes", () => {
  it("returns 5 types", () => {
    expect(noiseShapes()).toHaveLength(5);
  });
});
