import { describe, it, expect } from "vitest";
import {
  flavorClarity, bodyFullness, brewTime, forgiveness,
  equipmentCost, usesFilter, immersionMethod, extractionStyle,
  bestFor, coffeeBrews,
} from "../coffee-brew-calc.js";

describe("flavorClarity", () => {
  it("pour over best clarity", () => {
    expect(flavorClarity("pour_over")).toBeGreaterThan(flavorClarity("french_press"));
  });
});

describe("bodyFullness", () => {
  it("french press fullest body", () => {
    expect(bodyFullness("french_press")).toBeGreaterThan(bodyFullness("pour_over"));
  });
});

describe("brewTime", () => {
  it("aeropress fastest brew", () => {
    expect(brewTime("aeropress")).toBeGreaterThan(brewTime("cold_brew"));
  });
});

describe("forgiveness", () => {
  it("cold brew most forgiving", () => {
    expect(forgiveness("cold_brew")).toBeGreaterThan(forgiveness("pour_over"));
  });
});

describe("equipmentCost", () => {
  it("moka pot most expensive", () => {
    expect(equipmentCost("moka_pot")).toBeGreaterThan(equipmentCost("french_press"));
  });
});

describe("usesFilter", () => {
  it("pour over uses filter", () => {
    expect(usesFilter("pour_over")).toBe(true);
  });
  it("french press does not", () => {
    expect(usesFilter("french_press")).toBe(false);
  });
});

describe("immersionMethod", () => {
  it("french press is immersion", () => {
    expect(immersionMethod("french_press")).toBe(true);
  });
  it("pour over is not", () => {
    expect(immersionMethod("pour_over")).toBe(false);
  });
});

describe("extractionStyle", () => {
  it("moka pot uses steam pressure stovetop", () => {
    expect(extractionStyle("moka_pot")).toBe("steam_pressure_stovetop");
  });
});

describe("bestFor", () => {
  it("cold brew for smooth sweet concentrate", () => {
    expect(bestFor("cold_brew")).toBe("smooth_sweet_concentrate");
  });
});

describe("coffeeBrews", () => {
  it("returns 5 types", () => {
    expect(coffeeBrews()).toHaveLength(5);
  });
});
