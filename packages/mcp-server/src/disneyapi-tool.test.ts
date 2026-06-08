import { afterEach, describe, expect, it, vi } from "vitest";
import { disneyCharacterSearch, disneyAllCharacters } from "./disneyapi-tool.js";

describe("disneyapi connector (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await disneyCharacterSearch({ name: "Mickey" }) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await disneyAllCharacters({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("validates name is required for search", async () => {
    const r = await disneyCharacterSearch({}) as Record<string, unknown>;
    expect(r.error).toMatch(/name is required/i);
  });

  it("returns characters with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ data: [{ _id: 1, name: "Mickey Mouse" }], info: { totalPages: 5 } }),
    })));
    const r = await disneyCharacterSearch({ name: "Mickey" }) as Record<string, unknown>;
    expect(r.data).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });
});
