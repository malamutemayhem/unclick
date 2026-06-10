import { describe, it, expect } from "vitest";
import {
  crocetinPercent, coloringStrength, stigmasPerGram,
  lighfastness, dyeBathMinutes, mordantFree,
  flowersPer100g, primaryUse, costPerGram, saffronGrades,
} from "../saffron-dye-calc.js";

describe("crocetinPercent", () => {
  it("sargol has most crocetin", () => {
    expect(crocetinPercent("sargol")).toBeGreaterThan(
      crocetinPercent("konj")
    );
  });
});

describe("coloringStrength", () => {
  it("sargol has strongest coloring", () => {
    expect(coloringStrength("sargol")).toBeGreaterThan(
      coloringStrength("konj")
    );
  });
});

describe("stigmasPerGram", () => {
  it("sargol has most stigmas per gram", () => {
    expect(stigmasPerGram("sargol")).toBeGreaterThan(
      stigmasPerGram("konj")
    );
  });
});

describe("lighfastness", () => {
  it("sargol has best lightfastness", () => {
    expect(lighfastness("sargol")).toBeGreaterThanOrEqual(
      lighfastness("konj")
    );
  });
});

describe("dyeBathMinutes", () => {
  it("sargol needs least time", () => {
    expect(dyeBathMinutes("sargol")).toBeLessThan(
      dyeBathMinutes("konj")
    );
  });
});

describe("mordantFree", () => {
  it("all saffron dyes are mordant free", () => {
    expect(mordantFree("sargol")).toBe(true);
    expect(mordantFree("konj")).toBe(true);
  });
});

describe("flowersPer100g", () => {
  it("sargol needs most flowers", () => {
    expect(flowersPer100g("sargol")).toBeGreaterThan(
      flowersPer100g("konj")
    );
  });
});

describe("primaryUse", () => {
  it("sargol is for luxury textile", () => {
    expect(primaryUse("sargol")).toBe("luxury_textile");
  });
});

describe("costPerGram", () => {
  it("sargol is most expensive", () => {
    expect(costPerGram("sargol")).toBeGreaterThan(
      costPerGram("konj")
    );
  });
});

describe("saffronGrades", () => {
  it("returns 5 grades", () => {
    expect(saffronGrades()).toHaveLength(5);
  });
});
