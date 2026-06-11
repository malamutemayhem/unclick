import { describe, it, expect } from "vitest";
import {
  conversionRate, temperatureRange, durability, backpressure,
  ccCost, precious, forDiesel, catalyst,
  bestUse, catalyticConverterTypes,
} from "../catalytic-converter-calc.js";

describe("conversionRate", () => {
  it("three way gasoline highest conversion rate", () => {
    expect(conversionRate("three_way_gasoline")).toBeGreaterThan(conversionRate("lean_nox_trap"));
  });
});

describe("temperatureRange", () => {
  it("diesel oxidation widest temperature range", () => {
    expect(temperatureRange("diesel_oxidation")).toBeGreaterThan(temperatureRange("lean_nox_trap"));
  });
});

describe("durability", () => {
  it("diesel oxidation and ammonia slip most durable", () => {
    expect(durability("diesel_oxidation")).toBeGreaterThan(durability("lean_nox_trap"));
    expect(durability("ammonia_slip")).toBeGreaterThan(durability("lean_nox_trap"));
  });
});

describe("backpressure", () => {
  it("diesel oxidation and ammonia slip best backpressure", () => {
    expect(backpressure("diesel_oxidation")).toBeGreaterThan(backpressure("lean_nox_trap"));
    expect(backpressure("ammonia_slip")).toBeGreaterThan(backpressure("lean_nox_trap"));
  });
});

describe("ccCost", () => {
  it("scr nox and lean nox trap most expensive", () => {
    expect(ccCost("scr_nox")).toBeGreaterThan(ccCost("ammonia_slip"));
    expect(ccCost("lean_nox_trap")).toBeGreaterThan(ccCost("ammonia_slip"));
  });
});

describe("precious", () => {
  it("three way gasoline uses precious metals", () => {
    expect(precious("three_way_gasoline")).toBe(true);
  });
  it("scr nox no precious metals", () => {
    expect(precious("scr_nox")).toBe(false);
  });
});

describe("forDiesel", () => {
  it("diesel oxidation for diesel", () => {
    expect(forDiesel("diesel_oxidation")).toBe(true);
  });
  it("three way gasoline not for diesel", () => {
    expect(forDiesel("three_way_gasoline")).toBe(false);
  });
});

describe("catalyst", () => {
  it("scr nox uses vanadium titanium zeolite", () => {
    expect(catalyst("scr_nox")).toBe("vanadium_titanium_iron_zeolite_urea_injection_nox_reduce");
  });
});

describe("bestUse", () => {
  it("ammonia slip for downstream scr cleanup", () => {
    expect(bestUse("ammonia_slip")).toBe("downstream_scr_system_ammonia_cleanup_prevent_nh3_emission");
  });
});

describe("catalyticConverterTypes", () => {
  it("returns 5 types", () => {
    expect(catalyticConverterTypes()).toHaveLength(5);
  });
});
