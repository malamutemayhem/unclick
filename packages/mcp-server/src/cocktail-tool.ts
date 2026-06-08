// TheCocktailDB drink/cocktail finder.
// No API key required - free public API.
// Base URL: https://www.thecocktaildb.com/api/json/v1/1/

import { stampMeta } from "./connector-meta.js";

const COCKTAILDB_BASE = "https://www.thecocktaildb.com/api/json/v1/1";
const COCKTAIL_TIMEOUT_MS = Number(process.env.COCKTAIL_TIMEOUT_MS) || 10000;

interface DrinkSummary {
  idDrink: string;
  strDrink: string;
  strDrinkThumb?: string;
  strCategory?: string;
  strAlcoholic?: string;
}

interface DrinkDetail extends DrinkSummary {
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strTags?: string;
  [key: string]: unknown;
}

interface DrinkListResponse {
  drinks: DrinkSummary[] | DrinkDetail[] | null;
}

interface CategoryItem {
  strCategory: string;
}

interface CategoryListResponse {
  drinks: CategoryItem[];
}

async function cocktailFetch<T>(path: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), COCKTAIL_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${COCKTAILDB_BASE}${path}`, {
      headers: { "User-Agent": "UnClickMCP/1.0 (https://unclick.io)" },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`TheCocktailDB request timed out after ${COCKTAIL_TIMEOUT_MS}ms.`);
    }
    throw new Error(`TheCocktailDB network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`TheCocktailDB rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`TheCocktailDB HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

function extractIngredients(drink: DrinkDetail): Array<{ ingredient: string; measure: string }> {
  const list: Array<{ ingredient: string; measure: string }> = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = String(drink[`strIngredient${i}`] ?? "").trim();
    const measure = String(drink[`strMeasure${i}`] ?? "").trim();
    if (ingredient) list.push({ ingredient, measure });
  }
  return list;
}

function normalizeDrink(drink: DrinkDetail) {
  return {
    id: drink.idDrink,
    name: drink.strDrink,
    category: drink.strCategory ?? null,
    alcoholic: drink.strAlcoholic ?? null,
    glass: drink.strGlass ?? null,
    instructions: drink.strInstructions ?? null,
    thumbnail: drink.strDrinkThumb ?? null,
    tags: drink.strTags ? drink.strTags.split(",").map((t) => t.trim()).filter(Boolean) : [],
    ingredients: extractIngredients(drink),
  };
}

// ─── search_cocktails ─────────────────────────────────────────────────────────

export async function searchCocktails(args: Record<string, unknown>): Promise<unknown> {
  const query = String(args.query ?? "").trim();
  if (!query) return { error: "query is required." };

  try {
    const data = await cocktailFetch<DrinkListResponse>(`/search.php?s=${encodeURIComponent(query)}`);

    if (!data.drinks) {
      return { query, count: 0, drinks: [], message: `No cocktails found matching "${query}".` };
    }

    return stampMeta({
      query,
      count: data.drinks.length,
      drinks: (data.drinks as DrinkDetail[]).map(normalizeDrink),
    }, {
      source: "TheCocktailDB",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use cocktail_get_by_id for the full recipe, or cocktail_filter_by_category to browse."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// ─── get_random_cocktail ──────────────────────────────────────────────────────

export async function getRandomCocktail(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await cocktailFetch<DrinkListResponse>("/random.php");
    if (!data.drinks?.[0]) return { error: "No cocktail returned." };

    return stampMeta({
      drink: normalizeDrink(data.drinks[0] as DrinkDetail),
    }, {
      source: "TheCocktailDB",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use cocktail_filter_by_ingredient to find similar drinks, or cocktail_search to look up by name."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// ─── get_cocktail_by_id ───────────────────────────────────────────────────────

export async function getCocktailById(args: Record<string, unknown>): Promise<unknown> {
  const id = String(args.id ?? "").trim();
  if (!id) return { error: "id is required (TheCocktailDB drink ID)." };

  try {
    const data = await cocktailFetch<DrinkListResponse>(`/lookup.php?i=${encodeURIComponent(id)}`);
    if (!data.drinks?.[0]) return { error: `No cocktail found with id "${id}".` };

    return stampMeta({
      drink: normalizeDrink(data.drinks[0] as DrinkDetail),
    }, {
      source: "TheCocktailDB",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use cocktail_filter_by_ingredient to find drinks with the same ingredients."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// ─── list_cocktail_categories ─────────────────────────────────────────────────

export async function listCocktailCategories(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await cocktailFetch<CategoryListResponse>("/list.php?c=list");

    return stampMeta({
      count: data.drinks.length,
      categories: data.drinks.map((c) => c.strCategory),
    }, {
      source: "TheCocktailDB",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use cocktail_filter_by_category with any category name to see matching drinks."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// ─── filter_cocktails_by_category ─────────────────────────────────────────────

export async function filterCocktailsByCategory(args: Record<string, unknown>): Promise<unknown> {
  const category = String(args.category ?? "").trim();
  if (!category) return { error: "category is required (e.g. Cocktail, Shot, Ordinary Drink)." };

  try {
    const data = await cocktailFetch<DrinkListResponse>(`/filter.php?c=${encodeURIComponent(category)}`);

    if (!data.drinks) {
      return { category, count: 0, drinks: [], message: `No cocktails found for category "${category}".` };
    }

    return stampMeta({
      category,
      count: data.drinks.length,
      drinks: data.drinks.map((d) => ({
        id: d.idDrink,
        name: d.strDrink,
        thumbnail: d.strDrinkThumb ?? null,
      })),
    }, {
      source: "TheCocktailDB",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use cocktail_get_by_id with any id above to get the full recipe."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// ─── filter_cocktails_by_ingredient ───────────────────────────────────────────

export async function filterCocktailsByIngredient(args: Record<string, unknown>): Promise<unknown> {
  const ingredient = String(args.ingredient ?? "").trim();
  if (!ingredient) return { error: "ingredient is required (e.g. Vodka, Gin, Rum)." };

  try {
    const data = await cocktailFetch<DrinkListResponse>(`/filter.php?i=${encodeURIComponent(ingredient)}`);

    if (!data.drinks) {
      return { ingredient, count: 0, drinks: [], message: `No cocktails found with ingredient "${ingredient}".` };
    }

    return stampMeta({
      ingredient,
      count: data.drinks.length,
      drinks: data.drinks.map((d) => ({
        id: d.idDrink,
        name: d.strDrink,
        thumbnail: d.strDrinkThumb ?? null,
      })),
    }, {
      source: "TheCocktailDB",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use cocktail_get_by_id with any id above to get the full recipe."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
