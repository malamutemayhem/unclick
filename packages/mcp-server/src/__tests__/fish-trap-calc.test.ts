import { describe, it, expect } from "vitest";
import {
  catchRateKgPerDay, constructionHours, selectivityRating,
  maintenanceWeekly, durabilityMonths, depthRangeMeters,
  passive, bycatchRisk, costEstimate, fishTrapTypes,
} from "../fish-trap-calc.js";

describe("catchRateKgPerDay", () => {
  it("weir catches most", () => {
    expect(catchRateKgPerDay("weir")).toBeGreaterThan(
      catchRateKgPerDay("basket_trap")
    );
  });
});

describe("constructionHours", () => {
  it("stone maze takes longest", () => {
    expect(constructionHours("stone_maze")).toBeGreaterThan(
      constructionHours("pot_trap")
    );
  });
});

describe("selectivityRating", () => {
  it("pot trap is most selective", () => {
    expect(selectivityRating("pot_trap")).toBeGreaterThan(
      selectivityRating("stone_maze")
    );
  });
});

describe("maintenanceWeekly", () => {
  it("fyke net needs weekly maintenance", () => {
    expect(maintenanceWeekly("fyke_net")).toBe(true);
  });
  it("stone maze does not", () => {
    expect(maintenanceWeekly("stone_maze")).toBe(false);
  });
});

describe("durabilityMonths", () => {
  it("stone maze lasts longest", () => {
    expect(durabilityMonths("stone_maze")).toBeGreaterThan(
      durabilityMonths("basket_trap")
    );
  });
});

describe("depthRangeMeters", () => {
  it("pot trap works deepest", () => {
    expect(depthRangeMeters("pot_trap")).toBeGreaterThan(
      depthRangeMeters("stone_maze")
    );
  });
});

describe("passive", () => {
  it("all traps are passive", () => {
    expect(passive("weir")).toBe(true);
    expect(passive("pot_trap")).toBe(true);
  });
});

describe("bycatchRisk", () => {
  it("stone maze has highest bycatch risk", () => {
    expect(bycatchRisk("stone_maze")).toBeGreaterThan(
      bycatchRisk("pot_trap")
    );
  });
});

describe("costEstimate", () => {
  it("weir is most expensive", () => {
    expect(costEstimate("weir")).toBeGreaterThan(
      costEstimate("basket_trap")
    );
  });
});

describe("fishTrapTypes", () => {
  it("returns 5 types", () => {
    expect(fishTrapTypes()).toHaveLength(5);
  });
});
