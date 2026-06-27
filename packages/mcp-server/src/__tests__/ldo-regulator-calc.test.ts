import { describe, it, expect } from "vitest";
import {
  dropout, noiseLevel, psrr, loadRegulation,
  ldoCost, fixedOutput, forAnalog, regType,
  bestUse, ldoRegulators,
} from "../ldo-regulator-calc.js";

describe("dropout", () => {
  it("ultra low dropout best dropout", () => {
    expect(dropout("ultra_low_dropout")).toBeGreaterThan(dropout("standard_positive"));
  });
});

describe("noiseLevel", () => {
  it("low noise rf lowest noise", () => {
    expect(noiseLevel("low_noise_rf")).toBeGreaterThan(noiseLevel("standard_positive"));
  });
});

describe("psrr", () => {
  it("low noise rf best psrr", () => {
    expect(psrr("low_noise_rf")).toBeGreaterThan(psrr("standard_positive"));
  });
});

describe("loadRegulation", () => {
  it("low noise rf best load regulation", () => {
    expect(loadRegulation("low_noise_rf")).toBeGreaterThan(loadRegulation("negative_voltage"));
  });
});

describe("ldoCost", () => {
  it("low noise rf most expensive", () => {
    expect(ldoCost("low_noise_rf")).toBeGreaterThan(ldoCost("standard_positive"));
  });
});

describe("fixedOutput", () => {
  it("standard positive is fixed output", () => {
    expect(fixedOutput("standard_positive")).toBe(true);
  });
  it("adjustable output not fixed", () => {
    expect(fixedOutput("adjustable_output")).toBe(false);
  });
});

describe("forAnalog", () => {
  it("low noise rf is for analog", () => {
    expect(forAnalog("low_noise_rf")).toBe(true);
  });
  it("standard positive not for analog", () => {
    expect(forAnalog("standard_positive")).toBe(false);
  });
});

describe("regType", () => {
  it("ultra low dropout uses pmos low rds on", () => {
    expect(regType("ultra_low_dropout")).toBe("pmos_low_rds_on");
  });
});

describe("bestUse", () => {
  it("low noise rf best for rf pll adc clean supply", () => {
    expect(bestUse("low_noise_rf")).toBe("rf_pll_adc_clean_supply");
  });
});

describe("ldoRegulators", () => {
  it("returns 5 types", () => {
    expect(ldoRegulators()).toHaveLength(5);
  });
});
