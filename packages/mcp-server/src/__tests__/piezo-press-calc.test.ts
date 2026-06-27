import { describe, it, expect } from "vitest";
import {
  accuracy, dynamicRange, longTermStab, tempEffect,
  ppCost, staticMeasure, forDynamic, element,
  bestUse, piezoPressTypes,
} from "../piezo-press-calc.js";

describe("accuracy", () => {
  it("sapphire most accurate", () => {
    expect(accuracy("sapphire_high_perf")).toBeGreaterThan(accuracy("piezoelectric_quartz"));
  });
});

describe("dynamicRange", () => {
  it("piezoelectric quartz best dynamic range", () => {
    expect(dynamicRange("piezoelectric_quartz")).toBeGreaterThan(dynamicRange("capacitive_ceramic"));
  });
});

describe("longTermStab", () => {
  it("sapphire best long term stability", () => {
    expect(longTermStab("sapphire_high_perf")).toBeGreaterThan(longTermStab("piezoelectric_quartz"));
  });
});

describe("tempEffect", () => {
  it("sapphire best temperature compensation", () => {
    expect(tempEffect("sapphire_high_perf")).toBeGreaterThan(tempEffect("piezoresistive_silicon"));
  });
});

describe("ppCost", () => {
  it("sapphire most expensive", () => {
    expect(ppCost("sapphire_high_perf")).toBeGreaterThan(ppCost("piezoresistive_silicon"));
  });
});

describe("staticMeasure", () => {
  it("piezoresistive silicon can measure static", () => {
    expect(staticMeasure("piezoresistive_silicon")).toBe(true);
  });
  it("piezoelectric quartz cannot measure static", () => {
    expect(staticMeasure("piezoelectric_quartz")).toBe(false);
  });
});

describe("forDynamic", () => {
  it("piezoelectric quartz for dynamic", () => {
    expect(forDynamic("piezoelectric_quartz")).toBe(true);
  });
  it("thin film not for dynamic", () => {
    expect(forDynamic("thin_film_sputtered")).toBe(false);
  });
});

describe("element", () => {
  it("capacitive ceramic uses alumina", () => {
    expect(element("capacitive_ceramic")).toBe("alumina_ceramic_capacitance_gap_change");
  });
});

describe("bestUse", () => {
  it("sapphire for extreme environment", () => {
    expect(bestUse("sapphire_high_perf")).toBe("nuclear_subsea_extreme_environment_ref");
  });
});

describe("piezoPressTypes", () => {
  it("returns 5 types", () => {
    expect(piezoPressTypes()).toHaveLength(5);
  });
});
