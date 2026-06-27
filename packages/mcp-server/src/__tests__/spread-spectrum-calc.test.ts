import { describe, it, expect } from "vitest";
import {
  processingGain, jamResist, spectralEff, multipath,
  ssCost, cdmaCapable, forIot, spreading,
  bestUse, spreadSpectrums,
} from "../spread-spectrum-calc.js";

describe("processingGain", () => {
  it("dsss highest processing gain", () => {
    expect(processingGain("dsss_direct_sequence")).toBeGreaterThan(processingGain("ofdm_orthogonal_fdm"));
  });
});

describe("jamResist", () => {
  it("fhss best jam resistance", () => {
    expect(jamResist("fhss_frequency_hop")).toBeGreaterThan(jamResist("ofdm_orthogonal_fdm"));
  });
});

describe("spectralEff", () => {
  it("ofdm highest spectral efficiency", () => {
    expect(spectralEff("ofdm_orthogonal_fdm")).toBeGreaterThan(spectralEff("chirp_spread_lora"));
  });
});

describe("multipath", () => {
  it("ofdm best multipath handling", () => {
    expect(multipath("ofdm_orthogonal_fdm")).toBeGreaterThan(multipath("fhss_frequency_hop"));
  });
});

describe("ssCost", () => {
  it("ofdm most expensive", () => {
    expect(ssCost("ofdm_orthogonal_fdm")).toBeGreaterThan(ssCost("chirp_spread_lora"));
  });
});

describe("cdmaCapable", () => {
  it("dsss is cdma capable", () => {
    expect(cdmaCapable("dsss_direct_sequence")).toBe(true);
  });
  it("ofdm not cdma capable", () => {
    expect(cdmaCapable("ofdm_orthogonal_fdm")).toBe(false);
  });
});

describe("forIot", () => {
  it("chirp spread for iot", () => {
    expect(forIot("chirp_spread_lora")).toBe(true);
  });
  it("dsss not for iot", () => {
    expect(forIot("dsss_direct_sequence")).toBe(false);
  });
});

describe("spreading", () => {
  it("fhss uses pseudorandom hop pattern", () => {
    expect(spreading("fhss_frequency_hop")).toBe("pseudorandom_hop_pattern");
  });
});

describe("bestUse", () => {
  it("ofdm best for wifi 6 throughput", () => {
    expect(bestUse("ofdm_orthogonal_fdm")).toBe("wifi_6_high_throughput_indoor");
  });
});

describe("spreadSpectrums", () => {
  it("returns 5 types", () => {
    expect(spreadSpectrums()).toHaveLength(5);
  });
});
