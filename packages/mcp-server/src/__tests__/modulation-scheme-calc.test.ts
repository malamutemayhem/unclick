import { describe, it, expect } from "vitest";
import {
  bitsPerSymbol, spectralEfficiency, noiseResistance,
  implementationComplexity, peakToAverageRatio, requiresLinearAmplifier,
  multiCarrier, commonApplication, constellationType, modulationSchemes,
} from "../modulation-scheme-calc.js";

describe("bitsPerSymbol", () => {
  it("qam64 most bits per symbol", () => {
    expect(bitsPerSymbol("qam64")).toBeGreaterThan(
      bitsPerSymbol("qpsk")
    );
  });
});

describe("spectralEfficiency", () => {
  it("qam64 most efficient", () => {
    expect(spectralEfficiency("qam64")).toBeGreaterThan(
      spectralEfficiency("fsk")
    );
  });
});

describe("noiseResistance", () => {
  it("fsk best noise resistance", () => {
    expect(noiseResistance("fsk")).toBeGreaterThan(
      noiseResistance("qam64")
    );
  });
});

describe("implementationComplexity", () => {
  it("ofdm most complex", () => {
    expect(implementationComplexity("ofdm")).toBeGreaterThan(
      implementationComplexity("fsk")
    );
  });
});

describe("peakToAverageRatio", () => {
  it("ofdm highest PAPR", () => {
    expect(peakToAverageRatio("ofdm")).toBeGreaterThan(
      peakToAverageRatio("qpsk")
    );
  });
});

describe("requiresLinearAmplifier", () => {
  it("qam16 requires linear amplifier", () => {
    expect(requiresLinearAmplifier("qam16")).toBe(true);
  });
  it("fsk does not", () => {
    expect(requiresLinearAmplifier("fsk")).toBe(false);
  });
});

describe("multiCarrier", () => {
  it("ofdm is multi-carrier", () => {
    expect(multiCarrier("ofdm")).toBe(true);
  });
  it("qpsk is not", () => {
    expect(multiCarrier("qpsk")).toBe(false);
  });
});

describe("commonApplication", () => {
  it("fsk for low power iot", () => {
    expect(commonApplication("fsk")).toBe("low_power_iot");
  });
});

describe("constellationType", () => {
  it("qpsk has four point circle", () => {
    expect(constellationType("qpsk")).toBe("four_point_circle");
  });
});

describe("modulationSchemes", () => {
  it("returns 5 schemes", () => {
    expect(modulationSchemes()).toHaveLength(5);
  });
});
