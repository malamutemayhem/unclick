import { describe, it, expect } from "vitest";
import {
  readability, weatherResist, aesthetics, reusability,
  labelCost, biodegradable, rewritable, markMethod,
  bestGarden, plantLabels,
} from "../plant-label-calc.js";

describe("readability", () => {
  it("copper metal etched most readable", () => {
    expect(readability("copper_metal_etched")).toBeGreaterThan(readability("bamboo_natural_marker"));
  });
});

describe("weatherResist", () => {
  it("slate stone engraved best weather resist", () => {
    expect(weatherResist("slate_stone_engraved")).toBeGreaterThan(weatherResist("plastic_t_stake_basic"));
  });
});

describe("aesthetics", () => {
  it("copper metal etched best aesthetics", () => {
    expect(aesthetics("copper_metal_etched")).toBeGreaterThan(aesthetics("plastic_t_stake_basic"));
  });
});

describe("reusability", () => {
  it("slate stone engraved most reusable", () => {
    expect(reusability("slate_stone_engraved")).toBeGreaterThan(reusability("bamboo_natural_marker"));
  });
});

describe("labelCost", () => {
  it("copper metal etched most expensive", () => {
    expect(labelCost("copper_metal_etched")).toBeGreaterThan(labelCost("plastic_t_stake_basic"));
  });
});

describe("biodegradable", () => {
  it("bamboo natural marker is biodegradable", () => {
    expect(biodegradable("bamboo_natural_marker")).toBe(true);
  });
  it("copper metal etched is not biodegradable", () => {
    expect(biodegradable("copper_metal_etched")).toBe(false);
  });
});

describe("rewritable", () => {
  it("plastic t stake basic is rewritable", () => {
    expect(rewritable("plastic_t_stake_basic")).toBe(true);
  });
  it("slate stone engraved is not rewritable", () => {
    expect(rewritable("slate_stone_engraved")).toBe(false);
  });
});

describe("markMethod", () => {
  it("copper metal etched uses acid etch stamp", () => {
    expect(markMethod("copper_metal_etched")).toBe("acid_etch_stamp");
  });
});

describe("bestGarden", () => {
  it("slate stone engraved best for herb garden permanent", () => {
    expect(bestGarden("slate_stone_engraved")).toBe("herb_garden_permanent");
  });
});

describe("plantLabels", () => {
  it("returns 5 types", () => {
    expect(plantLabels()).toHaveLength(5);
  });
});
