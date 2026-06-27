import { describe, it, expect } from "vitest";
import {
  capacity, drainEfficiency, spaceEfficiency, aesthetics,
  rackCost, foldable, hasDrainBoard, frameMaterial,
  bestKitchen, dishRacks,
} from "../dish-rack-calc.js";

describe("capacity", () => {
  it("two tier steel drain highest capacity", () => {
    expect(capacity("two_tier_steel_drain")).toBeGreaterThan(capacity("collapsible_silicone_fold"));
  });
});

describe("drainEfficiency", () => {
  it("over sink adjustable best drain efficiency", () => {
    expect(drainEfficiency("over_sink_adjustable")).toBeGreaterThan(drainEfficiency("bamboo_wooden_air"));
  });
});

describe("spaceEfficiency", () => {
  it("wall mount vertical most space efficient", () => {
    expect(spaceEfficiency("wall_mount_vertical")).toBeGreaterThan(spaceEfficiency("two_tier_steel_drain"));
  });
});

describe("aesthetics", () => {
  it("bamboo wooden air best aesthetics", () => {
    expect(aesthetics("bamboo_wooden_air")).toBeGreaterThan(aesthetics("two_tier_steel_drain"));
  });
});

describe("rackCost", () => {
  it("wall mount vertical most expensive", () => {
    expect(rackCost("wall_mount_vertical")).toBeGreaterThan(rackCost("collapsible_silicone_fold"));
  });
});

describe("foldable", () => {
  it("collapsible silicone fold is foldable", () => {
    expect(foldable("collapsible_silicone_fold")).toBe(true);
  });
  it("two tier steel drain is not", () => {
    expect(foldable("two_tier_steel_drain")).toBe(false);
  });
});

describe("hasDrainBoard", () => {
  it("two tier steel drain has drain board", () => {
    expect(hasDrainBoard("two_tier_steel_drain")).toBe(true);
  });
  it("wall mount vertical does not", () => {
    expect(hasDrainBoard("wall_mount_vertical")).toBe(false);
  });
});

describe("frameMaterial", () => {
  it("bamboo wooden air uses moso bamboo oiled", () => {
    expect(frameMaterial("bamboo_wooden_air")).toBe("moso_bamboo_oiled");
  });
});

describe("bestKitchen", () => {
  it("collapsible silicone fold best for tiny kitchen rv camp", () => {
    expect(bestKitchen("collapsible_silicone_fold")).toBe("tiny_kitchen_rv_camp");
  });
});

describe("dishRacks", () => {
  it("returns 5 types", () => {
    expect(dishRacks()).toHaveLength(5);
  });
});
