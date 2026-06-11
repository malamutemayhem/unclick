import { describe, it, expect } from "vitest";
import {
  dropout, psrr, noise, quiescent,
  ldoCost, capFree, forAnalog, passElement,
  bestUse, ldoTypes,
} from "../ldo-type-calc.js";

describe("dropout", () => {
  it("low dropout pmos lowest dropout", () => {
    expect(dropout("low_dropout_pmos")).toBeGreaterThan(dropout("standard_nmos_pass"));
  });
});

describe("psrr", () => {
  it("high psrr rf best psrr", () => {
    expect(psrr("high_psrr_rf")).toBeGreaterThan(psrr("standard_nmos_pass"));
  });
});

describe("noise", () => {
  it("ultra low noise lowest noise", () => {
    expect(noise("ultra_low_noise")).toBeGreaterThan(noise("standard_nmos_pass"));
  });
});

describe("quiescent", () => {
  it("low dropout pmos lowest quiescent current", () => {
    expect(quiescent("low_dropout_pmos")).toBeGreaterThan(quiescent("high_psrr_rf"));
  });
});

describe("ldoCost", () => {
  it("high psrr rf most expensive", () => {
    expect(ldoCost("high_psrr_rf")).toBeGreaterThan(ldoCost("standard_nmos_pass"));
  });
});

describe("capFree", () => {
  it("high psrr rf is cap free", () => {
    expect(capFree("high_psrr_rf")).toBe(true);
  });
  it("low dropout pmos not cap free", () => {
    expect(capFree("low_dropout_pmos")).toBe(false);
  });
});

describe("forAnalog", () => {
  it("ultra low noise for analog", () => {
    expect(forAnalog("ultra_low_noise")).toBe(true);
  });
  it("standard nmos pass not for analog", () => {
    expect(forAnalog("standard_nmos_pass")).toBe(false);
  });
});

describe("passElement", () => {
  it("high psrr rf uses regulated cascode loop", () => {
    expect(passElement("high_psrr_rf")).toBe("regulated_cascode_loop");
  });
});

describe("bestUse", () => {
  it("ultra low noise best for pll vco clean supply", () => {
    expect(bestUse("ultra_low_noise")).toBe("pll_vco_clean_supply");
  });
});

describe("ldoTypes", () => {
  it("returns 5 types", () => {
    expect(ldoTypes()).toHaveLength(5);
  });
});
