import { describe, it, expect } from "vitest";
import {
  grainCharacter, dynamicRange, colorSaturation, lowLightAbility,
  filmCost, homeDevPossible, instantResult, emulsionType,
  bestShoot, filmStocks,
} from "../film-stock-calc.js";

describe("grainCharacter", () => {
  it("black white tri x most grain", () => {
    expect(grainCharacter("black_white_tri_x")).toBeGreaterThan(grainCharacter("slide_chrome_100"));
  });
});

describe("dynamicRange", () => {
  it("cinema motion 500t widest dynamic range", () => {
    expect(dynamicRange("cinema_motion_500t")).toBeGreaterThan(dynamicRange("instant_peel_apart"));
  });
});

describe("colorSaturation", () => {
  it("slide chrome 100 most saturated", () => {
    expect(colorSaturation("slide_chrome_100")).toBeGreaterThan(colorSaturation("color_negative_400"));
  });
});

describe("lowLightAbility", () => {
  it("cinema motion 500t best low light", () => {
    expect(lowLightAbility("cinema_motion_500t")).toBeGreaterThan(lowLightAbility("slide_chrome_100"));
  });
});

describe("filmCost", () => {
  it("cinema motion 500t most expensive", () => {
    expect(filmCost("cinema_motion_500t")).toBeGreaterThan(filmCost("color_negative_400"));
  });
});

describe("homeDevPossible", () => {
  it("black white tri x home dev possible", () => {
    expect(homeDevPossible("black_white_tri_x")).toBe(true);
  });
  it("slide chrome 100 is not", () => {
    expect(homeDevPossible("slide_chrome_100")).toBe(false);
  });
});

describe("instantResult", () => {
  it("instant peel apart gives instant result", () => {
    expect(instantResult("instant_peel_apart")).toBe(true);
  });
  it("color negative 400 does not", () => {
    expect(instantResult("color_negative_400")).toBe(false);
  });
});

describe("emulsionType", () => {
  it("slide chrome 100 uses e6 reversal chrome", () => {
    expect(emulsionType("slide_chrome_100")).toBe("e6_reversal_chrome");
  });
});

describe("bestShoot", () => {
  it("black white tri x for documentary portrait art", () => {
    expect(bestShoot("black_white_tri_x")).toBe("documentary_portrait_art");
  });
});

describe("filmStocks", () => {
  it("returns 5 types", () => {
    expect(filmStocks()).toHaveLength(5);
  });
});
