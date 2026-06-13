import { afterEach, describe, expect, it, vi } from "vitest";

import { pokeGetPokemon, pokeSearchPokemon, pokeGetType, pokeGetAbility, pokeGetGeneration } from "./pokeapi-tool.js";

// Colocated PokeAPI connector tests. Exercise the L2 (resilience) behaviour.

describe("pokeapi connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false,
      status: 429,
      headers: { get: () => null },
      text: async () => "",
    })));
    const r = await pokeGetPokemon({ name: "pikachu" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    const r = await pokeGetPokemon({ name: "pikachu" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("returns a clean network error on fetch failure", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("ENOTFOUND"); }));
    const r = await pokeGetPokemon({ name: "pikachu" }) as Record<string, unknown>;
    expect(r.error).toMatch(/network error/i);
  });

  it("validates required name param", async () => {
    const r = await pokeGetPokemon({}) as Record<string, unknown>;
    expect(r.error).toMatch(/name is required/i);
  });

  it("maps pokemon data into clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        id: 25,
        name: "pikachu",
        types: [{ type: { name: "electric" } }],
        stats: [{ stat: { name: "hp" }, base_stat: 35 }],
        abilities: [{ ability: { name: "static" } }],
        height: 4,
        weight: 60,
        sprites: { front_default: "https://example.com/pikachu.png" },
      }),
    })));
    const r = await pokeGetPokemon({ name: "pikachu" }) as Record<string, any>;
    expect(r.id).toBe(25);
    expect(r.name).toBe("pikachu");
    expect(r.types).toEqual(["electric"]);
    expect(r.stats).toEqual([{ name: "hp", value: 35 }]);
    expect(r.abilities).toEqual(["static"]);
    expect(r.height).toBe(4);
    expect(r.weight).toBe(60);
    expect(r.sprite_url).toBe("https://example.com/pikachu.png");
    expect(r.unclick_meta.source).toBe("PokeAPI");
  });

  it("validates required type param", async () => {
    const r = await pokeGetType({}) as Record<string, unknown>;
    expect(r.error).toMatch(/type is required/i);
  });

  it("validates required ability param", async () => {
    const r = await pokeGetAbility({}) as Record<string, unknown>;
    expect(r.error).toMatch(/ability is required/i);
  });

  it("validates required generation param", async () => {
    const r = await pokeGetGeneration({}) as Record<string, unknown>;
    expect(r.error).toMatch(/generation is required/i);
  });

  it("paginates pokemon list with defaults", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        count: 1302,
        next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
        previous: null,
        results: [{ name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" }],
      }),
    })));
    const r = await pokeSearchPokemon({}) as Record<string, any>;
    expect(r.total).toBe(1302);
    expect(r.limit).toBe(20);
    expect(r.offset).toBe(0);
    expect(r.pokemon).toEqual(["bulbasaur"]);
    expect(r.unclick_meta.source).toBe("PokeAPI");
  });

  it("clamps limit to 100", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        count: 1302,
        next: null,
        previous: null,
        results: [],
      }),
    })));
    await pokeSearchPokemon({ limit: 999 });
    const call = (fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(call[0]).toContain("limit=100");
  });
});
