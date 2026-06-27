import { describe, it, expect } from "vitest";
import {
  heatEvenness, cookingSurface, heatRetention, portability,
  griddleCost, greaseTrap, tempControl, surfaceMaterial,
  bestMeal, griddles,
} from "../griddle-calc.js";

describe("heatEvenness", () => {
  it("commercial chrome top most even heat", () => {
    expect(heatEvenness("commercial_chrome_top")).toBeGreaterThan(heatEvenness("outdoor_propane_large"));
  });
});

describe("cookingSurface", () => {
  it("outdoor propane large biggest surface", () => {
    expect(cookingSurface("outdoor_propane_large")).toBeGreaterThan(cookingSurface("cast_iron_stovetop"));
  });
});

describe("heatRetention", () => {
  it("cast iron stovetop best heat retention", () => {
    expect(heatRetention("cast_iron_stovetop")).toBeGreaterThan(heatRetention("electric_nonstick_flat"));
  });
});

describe("portability", () => {
  it("electric nonstick flat most portable", () => {
    expect(portability("electric_nonstick_flat")).toBeGreaterThan(portability("commercial_chrome_top"));
  });
});

describe("griddleCost", () => {
  it("commercial chrome top most expensive", () => {
    expect(griddleCost("commercial_chrome_top")).toBeGreaterThan(griddleCost("electric_nonstick_flat"));
  });
});

describe("greaseTrap", () => {
  it("electric nonstick flat has grease trap", () => {
    expect(greaseTrap("electric_nonstick_flat")).toBe(true);
  });
  it("cast iron stovetop does not", () => {
    expect(greaseTrap("cast_iron_stovetop")).toBe(false);
  });
});

describe("tempControl", () => {
  it("electric nonstick flat has temp control", () => {
    expect(tempControl("electric_nonstick_flat")).toBe(true);
  });
  it("cast iron stovetop does not", () => {
    expect(tempControl("cast_iron_stovetop")).toBe(false);
  });
});

describe("surfaceMaterial", () => {
  it("cast iron stovetop uses seasoned cast iron", () => {
    expect(surfaceMaterial("cast_iron_stovetop")).toBe("seasoned_cast_iron");
  });
});

describe("bestMeal", () => {
  it("cast iron stovetop best for smash burger sear", () => {
    expect(bestMeal("cast_iron_stovetop")).toBe("smash_burger_sear");
  });
});

describe("griddles", () => {
  it("returns 5 types", () => {
    expect(griddles()).toHaveLength(5);
  });
});
