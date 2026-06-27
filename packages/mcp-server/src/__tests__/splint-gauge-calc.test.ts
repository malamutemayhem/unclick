import { describe, it, expect } from "vitest";
import {
  measureAccuracy, repeatConsist, easeOfUse, durability,
  gaugeCost, adjustable, forWidth, scaleType,
  bestUse, splintGauges,
} from "../splint-gauge-calc.js";

describe("measureAccuracy", () => {
  it("steel caliper pinch most accurate", () => {
    expect(measureAccuracy("steel_caliper_pinch")).toBeGreaterThan(measureAccuracy("wooden_block_notch"));
  });
});

describe("repeatConsist", () => {
  it("brass plate slot most consistent", () => {
    expect(repeatConsist("brass_plate_slot")).toBeGreaterThan(repeatConsist("wooden_block_notch"));
  });
});

describe("easeOfUse", () => {
  it("plastic template set easiest", () => {
    expect(easeOfUse("plastic_template_set")).toBeGreaterThan(easeOfUse("steel_caliper_pinch"));
  });
});

describe("durability", () => {
  it("steel caliper pinch most durable", () => {
    expect(durability("steel_caliper_pinch")).toBeGreaterThan(durability("plastic_template_set"));
  });
});

describe("gaugeCost", () => {
  it("steel caliper pinch most expensive", () => {
    expect(gaugeCost("steel_caliper_pinch")).toBeGreaterThan(gaugeCost("wooden_block_notch"));
  });
});

describe("adjustable", () => {
  it("adjustable slide rule is adjustable", () => {
    expect(adjustable("adjustable_slide_rule")).toBe(true);
  });
  it("brass plate slot not adjustable", () => {
    expect(adjustable("brass_plate_slot")).toBe(false);
  });
});

describe("forWidth", () => {
  it("brass plate slot is for width", () => {
    expect(forWidth("brass_plate_slot")).toBe(true);
  });
  it("steel caliper pinch not for width", () => {
    expect(forWidth("steel_caliper_pinch")).toBe(false);
  });
});

describe("scaleType", () => {
  it("steel caliper pinch uses vernier dial read", () => {
    expect(scaleType("steel_caliper_pinch")).toBe("vernier_dial_read");
  });
});

describe("bestUse", () => {
  it("plastic template set best for beginner size sort", () => {
    expect(bestUse("plastic_template_set")).toBe("beginner_size_sort");
  });
});

describe("splintGauges", () => {
  it("returns 5 types", () => {
    expect(splintGauges()).toHaveLength(5);
  });
});
