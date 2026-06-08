import { stampMeta } from "./connector-meta.js";

const BASE = "https://www.thecocktaildb.com/api/json/v1/1";
const TIMEOUT = 8_000;

export async function cocktailByIngredient(args: Record<string, unknown>) {
  const ingredient = String(args.ingredient ?? "").trim();
  if (!ingredient) return { error: "ingredient is required" };
  const url = `${BASE}/filter.php?i=${encodeURIComponent(ingredient)}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT) });
  if (!res.ok) throw new Error(`CocktailDB filter ${res.status}`);
  const data = await res.json();
  return stampMeta(data, {
    source: `thecocktaildb.com filter ingredient=${ingredient}`,
    fetched_at: new Date().toISOString(),
    next_steps: ["get full recipe via cocktail lookup by ID", "try other ingredients"],
  });
}

export async function cocktailIngredientInfo(args: Record<string, unknown>) {
  const ingredient = String(args.ingredient ?? "").trim();
  if (!ingredient) return { error: "ingredient is required" };
  const url = `${BASE}/search.php?i=${encodeURIComponent(ingredient)}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT) });
  if (!res.ok) throw new Error(`CocktailDB ingredient ${res.status}`);
  const data = await res.json();
  return stampMeta(data, {
    source: `thecocktaildb.com ingredient=${ingredient}`,
    fetched_at: new Date().toISOString(),
    next_steps: ["check strDescription for ingredient details", "use strType for classification"],
  });
}
