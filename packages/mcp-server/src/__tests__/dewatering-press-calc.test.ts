import { describe, it, expect } from "vitest";
import {
  cakeDryness, throughput, automation, energyUse,
  dpCost, continuous, forFine, mechanism,
  bestUse, dewateringPressTypes,
} from "../dewatering-press-calc.js";

describe("cakeDryness", () => {
  it("hyperbaric driest cake", () => {
    expect(cakeDryness("hyperbaric_filter_press")).toBeGreaterThan(cakeDryness("screw_press_continuous"));
  });
});

describe("throughput", () => {
  it("disc filter highest throughput", () => {
    expect(throughput("disc_filter_vacuum")).toBeGreaterThan(throughput("hyperbaric_filter_press"));
  });
});

describe("automation", () => {
  it("screw press most automated", () => {
    expect(automation("screw_press_continuous")).toBeGreaterThan(automation("hyperbaric_filter_press"));
  });
});

describe("energyUse", () => {
  it("screw press most energy efficient", () => {
    expect(energyUse("screw_press_continuous")).toBeGreaterThan(energyUse("hyperbaric_filter_press"));
  });
});

describe("dpCost", () => {
  it("hyperbaric most expensive", () => {
    expect(dpCost("hyperbaric_filter_press")).toBeGreaterThan(dpCost("screw_press_continuous"));
  });
});

describe("continuous", () => {
  it("belt filter press is continuous", () => {
    expect(continuous("belt_filter_press")).toBe(true);
  });
  it("chamber filter press not continuous", () => {
    expect(continuous("chamber_filter_press")).toBe(false);
  });
});

describe("forFine", () => {
  it("chamber filter for fine particles", () => {
    expect(forFine("chamber_filter_press")).toBe(true);
  });
  it("belt filter not for fine", () => {
    expect(forFine("belt_filter_press")).toBe(false);
  });
});

describe("mechanism", () => {
  it("screw press uses tapered screw", () => {
    expect(mechanism("screw_press_continuous")).toBe("tapered_screw_increasing_pressure_zone");
  });
});

describe("bestUse", () => {
  it("hyperbaric for ultra dry coal cake", () => {
    expect(bestUse("hyperbaric_filter_press")).toBe("ultra_dry_cake_coal_fine_moisture_limit");
  });
});

describe("dewateringPressTypes", () => {
  it("returns 5 types", () => {
    expect(dewateringPressTypes()).toHaveLength(5);
  });
});
