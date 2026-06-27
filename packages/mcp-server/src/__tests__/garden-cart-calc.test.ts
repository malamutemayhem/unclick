import { describe, it, expect } from "vitest";
import {
  loadCapacity, maneuverability, durability, storageSize,
  cartCost, dumpable, foldable, bedMaterial,
  bestTask, gardenCarts,
} from "../garden-cart-calc.js";

describe("loadCapacity", () => {
  it("steel dump tilt most load capacity", () => {
    expect(loadCapacity("steel_dump_tilt")).toBeGreaterThan(loadCapacity("folding_collapsible_wagon"));
  });
});

describe("maneuverability", () => {
  it("wheelbarrow single wheel most maneuverable", () => {
    expect(maneuverability("wheelbarrow_single_wheel")).toBeGreaterThan(maneuverability("steel_dump_tilt"));
  });
});

describe("durability", () => {
  it("steel dump tilt most durable", () => {
    expect(durability("steel_dump_tilt")).toBeGreaterThan(durability("folding_collapsible_wagon"));
  });
});

describe("storageSize", () => {
  it("folding collapsible wagon best storage size", () => {
    expect(storageSize("folding_collapsible_wagon")).toBeGreaterThan(storageSize("steel_dump_tilt"));
  });
});

describe("cartCost", () => {
  it("steel dump tilt most expensive", () => {
    expect(cartCost("steel_dump_tilt")).toBeGreaterThan(cartCost("wheelbarrow_single_wheel"));
  });
});

describe("dumpable", () => {
  it("steel dump tilt is dumpable", () => {
    expect(dumpable("steel_dump_tilt")).toBe(true);
  });
  it("poly tub flatbed is not dumpable", () => {
    expect(dumpable("poly_tub_flatbed")).toBe(false);
  });
});

describe("foldable", () => {
  it("folding collapsible wagon is foldable", () => {
    expect(foldable("folding_collapsible_wagon")).toBe(true);
  });
  it("steel dump tilt is not foldable", () => {
    expect(foldable("steel_dump_tilt")).toBe(false);
  });
});

describe("bedMaterial", () => {
  it("steel dump tilt uses heavy gauge steel", () => {
    expect(bedMaterial("steel_dump_tilt")).toBe("heavy_gauge_steel");
  });
});

describe("bestTask", () => {
  it("wheelbarrow single wheel best for narrow path single load", () => {
    expect(bestTask("wheelbarrow_single_wheel")).toBe("narrow_path_single_load");
  });
});

describe("gardenCarts", () => {
  it("returns 5 types", () => {
    expect(gardenCarts()).toHaveLength(5);
  });
});
