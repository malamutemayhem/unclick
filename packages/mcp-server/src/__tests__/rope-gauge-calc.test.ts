import { describe, it, expect } from "vitest";
import {
  accuracy, speedMeasure, sizeRange, repeatConsist,
  gaugeCost, digital, passNoPass, readMethod,
  bestUse, ropeGauges,
} from "../rope-gauge-calc.js";

describe("accuracy", () => {
  it("caliper gauge precise most accurate", () => {
    expect(accuracy("caliper_gauge_precise")).toBeGreaterThan(accuracy("template_gauge_quick"));
  });
});

describe("speedMeasure", () => {
  it("ring gauge pass fastest measure", () => {
    expect(speedMeasure("ring_gauge_pass")).toBeGreaterThan(speedMeasure("caliper_gauge_precise"));
  });
});

describe("sizeRange", () => {
  it("caliper gauge precise best size range", () => {
    expect(sizeRange("caliper_gauge_precise")).toBeGreaterThan(sizeRange("ring_gauge_pass"));
  });
});

describe("repeatConsist", () => {
  it("digital gauge modern most consistent", () => {
    expect(repeatConsist("digital_gauge_modern")).toBeGreaterThan(repeatConsist("template_gauge_quick"));
  });
});

describe("gaugeCost", () => {
  it("digital gauge modern most expensive", () => {
    expect(gaugeCost("digital_gauge_modern")).toBeGreaterThan(gaugeCost("template_gauge_quick"));
  });
});

describe("digital", () => {
  it("digital gauge modern is digital", () => {
    expect(digital("digital_gauge_modern")).toBe(true);
  });
  it("notch gauge standard not digital", () => {
    expect(digital("notch_gauge_standard")).toBe(false);
  });
});

describe("passNoPass", () => {
  it("ring gauge pass is pass no pass", () => {
    expect(passNoPass("ring_gauge_pass")).toBe(true);
  });
  it("notch gauge standard not pass no pass", () => {
    expect(passNoPass("notch_gauge_standard")).toBe(false);
  });
});

describe("readMethod", () => {
  it("caliper gauge precise uses vernier scale read", () => {
    expect(readMethod("caliper_gauge_precise")).toBe("vernier_scale_read");
  });
});

describe("bestUse", () => {
  it("notch gauge standard best for general rope size", () => {
    expect(bestUse("notch_gauge_standard")).toBe("general_rope_size");
  });
});

describe("ropeGauges", () => {
  it("returns 5 types", () => {
    expect(ropeGauges()).toHaveLength(5);
  });
});
