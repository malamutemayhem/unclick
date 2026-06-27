import { describe, it, expect } from "vitest";
import {
  rivetSet, textureControl, balanceFeel, peenRadius,
  peenCost, lightWeight, forRivet, headWeight,
  bestUse, ballPeenForges,
} from "../ball-peen-forge-calc.js";

describe("rivetSet", () => {
  it("riveting light tap best rivet set", () => {
    expect(rivetSet("riveting_light_tap")).toBeGreaterThan(rivetSet("chasing_small_detail"));
  });
});

describe("textureControl", () => {
  it("chasing small detail best texture control", () => {
    expect(textureControl("chasing_small_detail")).toBeGreaterThan(textureControl("peening_heavy_forge"));
  });
});

describe("balanceFeel", () => {
  it("riveting light tap best balance feel", () => {
    expect(balanceFeel("riveting_light_tap")).toBeGreaterThan(balanceFeel("peening_heavy_forge"));
  });
});

describe("peenRadius", () => {
  it("peening heavy forge largest peen radius", () => {
    expect(peenRadius("peening_heavy_forge")).toBeGreaterThan(peenRadius("chasing_small_detail"));
  });
});

describe("peenCost", () => {
  it("peening heavy forge most expensive", () => {
    expect(peenCost("peening_heavy_forge")).toBeGreaterThan(peenCost("mechanic_standard_medium"));
  });
});

describe("lightWeight", () => {
  it("chasing small detail is light weight", () => {
    expect(lightWeight("chasing_small_detail")).toBe(true);
  });
  it("peening heavy forge not light weight", () => {
    expect(lightWeight("peening_heavy_forge")).toBe(false);
  });
});

describe("forRivet", () => {
  it("mechanic standard medium is for rivet", () => {
    expect(forRivet("mechanic_standard_medium")).toBe(true);
  });
  it("chasing small detail not for rivet", () => {
    expect(forRivet("chasing_small_detail")).toBe(false);
  });
});

describe("headWeight", () => {
  it("chasing small detail uses tiny 100g", () => {
    expect(headWeight("chasing_small_detail")).toBe("tiny_100g");
  });
});

describe("bestUse", () => {
  it("chasing small detail best for detail chase emboss", () => {
    expect(bestUse("chasing_small_detail")).toBe("detail_chase_emboss");
  });
});

describe("ballPeenForges", () => {
  it("returns 5 types", () => {
    expect(ballPeenForges()).toHaveLength(5);
  });
});
