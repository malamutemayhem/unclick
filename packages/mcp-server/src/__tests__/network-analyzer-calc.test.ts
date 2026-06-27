import { describe, it, expect } from "vitest";
import {
  dynamicRange, freqRange, portCount, traceNoise,
  vnaCost, calibrated, forSignalInteg, measurement,
  bestUse, networkAnalyzers,
} from "../network-analyzer-calc.js";

describe("dynamicRange", () => {
  it("vector vna 2port best dynamic range", () => {
    expect(dynamicRange("vector_vna_2port")).toBeGreaterThan(dynamicRange("scalar_sna"));
  });
});

describe("freqRange", () => {
  it("vector vna 2port widest freq range", () => {
    expect(freqRange("vector_vna_2port")).toBeGreaterThan(freqRange("scalar_sna"));
  });
});

describe("portCount", () => {
  it("multiport vna 4 most ports", () => {
    expect(portCount("multiport_vna_4")).toBeGreaterThan(portCount("vector_vna_2port"));
  });
});

describe("traceNoise", () => {
  it("vector vna 2port lowest trace noise", () => {
    expect(traceNoise("vector_vna_2port")).toBeGreaterThan(traceNoise("scalar_sna"));
  });
});

describe("vnaCost", () => {
  it("multiport vna 4 most expensive", () => {
    expect(vnaCost("multiport_vna_4")).toBeGreaterThan(vnaCost("scalar_sna"));
  });
});

describe("calibrated", () => {
  it("vector vna 2port is calibrated", () => {
    expect(calibrated("vector_vna_2port")).toBe(true);
  });
  it("scalar sna not calibrated", () => {
    expect(calibrated("scalar_sna")).toBe(false);
  });
});

describe("forSignalInteg", () => {
  it("time domain tdr is for signal integrity", () => {
    expect(forSignalInteg("time_domain_tdr")).toBe(true);
  });
  it("scalar sna not for signal integrity", () => {
    expect(forSignalInteg("scalar_sna")).toBe(false);
  });
});

describe("measurement", () => {
  it("time domain tdr uses impedance vs distance", () => {
    expect(measurement("time_domain_tdr")).toBe("impedance_vs_distance");
  });
});

describe("bestUse", () => {
  it("multiport vna 4 best for differential serdes char", () => {
    expect(bestUse("multiport_vna_4")).toBe("differential_serdes_char");
  });
});

describe("networkAnalyzers", () => {
  it("returns 5 types", () => {
    expect(networkAnalyzers()).toHaveLength(5);
  });
});
