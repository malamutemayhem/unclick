export interface Ingredient {
  name: string;
  amountMl: number;
  abv: number;
  category: "spirit" | "liqueur" | "mixer" | "juice" | "syrup" | "bitters" | "garnish";
}

export interface Cocktail {
  name: string;
  ingredients: Ingredient[];
  method: "shaken" | "stirred" | "built" | "blended" | "muddled";
  glass: string;
  totalVolumeMl: number;
  abv: number;
  calories: number;
  standardDrinks: number;
}

const SPIRIT_CALORIES_PER_ML = 2.2;
const SUGAR_CALORIES_PER_ML = 1.6;
const JUICE_CALORIES_PER_ML = 0.4;
const STANDARD_DRINK_GRAMS = 10;
const ALCOHOL_DENSITY = 0.789;

export function totalVolume(ingredients: Ingredient[]): number {
  return parseFloat(ingredients.reduce((s, i) => s + i.amountMl, 0).toFixed(1));
}

export function cocktailAbv(ingredients: Ingredient[]): number {
  const vol = totalVolume(ingredients);
  if (vol === 0) return 0;
  const alcoholMl = ingredients.reduce((s, i) => s + i.amountMl * (i.abv / 100), 0);
  return parseFloat((alcoholMl / vol * 100).toFixed(1));
}

export function dilutionPercent(method: Cocktail["method"]): number {
  const rates: Record<Cocktail["method"], number> = {
    shaken: 25, stirred: 18, built: 10, blended: 30, muddled: 15,
  };
  return rates[method];
}

export function volumeAfterDilution(ingredients: Ingredient[], method: Cocktail["method"]): number {
  const vol = totalVolume(ingredients);
  return parseFloat((vol * (1 + dilutionPercent(method) / 100)).toFixed(1));
}

export function abvAfterDilution(ingredients: Ingredient[], method: Cocktail["method"]): number {
  const alcoholMl = ingredients.reduce((s, i) => s + i.amountMl * (i.abv / 100), 0);
  const diluted = volumeAfterDilution(ingredients, method);
  if (diluted === 0) return 0;
  return parseFloat((alcoholMl / diluted * 100).toFixed(1));
}

export function estimateCalories(ingredients: Ingredient[]): number {
  let cal = 0;
  for (const i of ingredients) {
    const alcoholCal = i.amountMl * (i.abv / 100) * SPIRIT_CALORIES_PER_ML * 3.2;
    if (i.category === "syrup") cal += i.amountMl * SUGAR_CALORIES_PER_ML;
    else if (i.category === "juice") cal += i.amountMl * JUICE_CALORIES_PER_ML;
    cal += alcoholCal;
  }
  return Math.round(cal);
}

export function standardDrinks(ingredients: Ingredient[]): number {
  const alcoholMl = ingredients.reduce((s, i) => s + i.amountMl * (i.abv / 100), 0);
  const grams = alcoholMl * ALCOHOL_DENSITY;
  return parseFloat((grams / STANDARD_DRINK_GRAMS).toFixed(1));
}

export function scaleBatch(ingredients: Ingredient[], servings: number): Ingredient[] {
  return ingredients.map(i => ({ ...i, amountMl: parseFloat((i.amountMl * servings).toFixed(1)) }));
}

export function costPerDrink(ingredientCosts: { amountMl: number; bottleMl: number; bottleCost: number }[]): number {
  const total = ingredientCosts.reduce((s, c) => s + (c.amountMl / c.bottleMl) * c.bottleCost, 0);
  return parseFloat(total.toFixed(2));
}

export function drinksPerBottle(bottleMl: number, pourMl: number): number {
  return Math.floor(bottleMl / pourMl);
}

export function proofToAbv(proof: number): number {
  return proof / 2;
}

export function abvToProof(abv: number): number {
  return abv * 2;
}

export function sweetSourBalance(sweetMl: number, sourMl: number): string {
  const ratio = sweetMl / (sourMl || 1);
  if (ratio < 0.8) return "sour-forward";
  if (ratio > 1.3) return "sweet-forward";
  return "balanced";
}

export function spiritForward(ingredients: Ingredient[]): boolean {
  const spiritMl = ingredients.filter(i => i.category === "spirit").reduce((s, i) => s + i.amountMl, 0);
  return spiritMl / totalVolume(ingredients) > 0.5;
}

export function makeCocktail(
  name: string,
  ingredients: Ingredient[],
  method: Cocktail["method"],
  glass: string,
): Cocktail {
  return {
    name,
    ingredients,
    method,
    glass,
    totalVolumeMl: volumeAfterDilution(ingredients, method),
    abv: abvAfterDilution(ingredients, method),
    calories: estimateCalories(ingredients),
    standardDrinks: standardDrinks(ingredients),
  };
}

export const CLASSIC_RECIPES: Record<string, { ingredients: Ingredient[]; method: Cocktail["method"]; glass: string }> = {
  "Old Fashioned": {
    ingredients: [
      { name: "Bourbon", amountMl: 60, abv: 40, category: "spirit" },
      { name: "Simple Syrup", amountMl: 10, abv: 0, category: "syrup" },
      { name: "Angostura Bitters", amountMl: 2, abv: 45, category: "bitters" },
    ],
    method: "stirred",
    glass: "rocks",
  },
  "Margarita": {
    ingredients: [
      { name: "Tequila", amountMl: 45, abv: 40, category: "spirit" },
      { name: "Triple Sec", amountMl: 20, abv: 30, category: "liqueur" },
      { name: "Lime Juice", amountMl: 25, abv: 0, category: "juice" },
    ],
    method: "shaken",
    glass: "coupe",
  },
  "Mojito": {
    ingredients: [
      { name: "White Rum", amountMl: 45, abv: 40, category: "spirit" },
      { name: "Lime Juice", amountMl: 20, abv: 0, category: "juice" },
      { name: "Simple Syrup", amountMl: 15, abv: 0, category: "syrup" },
      { name: "Soda Water", amountMl: 60, abv: 0, category: "mixer" },
    ],
    method: "built",
    glass: "highball",
  },
  "Daiquiri": {
    ingredients: [
      { name: "White Rum", amountMl: 60, abv: 40, category: "spirit" },
      { name: "Lime Juice", amountMl: 25, abv: 0, category: "juice" },
      { name: "Simple Syrup", amountMl: 15, abv: 0, category: "syrup" },
    ],
    method: "shaken",
    glass: "coupe",
  },
};

export function getClassicRecipe(name: string): Cocktail | null {
  const recipe = CLASSIC_RECIPES[name];
  if (!recipe) return null;
  return makeCocktail(name, recipe.ingredients, recipe.method, recipe.glass);
}

export function listClassics(): string[] {
  return Object.keys(CLASSIC_RECIPES);
}
