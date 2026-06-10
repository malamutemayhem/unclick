import { describe, it, expect } from "vitest";
import {
  cleaningPower, easeOfUse, portability, gentleness,
  flosserCost, needsPower, reusable, cleanMethod,
  bestFor, dentalFlossers,
} from "../dental-flosser-calc.js";

describe("cleaningPower", () => {
  it("water flosser countertop best cleaning power", () => {
    expect(cleaningPower("water_flosser_countertop")).toBeGreaterThan(cleaningPower("air_flosser_burst"));
  });
});

describe("easeOfUse", () => {
  it("air flosser burst easiest to use", () => {
    expect(easeOfUse("air_flosser_burst")).toBeGreaterThan(easeOfUse("string_flosser_pick"));
  });
});

describe("portability", () => {
  it("string flosser pick most portable", () => {
    expect(portability("string_flosser_pick")).toBeGreaterThan(portability("water_flosser_countertop"));
  });
});

describe("gentleness", () => {
  it("water flosser countertop gentlest", () => {
    expect(gentleness("water_flosser_countertop")).toBeGreaterThan(gentleness("string_flosser_pick"));
  });
});

describe("flosserCost", () => {
  it("water flosser countertop most expensive", () => {
    expect(flosserCost("water_flosser_countertop")).toBeGreaterThan(flosserCost("string_flosser_pick"));
  });
});

describe("needsPower", () => {
  it("water flosser countertop needs power", () => {
    expect(needsPower("water_flosser_countertop")).toBe(true);
  });
  it("string flosser pick does not need power", () => {
    expect(needsPower("string_flosser_pick")).toBe(false);
  });
});

describe("reusable", () => {
  it("water flosser countertop is reusable", () => {
    expect(reusable("water_flosser_countertop")).toBe(true);
  });
  it("string flosser pick is not reusable", () => {
    expect(reusable("string_flosser_pick")).toBe(false);
  });
});

describe("cleanMethod", () => {
  it("water flosser countertop uses pulsating water jet", () => {
    expect(cleanMethod("water_flosser_countertop")).toBe("pulsating_water_jet");
  });
});

describe("bestFor", () => {
  it("water flosser countertop best for braces implants bridges", () => {
    expect(bestFor("water_flosser_countertop")).toBe("braces_implants_bridges");
  });
});

describe("dentalFlossers", () => {
  it("returns 5 types", () => {
    expect(dentalFlossers()).toHaveLength(5);
  });
});
