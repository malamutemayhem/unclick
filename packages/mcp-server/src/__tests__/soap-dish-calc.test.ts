import { describe, it, expect } from "vitest";
import {
  drainage, durability, aesthetics, cleanEase,
  dishCost, wallMount, rustProof, dishMaterial,
  bestBathroom, soapDishes,
} from "../soap-dish-calc.js";

describe("drainage", () => {
  it("silicone flex waterfall best drainage", () => {
    expect(drainage("silicone_flex_waterfall")).toBeGreaterThan(drainage("ceramic_classic_tray"));
  });
});

describe("durability", () => {
  it("stainless steel drain most durable", () => {
    expect(durability("stainless_steel_drain")).toBeGreaterThan(durability("suction_cup_wall"));
  });
});

describe("aesthetics", () => {
  it("bamboo slat natural best aesthetics", () => {
    expect(aesthetics("bamboo_slat_natural")).toBeGreaterThan(aesthetics("suction_cup_wall"));
  });
});

describe("cleanEase", () => {
  it("silicone flex waterfall easiest to clean", () => {
    expect(cleanEase("silicone_flex_waterfall")).toBeGreaterThan(cleanEase("bamboo_slat_natural"));
  });
});

describe("dishCost", () => {
  it("stainless steel drain most expensive", () => {
    expect(dishCost("stainless_steel_drain")).toBeGreaterThan(dishCost("suction_cup_wall"));
  });
});

describe("wallMount", () => {
  it("suction cup wall is wall mount", () => {
    expect(wallMount("suction_cup_wall")).toBe(true);
  });
  it("ceramic classic tray is not", () => {
    expect(wallMount("ceramic_classic_tray")).toBe(false);
  });
});

describe("rustProof", () => {
  it("stainless steel drain is rust proof", () => {
    expect(rustProof("stainless_steel_drain")).toBe(true);
  });
  it("bamboo slat natural is not", () => {
    expect(rustProof("bamboo_slat_natural")).toBe(false);
  });
});

describe("dishMaterial", () => {
  it("silicone flex waterfall uses food grade silicone drain", () => {
    expect(dishMaterial("silicone_flex_waterfall")).toBe("food_grade_silicone_drain");
  });
});

describe("bestBathroom", () => {
  it("bamboo slat natural best for spa natural theme", () => {
    expect(bestBathroom("bamboo_slat_natural")).toBe("spa_natural_theme");
  });
});

describe("soapDishes", () => {
  it("returns 5 types", () => {
    expect(soapDishes()).toHaveLength(5);
  });
});
