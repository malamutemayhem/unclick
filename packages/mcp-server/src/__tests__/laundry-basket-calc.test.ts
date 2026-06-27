import { describe, it, expect } from "vitest";
import {
  capacity, durability, ventilation, floorSpace,
  basketCost, collapsible, hasWheels, basketMaterial,
  bestSetup, laundryBaskets,
} from "../laundry-basket-calc.js";

describe("capacity", () => {
  it("triple sorter highest capacity", () => {
    expect(capacity("triple_sorter")).toBeGreaterThan(capacity("wall_mount_bag"));
  });
});

describe("durability", () => {
  it("rolling cart most durable", () => {
    expect(durability("rolling_cart")).toBeGreaterThan(durability("wall_mount_bag"));
  });
});

describe("ventilation", () => {
  it("woven natural best ventilation", () => {
    expect(ventilation("woven_natural")).toBeGreaterThan(ventilation("triple_sorter"));
  });
});

describe("floorSpace", () => {
  it("wall mount bag uses least floor space", () => {
    expect(floorSpace("wall_mount_bag")).toBeGreaterThan(floorSpace("triple_sorter"));
  });
});

describe("basketCost", () => {
  it("triple sorter most expensive", () => {
    expect(basketCost("triple_sorter")).toBeGreaterThan(basketCost("plastic_hamper"));
  });
});

describe("collapsible", () => {
  it("wall mount bag is collapsible", () => {
    expect(collapsible("wall_mount_bag")).toBe(true);
  });
  it("plastic hamper is not", () => {
    expect(collapsible("plastic_hamper")).toBe(false);
  });
});

describe("hasWheels", () => {
  it("rolling cart has wheels", () => {
    expect(hasWheels("rolling_cart")).toBe(true);
  });
  it("woven natural does not", () => {
    expect(hasWheels("woven_natural")).toBe(false);
  });
});

describe("basketMaterial", () => {
  it("woven natural uses seagrass rattan weave", () => {
    expect(basketMaterial("woven_natural")).toBe("seagrass_rattan_weave");
  });
});

describe("bestSetup", () => {
  it("rolling cart best for laundry room to machine", () => {
    expect(bestSetup("rolling_cart")).toBe("laundry_room_to_machine");
  });
});

describe("laundryBaskets", () => {
  it("returns 5 types", () => {
    expect(laundryBaskets()).toHaveLength(5);
  });
});
