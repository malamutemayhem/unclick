import { describe, it, expect } from "vitest";
import {
  throughput, incline, versatility, sealing,
  scCost, enclosed, forPowder, flight,
  bestUse, screwConveyorTypes,
} from "../screw-conveyor-calc.js";

describe("throughput", () => {
  it("horizontal trough highest throughput", () => {
    expect(throughput("horizontal_trough_standard")).toBeGreaterThan(throughput("flexible_spiral_route"));
  });
});

describe("incline", () => {
  it("vertical screw highest incline", () => {
    expect(incline("vertical_screw_lift")).toBeGreaterThan(incline("horizontal_trough_standard"));
  });
});

describe("versatility", () => {
  it("horizontal trough most versatile", () => {
    expect(versatility("horizontal_trough_standard")).toBeGreaterThan(versatility("vertical_screw_lift"));
  });
});

describe("sealing", () => {
  it("flexible spiral well sealed", () => {
    expect(sealing("flexible_spiral_route")).toBeGreaterThan(sealing("live_bottom_bin_reclaim"));
  });
});

describe("scCost", () => {
  it("vertical screw most expensive", () => {
    expect(scCost("vertical_screw_lift")).toBeGreaterThan(scCost("horizontal_trough_standard"));
  });
});

describe("enclosed", () => {
  it("horizontal trough is enclosed", () => {
    expect(enclosed("horizontal_trough_standard")).toBe(true);
  });
  it("live bottom not enclosed", () => {
    expect(enclosed("live_bottom_bin_reclaim")).toBe(false);
  });
});

describe("forPowder", () => {
  it("horizontal trough for powder", () => {
    expect(forPowder("horizontal_trough_standard")).toBe(true);
  });
  it("inclined shaftless not for powder", () => {
    expect(forPowder("inclined_shaftless_sludge")).toBe(false);
  });
});

describe("flight", () => {
  it("shaftless uses ribbon spiral", () => {
    expect(flight("inclined_shaftless_sludge")).toBe("shaftless_ribbon_spiral_no_center");
  });
});

describe("bestUse", () => {
  it("flexible spiral for food pharma", () => {
    expect(bestUse("flexible_spiral_route")).toBe("food_pharma_flexible_path_clean");
  });
});

describe("screwConveyorTypes", () => {
  it("returns 5 types", () => {
    expect(screwConveyorTypes()).toHaveLength(5);
  });
});
