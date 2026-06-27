import { describe, it, expect } from "vitest";
import {
  angleAccuracy, transferEase, readability, durability,
  gaugeCost, digital, fixedAngle, bladeType,
  bestUse, bevelGauges,
} from "../bevel-gauge-calc.js";

describe("angleAccuracy", () => {
  it("digital angle read most accurate", () => {
    expect(angleAccuracy("digital_angle_read")).toBeGreaterThan(angleAccuracy("weld_gauge_fillet"));
  });
});

describe("transferEase", () => {
  it("sliding t bevel easiest transfer", () => {
    expect(transferEase("sliding_t_bevel")).toBeGreaterThan(transferEase("weld_gauge_fillet"));
  });
});

describe("readability", () => {
  it("digital angle read best readability", () => {
    expect(readability("digital_angle_read")).toBeGreaterThan(readability("sliding_t_bevel"));
  });
});

describe("durability", () => {
  it("weld gauge fillet most durable", () => {
    expect(durability("weld_gauge_fillet")).toBeGreaterThan(durability("digital_angle_read"));
  });
});

describe("gaugeCost", () => {
  it("digital angle read more expensive", () => {
    expect(gaugeCost("digital_angle_read")).toBeGreaterThan(gaugeCost("sliding_t_bevel"));
  });
});

describe("digital", () => {
  it("digital angle read is digital", () => {
    expect(digital("digital_angle_read")).toBe(true);
  });
  it("sliding t bevel not digital", () => {
    expect(digital("sliding_t_bevel")).toBe(false);
  });
});

describe("fixedAngle", () => {
  it("dovetail marker set is fixed angle", () => {
    expect(fixedAngle("dovetail_marker_set")).toBe(true);
  });
  it("sliding t bevel not fixed angle", () => {
    expect(fixedAngle("sliding_t_bevel")).toBe(false);
  });
});

describe("bladeType", () => {
  it("sliding t bevel uses steel slide blade", () => {
    expect(bladeType("sliding_t_bevel")).toBe("steel_slide_blade");
  });
});

describe("bestUse", () => {
  it("digital angle read best for exact angle measure", () => {
    expect(bestUse("digital_angle_read")).toBe("exact_angle_measure");
  });
});

describe("bevelGauges", () => {
  it("returns 5 types", () => {
    expect(bevelGauges()).toHaveLength(5);
  });
});
