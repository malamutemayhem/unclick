import { describe, it, expect } from "vitest";
import {
  readAccuracy, readSpeed, durability, rangeSpan,
  gaugeCost, digital, needsBattery, scaleType,
  bestUse, screwGauges,
} from "../screw-gauge-calc.js";

describe("readAccuracy", () => {
  it("digital lcd read most accurate", () => {
    expect(readAccuracy("digital_lcd_read")).toBeGreaterThan(readAccuracy("sheet_metal_slot"));
  });
});

describe("readSpeed", () => {
  it("digital lcd read fastest read", () => {
    expect(readSpeed("digital_lcd_read")).toBeGreaterThan(readSpeed("imperial_inch_thimble"));
  });
});

describe("durability", () => {
  it("sheet metal slot most durable", () => {
    expect(durability("sheet_metal_slot")).toBeGreaterThan(durability("digital_lcd_read"));
  });
});

describe("rangeSpan", () => {
  it("standard metric dial widest range", () => {
    expect(rangeSpan("standard_metric_dial")).toBeGreaterThan(rangeSpan("wire_round_notch"));
  });
});

describe("gaugeCost", () => {
  it("digital lcd read most expensive", () => {
    expect(gaugeCost("digital_lcd_read")).toBeGreaterThan(gaugeCost("sheet_metal_slot"));
  });
});

describe("digital", () => {
  it("digital lcd read is digital", () => {
    expect(digital("digital_lcd_read")).toBe(true);
  });
  it("standard metric dial not digital", () => {
    expect(digital("standard_metric_dial")).toBe(false);
  });
});

describe("needsBattery", () => {
  it("digital lcd read needs battery", () => {
    expect(needsBattery("digital_lcd_read")).toBe(true);
  });
  it("standard metric dial no battery", () => {
    expect(needsBattery("standard_metric_dial")).toBe(false);
  });
});

describe("scaleType", () => {
  it("standard metric dial uses metric vernier dial", () => {
    expect(scaleType("standard_metric_dial")).toBe("metric_vernier_dial");
  });
});

describe("bestUse", () => {
  it("digital lcd read best for fast digital measure", () => {
    expect(bestUse("digital_lcd_read")).toBe("fast_digital_measure");
  });
});

describe("screwGauges", () => {
  it("returns 5 types", () => {
    expect(screwGauges()).toHaveLength(5);
  });
});
