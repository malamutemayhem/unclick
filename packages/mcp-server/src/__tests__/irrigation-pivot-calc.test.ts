import { describe, it, expect } from "vitest";
import {
  efficiency, coverage, uniformity, laborSaving,
  ipCost, pressurized, forLargeField, delivery,
  bestUse, irrigationPivotTypes,
} from "../irrigation-pivot-calc.js";

describe("efficiency", () => {
  it("drip subsurface most efficient", () => {
    expect(efficiency("drip_subsurface")).toBeGreaterThan(efficiency("traveling_gun"));
  });
});

describe("coverage", () => {
  it("center pivot widest coverage", () => {
    expect(coverage("center_pivot")).toBeGreaterThan(coverage("drip_subsurface"));
  });
});

describe("uniformity", () => {
  it("drip subsurface best uniformity", () => {
    expect(uniformity("drip_subsurface")).toBeGreaterThan(uniformity("traveling_gun"));
  });
});

describe("laborSaving", () => {
  it("center pivot most labor saving", () => {
    expect(laborSaving("center_pivot")).toBeGreaterThan(laborSaving("traveling_gun"));
  });
});

describe("ipCost", () => {
  it("linear move most expensive", () => {
    expect(ipCost("linear_move")).toBeGreaterThan(ipCost("traveling_gun"));
  });
});

describe("pressurized", () => {
  it("all types are pressurized", () => {
    expect(pressurized("center_pivot")).toBe(true);
    expect(pressurized("drip_subsurface")).toBe(true);
  });
});

describe("forLargeField", () => {
  it("center pivot for large field", () => {
    expect(forLargeField("center_pivot")).toBe(true);
  });
  it("drip subsurface not for large field", () => {
    expect(forLargeField("drip_subsurface")).toBe(false);
  });
});

describe("delivery", () => {
  it("traveling gun uses large single sprinkler", () => {
    expect(delivery("traveling_gun")).toBe("large_single_sprinkler_gun_on_wheeled_cart_hose_reel");
  });
});

describe("bestUse", () => {
  it("drip subsurface for orchard vineyard", () => {
    expect(bestUse("drip_subsurface")).toBe("orchard_vineyard_vegetable_row_crop_water_scarce_region");
  });
});

describe("irrigationPivotTypes", () => {
  it("returns 5 types", () => {
    expect(irrigationPivotTypes()).toHaveLength(5);
  });
});
