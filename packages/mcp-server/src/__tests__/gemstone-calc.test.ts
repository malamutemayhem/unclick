import { describe, it, expect } from "vitest";
import {
  mohsHardness, refractiveIndex, specificGravity, caratWeight,
  pricePerCarat, cutLossPercent, finishedWeight, brilliance,
  durability, birthstone, gemstoneTypes,
} from "../gemstone-calc.js";

describe("mohsHardness", () => {
  it("diamond is 10", () => {
    expect(mohsHardness("diamond")).toBe(10);
  });
  it("opal is softest listed", () => {
    expect(mohsHardness("opal")).toBeLessThan(mohsHardness("ruby"));
  });
});

describe("refractiveIndex", () => {
  it("diamond has highest RI", () => {
    expect(refractiveIndex("diamond")).toBeGreaterThan(refractiveIndex("sapphire"));
  });
});

describe("specificGravity", () => {
  it("positive number", () => {
    expect(specificGravity("emerald")).toBeGreaterThan(0);
  });
});

describe("caratWeight", () => {
  it("positive carats", () => {
    expect(caratWeight(6, "diamond")).toBeGreaterThan(0);
  });
  it("larger mm = more carats", () => {
    expect(caratWeight(8, "diamond")).toBeGreaterThan(caratWeight(5, "diamond"));
  });
});

describe("pricePerCarat", () => {
  it("exceptional > fine > commercial", () => {
    expect(pricePerCarat("diamond", "exceptional")).toBeGreaterThan(pricePerCarat("diamond", "fine"));
    expect(pricePerCarat("diamond", "fine")).toBeGreaterThan(pricePerCarat("diamond", "commercial"));
  });
});

describe("cutLossPercent", () => {
  it("round has most loss", () => {
    expect(cutLossPercent("round")).toBeGreaterThan(cutLossPercent("princess"));
  });
});

describe("finishedWeight", () => {
  it("less than rough", () => {
    expect(finishedWeight(5, 40)).toBeLessThan(5);
  });
  it("5ct with 50% loss = 2.5ct", () => {
    expect(finishedWeight(5, 50)).toBe(2.5);
  });
});

describe("brilliance", () => {
  it("diamond RI is exceptional", () => {
    expect(brilliance(2.42)).toBe("exceptional");
  });
  it("low RI is moderate", () => {
    expect(brilliance(1.5)).toBe("moderate");
  });
});

describe("durability", () => {
  it("hardness 10 is excellent", () => {
    expect(durability(10)).toContain("excellent");
  });
  it("hardness 4 is fragile", () => {
    expect(durability(4)).toContain("fragile");
  });
});

describe("birthstone", () => {
  it("April is diamond", () => {
    expect(birthstone(4)).toBe("diamond");
  });
  it("invalid month is unknown", () => {
    expect(birthstone(0)).toBe("unknown");
  });
});

describe("gemstoneTypes", () => {
  it("returns 7 types", () => {
    expect(gemstoneTypes()).toHaveLength(7);
  });
});
