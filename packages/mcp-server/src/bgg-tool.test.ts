import { afterEach, describe, expect, it, vi } from "vitest";
import { bggSearch } from "./bgg-tool.js";

// L2 resilience contract for the BoardGameGeek connector: request timeout, clean
// 429 handling, input validation, and stable XML response mapping.
const SEARCH_XML =
  '<items total="2">' +
  '<item id="13" type="boardgame"><name type="primary" value="Catan"/><yearpublished value="1995"/></item>' +
  '<item id="14" type="boardgame"><name type="primary" value="Catan: Cities"/><yearpublished value="1998"/></item>' +
  '</items>';

describe("bgg connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, text: async () => "",
    })));
    await expect(bggSearch({ query: "catan" })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(bggSearch({ query: "catan" })).rejects.toThrow(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    const result = await bggSearch({}) as Record<string, unknown>;
    expect(String(result.error)).toMatch(/query is required/i);
  });

  it("maps XML search responses into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null }, text: async () => SEARCH_XML,
    })));
    const result = await bggSearch({ query: "catan" }) as Record<string, unknown>;
    expect(result.total).toBe(2);
    expect((result.results as Array<Record<string, unknown>>)[0].name).toBe("Catan");
  });
});
