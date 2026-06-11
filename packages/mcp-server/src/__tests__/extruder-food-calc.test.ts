import { describe, it, expect } from "vitest";
import {
  throughput, shear, mixing, flexibility,
  efCost, cookedProduct, forSnack, screw,
  bestUse, extruderFoodTypes,
} from "../extruder-food-calc.js";

describe("throughput", () => {
  it("twin screw highest throughput", () => {
    expect(throughput("twin_screw_co_rotating")).toBeGreaterThan(throughput("cold_forming_pasta"));
  });
});

describe("shear", () => {
  it("expander highest shear", () => {
    expect(shear("expander_high_shear")).toBeGreaterThan(shear("cold_forming_pasta"));
  });
});

describe("mixing", () => {
  it("twin screw best mixing", () => {
    expect(mixing("twin_screw_co_rotating")).toBeGreaterThan(mixing("pellet_press_feed"));
  });
});

describe("flexibility", () => {
  it("twin screw most flexible", () => {
    expect(flexibility("twin_screw_co_rotating")).toBeGreaterThan(flexibility("pellet_press_feed"));
  });
});

describe("efCost", () => {
  it("twin screw most expensive", () => {
    expect(efCost("twin_screw_co_rotating")).toBeGreaterThan(efCost("single_screw_cooking"));
  });
});

describe("cookedProduct", () => {
  it("single screw produces cooked product", () => {
    expect(cookedProduct("single_screw_cooking")).toBe(true);
  });
  it("cold forming not cooked", () => {
    expect(cookedProduct("cold_forming_pasta")).toBe(false);
  });
});

describe("forSnack", () => {
  it("single screw for snack", () => {
    expect(forSnack("single_screw_cooking")).toBe(true);
  });
  it("pellet press not for snack", () => {
    expect(forSnack("pellet_press_feed")).toBe(false);
  });
});

describe("screw", () => {
  it("pellet press uses ring die roller", () => {
    expect(screw("pellet_press_feed")).toBe("ring_die_roller_press");
  });
});

describe("bestUse", () => {
  it("cold forming best for pasta noodle shape", () => {
    expect(bestUse("cold_forming_pasta")).toBe("fresh_dry_pasta_noodle_shape");
  });
});

describe("extruderFoodTypes", () => {
  it("returns 5 types", () => {
    expect(extruderFoodTypes()).toHaveLength(5);
  });
});
