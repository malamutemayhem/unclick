import { describe, it, expect } from "vitest";
import {
  createRecipe, createIngredient, scaleRecipe, scaleByFactor,
  doubleRecipe, halveRecipe, convertUnit, convertIngredient,
  totalTime, ingredientList, mergeIngredients, costPerServing,
  substituteIngredient,
} from "../recipe-scaler.js";

const PANCAKE = createRecipe("Pancakes", 4, [
  createIngredient("flour", 2, "cup"),
  createIngredient("milk", 1.5, "cup"),
  createIngredient("egg", 2, "whole"),
  createIngredient("sugar", 2, "tbsp"),
], 10, 15);

describe("scaleRecipe", () => {
  it("scales ingredients proportionally", () => {
    const scaled = scaleRecipe(PANCAKE, 8);
    expect(scaled.servings).toBe(8);
    expect(scaled.ingredients[0].amount).toBe(4);
    expect(scaled.ingredients[1].amount).toBe(3);
  });

  it("scales down", () => {
    const scaled = scaleRecipe(PANCAKE, 2);
    expect(scaled.ingredients[0].amount).toBe(1);
    expect(scaled.ingredients[2].amount).toBe(1);
  });
});

describe("doubleRecipe / halveRecipe", () => {
  it("doubles", () => {
    const d = doubleRecipe(PANCAKE);
    expect(d.servings).toBe(8);
  });

  it("halves", () => {
    const h = halveRecipe(PANCAKE);
    expect(h.servings).toBe(2);
  });
});

describe("scaleByFactor", () => {
  it("scales by multiplier", () => {
    const s = scaleByFactor(PANCAKE, 3);
    expect(s.servings).toBe(12);
  });
});

describe("convertUnit", () => {
  it("converts volume units", () => {
    expect(convertUnit(1, "cup", "ml")).toBeCloseTo(236.588, 0);
  });

  it("converts weight units", () => {
    expect(convertUnit(1, "lb", "oz")).toBeCloseTo(16, 0);
  });

  it("returns null for incompatible units", () => {
    expect(convertUnit(1, "cup", "g")).toBeNull();
  });
});

describe("convertIngredient", () => {
  it("converts ingredient unit", () => {
    const ing = createIngredient("milk", 1, "cup");
    const converted = convertIngredient(ing, "ml");
    expect(converted).not.toBeNull();
    expect(converted!.unit).toBe("ml");
    expect(converted!.amount).toBeCloseTo(236.588, 0);
  });
});

describe("totalTime", () => {
  it("sums prep and cook time", () => {
    expect(totalTime(PANCAKE)).toBe(25);
  });
});

describe("ingredientList", () => {
  it("formats ingredients", () => {
    const list = ingredientList(PANCAKE);
    expect(list).toContain("flour");
    expect(list).toContain("cup");
  });
});

describe("mergeIngredients", () => {
  it("combines same ingredients", () => {
    const r1 = createRecipe("A", 1, [createIngredient("flour", 1, "cup")]);
    const r2 = createRecipe("B", 1, [createIngredient("flour", 2, "cup")]);
    const merged = mergeIngredients([r1, r2]);
    expect(merged.length).toBe(1);
    expect(merged[0].amount).toBe(3);
  });

  it("keeps different ingredients separate", () => {
    const r1 = createRecipe("A", 1, [createIngredient("flour", 1, "cup")]);
    const r2 = createRecipe("B", 1, [createIngredient("sugar", 2, "cup")]);
    const merged = mergeIngredients([r1, r2]);
    expect(merged.length).toBe(2);
  });
});

describe("costPerServing", () => {
  it("computes cost per serving", () => {
    expect(costPerServing(20, 4)).toBe(5);
  });
});

describe("substituteIngredient", () => {
  it("replaces ingredient", () => {
    const sub = substituteIngredient(PANCAKE, "milk", createIngredient("oat milk", 1.5, "cup"));
    expect(sub.ingredients.find(i => i.name === "oat milk")).toBeDefined();
    expect(sub.ingredients.find(i => i.name === "milk")).toBeUndefined();
  });
});
