import { describe, it, expect } from "vitest";
import {
  filtrationQuality, flowRate, changeEase, longevity,
  filterCost, reusable, syntheticRated, mediaType,
  bestEngine, oilFilters,
} from "../oil-filter-calc.js";

describe("filtrationQuality", () => {
  it("high performance synthetic best filtration", () => {
    expect(filtrationQuality("high_performance_synthetic")).toBeGreaterThan(filtrationQuality("magnetic_trap_reusable"));
  });
});

describe("flowRate", () => {
  it("magnetic trap reusable best flow", () => {
    expect(flowRate("magnetic_trap_reusable")).toBeGreaterThan(flowRate("bypass_secondary"));
  });
});

describe("changeEase", () => {
  it("spin on standard easiest to change", () => {
    expect(changeEase("spin_on_standard")).toBeGreaterThan(changeEase("bypass_secondary"));
  });
});

describe("longevity", () => {
  it("magnetic trap reusable longest lasting", () => {
    expect(longevity("magnetic_trap_reusable")).toBeGreaterThan(longevity("spin_on_standard"));
  });
});

describe("filterCost", () => {
  it("high performance synthetic most expensive", () => {
    expect(filterCost("high_performance_synthetic")).toBeGreaterThan(filterCost("spin_on_standard"));
  });
});

describe("reusable", () => {
  it("magnetic trap reusable is reusable", () => {
    expect(reusable("magnetic_trap_reusable")).toBe(true);
  });
  it("spin on standard is not", () => {
    expect(reusable("spin_on_standard")).toBe(false);
  });
});

describe("syntheticRated", () => {
  it("high performance synthetic is synthetic rated", () => {
    expect(syntheticRated("high_performance_synthetic")).toBe(true);
  });
  it("spin on standard is not", () => {
    expect(syntheticRated("spin_on_standard")).toBe(false);
  });
});

describe("mediaType", () => {
  it("magnetic trap reusable uses neodymium magnet screen", () => {
    expect(mediaType("magnetic_trap_reusable")).toBe("neodymium_magnet_screen");
  });
});

describe("bestEngine", () => {
  it("bypass secondary best for diesel fleet extended", () => {
    expect(bestEngine("bypass_secondary")).toBe("diesel_fleet_extended");
  });
});

describe("oilFilters", () => {
  it("returns 5 types", () => {
    expect(oilFilters()).toHaveLength(5);
  });
});
