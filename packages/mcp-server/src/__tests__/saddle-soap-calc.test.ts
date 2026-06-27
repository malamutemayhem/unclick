import { describe, it, expect } from "vitest";
import {
  cleaningPower, leatherSafety, conditioning, easeOfUse,
  soapCost, conditionsLeather, phNeutral, baseIngredient,
  bestLeather, saddleSoaps,
} from "../saddle-soap-calc.js";

describe("cleaningPower", () => {
  it("paste tin concentrate most cleaning power", () => {
    expect(cleaningPower("paste_tin_concentrate")).toBeGreaterThan(cleaningPower("ph_neutral_gentle"));
  });
});

describe("leatherSafety", () => {
  it("ph neutral gentle safest for leather", () => {
    expect(leatherSafety("ph_neutral_gentle")).toBeGreaterThan(leatherSafety("paste_tin_concentrate"));
  });
});

describe("conditioning", () => {
  it("lanolin rich condition best conditioning", () => {
    expect(conditioning("lanolin_rich_condition")).toBeGreaterThan(conditioning("paste_tin_concentrate"));
  });
});

describe("easeOfUse", () => {
  it("liquid pump modern easiest to use", () => {
    expect(easeOfUse("liquid_pump_modern")).toBeGreaterThan(easeOfUse("paste_tin_concentrate"));
  });
});

describe("soapCost", () => {
  it("lanolin rich condition most expensive", () => {
    expect(soapCost("lanolin_rich_condition")).toBeGreaterThan(soapCost("glycerin_bar_classic"));
  });
});

describe("conditionsLeather", () => {
  it("lanolin rich condition conditions leather", () => {
    expect(conditionsLeather("lanolin_rich_condition")).toBe(true);
  });
  it("liquid pump modern does not condition leather", () => {
    expect(conditionsLeather("liquid_pump_modern")).toBe(false);
  });
});

describe("phNeutral", () => {
  it("ph neutral gentle is ph neutral", () => {
    expect(phNeutral("ph_neutral_gentle")).toBe(true);
  });
  it("glycerin bar classic is not ph neutral", () => {
    expect(phNeutral("glycerin_bar_classic")).toBe(false);
  });
});

describe("baseIngredient", () => {
  it("lanolin rich condition uses wool fat lanolin", () => {
    expect(baseIngredient("lanolin_rich_condition")).toBe("wool_fat_lanolin");
  });
});

describe("bestLeather", () => {
  it("ph neutral gentle best for delicate antique restore", () => {
    expect(bestLeather("ph_neutral_gentle")).toBe("delicate_antique_restore");
  });
});

describe("saddleSoaps", () => {
  it("returns 5 types", () => {
    expect(saddleSoaps()).toHaveLength(5);
  });
});
