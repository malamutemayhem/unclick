import { describe, it, expect } from "vitest";
import {
  accuracy, easeOfUse, sizeRange, portability,
  gaugeCost, measuresGauge, hasRuler, gaugeMaterial,
  bestUse, needleGauges,
} from "../needle-gauge-calc.js";

describe("accuracy", () => {
  it("digital caliper exact most accurate", () => {
    expect(accuracy("digital_caliper_exact")).toBeGreaterThan(accuracy("flat_card_basic"));
  });
});

describe("easeOfUse", () => {
  it("swatch window check easiest to use", () => {
    expect(easeOfUse("swatch_window_check")).toBeGreaterThan(easeOfUse("digital_caliper_exact"));
  });
});

describe("sizeRange", () => {
  it("ruler combo dual widest size range", () => {
    expect(sizeRange("ruler_combo_dual")).toBeGreaterThan(sizeRange("swatch_window_check"));
  });
});

describe("portability", () => {
  it("flat card basic most portable", () => {
    expect(portability("flat_card_basic")).toBeGreaterThan(portability("digital_caliper_exact"));
  });
});

describe("gaugeCost", () => {
  it("digital caliper exact most expensive", () => {
    expect(gaugeCost("digital_caliper_exact")).toBeGreaterThan(gaugeCost("flat_card_basic"));
  });
});

describe("measuresGauge", () => {
  it("swatch window check measures gauge", () => {
    expect(measuresGauge("swatch_window_check")).toBe(true);
  });
  it("flat card basic does not measure gauge", () => {
    expect(measuresGauge("flat_card_basic")).toBe(false);
  });
});

describe("hasRuler", () => {
  it("ruler combo dual has ruler", () => {
    expect(hasRuler("ruler_combo_dual")).toBe(true);
  });
  it("round metal key has no ruler", () => {
    expect(hasRuler("round_metal_key")).toBe(false);
  });
});

describe("gaugeMaterial", () => {
  it("round metal key uses aluminum etched ring", () => {
    expect(gaugeMaterial("round_metal_key")).toBe("aluminum_etched_ring");
  });
});

describe("bestUse", () => {
  it("digital caliper exact best for precision size verify", () => {
    expect(bestUse("digital_caliper_exact")).toBe("precision_size_verify");
  });
});

describe("needleGauges", () => {
  it("returns 5 types", () => {
    expect(needleGauges()).toHaveLength(5);
  });
});
