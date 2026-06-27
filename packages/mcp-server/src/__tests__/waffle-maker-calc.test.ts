import { describe, it, expect } from "vitest";
import {
  crispiness, pocketDepth, evenBrowning, compactSize,
  makerCost, removablePlates, indicatorLight, plateCoating,
  bestUse, waffleMakers,
} from "../waffle-maker-calc.js";

describe("crispiness", () => {
  it("flip rotating even crispiest", () => {
    expect(crispiness("flip_rotating_even")).toBeGreaterThan(crispiness("mini_compact_snack"));
  });
});

describe("pocketDepth", () => {
  it("belgian deep pocket deepest pockets", () => {
    expect(pocketDepth("belgian_deep_pocket")).toBeGreaterThan(pocketDepth("classic_round_thin"));
  });
});

describe("evenBrowning", () => {
  it("flip rotating even most even browning", () => {
    expect(evenBrowning("flip_rotating_even")).toBeGreaterThan(evenBrowning("classic_round_thin"));
  });
});

describe("compactSize", () => {
  it("mini compact snack most compact", () => {
    expect(compactSize("mini_compact_snack")).toBeGreaterThan(compactSize("commercial_double_grid"));
  });
});

describe("makerCost", () => {
  it("commercial double grid most expensive", () => {
    expect(makerCost("commercial_double_grid")).toBeGreaterThan(makerCost("classic_round_thin"));
  });
});

describe("removablePlates", () => {
  it("belgian deep pocket has removable plates", () => {
    expect(removablePlates("belgian_deep_pocket")).toBe(true);
  });
  it("classic round thin does not", () => {
    expect(removablePlates("classic_round_thin")).toBe(false);
  });
});

describe("indicatorLight", () => {
  it("flip rotating even has indicator light", () => {
    expect(indicatorLight("flip_rotating_even")).toBe(true);
  });
  it("mini compact snack does not", () => {
    expect(indicatorLight("mini_compact_snack")).toBe(false);
  });
});

describe("plateCoating", () => {
  it("commercial double grid uses cast iron seasoned grid", () => {
    expect(plateCoating("commercial_double_grid")).toBe("cast_iron_seasoned_grid");
  });
});

describe("bestUse", () => {
  it("belgian deep pocket best for topping loaded brunch", () => {
    expect(bestUse("belgian_deep_pocket")).toBe("topping_loaded_brunch");
  });
});

describe("waffleMakers", () => {
  it("returns 5 types", () => {
    expect(waffleMakers()).toHaveLength(5);
  });
});
