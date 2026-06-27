import { describe, it, expect } from "vitest";
import {
  accuracy, stability, freqResponse, loadEffect,
  dividerCost, variable, forAc, elementType,
  bestUse, voltageDividers,
} from "../voltage-divider-calc.js";

describe("accuracy", () => {
  it("precision thin film most accurate", () => {
    expect(accuracy("precision_thin_film")).toBeGreaterThan(accuracy("potentiometer_variable"));
  });
});

describe("stability", () => {
  it("precision thin film most stable", () => {
    expect(stability("precision_thin_film")).toBeGreaterThan(stability("potentiometer_variable"));
  });
});

describe("freqResponse", () => {
  it("compensated freq flat best freq response", () => {
    expect(freqResponse("compensated_freq_flat")).toBeGreaterThan(freqResponse("resistive_fixed_ratio"));
  });
});

describe("loadEffect", () => {
  it("compensated freq flat best load effect", () => {
    expect(loadEffect("compensated_freq_flat")).toBeGreaterThan(loadEffect("potentiometer_variable"));
  });
});

describe("dividerCost", () => {
  it("compensated freq flat most expensive", () => {
    expect(dividerCost("compensated_freq_flat")).toBeGreaterThan(dividerCost("resistive_fixed_ratio"));
  });
});

describe("variable", () => {
  it("potentiometer is variable", () => {
    expect(variable("potentiometer_variable")).toBe(true);
  });
  it("resistive fixed ratio not variable", () => {
    expect(variable("resistive_fixed_ratio")).toBe(false);
  });
});

describe("forAc", () => {
  it("capacitive ac divider is for ac", () => {
    expect(forAc("capacitive_ac_divider")).toBe(true);
  });
  it("resistive fixed ratio not for ac", () => {
    expect(forAc("resistive_fixed_ratio")).toBe(false);
  });
});

describe("elementType", () => {
  it("capacitive ac divider uses series capacitor pair", () => {
    expect(elementType("capacitive_ac_divider")).toBe("series_capacitor_pair");
  });
});

describe("bestUse", () => {
  it("compensated freq flat best for oscilloscope probe tip", () => {
    expect(bestUse("compensated_freq_flat")).toBe("oscilloscope_probe_tip");
  });
});

describe("voltageDividers", () => {
  it("returns 5 types", () => {
    expect(voltageDividers()).toHaveLength(5);
  });
});
