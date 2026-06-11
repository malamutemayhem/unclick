import { describe, it, expect } from "vitest";
import {
  rolloff, passRipple, groupDelay, stopAtten,
  filterCost, active, forAdc, response,
  bestUse, antiAliasFilters,
} from "../anti-alias-filter-calc.js";

describe("rolloff", () => {
  it("elliptic cauer steepest rolloff", () => {
    expect(rolloff("elliptic_cauer")).toBeGreaterThan(rolloff("bessel_linear_phase"));
  });
});

describe("passRipple", () => {
  it("butterworth flat lowest pass ripple", () => {
    expect(passRipple("butterworth_flat")).toBeGreaterThan(passRipple("elliptic_cauer"));
  });
});

describe("groupDelay", () => {
  it("bessel linear phase best group delay", () => {
    expect(groupDelay("bessel_linear_phase")).toBeGreaterThan(groupDelay("elliptic_cauer"));
  });
});

describe("stopAtten", () => {
  it("elliptic cauer best stop attenuation", () => {
    expect(stopAtten("elliptic_cauer")).toBeGreaterThan(stopAtten("bessel_linear_phase"));
  });
});

describe("filterCost", () => {
  it("sallen key active most expensive", () => {
    expect(filterCost("sallen_key_active")).toBeGreaterThan(filterCost("butterworth_flat"));
  });
});

describe("active", () => {
  it("sallen key active is active", () => {
    expect(active("sallen_key_active")).toBe(true);
  });
  it("butterworth flat not active", () => {
    expect(active("butterworth_flat")).toBe(false);
  });
});

describe("forAdc", () => {
  it("butterworth flat is for adc", () => {
    expect(forAdc("butterworth_flat")).toBe(true);
  });
  it("bessel linear phase not for adc", () => {
    expect(forAdc("bessel_linear_phase")).toBe(false);
  });
});

describe("response", () => {
  it("elliptic cauer uses equiripple both bands", () => {
    expect(response("elliptic_cauer")).toBe("equiripple_both_bands");
  });
});

describe("bestUse", () => {
  it("bessel linear phase best for pulse waveform preserve", () => {
    expect(bestUse("bessel_linear_phase")).toBe("pulse_waveform_preserve");
  });
});

describe("antiAliasFilters", () => {
  it("returns 5 types", () => {
    expect(antiAliasFilters()).toHaveLength(5);
  });
});
