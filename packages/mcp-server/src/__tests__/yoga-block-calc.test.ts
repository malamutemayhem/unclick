import { describe, it, expect } from "vitest";
import {
  firmness, gripSurface, lightWeight, ecoFriendly,
  blockCost, moistureResist, biodegradable, blockMaterial,
  bestPractice, yogaBlocks,
} from "../yoga-block-calc.js";

describe("firmness", () => {
  it("wood solid hard most firm", () => {
    expect(firmness("wood_solid_hard")).toBeGreaterThan(firmness("recycled_foam_soft"));
  });
});

describe("gripSurface", () => {
  it("cork natural eco best grip surface", () => {
    expect(gripSurface("cork_natural_eco")).toBeGreaterThan(gripSurface("wood_solid_hard"));
  });
});

describe("lightWeight", () => {
  it("foam eva standard lightest", () => {
    expect(lightWeight("foam_eva_standard")).toBeGreaterThan(lightWeight("wood_solid_hard"));
  });
});

describe("ecoFriendly", () => {
  it("cork natural eco most eco friendly", () => {
    expect(ecoFriendly("cork_natural_eco")).toBeGreaterThan(ecoFriendly("foam_eva_standard"));
  });
});

describe("blockCost", () => {
  it("bamboo hollow light more expensive than foam", () => {
    expect(blockCost("bamboo_hollow_light")).toBeGreaterThan(blockCost("foam_eva_standard"));
  });
});

describe("moistureResist", () => {
  it("cork natural eco resists moisture", () => {
    expect(moistureResist("cork_natural_eco")).toBe(true);
  });
  it("wood solid hard does not resist moisture", () => {
    expect(moistureResist("wood_solid_hard")).toBe(false);
  });
});

describe("biodegradable", () => {
  it("cork natural eco is biodegradable", () => {
    expect(biodegradable("cork_natural_eco")).toBe(true);
  });
  it("foam eva standard is not biodegradable", () => {
    expect(biodegradable("foam_eva_standard")).toBe(false);
  });
});

describe("blockMaterial", () => {
  it("cork natural eco uses natural cork bark", () => {
    expect(blockMaterial("cork_natural_eco")).toBe("natural_cork_bark");
  });
});

describe("bestPractice", () => {
  it("cork natural eco best for hot yoga sweaty grip", () => {
    expect(bestPractice("cork_natural_eco")).toBe("hot_yoga_sweaty_grip");
  });
});

describe("yogaBlocks", () => {
  it("returns 5 types", () => {
    expect(yogaBlocks()).toHaveLength(5);
  });
});
