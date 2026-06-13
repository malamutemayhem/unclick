import { afterEach, describe, expect, it, vi } from "vitest";

import { searchCocktails } from "./cocktail-tool.js";

// Colocated TheCocktailDB connector tests. Exercise the L2 (resilience) behaviour.

describe("thecocktaildb connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("surfaces a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 429,
      headers: { get: (h: string) => (h === "Retry-After" ? "20" : null) },
      text: async () => "rate limited",
    })));
    const result = await searchCocktails({ query: "margarita" }) as Record<string, unknown>;
    expect(result.error).toMatch(/rate limit reached \(HTTP 429\).*retry after 20s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    const result = await searchCocktails({ query: "margarita" }) as Record<string, unknown>;
    expect(result.error).toMatch(/timed out/i);
  });

  it("validates input before any network call", async () => {
    const result = await searchCocktails({}) as Record<string, unknown>;
    expect(result.error).toMatch(/query is required/i);
  });

  it("normalizes a returned cocktail", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        drinks: [{
          idDrink: "11007",
          strDrink: "Margarita",
          strCategory: "Ordinary Drink",
          strAlcoholic: "Alcoholic",
          strGlass: "Cocktail glass",
          strInstructions: "Shake and strain.",
          strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/margarita.jpg",
          strIngredient1: "Tequila",
          strMeasure1: "1 1/2 oz",
          strIngredient2: "Triple sec",
          strMeasure2: "1/2 oz",
          strIngredient3: "Lime juice",
          strMeasure3: "1 oz",
        }],
      }),
    })));
    const result = await searchCocktails({ query: "margarita" }) as Record<string, any>;
    expect(result.count).toBe(1);
    expect(result.drinks[0].name).toBe("Margarita");
    expect(result.drinks[0].alcoholic).toBe("Alcoholic");
    expect(result.drinks[0].glass).toBe("Cocktail glass");
    expect(result.drinks[0].ingredients).toHaveLength(3);
    expect(result.drinks[0].ingredients[0]).toEqual({ ingredient: "Tequila", measure: "1 1/2 oz" });
  });
});
