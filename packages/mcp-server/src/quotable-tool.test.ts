import { afterEach, describe, expect, it, vi } from "vitest";
import { quoteRandom, quoteSearch, quoteByAuthor, quoteListTags, quoteListAuthors } from "./quotable-tool.js";

describe("quotable connector resilience (L2)", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("returns a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 429, headers: { get: () => null }, text: async () => "" })));
    const r = await quoteRandom({}) as Record<string, unknown>;
    expect(r.error).toMatch(/rate limit/i);
  });

  it("returns a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { const e = new Error("aborted"); e.name = "AbortError"; throw e; }));
    const r = await quoteListAuthors({}) as Record<string, unknown>;
    expect(r.error).toMatch(/timed out/i);
  });

  it("validates required query for search", async () => {
    const r = await quoteSearch({}) as Record<string, unknown>;
    expect(r.error).toMatch(/query is required/i);
  });

  it("validates required author for quoteByAuthor", async () => {
    const r = await quoteByAuthor({}) as Record<string, unknown>;
    expect(r.error).toMatch(/author is required/i);
  });

  it("quoteRandom returns a quote with unclick_meta", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ([{ _id: "1", content: "Be the change.", author: "Gandhi" }]),
    })));
    const r = await quoteRandom({}) as Record<string, unknown>;
    expect(r.unclick_meta).toBeDefined();
  });

  it("quoteListTags returns tags", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ([{ _id: "1", name: "wisdom" }]),
    })));
    const r = await quoteListTags({}) as Record<string, unknown>;
    expect(r.unclick_meta).toBeDefined();
  });
});
