import { describe, it, expect } from "vitest";
import {
  scrapingPower, reach, handWarmth, paintSafe,
  scraperCost, needsPower, hasSnowBrush, bladeType,
  bestClimate, iceScrapers,
} from "../ice-scraper-calc.js";

describe("scrapingPower", () => {
  it("brass blade heavy most scraping power", () => {
    expect(scrapingPower("brass_blade_heavy")).toBeGreaterThan(scrapingPower("mitt_glove_scraper"));
  });
});

describe("reach", () => {
  it("telescoping snow brush longest reach", () => {
    expect(reach("telescoping_snow_brush")).toBeGreaterThan(reach("mitt_glove_scraper"));
  });
});

describe("handWarmth", () => {
  it("mitt glove scraper warmest hands", () => {
    expect(handWarmth("mitt_glove_scraper")).toBeGreaterThan(handWarmth("basic_plastic_blade"));
  });
});

describe("paintSafe", () => {
  it("heated electric blade safest on paint", () => {
    expect(paintSafe("heated_electric_blade")).toBeGreaterThan(paintSafe("brass_blade_heavy"));
  });
});

describe("scraperCost", () => {
  it("heated electric blade most expensive", () => {
    expect(scraperCost("heated_electric_blade")).toBeGreaterThan(scraperCost("basic_plastic_blade"));
  });
});

describe("needsPower", () => {
  it("heated electric blade needs power", () => {
    expect(needsPower("heated_electric_blade")).toBe(true);
  });
  it("brass blade heavy does not", () => {
    expect(needsPower("brass_blade_heavy")).toBe(false);
  });
});

describe("hasSnowBrush", () => {
  it("telescoping snow brush has snow brush", () => {
    expect(hasSnowBrush("telescoping_snow_brush")).toBe(true);
  });
  it("basic plastic blade does not", () => {
    expect(hasSnowBrush("basic_plastic_blade")).toBe(false);
  });
});

describe("bladeType", () => {
  it("brass blade heavy uses solid brass beveled", () => {
    expect(bladeType("brass_blade_heavy")).toBe("solid_brass_beveled");
  });
});

describe("bestClimate", () => {
  it("telescoping snow brush best for heavy snow suv truck", () => {
    expect(bestClimate("telescoping_snow_brush")).toBe("heavy_snow_suv_truck");
  });
});

describe("iceScrapers", () => {
  it("returns 5 types", () => {
    expect(iceScrapers()).toHaveLength(5);
  });
});
