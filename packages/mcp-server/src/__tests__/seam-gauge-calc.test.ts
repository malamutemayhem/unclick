import { describe, it, expect } from "vitest";
import {
  measureAccuracy, easeOfUse, durability, versatility,
  gaugeCost, handsFree, hasDisplay, scaleType,
  bestTask, seamGauges,
} from "../seam-gauge-calc.js";

describe("measureAccuracy", () => {
  it("digital caliper sew most accurate", () => {
    expect(measureAccuracy("digital_caliper_sew")).toBeGreaterThan(measureAccuracy("curved_hem_template"));
  });
});

describe("easeOfUse", () => {
  it("magnetic guide fence easiest to use", () => {
    expect(easeOfUse("magnetic_guide_fence")).toBeGreaterThan(easeOfUse("digital_caliper_sew"));
  });
});

describe("durability", () => {
  it("metal slide ruler most durable", () => {
    expect(durability("metal_slide_ruler")).toBeGreaterThan(durability("digital_caliper_sew"));
  });
});

describe("versatility", () => {
  it("clear acrylic grid most versatile", () => {
    expect(versatility("clear_acrylic_grid")).toBeGreaterThan(versatility("magnetic_guide_fence"));
  });
});

describe("gaugeCost", () => {
  it("digital caliper sew most expensive", () => {
    expect(gaugeCost("digital_caliper_sew")).toBeGreaterThan(gaugeCost("metal_slide_ruler"));
  });
});

describe("handsFree", () => {
  it("magnetic guide fence is hands free", () => {
    expect(handsFree("magnetic_guide_fence")).toBe(true);
  });
  it("metal slide ruler is not hands free", () => {
    expect(handsFree("metal_slide_ruler")).toBe(false);
  });
});

describe("hasDisplay", () => {
  it("digital caliper sew has display", () => {
    expect(hasDisplay("digital_caliper_sew")).toBe(true);
  });
  it("clear acrylic grid has no display", () => {
    expect(hasDisplay("clear_acrylic_grid")).toBe(false);
  });
});

describe("scaleType", () => {
  it("metal slide ruler uses inch metric slide", () => {
    expect(scaleType("metal_slide_ruler")).toBe("inch_metric_slide");
  });
});

describe("bestTask", () => {
  it("curved hem template best for skirt hem curve", () => {
    expect(bestTask("curved_hem_template")).toBe("skirt_hem_curve");
  });
});

describe("seamGauges", () => {
  it("returns 5 types", () => {
    expect(seamGauges()).toHaveLength(5);
  });
});
