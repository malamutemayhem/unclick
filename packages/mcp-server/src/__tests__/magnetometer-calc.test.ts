import { describe, it, expect } from "vitest";
import {
  sensitivity, fieldRange, accuracy, powerDraw,
  magCost, digital, forCompass, sensingMethod,
  bestUse, magnetometers,
} from "../magnetometer-calc.js";

describe("sensitivity", () => {
  it("fluxgate precision most sensitive", () => {
    expect(sensitivity("fluxgate_precision")).toBeGreaterThan(sensitivity("hall_effect_switch"));
  });
});

describe("fieldRange", () => {
  it("hall effect switch widest field range", () => {
    expect(fieldRange("hall_effect_switch")).toBeGreaterThan(fieldRange("fluxgate_precision"));
  });
});

describe("accuracy", () => {
  it("fluxgate precision most accurate", () => {
    expect(accuracy("fluxgate_precision")).toBeGreaterThan(accuracy("hall_effect_switch"));
  });
});

describe("powerDraw", () => {
  it("hall effect switch lowest power draw", () => {
    expect(powerDraw("hall_effect_switch")).toBeGreaterThan(powerDraw("fluxgate_precision"));
  });
});

describe("magCost", () => {
  it("fluxgate precision most expensive", () => {
    expect(magCost("fluxgate_precision")).toBeGreaterThan(magCost("hall_effect_switch"));
  });
});

describe("digital", () => {
  it("amr compass chip is digital", () => {
    expect(digital("amr_compass_chip")).toBe(true);
  });
  it("hall effect switch not digital", () => {
    expect(digital("hall_effect_switch")).toBe(false);
  });
});

describe("forCompass", () => {
  it("amr compass chip is for compass", () => {
    expect(forCompass("amr_compass_chip")).toBe(true);
  });
  it("hall effect switch not for compass", () => {
    expect(forCompass("hall_effect_switch")).toBe(false);
  });
});

describe("sensingMethod", () => {
  it("gmr field sensor uses giant magneto resist", () => {
    expect(sensingMethod("gmr_field_sensor")).toBe("giant_magneto_resist");
  });
});

describe("bestUse", () => {
  it("hall effect switch best for proximity door detect", () => {
    expect(bestUse("hall_effect_switch")).toBe("proximity_door_detect");
  });
});

describe("magnetometers", () => {
  it("returns 5 types", () => {
    expect(magnetometers()).toHaveLength(5);
  });
});
