export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

export interface Recipe {
  name: string;
  servings: number;
  ingredients: Ingredient[];
  prepTime: number;
  cookTime: number;
}

export function createRecipe(
  name: string,
  servings: number,
  ingredients: Ingredient[],
  prepTime = 0,
  cookTime = 0
): Recipe {
  return { name, servings, ingredients: ingredients.map(i => ({ ...i })), prepTime, cookTime };
}

export function createIngredient(name: string, amount: number, unit: string): Ingredient {
  return { name, amount, unit };
}

export function scaleRecipe(recipe: Recipe, targetServings: number): Recipe {
  const factor = targetServings / recipe.servings;
  return {
    ...recipe,
    servings: targetServings,
    ingredients: recipe.ingredients.map(i => ({
      ...i,
      amount: round3(i.amount * factor),
    })),
  };
}

function round3(n: number): number {
  return Math.round(n * 1000) / 1000;
}

export function scaleByFactor(recipe: Recipe, factor: number): Recipe {
  return scaleRecipe(recipe, Math.round(recipe.servings * factor));
}

export function doubleRecipe(recipe: Recipe): Recipe {
  return scaleRecipe(recipe, recipe.servings * 2);
}

export function halveRecipe(recipe: Recipe): Recipe {
  return scaleRecipe(recipe, Math.ceil(recipe.servings / 2));
}

const VOLUME_TO_ML: Record<string, number> = {
  tsp: 4.929,
  tbsp: 14.787,
  cup: 236.588,
  "fl oz": 29.574,
  ml: 1,
  l: 1000,
  pint: 473.176,
  quart: 946.353,
  gallon: 3785.41,
};

const WEIGHT_TO_G: Record<string, number> = {
  g: 1,
  kg: 1000,
  oz: 28.3495,
  lb: 453.592,
  mg: 0.001,
};

export function convertUnit(amount: number, from: string, to: string): number | null {
  const fromLower = from.toLowerCase();
  const toLower = to.toLowerCase();

  if (VOLUME_TO_ML[fromLower] && VOLUME_TO_ML[toLower]) {
    return round3(amount * VOLUME_TO_ML[fromLower] / VOLUME_TO_ML[toLower]);
  }

  if (WEIGHT_TO_G[fromLower] && WEIGHT_TO_G[toLower]) {
    return round3(amount * WEIGHT_TO_G[fromLower] / WEIGHT_TO_G[toLower]);
  }

  return null;
}

export function convertIngredient(ingredient: Ingredient, targetUnit: string): Ingredient | null {
  const converted = convertUnit(ingredient.amount, ingredient.unit, targetUnit);
  if (converted === null) return null;
  return { ...ingredient, amount: converted, unit: targetUnit };
}

export function totalTime(recipe: Recipe): number {
  return recipe.prepTime + recipe.cookTime;
}

export function ingredientList(recipe: Recipe): string {
  return recipe.ingredients.map(i =>
    `${formatAmount(i.amount)} ${i.unit} ${i.name}`
  ).join("\n");
}

function formatAmount(n: number): string {
  if (Number.isInteger(n)) return n.toString();

  const fractions: [number, string][] = [
    [0.25, "1/4"], [0.333, "1/3"], [0.5, "1/2"],
    [0.667, "2/3"], [0.75, "3/4"],
  ];

  const whole = Math.floor(n);
  const frac = n - whole;

  for (const [val, str] of fractions) {
    if (Math.abs(frac - val) < 0.05) {
      return whole > 0 ? `${whole} ${str}` : str;
    }
  }

  return n.toFixed(2);
}

export function mergeIngredients(recipes: Recipe[]): Ingredient[] {
  const merged = new Map<string, Ingredient>();

  for (const recipe of recipes) {
    for (const ing of recipe.ingredients) {
      const key = `${ing.name.toLowerCase()}:${ing.unit.toLowerCase()}`;
      const existing = merged.get(key);
      if (existing) {
        existing.amount = round3(existing.amount + ing.amount);
      } else {
        merged.set(key, { ...ing });
      }
    }
  }

  return Array.from(merged.values());
}

export function costPerServing(totalCost: number, servings: number): number {
  if (servings <= 0) return 0;
  return Math.round(totalCost * 100 / servings) / 100;
}

export function substituteIngredient(
  recipe: Recipe,
  originalName: string,
  replacement: Ingredient
): Recipe {
  return {
    ...recipe,
    ingredients: recipe.ingredients.map(i =>
      i.name.toLowerCase() === originalName.toLowerCase() ? { ...replacement } : i
    ),
  };
}
