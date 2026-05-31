import { afterEach, describe, expect, it, vi } from "vitest";

import { searchMeals } from "./meal-tool.js";

// Colocated TheMealDB connector tests. Exercise the L2 (resilience) behaviour.

describe("themealdb connector resilience (L2)", () => {
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
    await expect(searchMeals({ query: "pasta" })).rejects.toThrow(/rate limit reached \(HTTP 429\).*retry after 20s/i);
  });

  it("surfaces a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    }));
    await expect(searchMeals({ query: "pasta" })).rejects.toThrow(/timed out/i);
  });

  it("wraps generic network failures with a clear message", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("ENOTFOUND"); }));
    await expect(searchMeals({ query: "pasta" })).rejects.toThrow(/network error: ENOTFOUND/i);
  });

  it("validates input before any network call", async () => {
    const result = await searchMeals({}) as Record<string, unknown>;
    expect(result.error).toMatch(/query is required/i);
  });

  it("normalizes a returned meal", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ meals: [{ idMeal: "52772", strMeal: "Teriyaki Chicken", strCategory: "Chicken", strArea: "Japanese", strInstructions: "Cook." }] }),
    })));
    const result = await searchMeals({ query: "chicken" }) as Record<string, any>;
    expect(result.count).toBe(1);
    expect(result.meals[0].name).toBe("Teriyaki Chicken");
  });
});
