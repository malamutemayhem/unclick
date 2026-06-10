import { describe, it, expect } from "vitest";
import {
  flowVolume, hoseDurability, hoseWeight, kinkResistance,
  hoseCost, drinkingSafe, selfDraining, material,
  bestUse, gardenHoses,
} from "../garden-hose-calc.js";

describe("flowVolume", () => {
  it("rubber heavy duty highest flow volume", () => {
    expect(flowVolume("rubber_heavy_duty")).toBeGreaterThan(flowVolume("soaker_drip"));
  });
});

describe("hoseDurability", () => {
  it("rubber heavy duty most durable", () => {
    expect(hoseDurability("rubber_heavy_duty")).toBeGreaterThan(hoseDurability("expandable_compact"));
  });
});

describe("hoseWeight", () => {
  it("expandable compact lightest", () => {
    expect(hoseWeight("expandable_compact")).toBeGreaterThan(hoseWeight("rubber_heavy_duty"));
  });
});

describe("kinkResistance", () => {
  it("expandable compact best kink resistance", () => {
    expect(kinkResistance("expandable_compact")).toBeGreaterThan(kinkResistance("vinyl_lightweight"));
  });
});

describe("hoseCost", () => {
  it("rubber heavy duty most expensive", () => {
    expect(hoseCost("rubber_heavy_duty")).toBeGreaterThan(hoseCost("vinyl_lightweight"));
  });
});

describe("drinkingSafe", () => {
  it("rubber heavy duty is drinking safe", () => {
    expect(drinkingSafe("rubber_heavy_duty")).toBe(true);
  });
  it("vinyl lightweight is not", () => {
    expect(drinkingSafe("vinyl_lightweight")).toBe(false);
  });
});

describe("selfDraining", () => {
  it("expandable compact is self draining", () => {
    expect(selfDraining("expandable_compact")).toBe(true);
  });
  it("rubber heavy duty is not", () => {
    expect(selfDraining("rubber_heavy_duty")).toBe(false);
  });
});

describe("material", () => {
  it("soaker drip uses recycled rubber porous", () => {
    expect(material("soaker_drip")).toBe("recycled_rubber_porous");
  });
});

describe("bestUse", () => {
  it("expandable compact for apartment balcony storage", () => {
    expect(bestUse("expandable_compact")).toBe("apartment_balcony_storage");
  });
});

describe("gardenHoses", () => {
  it("returns 5 types", () => {
    expect(gardenHoses()).toHaveLength(5);
  });
});
