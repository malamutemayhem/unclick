import { describe, it, expect } from "vitest";
import {
  weatherResistance, softness, cleanability, ecoFriendly,
  rugCost, moldResistant, reversible, fiberMaterial,
  bestSpace, outdoorRugs,
} from "../outdoor-rug-calc.js";

describe("weatherResistance", () => {
  it("recycled plastic most weather resistant", () => {
    expect(weatherResistance("recycled_plastic")).toBeGreaterThan(weatherResistance("natural_jute"));
  });
});

describe("softness", () => {
  it("natural jute softest", () => {
    expect(softness("natural_jute")).toBeGreaterThan(softness("bamboo_slat"));
  });
});

describe("cleanability", () => {
  it("recycled plastic easiest to clean", () => {
    expect(cleanability("recycled_plastic")).toBeGreaterThan(cleanability("natural_jute"));
  });
});

describe("ecoFriendly", () => {
  it("recycled plastic most eco friendly", () => {
    expect(ecoFriendly("recycled_plastic")).toBeGreaterThan(ecoFriendly("polypropylene_flat"));
  });
});

describe("rugCost", () => {
  it("bamboo slat most expensive", () => {
    expect(rugCost("bamboo_slat")).toBeGreaterThan(rugCost("polypropylene_flat"));
  });
});

describe("moldResistant", () => {
  it("polypropylene flat is mold resistant", () => {
    expect(moldResistant("polypropylene_flat")).toBe(true);
  });
  it("natural jute is not", () => {
    expect(moldResistant("natural_jute")).toBe(false);
  });
});

describe("reversible", () => {
  it("recycled plastic is reversible", () => {
    expect(reversible("recycled_plastic")).toBe(true);
  });
  it("bamboo slat is not", () => {
    expect(reversible("bamboo_slat")).toBe(false);
  });
});

describe("fiberMaterial", () => {
  it("recycled plastic uses pet bottle woven", () => {
    expect(fiberMaterial("recycled_plastic")).toBe("pet_bottle_woven");
  });
});

describe("bestSpace", () => {
  it("natural jute for covered porch dry", () => {
    expect(bestSpace("natural_jute")).toBe("covered_porch_dry");
  });
});

describe("outdoorRugs", () => {
  it("returns 5 types", () => {
    expect(outdoorRugs()).toHaveLength(5);
  });
});
