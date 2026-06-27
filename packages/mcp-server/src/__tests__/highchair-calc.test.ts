import { describe, it, expect } from "vitest";
import {
  seatComfort, cleanEase, longevity, footprint,
  chairCost, foldable, growsWithChild, trayType,
  bestFamily, highchairs,
} from "../highchair-calc.js";

describe("seatComfort", () => {
  it("convertible grow with most seat comfort", () => {
    expect(seatComfort("convertible_grow_with")).toBeGreaterThan(seatComfort("clip_on_table_travel"));
  });
});

describe("cleanEase", () => {
  it("modern pedestal design easiest to clean", () => {
    expect(cleanEase("modern_pedestal_design")).toBeGreaterThan(cleanEase("traditional_wood_classic"));
  });
});

describe("longevity", () => {
  it("convertible grow with most longevity", () => {
    expect(longevity("convertible_grow_with")).toBeGreaterThan(longevity("clip_on_table_travel"));
  });
});

describe("footprint", () => {
  it("clip on table travel smallest footprint", () => {
    expect(footprint("clip_on_table_travel")).toBeGreaterThan(footprint("traditional_wood_classic"));
  });
});

describe("chairCost", () => {
  it("modern pedestal design most expensive", () => {
    expect(chairCost("modern_pedestal_design")).toBeGreaterThan(chairCost("clip_on_table_travel"));
  });
});

describe("foldable", () => {
  it("clip on table travel is foldable", () => {
    expect(foldable("clip_on_table_travel")).toBe(true);
  });
  it("traditional wood classic is not foldable", () => {
    expect(foldable("traditional_wood_classic")).toBe(false);
  });
});

describe("growsWithChild", () => {
  it("convertible grow with grows with child", () => {
    expect(growsWithChild("convertible_grow_with")).toBe(true);
  });
  it("traditional wood classic does not grow with child", () => {
    expect(growsWithChild("traditional_wood_classic")).toBe(false);
  });
});

describe("trayType", () => {
  it("modern pedestal design uses seamless one piece", () => {
    expect(trayType("modern_pedestal_design")).toBe("seamless_one_piece");
  });
});

describe("bestFamily", () => {
  it("convertible grow with best for long term investment", () => {
    expect(bestFamily("convertible_grow_with")).toBe("long_term_investment");
  });
});

describe("highchairs", () => {
  it("returns 5 types", () => {
    expect(highchairs()).toHaveLength(5);
  });
});
