import { describe, it, expect } from "vitest";
import {
  sensitivity, selectivity, dynamicRange, complexity,
  frontendCost, digital, forSdr, architecture,
  bestUse, rfFrontends,
} from "../rf-frontend-calc.js";

describe("sensitivity", () => {
  it("superheterodyne most sensitive", () => {
    expect(sensitivity("superheterodyne")).toBeGreaterThan(sensitivity("zero_if_homodyne"));
  });
});

describe("selectivity", () => {
  it("superheterodyne best selectivity", () => {
    expect(selectivity("superheterodyne")).toBeGreaterThan(selectivity("zero_if_homodyne"));
  });
});

describe("dynamicRange", () => {
  it("sampling receiver best dynamic range", () => {
    expect(dynamicRange("sampling_receiver")).toBeGreaterThan(dynamicRange("zero_if_homodyne"));
  });
});

describe("complexity", () => {
  it("sampling receiver most complex", () => {
    expect(complexity("sampling_receiver")).toBeGreaterThan(complexity("zero_if_homodyne"));
  });
});

describe("frontendCost", () => {
  it("sampling receiver most expensive", () => {
    expect(frontendCost("sampling_receiver")).toBeGreaterThan(frontendCost("zero_if_homodyne"));
  });
});

describe("digital", () => {
  it("sampling receiver is digital", () => {
    expect(digital("sampling_receiver")).toBe(true);
  });
  it("superheterodyne not digital", () => {
    expect(digital("superheterodyne")).toBe(false);
  });
});

describe("forSdr", () => {
  it("sampling receiver is for sdr", () => {
    expect(forSdr("sampling_receiver")).toBe(true);
  });
  it("superheterodyne not for sdr", () => {
    expect(forSdr("superheterodyne")).toBe(false);
  });
});

describe("architecture", () => {
  it("superheterodyne uses multi stage if mix", () => {
    expect(architecture("superheterodyne")).toBe("multi_stage_if_mix");
  });
});

describe("bestUse", () => {
  it("sampling receiver best for wideband spectrum monitor", () => {
    expect(bestUse("sampling_receiver")).toBe("wideband_spectrum_monitor");
  });
});

describe("rfFrontends", () => {
  it("returns 5 types", () => {
    expect(rfFrontends()).toHaveLength(5);
  });
});
