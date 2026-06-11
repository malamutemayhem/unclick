import { describe, it, expect } from "vitest";
import {
  capacity, durability, corrosionResist, installEase,
  pbCost, weatherproof, forOutdoor, material,
  bestUse, pullBoxTypes,
} from "../pull-box-calc.js";

describe("capacity", () => {
  it("concrete highest capacity", () => {
    expect(capacity("concrete_underground")).toBeGreaterThan(capacity("cast_aluminum_weatherproof"));
  });
});

describe("durability", () => {
  it("concrete most durable", () => {
    expect(durability("concrete_underground")).toBeGreaterThan(durability("sheet_metal_screw_cover"));
  });
});

describe("corrosionResist", () => {
  it("fiberglass best corrosion resistance", () => {
    expect(corrosionResist("fiberglass_nema_4x")).toBeGreaterThan(corrosionResist("sheet_metal_screw_cover"));
  });
});

describe("installEase", () => {
  it("sheet metal easiest install", () => {
    expect(installEase("sheet_metal_screw_cover")).toBeGreaterThan(installEase("concrete_underground"));
  });
});

describe("pbCost", () => {
  it("stainless most expensive", () => {
    expect(pbCost("stainless_steel_food")).toBeGreaterThan(pbCost("sheet_metal_screw_cover"));
  });
});

describe("weatherproof", () => {
  it("fiberglass is weatherproof", () => {
    expect(weatherproof("fiberglass_nema_4x")).toBe(true);
  });
  it("sheet metal not weatherproof", () => {
    expect(weatherproof("sheet_metal_screw_cover")).toBe(false);
  });
});

describe("forOutdoor", () => {
  it("cast aluminum for outdoor", () => {
    expect(forOutdoor("cast_aluminum_weatherproof")).toBe(true);
  });
  it("stainless not outdoor", () => {
    expect(forOutdoor("stainless_steel_food")).toBe(false);
  });
});

describe("material", () => {
  it("fiberglass uses reinforced polyester", () => {
    expect(material("fiberglass_nema_4x")).toBe("fiberglass_reinforced_polyester");
  });
});

describe("bestUse", () => {
  it("concrete for underground duct", () => {
    expect(bestUse("concrete_underground")).toBe("underground_utility_duct_bank");
  });
});

describe("pullBoxTypes", () => {
  it("returns 5 types", () => {
    expect(pullBoxTypes()).toHaveLength(5);
  });
});
