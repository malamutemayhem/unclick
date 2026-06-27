import { describe, it, expect } from "vitest";
import {
  power, spinPotential, durability, armFriendly,
  stringCost, tensionHold, texturedSurface, stringMaterial,
  bestPlayer, tennisStrings,
} from "../tennis-string-calc.js";

describe("power", () => {
  it("natural gut premium most power", () => {
    expect(power("natural_gut_premium")).toBeGreaterThan(power("kevlar_hybrid_durability"));
  });
});

describe("spinPotential", () => {
  it("polyester mono spin best spin potential", () => {
    expect(spinPotential("polyester_mono_spin")).toBeGreaterThan(spinPotential("nylon_multi_comfort"));
  });
});

describe("durability", () => {
  it("kevlar hybrid durability most durable", () => {
    expect(durability("kevlar_hybrid_durability")).toBeGreaterThan(durability("natural_gut_premium"));
  });
});

describe("armFriendly", () => {
  it("natural gut premium most arm friendly", () => {
    expect(armFriendly("natural_gut_premium")).toBeGreaterThan(armFriendly("kevlar_hybrid_durability"));
  });
});

describe("stringCost", () => {
  it("natural gut premium most expensive", () => {
    expect(stringCost("natural_gut_premium")).toBeGreaterThan(stringCost("nylon_multi_comfort"));
  });
});

describe("tensionHold", () => {
  it("natural gut premium holds tension", () => {
    expect(tensionHold("natural_gut_premium")).toBe(true);
  });
  it("polyester mono spin does not", () => {
    expect(tensionHold("polyester_mono_spin")).toBe(false);
  });
});

describe("texturedSurface", () => {
  it("co poly shaped has textured surface", () => {
    expect(texturedSurface("co_poly_shaped")).toBe(true);
  });
  it("natural gut premium does not", () => {
    expect(texturedSurface("natural_gut_premium")).toBe(false);
  });
});

describe("stringMaterial", () => {
  it("natural gut premium uses beef serosa natural fiber", () => {
    expect(stringMaterial("natural_gut_premium")).toBe("beef_serosa_natural_fiber");
  });
});

describe("bestPlayer", () => {
  it("polyester mono spin best for aggressive topspin hitter", () => {
    expect(bestPlayer("polyester_mono_spin")).toBe("aggressive_topspin_hitter");
  });
});

describe("tennisStrings", () => {
  it("returns 5 types", () => {
    expect(tennisStrings()).toHaveLength(5);
  });
});
