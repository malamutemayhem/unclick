import { describe, it, expect } from "vitest";
import {
  pressureRating, wallThickness, solderEase, corrosionResist,
  pipeCost, burialRated, cleanInside, colorCode,
  bestSystem, copperPipes,
} from "../copper-pipe-calc.js";

describe("pressureRating", () => {
  it("type k heavy wall highest pressure", () => {
    expect(pressureRating("type_k_heavy_wall")).toBeGreaterThan(pressureRating("dwv_drain_large"));
  });
});

describe("wallThickness", () => {
  it("type k heavy wall thickest", () => {
    expect(wallThickness("type_k_heavy_wall")).toBeGreaterThan(wallThickness("type_m_thin_wall"));
  });
});

describe("solderEase", () => {
  it("type m thin wall easiest to solder", () => {
    expect(solderEase("type_m_thin_wall")).toBeGreaterThan(solderEase("type_k_heavy_wall"));
  });
});

describe("corrosionResist", () => {
  it("type k heavy wall best corrosion resistance", () => {
    expect(corrosionResist("type_k_heavy_wall")).toBeGreaterThan(corrosionResist("dwv_drain_large"));
  });
});

describe("pipeCost", () => {
  it("type k heavy wall most expensive", () => {
    expect(pipeCost("type_k_heavy_wall")).toBeGreaterThan(pipeCost("type_m_thin_wall"));
  });
});

describe("burialRated", () => {
  it("type k heavy wall is burial rated", () => {
    expect(burialRated("type_k_heavy_wall")).toBe(true);
  });
  it("type m thin wall is not", () => {
    expect(burialRated("type_m_thin_wall")).toBe(false);
  });
});

describe("cleanInside", () => {
  it("acr refrigerant has clean inside", () => {
    expect(cleanInside("acr_refrigerant")).toBe(true);
  });
  it("type l medium wall does not", () => {
    expect(cleanInside("type_l_medium_wall")).toBe(false);
  });
});

describe("colorCode", () => {
  it("type m thin wall uses red stripe marking", () => {
    expect(colorCode("type_m_thin_wall")).toBe("red_stripe_marking");
  });
});

describe("bestSystem", () => {
  it("type k heavy wall best for underground main service", () => {
    expect(bestSystem("type_k_heavy_wall")).toBe("underground_main_service");
  });
});

describe("copperPipes", () => {
  it("returns 5 types", () => {
    expect(copperPipes()).toHaveLength(5);
  });
});
