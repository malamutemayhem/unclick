import { describe, it, expect } from "vitest";
import {
  spaceReduction, easeOfUse, reusability, clothingProtect,
  bagCost, needsPump, waterproof, sealMethod,
  bestUse, compressionBags,
} from "../compression-bag-calc.js";

describe("spaceReduction", () => {
  it("vacuum seal flat best space reduction", () => {
    expect(spaceReduction("vacuum_seal_flat")).toBeGreaterThan(spaceReduction("stuff_sack_drawstring"));
  });
});

describe("easeOfUse", () => {
  it("stuff sack drawstring easiest to use", () => {
    expect(easeOfUse("stuff_sack_drawstring")).toBeGreaterThan(easeOfUse("vacuum_seal_flat"));
  });
});

describe("reusability", () => {
  it("stuff sack drawstring most reusable", () => {
    expect(reusability("stuff_sack_drawstring")).toBeGreaterThan(reusability("vacuum_seal_flat"));
  });
});

describe("clothingProtect", () => {
  it("vacuum seal flat best clothing protect", () => {
    expect(clothingProtect("vacuum_seal_flat")).toBeGreaterThan(clothingProtect("stuff_sack_drawstring"));
  });
});

describe("bagCost", () => {
  it("zip compression cube most expensive", () => {
    expect(bagCost("zip_compression_cube")).toBeGreaterThan(bagCost("stuff_sack_drawstring"));
  });
});

describe("needsPump", () => {
  it("vacuum seal flat needs pump", () => {
    expect(needsPump("vacuum_seal_flat")).toBe(true);
  });
  it("roll up valve does not need pump", () => {
    expect(needsPump("roll_up_valve")).toBe(false);
  });
});

describe("waterproof", () => {
  it("vacuum seal flat is waterproof", () => {
    expect(waterproof("vacuum_seal_flat")).toBe(true);
  });
  it("zip compression cube is not waterproof", () => {
    expect(waterproof("zip_compression_cube")).toBe(false);
  });
});

describe("sealMethod", () => {
  it("roll up valve uses one way valve roll", () => {
    expect(sealMethod("roll_up_valve")).toBe("one_way_valve_roll");
  });
});

describe("bestUse", () => {
  it("vacuum seal flat best for seasonal closet storage", () => {
    expect(bestUse("vacuum_seal_flat")).toBe("seasonal_closet_storage");
  });
});

describe("compressionBags", () => {
  it("returns 5 types", () => {
    expect(compressionBags()).toHaveLength(5);
  });
});
