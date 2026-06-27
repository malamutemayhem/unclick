import { describe, it, expect } from "vitest";
import {
  ibuRange, abvTypical, colorSrm,
  carbonationLevel, bodyWeight, isAle,
  sessionable, dominantFlavor, servingTempC, beerStyles,
} from "../beer-style-calc.js";

describe("ibuRange", () => {
  it("ipa most bitter", () => {
    expect(ibuRange("ipa")).toBeGreaterThan(
      ibuRange("wheat")
    );
  });
});

describe("abvTypical", () => {
  it("ipa highest abv", () => {
    expect(abvTypical("ipa")).toBeGreaterThan(
      abvTypical("sour")
    );
  });
});

describe("colorSrm", () => {
  it("stout darkest", () => {
    expect(colorSrm("stout")).toBeGreaterThan(
      colorSrm("pilsner")
    );
  });
});

describe("carbonationLevel", () => {
  it("wheat most carbonated", () => {
    expect(carbonationLevel("wheat")).toBeGreaterThan(
      carbonationLevel("stout")
    );
  });
});

describe("bodyWeight", () => {
  it("stout heaviest body", () => {
    expect(bodyWeight("stout")).toBeGreaterThan(
      bodyWeight("sour")
    );
  });
});

describe("isAle", () => {
  it("ipa is ale", () => {
    expect(isAle("ipa")).toBe(true);
  });
  it("pilsner is not", () => {
    expect(isAle("pilsner")).toBe(false);
  });
});

describe("sessionable", () => {
  it("pilsner is sessionable", () => {
    expect(sessionable("pilsner")).toBe(true);
  });
  it("ipa is not", () => {
    expect(sessionable("ipa")).toBe(false);
  });
});

describe("dominantFlavor", () => {
  it("stout is roast chocolate coffee", () => {
    expect(dominantFlavor("stout")).toBe("roast_chocolate_coffee");
  });
});

describe("servingTempC", () => {
  it("pilsner served coldest", () => {
    expect(servingTempC("pilsner")).toBe("3_5_cold");
  });
});

describe("beerStyles", () => {
  it("returns 5 styles", () => {
    expect(beerStyles()).toHaveLength(5);
  });
});
