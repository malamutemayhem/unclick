import { describe, it, expect } from "vitest";
import {
  scentThrow, scentComplexity, naturalPurity, flashPoint,
  oilCost, allNatural, skinSafe, extractMethod,
  bestProduct, fragranceOils,
} from "../fragrance-oil-calc.js";

describe("scentThrow", () => {
  it("synthetic fragrance blend strongest scent throw", () => {
    expect(scentThrow("synthetic_fragrance_blend")).toBeGreaterThan(scentThrow("infused_botanical_steep"));
  });
});

describe("scentComplexity", () => {
  it("synthetic fragrance blend most scent complexity", () => {
    expect(scentComplexity("synthetic_fragrance_blend")).toBeGreaterThan(scentComplexity("infused_botanical_steep"));
  });
});

describe("naturalPurity", () => {
  it("essential pure plant most natural purity", () => {
    expect(naturalPurity("essential_pure_plant")).toBeGreaterThan(naturalPurity("synthetic_fragrance_blend"));
  });
});

describe("flashPoint", () => {
  it("nature identical lab highest flash point", () => {
    expect(flashPoint("nature_identical_lab")).toBeGreaterThan(flashPoint("infused_botanical_steep"));
  });
});

describe("oilCost", () => {
  it("absolute solvent extract more expensive than synthetic", () => {
    expect(oilCost("absolute_solvent_extract")).toBeGreaterThan(oilCost("synthetic_fragrance_blend"));
  });
});

describe("allNatural", () => {
  it("essential pure plant is all natural", () => {
    expect(allNatural("essential_pure_plant")).toBe(true);
  });
  it("synthetic fragrance blend is not all natural", () => {
    expect(allNatural("synthetic_fragrance_blend")).toBe(false);
  });
});

describe("skinSafe", () => {
  it("essential pure plant is skin safe", () => {
    expect(skinSafe("essential_pure_plant")).toBe(true);
  });
  it("absolute solvent extract is not skin safe", () => {
    expect(skinSafe("absolute_solvent_extract")).toBe(false);
  });
});

describe("extractMethod", () => {
  it("essential pure plant uses steam distillation", () => {
    expect(extractMethod("essential_pure_plant")).toBe("steam_distillation");
  });
});

describe("bestProduct", () => {
  it("synthetic fragrance blend best for paraffin candle strong", () => {
    expect(bestProduct("synthetic_fragrance_blend")).toBe("paraffin_candle_strong");
  });
});

describe("fragranceOils", () => {
  it("returns 5 types", () => {
    expect(fragranceOils()).toHaveLength(5);
  });
});
