import { afterEach, describe, expect, it, vi } from "vitest";
import { heroGetById, heroAll, heroPowerstats } from "./superhero-tool.js";

describe("superhero connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await heroGetById({ id: 1 }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await heroPowerstats({ id: 1 }) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("validates required id param", async () => {
    const r = await heroGetById({}) as Record<string, unknown>;
    expect(r.error).toMatch(/id is required/i);
  });

  it("heroGetById returns character with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ id: 1, name: "Spider-Man", slug: "spider-man" }),
    })));
    const r = await heroGetById({ id: 1 }) as Record<string, unknown>;
    expect(r.name).toBe("Spider-Man");
    expect(r.unclick_meta).toBeDefined();
  });

  it("heroAll returns a list", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ([{ id: 1, name: "Spider-Man", slug: "spider-man" }]),
    })));
    const r = await heroAll({}) as Record<string, unknown>;
    expect(r.count).toBe(1);
  });
});
