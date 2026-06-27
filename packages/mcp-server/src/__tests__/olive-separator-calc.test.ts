import { describe, it, expect } from "vitest";
import {
  cleaningEfficiency, throughput, fruitDamage, foreignRemoval,
  osCost, waterBased, forTable, separatorConfig,
  bestUse, oliveSeparatorTypes,
} from "../olive-separator-calc.js";

describe("cleaningEfficiency", () => {
  it("washing drum best cleaning efficiency", () => {
    expect(cleaningEfficiency("washing_drum")).toBeGreaterThan(cleaningEfficiency("defoliator"));
  });
});

describe("throughput", () => {
  it("vibrating screen highest throughput", () => {
    expect(throughput("vibrating_screen")).toBeGreaterThan(throughput("destoner_float"));
  });
});

describe("fruitDamage", () => {
  it("defoliator least fruit damage", () => {
    expect(fruitDamage("defoliator")).toBeGreaterThan(fruitDamage("washing_drum"));
  });
});

describe("foreignRemoval", () => {
  it("destoner float best foreign removal", () => {
    expect(foreignRemoval("destoner_float")).toBeGreaterThan(foreignRemoval("defoliator"));
  });
});

describe("osCost", () => {
  it("destoner float most expensive", () => {
    expect(osCost("destoner_float")).toBeGreaterThan(osCost("leaf_blower"));
  });
});

describe("waterBased", () => {
  it("washing drum is water based", () => {
    expect(waterBased("washing_drum")).toBe(true);
  });
  it("leaf blower not water based", () => {
    expect(waterBased("leaf_blower")).toBe(false);
  });
});

describe("forTable", () => {
  it("vibrating screen for table olives", () => {
    expect(forTable("vibrating_screen")).toBe(true);
  });
  it("washing drum not for table", () => {
    expect(forTable("washing_drum")).toBe(false);
  });
});

describe("separatorConfig", () => {
  it("destoner float uses water tank stone metal sink", () => {
    expect(separatorConfig("destoner_float")).toBe("destoner_float_olive_water_tank_stone_metal_sink_olive_float_clean");
  });
});

describe("bestUse", () => {
  it("washing drum for final clean soil spray", () => {
    expect(bestUse("washing_drum")).toBe("olive_mill_washing_drum_final_clean_soil_spray_residue_remove");
  });
});

describe("oliveSeparatorTypes", () => {
  it("returns 5 types", () => {
    expect(oliveSeparatorTypes()).toHaveLength(5);
  });
});
