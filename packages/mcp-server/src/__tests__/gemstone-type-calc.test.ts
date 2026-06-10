import { describe, it, expect } from "vitest";
import {
  hardnessMohs, refractiveIndex, rarityScore,
  brilliance, durability, pleochroic,
  playOfColor, primaryColor, pricePerCarat, gemstoneTypes,
} from "../gemstone-type-calc.js";

describe("hardnessMohs", () => {
  it("diamond is hardest", () => {
    expect(hardnessMohs("diamond")).toBeGreaterThan(
      hardnessMohs("opal")
    );
  });
});

describe("refractiveIndex", () => {
  it("diamond has highest refractive index", () => {
    expect(refractiveIndex("diamond")).toBeGreaterThan(
      refractiveIndex("opal")
    );
  });
});

describe("rarityScore", () => {
  it("ruby is rarest", () => {
    expect(rarityScore("ruby")).toBeGreaterThan(rarityScore("opal"));
  });
});

describe("brilliance", () => {
  it("diamond is most brilliant", () => {
    expect(brilliance("diamond")).toBeGreaterThan(
      brilliance("emerald")
    );
  });
});

describe("durability", () => {
  it("diamond is most durable", () => {
    expect(durability("diamond")).toBeGreaterThan(durability("opal"));
  });
});

describe("pleochroic", () => {
  it("ruby is pleochroic", () => {
    expect(pleochroic("ruby")).toBe(true);
  });
  it("diamond is not pleochroic", () => {
    expect(pleochroic("diamond")).toBe(false);
  });
});

describe("playOfColor", () => {
  it("opal has play of color", () => {
    expect(playOfColor("opal")).toBe(true);
  });
  it("diamond does not", () => {
    expect(playOfColor("diamond")).toBe(false);
  });
});

describe("primaryColor", () => {
  it("ruby is red", () => {
    expect(primaryColor("ruby")).toBe("red");
  });
});

describe("pricePerCarat", () => {
  it("ruby costs most per carat", () => {
    expect(pricePerCarat("ruby")).toBeGreaterThan(
      pricePerCarat("opal")
    );
  });
});

describe("gemstoneTypes", () => {
  it("returns 5 types", () => {
    expect(gemstoneTypes()).toHaveLength(5);
  });
});
