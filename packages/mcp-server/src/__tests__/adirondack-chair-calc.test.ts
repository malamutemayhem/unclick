import { describe, it, expect } from "vitest";
import {
  comfort, durability, weatherResist, portability,
  chairCost, foldable, rocks, frameMaterial,
  bestSpot, adirondackChairs,
} from "../adirondack-chair-calc.js";

describe("comfort", () => {
  it("oversized wide seat most comfortable", () => {
    expect(comfort("oversized_wide_seat")).toBeGreaterThan(comfort("folding_portable_resin"));
  });
});

describe("durability", () => {
  it("recycled poly hdpe most durable", () => {
    expect(durability("recycled_poly_hdpe")).toBeGreaterThan(durability("folding_portable_resin"));
  });
});

describe("weatherResist", () => {
  it("recycled poly hdpe best weather resist", () => {
    expect(weatherResist("recycled_poly_hdpe")).toBeGreaterThan(weatherResist("wood_cedar_classic"));
  });
});

describe("portability", () => {
  it("folding portable resin most portable", () => {
    expect(portability("folding_portable_resin")).toBeGreaterThan(portability("oversized_wide_seat"));
  });
});

describe("chairCost", () => {
  it("recycled poly hdpe most expensive", () => {
    expect(chairCost("recycled_poly_hdpe")).toBeGreaterThan(chairCost("folding_portable_resin"));
  });
});

describe("foldable", () => {
  it("folding portable resin is foldable", () => {
    expect(foldable("folding_portable_resin")).toBe(true);
  });
  it("wood cedar classic is not foldable", () => {
    expect(foldable("wood_cedar_classic")).toBe(false);
  });
});

describe("rocks", () => {
  it("rocker curved base rocks", () => {
    expect(rocks("rocker_curved_base")).toBe(true);
  });
  it("recycled poly hdpe does not rock", () => {
    expect(rocks("recycled_poly_hdpe")).toBe(false);
  });
});

describe("frameMaterial", () => {
  it("recycled poly hdpe uses recycled hdpe plastic", () => {
    expect(frameMaterial("recycled_poly_hdpe")).toBe("recycled_hdpe_plastic");
  });
});

describe("bestSpot", () => {
  it("wood cedar classic best for porch deck lakefront", () => {
    expect(bestSpot("wood_cedar_classic")).toBe("porch_deck_lakefront");
  });
});

describe("adirondackChairs", () => {
  it("returns 5 types", () => {
    expect(adirondackChairs()).toHaveLength(5);
  });
});
