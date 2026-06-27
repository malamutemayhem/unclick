import { describe, it, expect } from "vitest";
import {
  outputImpedance, matching, compliance, bandwidth,
  mirrorCost, selfBiased, forAnalog, structure,
  bestUse, currentMirrors,
} from "../current-mirror-calc.js";

describe("outputImpedance", () => {
  it("regulated cascode highest output impedance", () => {
    expect(outputImpedance("regulated_cascode")).toBeGreaterThan(outputImpedance("simple_2transistor"));
  });
});

describe("matching", () => {
  it("regulated cascode best matching", () => {
    expect(matching("regulated_cascode")).toBeGreaterThan(matching("simple_2transistor"));
  });
});

describe("compliance", () => {
  it("simple 2transistor best compliance", () => {
    expect(compliance("simple_2transistor")).toBeGreaterThan(compliance("cascode_high_z"));
  });
});

describe("bandwidth", () => {
  it("simple 2transistor highest bandwidth", () => {
    expect(bandwidth("simple_2transistor")).toBeGreaterThan(bandwidth("regulated_cascode"));
  });
});

describe("mirrorCost", () => {
  it("regulated cascode most expensive", () => {
    expect(mirrorCost("regulated_cascode")).toBeGreaterThan(mirrorCost("simple_2transistor"));
  });
});

describe("selfBiased", () => {
  it("wilson improved is self biased", () => {
    expect(selfBiased("wilson_improved")).toBe(true);
  });
  it("simple 2transistor not self biased", () => {
    expect(selfBiased("simple_2transistor")).toBe(false);
  });
});

describe("forAnalog", () => {
  it("cascode high z is for analog", () => {
    expect(forAnalog("cascode_high_z")).toBe(true);
  });
  it("simple 2transistor not for analog", () => {
    expect(forAnalog("simple_2transistor")).toBe(false);
  });
});

describe("structure", () => {
  it("regulated cascode uses gain boosted loop", () => {
    expect(structure("regulated_cascode")).toBe("gain_boosted_loop");
  });
});

describe("bestUse", () => {
  it("regulated cascode best for high res adc ref current", () => {
    expect(bestUse("regulated_cascode")).toBe("high_res_adc_ref_current");
  });
});

describe("currentMirrors", () => {
  it("returns 5 types", () => {
    expect(currentMirrors()).toHaveLength(5);
  });
});
