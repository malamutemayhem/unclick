import { describe, it, expect } from "vitest";
import {
  aromaRelease, tipability, elegance, dishwasherSafe,
  glassCost, hasStem, breakResistant, glassMaterial,
  bestWine, wineGlasses,
} from "../wine-glass-calc.js";

describe("aromaRelease", () => {
  it("burgundy wide round best aroma release", () => {
    expect(aromaRelease("burgundy_wide_round")).toBeGreaterThan(aromaRelease("stemless_casual"));
  });
});

describe("tipability", () => {
  it("stemless casual most tip resistant", () => {
    expect(tipability("stemless_casual")).toBeGreaterThan(tipability("burgundy_wide_round"));
  });
});

describe("elegance", () => {
  it("crystal lead free most elegant", () => {
    expect(elegance("crystal_lead_free")).toBeGreaterThan(elegance("stemless_casual"));
  });
});

describe("dishwasherSafe", () => {
  it("stemless casual most dishwasher safe", () => {
    expect(dishwasherSafe("stemless_casual")).toBeGreaterThan(dishwasherSafe("crystal_lead_free"));
  });
});

describe("glassCost", () => {
  it("crystal lead free most expensive", () => {
    expect(glassCost("crystal_lead_free")).toBeGreaterThan(glassCost("stemless_casual"));
  });
});

describe("hasStem", () => {
  it("bordeaux tall bowl has stem", () => {
    expect(hasStem("bordeaux_tall_bowl")).toBe(true);
  });
  it("stemless casual does not", () => {
    expect(hasStem("stemless_casual")).toBe(false);
  });
});

describe("breakResistant", () => {
  it("stemless casual is break resistant", () => {
    expect(breakResistant("stemless_casual")).toBe(true);
  });
  it("crystal lead free is not", () => {
    expect(breakResistant("crystal_lead_free")).toBe(false);
  });
});

describe("glassMaterial", () => {
  it("crystal lead free uses titanium crystal hand", () => {
    expect(glassMaterial("crystal_lead_free")).toBe("titanium_crystal_hand");
  });
});

describe("bestWine", () => {
  it("burgundy wide round best for pinot noir nebbiolo", () => {
    expect(bestWine("burgundy_wide_round")).toBe("pinot_noir_nebbiolo");
  });
});

describe("wineGlasses", () => {
  it("returns 5 types", () => {
    expect(wineGlasses()).toHaveLength(5);
  });
});
