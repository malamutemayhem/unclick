import { describe, it, expect } from "vitest";
import {
  noilRemoval, combingSpeed, fiberAlignment, shortFiberRemoval,
  cbCost, autoLap, forLongStaple, combConfig,
  bestUse, combingMachineTypes,
} from "../combing-machine-calc.js";

describe("noilRemoval", () => {
  it("noble comb and high speed best noil removal", () => {
    expect(noilRemoval("noble_comb")).toBeGreaterThan(noilRemoval("dual_lap_feed"));
    expect(noilRemoval("high_speed_cotton")).toBeGreaterThan(noilRemoval("dual_lap_feed"));
  });
});

describe("combingSpeed", () => {
  it("high speed cotton fastest combing", () => {
    expect(combingSpeed("high_speed_cotton")).toBeGreaterThan(combingSpeed("noble_comb"));
  });
});

describe("fiberAlignment", () => {
  it("noble comb best fiber alignment", () => {
    expect(fiberAlignment("noble_comb")).toBeGreaterThan(fiberAlignment("dual_lap_feed"));
  });
});

describe("shortFiberRemoval", () => {
  it("high speed cotton best short fiber removal", () => {
    expect(shortFiberRemoval("high_speed_cotton")).toBeGreaterThan(shortFiberRemoval("circular_french"));
  });
});

describe("cbCost", () => {
  it("high speed cotton most expensive", () => {
    expect(cbCost("high_speed_cotton")).toBeGreaterThan(cbCost("dual_lap_feed"));
  });
});

describe("autoLap", () => {
  it("rectilinear cotton has auto lap", () => {
    expect(autoLap("rectilinear_cotton")).toBe(true);
  });
  it("circular french no auto lap", () => {
    expect(autoLap("circular_french")).toBe(false);
  });
});

describe("forLongStaple", () => {
  it("noble comb for long staple", () => {
    expect(forLongStaple("noble_comb")).toBe(true);
  });
  it("rectilinear cotton not for long staple", () => {
    expect(forLongStaple("rectilinear_cotton")).toBe(false);
  });
});

describe("combConfig", () => {
  it("circular french uses gill draft system", () => {
    expect(combConfig("circular_french")).toBe("circular_comb_gill_draft_french_system_worsted_fiber_align");
  });
});

describe("bestUse", () => {
  it("noble comb for fine wool cashmere luxury", () => {
    expect(bestUse("noble_comb")).toBe("fine_wool_cashmere_alpaca_luxury_fiber_sorting_premium_top");
  });
});

describe("combingMachineTypes", () => {
  it("returns 5 types", () => {
    expect(combingMachineTypes()).toHaveLength(5);
  });
});
