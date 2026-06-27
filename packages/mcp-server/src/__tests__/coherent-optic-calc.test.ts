import { describe, it, expect } from "vitest";
import {
  capacity, reach, spectralEff, complexity,
  optCost, softDecision, forMetro, modulation,
  bestUse, coherentOptics,
} from "../coherent-optic-calc.js";

describe("capacity", () => {
  it("dp 64qam 800g highest capacity", () => {
    expect(capacity("dp_64qam_800g")).toBeGreaterThan(capacity("dp_qpsk_100g"));
  });
});

describe("reach", () => {
  it("dp qpsk 100g longest reach", () => {
    expect(reach("dp_qpsk_100g")).toBeGreaterThan(reach("dp_64qam_800g"));
  });
});

describe("spectralEff", () => {
  it("dp 64qam 800g best spectral efficiency", () => {
    expect(spectralEff("dp_64qam_800g")).toBeGreaterThan(spectralEff("dp_qpsk_100g"));
  });
});

describe("complexity", () => {
  it("probabilistic shaping most complex", () => {
    expect(complexity("probabilistic_shaping")).toBeGreaterThan(complexity("dp_qpsk_100g"));
  });
});

describe("optCost", () => {
  it("probabilistic shaping most expensive", () => {
    expect(optCost("probabilistic_shaping")).toBeGreaterThan(optCost("dp_qpsk_100g"));
  });
});

describe("softDecision", () => {
  it("dp 16qam 400g uses soft decision", () => {
    expect(softDecision("dp_16qam_400g")).toBe(true);
  });
  it("dp qpsk 100g not soft decision", () => {
    expect(softDecision("dp_qpsk_100g")).toBe(false);
  });
});

describe("forMetro", () => {
  it("dp 16qam 400g is for metro", () => {
    expect(forMetro("dp_16qam_400g")).toBe(true);
  });
  it("dp qpsk 100g not for metro", () => {
    expect(forMetro("dp_qpsk_100g")).toBe(false);
  });
});

describe("modulation", () => {
  it("ofdm optical uses multi subcarrier ofdm", () => {
    expect(modulation("ofdm_optical")).toBe("multi_subcarrier_ofdm");
  });
});

describe("bestUse", () => {
  it("probabilistic shaping best for flexible rate open line", () => {
    expect(bestUse("probabilistic_shaping")).toBe("flexible_rate_open_line");
  });
});

describe("coherentOptics", () => {
  it("returns 5 types", () => {
    expect(coherentOptics()).toHaveLength(5);
  });
});
