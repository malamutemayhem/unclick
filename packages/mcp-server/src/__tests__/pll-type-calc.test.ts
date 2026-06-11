import { describe, it, expect } from "vitest";
import {
  lockTime, phaseNoise, spurLevel, tuningRange,
  pllCost, digital, forRfSynth, loopFilter,
  bestUse, pllTypes,
} from "../pll-type-calc.js";

describe("lockTime", () => {
  it("injection locked fastest lock time", () => {
    expect(lockTime("injection_locked")).toBeGreaterThan(lockTime("analog_charge_pump"));
  });
});

describe("phaseNoise", () => {
  it("injection locked best phase noise", () => {
    expect(phaseNoise("injection_locked")).toBeGreaterThan(phaseNoise("all_digital_adpll"));
  });
});

describe("spurLevel", () => {
  it("analog charge pump best spur level", () => {
    expect(spurLevel("analog_charge_pump")).toBeGreaterThan(spurLevel("injection_locked"));
  });
});

describe("tuningRange", () => {
  it("fractional n sigma widest tuning range", () => {
    expect(tuningRange("fractional_n_sigma")).toBeGreaterThan(tuningRange("integer_n_synth"));
  });
});

describe("pllCost", () => {
  it("injection locked most expensive", () => {
    expect(pllCost("injection_locked")).toBeGreaterThan(pllCost("analog_charge_pump"));
  });
});

describe("digital", () => {
  it("all digital adpll is digital", () => {
    expect(digital("all_digital_adpll")).toBe(true);
  });
  it("integer n synth not digital", () => {
    expect(digital("integer_n_synth")).toBe(false);
  });
});

describe("forRfSynth", () => {
  it("fractional n sigma is for rf synth", () => {
    expect(forRfSynth("fractional_n_sigma")).toBe(true);
  });
  it("all digital adpll not for rf synth", () => {
    expect(forRfSynth("all_digital_adpll")).toBe(false);
  });
});

describe("loopFilter", () => {
  it("integer n synth uses passive rc third order", () => {
    expect(loopFilter("integer_n_synth")).toBe("passive_rc_third_order");
  });
});

describe("bestUse", () => {
  it("injection locked best for low jitter serializer", () => {
    expect(bestUse("injection_locked")).toBe("low_jitter_serializer");
  });
});

describe("pllTypes", () => {
  it("returns 5 types", () => {
    expect(pllTypes()).toHaveLength(5);
  });
});
