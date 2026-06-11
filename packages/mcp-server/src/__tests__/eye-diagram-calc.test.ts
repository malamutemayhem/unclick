import { describe, it, expect } from "vitest";
import {
  snrMargin, dataRate, complexity, spectralEff,
  eyeCost, fecRequired, forOptical, encoding,
  bestUse, eyeDiagrams,
} from "../eye-diagram-calc.js";

describe("snrMargin", () => {
  it("nrz 2level best snr margin", () => {
    expect(snrMargin("nrz_2level")).toBeGreaterThan(snrMargin("pam4_4level"));
  });
});

describe("dataRate", () => {
  it("pam6 coded highest data rate", () => {
    expect(dataRate("pam6_coded")).toBeGreaterThan(dataRate("nrz_2level"));
  });
});

describe("complexity", () => {
  it("ofdm constellation most complex", () => {
    expect(complexity("ofdm_constellation")).toBeGreaterThan(complexity("nrz_2level"));
  });
});

describe("spectralEff", () => {
  it("ofdm constellation best spectral efficiency", () => {
    expect(spectralEff("ofdm_constellation")).toBeGreaterThan(spectralEff("nrz_2level"));
  });
});

describe("eyeCost", () => {
  it("ofdm constellation most expensive", () => {
    expect(eyeCost("ofdm_constellation")).toBeGreaterThan(eyeCost("nrz_2level"));
  });
});

describe("fecRequired", () => {
  it("pam4 4level requires fec", () => {
    expect(fecRequired("pam4_4level")).toBe(true);
  });
  it("nrz 2level no fec required", () => {
    expect(fecRequired("nrz_2level")).toBe(false);
  });
});

describe("forOptical", () => {
  it("nrz 2level for optical", () => {
    expect(forOptical("nrz_2level")).toBe(true);
  });
  it("pam6 coded not for optical", () => {
    expect(forOptical("pam6_coded")).toBe(false);
  });
});

describe("encoding", () => {
  it("ofdm constellation uses multi carrier qam subcarrier", () => {
    expect(encoding("ofdm_constellation")).toBe("multi_carrier_qam_subcarrier");
  });
});

describe("bestUse", () => {
  it("pam4 4level best for 112g serdes electrical", () => {
    expect(bestUse("pam4_4level")).toBe("112g_serdes_electrical");
  });
});

describe("eyeDiagrams", () => {
  it("returns 5 types", () => {
    expect(eyeDiagrams()).toHaveLength(5);
  });
});
