import { describe, it, expect } from "vitest";
import {
  aerationSurface, pourControl, visualElegance, cleanEase,
  decanterCost, hasStopper, leadFree, glassMaterial,
  bestSpirit, decanters,
} from "../decanter-calc.js";

describe("aerationSurface", () => {
  it("wide base red wine best aeration surface", () => {
    expect(aerationSurface("wide_base_red_wine")).toBeGreaterThan(aerationSurface("whiskey_square_stopper"));
  });
});

describe("pourControl", () => {
  it("carafe everyday pour best pour control", () => {
    expect(pourControl("carafe_everyday_pour")).toBeGreaterThan(pourControl("duck_shape_novelty"));
  });
});

describe("visualElegance", () => {
  it("duck shape novelty most visually elegant", () => {
    expect(visualElegance("duck_shape_novelty")).toBeGreaterThan(visualElegance("carafe_everyday_pour"));
  });
});

describe("cleanEase", () => {
  it("carafe everyday pour easiest to clean", () => {
    expect(cleanEase("carafe_everyday_pour")).toBeGreaterThan(cleanEase("duck_shape_novelty"));
  });
});

describe("decanterCost", () => {
  it("duck shape novelty most expensive", () => {
    expect(decanterCost("duck_shape_novelty")).toBeGreaterThan(decanterCost("carafe_everyday_pour"));
  });
});

describe("hasStopper", () => {
  it("whiskey square stopper has stopper", () => {
    expect(hasStopper("whiskey_square_stopper")).toBe(true);
  });
  it("wide base red wine does not", () => {
    expect(hasStopper("wide_base_red_wine")).toBe(false);
  });
});

describe("leadFree", () => {
  it("wide base red wine is lead free", () => {
    expect(leadFree("wide_base_red_wine")).toBe(true);
  });
  it("classic crystal wine is not", () => {
    expect(leadFree("classic_crystal_wine")).toBe(false);
  });
});

describe("glassMaterial", () => {
  it("duck shape novelty uses borosilicate hand formed", () => {
    expect(glassMaterial("duck_shape_novelty")).toBe("borosilicate_hand_formed");
  });
});

describe("bestSpirit", () => {
  it("whiskey square stopper best for bourbon scotch display", () => {
    expect(bestSpirit("whiskey_square_stopper")).toBe("bourbon_scotch_display");
  });
});

describe("decanters", () => {
  it("returns 5 types", () => {
    expect(decanters()).toHaveLength(5);
  });
});
