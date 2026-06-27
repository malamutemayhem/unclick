import { describe, it, expect } from "vitest";
import {
  heatEven, tempControl, surfaceArea, portability,
  paletteCost, multiZone, anodized, surfaceType,
  bestUse, hotPalettes,
} from "../hot-palette-calc.js";

describe("heatEven", () => {
  it("anodized palette pro most even heat", () => {
    expect(heatEven("anodized_palette_pro")).toBeGreaterThan(heatEven("pancake_griddle_budget"));
  });
});

describe("tempControl", () => {
  it("multi zone palette best temp control", () => {
    expect(tempControl("multi_zone_palette")).toBeGreaterThan(tempControl("pancake_griddle_budget"));
  });
});

describe("surfaceArea", () => {
  it("griddle palette large largest surface area", () => {
    expect(surfaceArea("griddle_palette_large")).toBeGreaterThan(surfaceArea("travel_palette_small"));
  });
});

describe("portability", () => {
  it("travel palette small most portable", () => {
    expect(portability("travel_palette_small")).toBeGreaterThan(portability("multi_zone_palette"));
  });
});

describe("paletteCost", () => {
  it("multi zone palette most expensive", () => {
    expect(paletteCost("multi_zone_palette")).toBeGreaterThan(paletteCost("pancake_griddle_budget"));
  });
});

describe("multiZone", () => {
  it("multi zone palette has multi zone", () => {
    expect(multiZone("multi_zone_palette")).toBe(true);
  });
  it("griddle palette large not multi zone", () => {
    expect(multiZone("griddle_palette_large")).toBe(false);
  });
});

describe("anodized", () => {
  it("anodized palette pro is anodized", () => {
    expect(anodized("anodized_palette_pro")).toBe(true);
  });
  it("pancake griddle budget not anodized", () => {
    expect(anodized("pancake_griddle_budget")).toBe(false);
  });
});

describe("surfaceType", () => {
  it("travel palette small uses compact plate mini", () => {
    expect(surfaceType("travel_palette_small")).toBe("compact_plate_mini");
  });
});

describe("bestUse", () => {
  it("griddle palette large best for general studio melt", () => {
    expect(bestUse("griddle_palette_large")).toBe("general_studio_melt");
  });
});

describe("hotPalettes", () => {
  it("returns 5 types", () => {
    expect(hotPalettes()).toHaveLength(5);
  });
});
