import { describe, it, expect } from "vitest";
import {
  convGain, noiseFigure, linearity, loLeakage,
  mixCost, requiresLoDrive, forDirectConvert, topology,
  bestUse, mixerTypes,
} from "../mixer-type-calc.js";

describe("convGain", () => {
  it("active gilbert cell highest conversion gain", () => {
    expect(convGain("active_gilbert_cell")).toBeGreaterThan(convGain("passive_switch_ring"));
  });
});

describe("noiseFigure", () => {
  it("sampling mixer best noise figure", () => {
    expect(noiseFigure("sampling_mixer")).toBeGreaterThan(noiseFigure("subharmonic_x2"));
  });
});

describe("linearity", () => {
  it("passive switch ring best linearity", () => {
    expect(linearity("passive_switch_ring")).toBeGreaterThan(linearity("active_gilbert_cell"));
  });
});

describe("loLeakage", () => {
  it("subharmonic x2 best lo leakage rejection", () => {
    expect(loLeakage("subharmonic_x2")).toBeGreaterThan(loLeakage("active_gilbert_cell"));
  });
});

describe("mixCost", () => {
  it("harmonic reject most expensive", () => {
    expect(mixCost("harmonic_reject")).toBeGreaterThan(mixCost("passive_switch_ring"));
  });
});

describe("requiresLoDrive", () => {
  it("passive switch ring requires lo drive", () => {
    expect(requiresLoDrive("passive_switch_ring")).toBe(true);
  });
  it("active gilbert cell no lo drive required", () => {
    expect(requiresLoDrive("active_gilbert_cell")).toBe(false);
  });
});

describe("forDirectConvert", () => {
  it("sampling mixer for direct convert", () => {
    expect(forDirectConvert("sampling_mixer")).toBe(true);
  });
  it("active gilbert cell not for direct convert", () => {
    expect(forDirectConvert("active_gilbert_cell")).toBe(false);
  });
});

describe("topology", () => {
  it("harmonic reject uses polyphase weighted sum", () => {
    expect(topology("harmonic_reject")).toBe("polyphase_weighted_sum");
  });
});

describe("bestUse", () => {
  it("passive switch ring best for high dynamic range rx", () => {
    expect(bestUse("passive_switch_ring")).toBe("high_dynamic_range_rx");
  });
});

describe("mixerTypes", () => {
  it("returns 5 types", () => {
    expect(mixerTypes()).toHaveLength(5);
  });
});
