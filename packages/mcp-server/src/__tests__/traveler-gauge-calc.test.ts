import { describe, it, expect } from "vitest";
import {
  measureAccuracy, repeatConsist, speedMeasure, sizeRange,
  gaugeCost, digital, portable, readoutType,
  bestUse, travelerGauges,
} from "../traveler-gauge-calc.js";

describe("measureAccuracy", () => {
  it("digital measure modern most accurate", () => {
    expect(measureAccuracy("digital_measure_modern")).toBeGreaterThan(measureAccuracy("chain_measure_large"));
  });
});

describe("repeatConsist", () => {
  it("digital measure modern most consistent", () => {
    expect(repeatConsist("digital_measure_modern")).toBeGreaterThan(repeatConsist("chain_measure_large"));
  });
});

describe("speedMeasure", () => {
  it("digital measure modern fastest measure", () => {
    expect(speedMeasure("digital_measure_modern")).toBeGreaterThan(speedMeasure("chain_measure_large"));
  });
});

describe("sizeRange", () => {
  it("chain measure large best size range", () => {
    expect(sizeRange("chain_measure_large")).toBeGreaterThan(sizeRange("folding_traveler_pocket"));
  });
});

describe("gaugeCost", () => {
  it("digital measure modern most expensive", () => {
    expect(gaugeCost("digital_measure_modern")).toBeGreaterThan(gaugeCost("folding_traveler_pocket"));
  });
});

describe("digital", () => {
  it("digital measure modern is digital", () => {
    expect(digital("digital_measure_modern")).toBe(true);
  });
  it("wheel traveler standard not digital", () => {
    expect(digital("wheel_traveler_standard")).toBe(false);
  });
});

describe("portable", () => {
  it("wheel traveler standard is portable", () => {
    expect(portable("wheel_traveler_standard")).toBe(true);
  });
  it("chain measure large not portable", () => {
    expect(portable("chain_measure_large")).toBe(false);
  });
});

describe("readoutType", () => {
  it("digital measure modern uses lcd digital display", () => {
    expect(readoutType("digital_measure_modern")).toBe("lcd_digital_display");
  });
});

describe("bestUse", () => {
  it("wheel traveler standard best for general rim measure", () => {
    expect(bestUse("wheel_traveler_standard")).toBe("general_rim_measure");
  });
});

describe("travelerGauges", () => {
  it("returns 5 types", () => {
    expect(travelerGauges()).toHaveLength(5);
  });
});
