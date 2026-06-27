import { describe, it, expect } from "vitest";
import {
  accuracy, rangeSpan, durability, portability,
  meterCost, autoRange, trueRms, displayType,
  bestUse, multimeters,
} from "../multimeter-calc.js";

describe("accuracy", () => {
  it("bench precision lab most accurate", () => {
    expect(accuracy("bench_precision_lab")).toBeGreaterThan(accuracy("analog_panel_classic"));
  });
});

describe("rangeSpan", () => {
  it("bench precision lab widest range span", () => {
    expect(rangeSpan("bench_precision_lab")).toBeGreaterThan(rangeSpan("clamp_meter_current"));
  });
});

describe("durability", () => {
  it("bench precision lab most durable", () => {
    expect(durability("bench_precision_lab")).toBeGreaterThan(durability("auto_range_compact"));
  });
});

describe("portability", () => {
  it("auto range compact most portable", () => {
    expect(portability("auto_range_compact")).toBeGreaterThan(portability("bench_precision_lab"));
  });
});

describe("meterCost", () => {
  it("bench precision lab most expensive", () => {
    expect(meterCost("bench_precision_lab")).toBeGreaterThan(meterCost("analog_panel_classic"));
  });
});

describe("autoRange", () => {
  it("bench precision lab has auto range", () => {
    expect(autoRange("bench_precision_lab")).toBe(true);
  });
  it("digital handheld std no auto range", () => {
    expect(autoRange("digital_handheld_std")).toBe(false);
  });
});

describe("trueRms", () => {
  it("clamp meter current has true rms", () => {
    expect(trueRms("clamp_meter_current")).toBe(true);
  });
  it("digital handheld std no true rms", () => {
    expect(trueRms("digital_handheld_std")).toBe(false);
  });
});

describe("displayType", () => {
  it("analog panel classic uses analog needle scale", () => {
    expect(displayType("analog_panel_classic")).toBe("analog_needle_scale");
  });
});

describe("bestUse", () => {
  it("clamp meter current best for non contact current", () => {
    expect(bestUse("clamp_meter_current")).toBe("non_contact_current");
  });
});

describe("multimeters", () => {
  it("returns 5 types", () => {
    expect(multimeters()).toHaveLength(5);
  });
});
