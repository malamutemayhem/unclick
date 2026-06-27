import { describe, it, expect } from "vitest";
import {
  phaseNoise, lockTime, spurLevel, power,
  pllCost, integrated, forSerdes, technique,
  bestUse, pllArchs,
} from "../pll-arch-calc.js";

describe("phaseNoise", () => {
  it("injection locked best phase noise", () => {
    expect(phaseNoise("injection_locked")).toBeGreaterThan(phaseNoise("all_digital_dpll"));
  });
});

describe("lockTime", () => {
  it("injection locked fastest lock time", () => {
    expect(lockTime("injection_locked")).toBeGreaterThan(lockTime("integer_n_cp"));
  });
});

describe("spurLevel", () => {
  it("integer n cp lowest spurs", () => {
    expect(spurLevel("integer_n_cp")).toBeGreaterThan(spurLevel("injection_locked"));
  });
});

describe("power", () => {
  it("injection locked lowest power", () => {
    expect(power("injection_locked")).toBeGreaterThan(power("integer_n_cp"));
  });
});

describe("pllCost", () => {
  it("bang bang cdr most expensive", () => {
    expect(pllCost("bang_bang_cdr")).toBeGreaterThan(pllCost("integer_n_cp"));
  });
});

describe("integrated", () => {
  it("all digital dpll is integrated", () => {
    expect(integrated("all_digital_dpll")).toBe(true);
  });
  it("bang bang cdr not integrated", () => {
    expect(integrated("bang_bang_cdr")).toBe(false);
  });
});

describe("forSerdes", () => {
  it("bang bang cdr for serdes", () => {
    expect(forSerdes("bang_bang_cdr")).toBe(true);
  });
  it("integer n cp not for serdes", () => {
    expect(forSerdes("integer_n_cp")).toBe(false);
  });
});

describe("technique", () => {
  it("injection locked uses sub harmonic inject osc", () => {
    expect(technique("injection_locked")).toBe("sub_harmonic_inject_osc");
  });
});

describe("bestUse", () => {
  it("all digital dpll best for soc clock gen scaled", () => {
    expect(bestUse("all_digital_dpll")).toBe("soc_clock_gen_scaled");
  });
});

describe("pllArchs", () => {
  it("returns 5 types", () => {
    expect(pllArchs()).toHaveLength(5);
  });
});
