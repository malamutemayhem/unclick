import { describe, it, expect } from "vitest";
import {
  boilingPointCelsius, yieldPercent, heatingTimeMinutes, condenserLengthCm,
  coolingWaterLitersPerHour, foreshotsPercent, headsPercent, heartsPercent,
  tailsPercent, stillTypes,
} from "../distillation-calc.js";

describe("boilingPointCelsius", () => {
  it("ethanol boils lowest", () => {
    expect(boilingPointCelsius("ethanol")).toBeLessThan(boilingPointCelsius("water"));
  });
});

describe("yieldPercent", () => {
  it("column still yields most", () => {
    expect(yieldPercent("column")).toBeGreaterThan(yieldPercent("alembic"));
  });
});

describe("heatingTimeMinutes", () => {
  it("more volume = longer heating", () => {
    expect(heatingTimeMinutes(20)).toBeGreaterThan(heatingTimeMinutes(10));
  });
});

describe("condenserLengthCm", () => {
  it("column has longest condenser", () => {
    expect(condenserLengthCm("column")).toBeGreaterThan(condenserLengthCm("retort"));
  });
});

describe("coolingWaterLitersPerHour", () => {
  it("column needs most cooling water", () => {
    expect(coolingWaterLitersPerHour("column")).toBeGreaterThan(
      coolingWaterLitersPerHour("retort")
    );
  });
});

describe("foreshotsPercent", () => {
  it("returns 5%", () => {
    expect(foreshotsPercent()).toBe(5);
  });
});

describe("fractions sum", () => {
  it("all fractions sum to 100%", () => {
    expect(
      foreshotsPercent() + headsPercent() + heartsPercent() + tailsPercent()
    ).toBe(100);
  });
});

describe("heartsPercent", () => {
  it("hearts is 30%", () => {
    expect(heartsPercent()).toBe(30);
  });
});

describe("tailsPercent", () => {
  it("tails is largest fraction", () => {
    expect(tailsPercent()).toBeGreaterThan(heartsPercent());
  });
});

describe("stillTypes", () => {
  it("returns 5 types", () => {
    expect(stillTypes()).toHaveLength(5);
  });
});
