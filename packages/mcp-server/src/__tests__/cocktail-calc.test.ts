import { describe, it, expect } from "vitest";
import {
  totalVolume, cocktailAbv, dilutionPercent, volumeAfterDilution,
  abvAfterDilution, estimateCalories, standardDrinks, scaleBatch,
  costPerDrink, drinksPerBottle, proofToAbv, abvToProof,
  sweetSourBalance, spiritForward, makeCocktail, getClassicRecipe,
  listClassics, Ingredient,
} from "../cocktail-calc.js";

const vodkaSoda: Ingredient[] = [
  { name: "Vodka", amountMl: 45, abv: 40, category: "spirit" },
  { name: "Soda", amountMl: 120, abv: 0, category: "mixer" },
];

describe("totalVolume", () => {
  it("sums ingredient volumes", () => {
    expect(totalVolume(vodkaSoda)).toBe(165);
  });
});

describe("cocktailAbv", () => {
  it("computes weighted ABV", () => {
    expect(cocktailAbv(vodkaSoda)).toBeCloseTo(10.9, 0);
  });

  it("returns 0 for empty list", () => {
    expect(cocktailAbv([])).toBe(0);
  });
});

describe("dilutionPercent", () => {
  it("shaken = 25%", () => {
    expect(dilutionPercent("shaken")).toBe(25);
  });

  it("stirred = 18%", () => {
    expect(dilutionPercent("stirred")).toBe(18);
  });
});

describe("volumeAfterDilution", () => {
  it("increases volume", () => {
    expect(volumeAfterDilution(vodkaSoda, "built")).toBeGreaterThan(totalVolume(vodkaSoda));
  });
});

describe("abvAfterDilution", () => {
  it("lower than undiluted", () => {
    expect(abvAfterDilution(vodkaSoda, "shaken")).toBeLessThan(cocktailAbv(vodkaSoda));
  });
});

describe("estimateCalories", () => {
  it("positive for boozy drinks", () => {
    expect(estimateCalories(vodkaSoda)).toBeGreaterThan(0);
  });
});

describe("standardDrinks", () => {
  it("vodka soda about 1.4 std drinks", () => {
    expect(standardDrinks(vodkaSoda)).toBeCloseTo(1.4, 0);
  });
});

describe("scaleBatch", () => {
  it("doubles amounts for 2 servings", () => {
    const batch = scaleBatch(vodkaSoda, 2);
    expect(batch[0].amountMl).toBe(90);
    expect(batch[1].amountMl).toBe(240);
  });
});

describe("costPerDrink", () => {
  it("computes cost", () => {
    const cost = costPerDrink([
      { amountMl: 45, bottleMl: 700, bottleCost: 35 },
    ]);
    expect(cost).toBeCloseTo(2.25, 1);
  });
});

describe("drinksPerBottle", () => {
  it("700ml / 45ml = 15", () => {
    expect(drinksPerBottle(700, 45)).toBe(15);
  });
});

describe("proofToAbv / abvToProof", () => {
  it("80 proof = 40 ABV", () => {
    expect(proofToAbv(80)).toBe(40);
  });

  it("round trips", () => {
    expect(abvToProof(proofToAbv(100))).toBe(100);
  });
});

describe("sweetSourBalance", () => {
  it("balanced when equal", () => {
    expect(sweetSourBalance(20, 20)).toBe("balanced");
  });

  it("sour forward when less sweet", () => {
    expect(sweetSourBalance(10, 25)).toBe("sour-forward");
  });
});

describe("spiritForward", () => {
  it("true for spirit heavy drinks", () => {
    const neat: Ingredient[] = [{ name: "Whiskey", amountMl: 60, abv: 40, category: "spirit" }];
    expect(spiritForward(neat)).toBe(true);
  });

  it("false for diluted drinks", () => {
    expect(spiritForward(vodkaSoda)).toBe(false);
  });
});

describe("makeCocktail", () => {
  it("returns full spec", () => {
    const c = makeCocktail("Test", vodkaSoda, "built", "highball");
    expect(c.name).toBe("Test");
    expect(c.totalVolumeMl).toBeGreaterThan(0);
    expect(c.abv).toBeGreaterThan(0);
    expect(c.standardDrinks).toBeGreaterThan(0);
  });
});

describe("getClassicRecipe", () => {
  it("returns Old Fashioned", () => {
    const c = getClassicRecipe("Old Fashioned");
    expect(c).not.toBeNull();
    expect(c!.abv).toBeGreaterThan(20);
  });

  it("null for unknown", () => {
    expect(getClassicRecipe("Fake Drink")).toBeNull();
  });
});

describe("listClassics", () => {
  it("has at least 4 recipes", () => {
    expect(listClassics().length).toBeGreaterThanOrEqual(4);
  });
});
