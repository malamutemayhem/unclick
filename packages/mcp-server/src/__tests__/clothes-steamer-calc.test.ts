import { describe, it, expect } from "vitest";
import {
  wrinkleRemoval, heatUpTime, tankCapacity, portability,
  steamerCost, fabricSafe, creasePossible, steamMethod,
  bestUse, clothesSteamers,
} from "../clothes-steamer-calc.js";

describe("wrinkleRemoval", () => {
  it("press flat steam best wrinkle removal", () => {
    expect(wrinkleRemoval("press_flat_steam")).toBeGreaterThan(wrinkleRemoval("portable_mini"));
  });
});

describe("heatUpTime", () => {
  it("portable mini fastest heat up", () => {
    expect(heatUpTime("portable_mini")).toBeGreaterThan(heatUpTime("press_flat_steam"));
  });
});

describe("tankCapacity", () => {
  it("upright garment largest tank", () => {
    expect(tankCapacity("upright_garment")).toBeGreaterThan(tankCapacity("handheld_travel"));
  });
});

describe("portability", () => {
  it("portable mini most portable", () => {
    expect(portability("portable_mini")).toBeGreaterThan(portability("upright_garment"));
  });
});

describe("steamerCost", () => {
  it("press flat steam most expensive", () => {
    expect(steamerCost("press_flat_steam")).toBeGreaterThan(steamerCost("portable_mini"));
  });
});

describe("fabricSafe", () => {
  it("handheld travel is fabric safe", () => {
    expect(fabricSafe("handheld_travel")).toBe(true);
  });
  it("press flat steam is not", () => {
    expect(fabricSafe("press_flat_steam")).toBe(false);
  });
});

describe("creasePossible", () => {
  it("steam iron combo can crease", () => {
    expect(creasePossible("steam_iron_combo")).toBe(true);
  });
  it("upright garment cannot", () => {
    expect(creasePossible("upright_garment")).toBe(false);
  });
});

describe("steamMethod", () => {
  it("upright garment uses telescopic pole hose", () => {
    expect(steamMethod("upright_garment")).toBe("telescopic_pole_hose");
  });
});

describe("bestUse", () => {
  it("handheld travel best for hotel suitcase refresh", () => {
    expect(bestUse("handheld_travel")).toBe("hotel_suitcase_refresh");
  });
});

describe("clothesSteamers", () => {
  it("returns 5 types", () => {
    expect(clothesSteamers()).toHaveLength(5);
  });
});
