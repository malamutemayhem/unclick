import { afterEach, describe, expect, it, vi } from "vitest";
import { wikipediaSearch, wikipediaSummary } from "./wikipedia-tool.js";

describe("wikipedia connector (L2/L5, no key)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });
  it("429", async () => { vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, json: async () => ({}) }))); await expect(wikipediaSearch({ query: "x" })).rejects.toThrow(/rate limit/i); });
  it("timeout", async () => { vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("x"); e.name = "AbortError"; throw e; })); await expect(wikipediaSearch({ query: "x" })).rejects.toThrow(/timed out/i); });
  it("validates query", async () => { const r = await wikipediaSearch({}) as Record<string, unknown>; expect(r.error).toMatch(/query is required/i); });
  it("searches the right lang host + stamps", async () => { const f = vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ query: { search: [{ title: "Cat" }] } }) })); vi.stubGlobal("fetch", f); const r = await wikipediaSearch({ query: "cat", lang: "de" }) as Record<string, any>; expect(String((f.mock.calls[0] as unknown as [string])[0])).toMatch(/^https:\/\/de\.wikipedia\.org\/w\/api\.php/); expect((r.results as unknown[]).length).toBe(1); expect(r.unclick_meta.source).toMatch(/Wikipedia/); });
  it("summary validates title", async () => { const r = await wikipediaSummary({}) as Record<string, unknown>; expect(r.error).toMatch(/title is required/i); });
});
