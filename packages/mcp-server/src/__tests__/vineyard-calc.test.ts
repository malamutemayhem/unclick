import { describe, it, expect } from "vitest";
import {
  vinesPerHectare, yieldKgPerHa, litersPerHa, bottlesPerHa,
  trellisPostCount, wireLength, pruningWeight, harvestDay,
  sugarBrix, waterLitersPerVine, grapeVarieties,
} from "../vineyard-calc.js";

describe("vinesPerHectare", () => {
  it("positive count", () => {
    expect(vinesPerHectare(2, 1)).toBe(5000);
  });
  it("zero spacing = 0", () => {
    expect(vinesPerHectare(0, 1)).toBe(0);
  });
});

describe("yieldKgPerHa", () => {
  it("vines x kg", () => {
    expect(yieldKgPerHa(5000, 2)).toBe(10000);
  });
});

describe("litersPerHa", () => {
  it("yield x extraction", () => {
    expect(litersPerHa(10000, 0.7)).toBe(7000);
  });
});

describe("bottlesPerHa", () => {
  it("750ml per bottle", () => {
    expect(bottlesPerHa(750)).toBe(1000);
  });
});

describe("trellisPostCount", () => {
  it("positive count", () => {
    expect(trellisPostCount(100, 5)).toBe(21);
  });
  it("zero spacing = 0", () => {
    expect(trellisPostCount(100, 0)).toBe(0);
  });
});

describe("wireLength", () => {
  it("rows x length x wires", () => {
    expect(wireLength(10, 100, 3)).toBe(3000);
  });
});

describe("pruningWeight", () => {
  it("shiraz heaviest", () => {
    expect(pruningWeight("shiraz")).toBeGreaterThan(pruningWeight("riesling"));
  });
});

describe("harvestDay", () => {
  it("budbreak + growing days", () => {
    expect(harvestDay(90, "pinot_noir")).toBe(235);
  });
});

describe("sugarBrix", () => {
  it("increases over time", () => {
    expect(sugarBrix(10, 50)).toBeGreaterThan(10);
  });
});

describe("waterLitersPerVine", () => {
  it("more in heat", () => {
    expect(waterLitersPerVine(35, 0)).toBeGreaterThan(waterLitersPerVine(20, 0));
  });
});

describe("grapeVarieties", () => {
  it("returns 6 varieties", () => {
    expect(grapeVarieties()).toHaveLength(6);
  });
});
