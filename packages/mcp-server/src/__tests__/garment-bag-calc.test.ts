import { describe, it, expect } from "vitest";
import {
  garmentProtection, travelEase, breathability, capacity,
  bagCost, waterproof, foldable, closureType,
  bestUse, garmentBags,
} from "../garment-bag-calc.js";

describe("garmentProtection", () => {
  it("vacuum seal compress best protection", () => {
    expect(garmentProtection("vacuum_seal_compress")).toBeGreaterThan(garmentProtection("breathable_cotton"));
  });
});

describe("travelEase", () => {
  it("rolling wheeled easiest travel", () => {
    expect(travelEase("rolling_wheeled")).toBeGreaterThan(travelEase("hanging_closet_cover"));
  });
});

describe("breathability", () => {
  it("breathable cotton most breathable", () => {
    expect(breathability("breathable_cotton")).toBeGreaterThan(breathability("vacuum_seal_compress"));
  });
});

describe("capacity", () => {
  it("rolling wheeled highest capacity", () => {
    expect(capacity("rolling_wheeled")).toBeGreaterThan(capacity("hanging_closet_cover"));
  });
});

describe("bagCost", () => {
  it("rolling wheeled most expensive", () => {
    expect(bagCost("rolling_wheeled")).toBeGreaterThan(bagCost("hanging_closet_cover"));
  });
});

describe("waterproof", () => {
  it("suit travel fold is waterproof", () => {
    expect(waterproof("suit_travel_fold")).toBe(true);
  });
  it("breathable cotton is not", () => {
    expect(waterproof("breathable_cotton")).toBe(false);
  });
});

describe("foldable", () => {
  it("suit travel fold is foldable", () => {
    expect(foldable("suit_travel_fold")).toBe(true);
  });
  it("rolling wheeled is not", () => {
    expect(foldable("rolling_wheeled")).toBe(false);
  });
});

describe("closureType", () => {
  it("vacuum seal compress uses zip seal valve pump", () => {
    expect(closureType("vacuum_seal_compress")).toBe("zip_seal_valve_pump");
  });
});

describe("bestUse", () => {
  it("suit travel fold best for business trip carry on", () => {
    expect(bestUse("suit_travel_fold")).toBe("business_trip_carry_on");
  });
});

describe("garmentBags", () => {
  it("returns 5 types", () => {
    expect(garmentBags()).toHaveLength(5);
  });
});
