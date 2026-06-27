import { describe, it, expect } from "vitest";
import {
  cleansingPower, moistureRetention, scalpHealth, dailyUseRating,
  productCost, sulfateFree, requiresPrescription, activeIngredient,
  bestHairConcern, shampooTypes,
} from "../shampoo-type-calc.js";

describe("cleansingPower", () => {
  it("clarifying strongest cleansing", () => {
    expect(cleansingPower("clarifying")).toBeGreaterThan(cleansingPower("color_safe"));
  });
});

describe("moistureRetention", () => {
  it("moisturizing best retention", () => {
    expect(moistureRetention("moisturizing")).toBeGreaterThan(moistureRetention("clarifying"));
  });
});

describe("scalpHealth", () => {
  it("medicated best scalp health", () => {
    expect(scalpHealth("medicated")).toBeGreaterThan(scalpHealth("volumizing"));
  });
});

describe("dailyUseRating", () => {
  it("color safe best for daily use", () => {
    expect(dailyUseRating("color_safe")).toBeGreaterThan(dailyUseRating("clarifying"));
  });
});

describe("productCost", () => {
  it("medicated most expensive", () => {
    expect(productCost("medicated")).toBeGreaterThan(productCost("clarifying"));
  });
});

describe("sulfateFree", () => {
  it("moisturizing is sulfate free", () => {
    expect(sulfateFree("moisturizing")).toBe(true);
  });
  it("clarifying is not", () => {
    expect(sulfateFree("clarifying")).toBe(false);
  });
});

describe("requiresPrescription", () => {
  it("medicated requires prescription", () => {
    expect(requiresPrescription("medicated")).toBe(true);
  });
  it("moisturizing does not", () => {
    expect(requiresPrescription("moisturizing")).toBe(false);
  });
});

describe("activeIngredient", () => {
  it("medicated uses ketoconazole zinc pyrithione", () => {
    expect(activeIngredient("medicated")).toBe("ketoconazole_zinc_pyrithione");
  });
});

describe("bestHairConcern", () => {
  it("clarifying for product buildup oily scalp", () => {
    expect(bestHairConcern("clarifying")).toBe("product_buildup_oily_scalp");
  });
});

describe("shampooTypes", () => {
  it("returns 5 types", () => {
    expect(shampooTypes()).toHaveLength(5);
  });
});
