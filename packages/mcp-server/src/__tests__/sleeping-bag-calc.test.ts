import { describe, it, expect } from "vitest";
import {
  warmthRating, packWeight, compressibility, roominess,
  bagCost, waterResistant, hasHoodCinch, insulation,
  bestUse, sleepingBags,
} from "../sleeping-bag-calc.js";

describe("warmthRating", () => {
  it("mummy down warmest", () => {
    expect(warmthRating("mummy_down")).toBeGreaterThan(warmthRating("double_wide"));
  });
});

describe("packWeight", () => {
  it("quilt topless lightest", () => {
    expect(packWeight("quilt_topless")).toBeGreaterThan(packWeight("double_wide"));
  });
});

describe("compressibility", () => {
  it("mummy down most compressible", () => {
    expect(compressibility("mummy_down")).toBeGreaterThan(compressibility("double_wide"));
  });
});

describe("roominess", () => {
  it("double wide most room", () => {
    expect(roominess("double_wide")).toBeGreaterThan(roominess("mummy_down"));
  });
});

describe("bagCost", () => {
  it("mummy down most expensive", () => {
    expect(bagCost("mummy_down")).toBeGreaterThan(bagCost("rectangular"));
  });
});

describe("waterResistant", () => {
  it("mummy synthetic is water resistant", () => {
    expect(waterResistant("mummy_synthetic")).toBe(true);
  });
  it("mummy down is not", () => {
    expect(waterResistant("mummy_down")).toBe(false);
  });
});

describe("hasHoodCinch", () => {
  it("mummy down has hood cinch", () => {
    expect(hasHoodCinch("mummy_down")).toBe(true);
  });
  it("rectangular does not", () => {
    expect(hasHoodCinch("rectangular")).toBe(false);
  });
});

describe("insulation", () => {
  it("mummy down uses goose down 800 fill power", () => {
    expect(insulation("mummy_down")).toBe("goose_down_800_fill_power");
  });
});

describe("bestUse", () => {
  it("quilt topless for ultralight thru hiking", () => {
    expect(bestUse("quilt_topless")).toBe("ultralight_thru_hiking");
  });
});

describe("sleepingBags", () => {
  it("returns 5 types", () => {
    expect(sleepingBags()).toHaveLength(5);
  });
});
