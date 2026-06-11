import { afterEach, describe, expect, it, vi } from "vitest";
import { swapiGetPerson, swapiSearchPeople, swapiGetPlanet, swapiSearchPlanets, swapiGetStarship, swapiSearchStarships } from "./swapi-tool.js";

describe("swapi connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await swapiGetPerson({ id: "1" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await swapiSearchPlanets({ query: "tatooine" }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("validates required id param", async () => {
    const r = await swapiGetPerson({}) as Record<string, unknown>;
    expect(r.error).toMatch(/id is required/i);
  });

  it("validates required query param", async () => {
    const r = await swapiSearchStarships({}) as Record<string, unknown>;
    expect(r.error).toMatch(/query is required/i);
  });

  it("maps person data with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ name: "Luke Skywalker", height: "172", mass: "77" }),
    })));
    const r = await swapiGetPerson({ id: "1" }) as Record<string, unknown>;
    expect(r.name).toBe("Luke Skywalker");
    expect(r.unclick_meta).toBeDefined();
  });

  it("maps search results", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ count: 1, results: [{ name: "Tatooine" }] }),
    })));
    const r = await swapiSearchPlanets({ query: "tatooine" }) as Record<string, unknown>;
    expect(r.count).toBe(1);
  });

  it("swapiGetStarship returns ship data", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ name: "Millennium Falcon", model: "YT-1300" }),
    })));
    const r = await swapiGetStarship({ id: "10" }) as Record<string, unknown>;
    expect(r.name).toBe("Millennium Falcon");
  });
});
