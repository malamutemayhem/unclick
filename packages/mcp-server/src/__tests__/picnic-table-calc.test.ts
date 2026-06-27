import { describe, it, expect } from "vitest";
import {
  seatingCapacity, durability, portability, weatherResist,
  tableCost, foldable, adaAccessible, topMaterial,
  bestSpot, picnicTables,
} from "../picnic-table-calc.js";

describe("seatingCapacity", () => {
  it("wood classic attached seats the most", () => {
    expect(seatingCapacity("wood_classic_attached")).toBeGreaterThan(seatingCapacity("kids_size_colorful"));
  });
});

describe("durability", () => {
  it("recycled plastic heavy most durable", () => {
    expect(durability("recycled_plastic_heavy")).toBeGreaterThan(durability("aluminum_fold_portable"));
  });
});

describe("portability", () => {
  it("aluminum fold portable most portable", () => {
    expect(portability("aluminum_fold_portable")).toBeGreaterThan(portability("recycled_plastic_heavy"));
  });
});

describe("weatherResist", () => {
  it("recycled plastic heavy best weather resist", () => {
    expect(weatherResist("recycled_plastic_heavy")).toBeGreaterThan(weatherResist("wood_classic_attached"));
  });
});

describe("tableCost", () => {
  it("recycled plastic heavy most expensive", () => {
    expect(tableCost("recycled_plastic_heavy")).toBeGreaterThan(tableCost("kids_size_colorful"));
  });
});

describe("foldable", () => {
  it("aluminum fold portable is foldable", () => {
    expect(foldable("aluminum_fold_portable")).toBe(true);
  });
  it("wood classic attached is not foldable", () => {
    expect(foldable("wood_classic_attached")).toBe(false);
  });
});

describe("adaAccessible", () => {
  it("recycled plastic heavy is ada accessible", () => {
    expect(adaAccessible("recycled_plastic_heavy")).toBe(true);
  });
  it("wood classic attached is not ada accessible", () => {
    expect(adaAccessible("wood_classic_attached")).toBe(false);
  });
});

describe("topMaterial", () => {
  it("recycled plastic heavy uses recycled hdpe plank", () => {
    expect(topMaterial("recycled_plastic_heavy")).toBe("recycled_hdpe_plank");
  });
});

describe("bestSpot", () => {
  it("aluminum fold portable best for camping tailgate beach", () => {
    expect(bestSpot("aluminum_fold_portable")).toBe("camping_tailgate_beach");
  });
});

describe("picnicTables", () => {
  it("returns 5 types", () => {
    expect(picnicTables()).toHaveLength(5);
  });
});
