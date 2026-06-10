import { describe, it, expect } from "vitest";
import {
  waterCapacity, pourControl, durability, weightEmpty,
  canCost, hasRoseHead, indoorSafe, canMaterial,
  bestUse, wateringCans,
} from "../watering-can-calc.js";

describe("waterCapacity", () => {
  it("galvanized metal largest capacity", () => {
    expect(waterCapacity("galvanized_metal")).toBeGreaterThan(waterCapacity("indoor_copper_mini"));
  });
});

describe("pourControl", () => {
  it("haws heritage best pour control", () => {
    expect(pourControl("haws_heritage")).toBeGreaterThan(pourControl("galvanized_metal"));
  });
});

describe("durability", () => {
  it("haws heritage most durable", () => {
    expect(durability("haws_heritage")).toBeGreaterThan(durability("plastic_long_spout"));
  });
});

describe("weightEmpty", () => {
  it("self watering globe lightest", () => {
    expect(weightEmpty("self_watering_globe")).toBeGreaterThan(weightEmpty("galvanized_metal"));
  });
});

describe("canCost", () => {
  it("haws heritage most expensive", () => {
    expect(canCost("haws_heritage")).toBeGreaterThan(canCost("plastic_long_spout"));
  });
});

describe("hasRoseHead", () => {
  it("plastic long spout has rose head", () => {
    expect(hasRoseHead("plastic_long_spout")).toBe(true);
  });
  it("self watering globe does not", () => {
    expect(hasRoseHead("self_watering_globe")).toBe(false);
  });
});

describe("indoorSafe", () => {
  it("indoor copper mini is indoor safe", () => {
    expect(indoorSafe("indoor_copper_mini")).toBe(true);
  });
  it("galvanized metal is not", () => {
    expect(indoorSafe("galvanized_metal")).toBe(false);
  });
});

describe("canMaterial", () => {
  it("galvanized metal uses zinc coated steel", () => {
    expect(canMaterial("galvanized_metal")).toBe("zinc_coated_steel");
  });
});

describe("bestUse", () => {
  it("self watering globe best for vacation auto water", () => {
    expect(bestUse("self_watering_globe")).toBe("vacation_auto_water");
  });
});

describe("wateringCans", () => {
  it("returns 5 types", () => {
    expect(wateringCans()).toHaveLength(5);
  });
});
