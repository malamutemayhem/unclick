import { describe, it, expect } from "vitest";
import {
  weightRating, corrosionResistance, scratchResistance, priceLevel,
  allergyFriendly, magneticResistant, preciousMetal, finishOptions,
  typicalBrand, watchCases,
} from "../watch-case-calc.js";

describe("weightRating", () => {
  it("gold heaviest", () => {
    expect(weightRating("gold")).toBeGreaterThan(weightRating("carbon_fiber"));
  });
});

describe("corrosionResistance", () => {
  it("ceramic best corrosion resistance", () => {
    expect(corrosionResistance("ceramic")).toBeGreaterThan(
      corrosionResistance("stainless_steel")
    );
  });
});

describe("scratchResistance", () => {
  it("ceramic most scratch resistant", () => {
    expect(scratchResistance("ceramic")).toBeGreaterThan(scratchResistance("gold"));
  });
});

describe("priceLevel", () => {
  it("gold most expensive", () => {
    expect(priceLevel("gold")).toBeGreaterThan(priceLevel("stainless_steel"));
  });
});

describe("allergyFriendly", () => {
  it("titanium most allergy friendly", () => {
    expect(allergyFriendly("titanium")).toBeGreaterThan(
      allergyFriendly("stainless_steel")
    );
  });
});

describe("magneticResistant", () => {
  it("titanium is magnetic resistant", () => {
    expect(magneticResistant("titanium")).toBe(true);
  });
  it("stainless steel is not", () => {
    expect(magneticResistant("stainless_steel")).toBe(false);
  });
});

describe("preciousMetal", () => {
  it("gold is precious metal", () => {
    expect(preciousMetal("gold")).toBe(true);
  });
  it("titanium is not", () => {
    expect(preciousMetal("titanium")).toBe(false);
  });
});

describe("finishOptions", () => {
  it("ceramic has matte polished finish", () => {
    expect(finishOptions("ceramic")).toBe("matte_polished");
  });
});

describe("typicalBrand", () => {
  it("carbon fiber used by richard mille hublot", () => {
    expect(typicalBrand("carbon_fiber")).toBe("richard_mille_hublot");
  });
});

describe("watchCases", () => {
  it("returns 5 case types", () => {
    expect(watchCases()).toHaveLength(5);
  });
});
