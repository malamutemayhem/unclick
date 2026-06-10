import { describe, it, expect } from "vitest";
import {
  tileSizeMm, colorRange, detailResolution,
  durabilityYears, installComplexity, usesGold,
  figurative, bestApplication, costPerM2, mosaicTypes,
} from "../mosaic-type-calc.js";

describe("tileSizeMm", () => {
  it("pebble has largest tiles", () => {
    expect(tileSizeMm("pebble")).toBeGreaterThan(
      tileSizeMm("byzantine_gold")
    );
  });
});

describe("colorRange", () => {
  it("venetian smalti has widest color range", () => {
    expect(colorRange("venetian_smalti")).toBeGreaterThan(
      colorRange("pebble")
    );
  });
});

describe("detailResolution", () => {
  it("venetian smalti has best resolution", () => {
    expect(detailResolution("venetian_smalti")).toBeGreaterThan(
      detailResolution("pebble")
    );
  });
});

describe("durabilityYears", () => {
  it("pebble lasts longest", () => {
    expect(durabilityYears("pebble")).toBeGreaterThan(
      durabilityYears("venetian_smalti")
    );
  });
});

describe("installComplexity", () => {
  it("islamic geometric is most complex to install", () => {
    expect(installComplexity("islamic_geometric")).toBeGreaterThan(
      installComplexity("pebble")
    );
  });
});

describe("usesGold", () => {
  it("byzantine gold uses gold", () => {
    expect(usesGold("byzantine_gold")).toBe(true);
  });
  it("roman tesserae does not", () => {
    expect(usesGold("roman_tesserae")).toBe(false);
  });
});

describe("figurative", () => {
  it("roman tesserae is figurative", () => {
    expect(figurative("roman_tesserae")).toBe(true);
  });
  it("islamic geometric is not", () => {
    expect(figurative("islamic_geometric")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("stained for dome", () => {
    expect(bestApplication("byzantine_gold")).toBe("dome");
  });
});

describe("costPerM2", () => {
  it("byzantine gold is most expensive", () => {
    expect(costPerM2("byzantine_gold")).toBeGreaterThan(
      costPerM2("pebble")
    );
  });
});

describe("mosaicTypes", () => {
  it("returns 5 types", () => {
    expect(mosaicTypes()).toHaveLength(5);
  });
});
