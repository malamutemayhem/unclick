import { describe, it, expect, vi, afterEach } from "vitest";
import { cocktailByIngredient, cocktailIngredientInfo } from "./cocktaildb2-tool.js";

afterEach(() => vi.unstubAllGlobals());

describe("cocktaildb2-tool", () => {
  it("filters cocktails by ingredient", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ drinks: [{ strDrink: "Margarita", idDrink: "11007" }] }),
    }));
    const r = await cocktailByIngredient({ ingredient: "Tequila" }) as Record<string, unknown>;
    expect(r.drinks).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("gets ingredient info", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({ ingredients: [{ strIngredient: "Vodka", strDescription: "Distilled spirit" }] }),
    }));
    const r = await cocktailIngredientInfo({ ingredient: "Vodka" }) as Record<string, unknown>;
    expect(r.ingredients).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing ingredient", async () => {
    const r = await cocktailByIngredient({}) as Record<string, unknown>;
    expect(r.error).toMatch(/ingredient/i);
  });
});
