import { describe, it, expect } from "vitest";
import {
  accuracy, speedMeasure, pivotRange, repeatConsist,
  gaugeCost, digital, optical, readMethod,
  bestUse, pivotGauges,
} from "../pivot-gauge-calc.js";

describe("accuracy", () => {
  it("micrometer gauge precise most accurate", () => {
    expect(accuracy("micrometer_gauge_precise")).toBeGreaterThan(accuracy("notch_gauge_quick"));
  });
});

describe("speedMeasure", () => {
  it("notch gauge quick fastest measure", () => {
    expect(speedMeasure("notch_gauge_quick")).toBeGreaterThan(speedMeasure("micrometer_gauge_precise"));
  });
});

describe("pivotRange", () => {
  it("digital gauge modern best pivot range", () => {
    expect(pivotRange("digital_gauge_modern")).toBeGreaterThan(pivotRange("notch_gauge_quick"));
  });
});

describe("repeatConsist", () => {
  it("micrometer gauge precise most consistent", () => {
    expect(repeatConsist("micrometer_gauge_precise")).toBeGreaterThan(repeatConsist("notch_gauge_quick"));
  });
});

describe("gaugeCost", () => {
  it("optical gauge visual most expensive", () => {
    expect(gaugeCost("optical_gauge_visual")).toBeGreaterThan(gaugeCost("notch_gauge_quick"));
  });
});

describe("digital", () => {
  it("digital gauge modern is digital", () => {
    expect(digital("digital_gauge_modern")).toBe(true);
  });
  it("micrometer gauge precise not digital", () => {
    expect(digital("micrometer_gauge_precise")).toBe(false);
  });
});

describe("optical", () => {
  it("optical gauge visual is optical", () => {
    expect(optical("optical_gauge_visual")).toBe(true);
  });
  it("micrometer gauge precise not optical", () => {
    expect(optical("micrometer_gauge_precise")).toBe(false);
  });
});

describe("readMethod", () => {
  it("comparator gauge diff uses dial indicator diff", () => {
    expect(readMethod("comparator_gauge_diff")).toBe("dial_indicator_diff");
  });
});

describe("bestUse", () => {
  it("micrometer gauge precise best for precise pivot measure", () => {
    expect(bestUse("micrometer_gauge_precise")).toBe("precise_pivot_measure");
  });
});

describe("pivotGauges", () => {
  it("returns 5 types", () => {
    expect(pivotGauges()).toHaveLength(5);
  });
});
